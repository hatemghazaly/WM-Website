import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import tls from "node:tls";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  cv_attachment_name?: string;
  cv_attachment_type?: string;
  cv_attachment_base64?: string;
};

type NormalizedContactPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  cv_attachment_name?: string;
  cv_attachment_type?: string;
  cv_attachment_base64?: string;
};

const storagePath = join(process.cwd(), ".data", "contact-submissions.json");

function env(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

function backendUrl() {
  return env("CONTACT_BACKEND_URL", "https://hatemghazaly.pythonanywhere.com")
    .replace(/\/$/, "");
}

async function saveLocally(payload: NormalizedContactPayload) {
  await mkdir(join(process.cwd(), ".data"), { recursive: true });

  let existing: Array<NormalizedContactPayload & { id: number; createdAt: string }> = [];

  try {
    const raw = await readFile(storagePath, "utf8");
    existing = JSON.parse(raw) as Array<
      NormalizedContactPayload & { id: number; createdAt: string }
    >;
  } catch {
    existing = [];
  }

  const record = {
    id: existing.length + 1,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  await writeFile(
    storagePath,
    JSON.stringify([...existing, record], null, 2),
    "utf8"
  );
  return record;
}

function normalizePayload(payload: ContactPayload): NormalizedContactPayload {
  const cvAttachmentName = String(payload.cv_attachment_name ?? "").trim();
  const cvAttachmentType = String(payload.cv_attachment_type ?? "").trim();
  const cvAttachmentBase64 = String(payload.cv_attachment_base64 ?? "").trim();

  return {
    first_name: String(payload.first_name ?? "").trim(),
    last_name: String(payload.last_name ?? "").trim(),
    email: String(payload.email ?? "").trim(),
    phone: String(payload.phone ?? "").trim(),
    subject: String(payload.subject ?? "").trim(),
    message: String(payload.message ?? "").trim(),
    cv_attachment_name: cvAttachmentName || undefined,
    cv_attachment_type: cvAttachmentType || undefined,
    cv_attachment_base64: cvAttachmentBase64 || undefined,
  };
}

function buildMessage(payload: NormalizedContactPayload) {
  const recipient = env("CONTACT_RECIPIENT_EMAIL", "hghazaly@willimed.com");
  const fromEmail = env("SMTP_FROM_EMAIL", "website@willimed.com");
  const isApplication = Boolean(payload.cv_attachment_name);
  const subject = isApplication
    ? payload.subject
    : `Contact form submission: ${payload.subject}`;
  const bodyText = [
    "A new contact form submission was received.",
    "",
    `Name: ${payload.first_name} ${payload.last_name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "N/A"}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\r\n");

  const hasAttachment =
    Boolean(payload.cv_attachment_name) &&
    Boolean(payload.cv_attachment_type) &&
    Boolean(payload.cv_attachment_base64);

  const headers = [
    `From: ${fromEmail}`,
    `To: ${recipient}`,
    `Reply-To: ${payload.email}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
  ];

  if (hasAttachment) {
    const boundary = `boundary_${Date.now().toString(36)}`;
    const attachmentBase64 = wrapBase64(payload.cv_attachment_base64 ?? "");
    const attachmentName = escapeHeaderValue(payload.cv_attachment_name ?? "cv");
    const attachmentType = payload.cv_attachment_type ?? "application/octet-stream";

    headers.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

    const raw = [
      ...headers,
      "",
      `--${boundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      bodyText,
      "",
      `--${boundary}`,
      `Content-Type: ${attachmentType}; name="${attachmentName}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachmentName}"`,
      "",
      attachmentBase64,
      "",
      `--${boundary}--`,
      "",
    ].join("\r\n");

    return {
      recipient,
      fromEmail,
      subject,
      raw,
    };
  }

  headers.push('Content-Type: text/plain; charset="UTF-8"');
  headers.push("Content-Transfer-Encoding: 8bit");

  return {
    recipient,
    fromEmail,
    subject,
    raw: `${headers.join("\r\n")}\r\n\r\n${bodyText}`,
  };
}

function wrapBase64(value: string) {
  return value.match(/.{1,76}/g)?.join("\r\n") ?? value;
}

function escapeHeaderValue(value: string) {
  return value.replace(/["\\]/g, "\\$&");
}

function dotStuff(value: string) {
  return value
    .replace(/\r?\n/g, "\r\n")
    .split("\r\n")
    .map((line) => (line.startsWith(".") ? `.${line}` : line))
    .join("\r\n");
}

function encodeBase64(value: string) {
  return Buffer.from(value, "utf8").toString("base64");
}

class SmtpClient {
  private socket: tls.TLSSocket;
  private buffer = "";
  private queue: string[] = [];
  private pending: ((line: string) => void) | null = null;
  private pendingError: ((error: Error) => void) | null = null;
  private fatalError: Error | null = null;

  constructor(private host: string, private port: number) {
    this.socket = tls.connect({
      host,
      port,
      servername: host,
    });
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk) => this.onData(chunk));
    this.socket.on("error", (error) => this.onError(error));
    this.socket.on("close", () =>
      this.onError(new Error("SMTP connection closed unexpectedly."))
    );
  }

  private onData(chunk: string) {
    this.buffer += chunk;
    let newlineIndex = this.buffer.indexOf("\n");

    while (newlineIndex >= 0) {
      const rawLine = this.buffer.slice(0, newlineIndex);
      this.buffer = this.buffer.slice(newlineIndex + 1);
      const line = rawLine.replace(/\r$/, "");

      if (/^\d{3} /.test(line)) {
        if (this.pending) {
          const resolve = this.pending;
          this.pending = null;
          this.pendingError = null;
          resolve(line);
        } else {
          this.queue.push(line);
        }
      }

      newlineIndex = this.buffer.indexOf("\n");
    }
  }

  private onError(error: Error) {
    this.fatalError = error;
    if (this.pendingError) {
      const reject = this.pendingError;
      this.pending = null;
      this.pendingError = null;
      reject(error);
    }
  }

  private waitForResponse() {
    if (this.fatalError) {
      return Promise.reject(this.fatalError);
    }

    const queued = this.queue.shift();
    if (queued) {
      return Promise.resolve(queued);
    }

    return new Promise<string>((resolve, reject) => {
      this.pending = resolve;
      this.pendingError = reject;
    });
  }

  async send(command: string) {
    const response = this.waitForResponse();
    this.socket.write(`${command}\r\n`);
    return response;
  }

  async sendData(rawMessage: string) {
    const response = this.waitForResponse();
    this.socket.write(`${dotStuff(rawMessage)}\r\n.\r\n`);
    return response;
  }

  async connect() {
    const greeting = await this.waitForResponse();
    if (!greeting.startsWith("220")) {
      throw new Error(`SMTP greeting rejected: ${greeting}`);
    }
  }

  async close() {
    if (!this.socket.destroyed) {
      this.socket.end();
    }
  }
}

async function sendViaSmtp(
  message: ReturnType<typeof buildMessage>
) {
  const smtpHost = env("SMTP_HOST", "mail.willimed.com");
  const smtpPort = Number(env("SMTP_PORT", "465"));
  const smtpUsername = env("SMTP_USERNAME", "website@willimed.com");
  const smtpPassword = env("SMTP_PASSWORD", "");

  const client = new SmtpClient(smtpHost, smtpPort);

  try {
    await client.connect();

    let response = await client.send(`EHLO ${env("SMTP_EHLO_HOST", "localhost")}`);
    if (!response.startsWith("250")) {
      response = await client.send(`HELO ${env("SMTP_EHLO_HOST", "localhost")}`);
      if (!response.startsWith("250")) {
        throw new Error(`SMTP handshake failed: ${response}`);
      }
    }

    response = await client.send("AUTH LOGIN");
    if (!response.startsWith("334")) {
      throw new Error(`SMTP auth initiation failed: ${response}`);
    }

    response = await client.send(encodeBase64(smtpUsername));
    if (!response.startsWith("334")) {
      throw new Error(`SMTP username rejected: ${response}`);
    }

    response = await client.send(encodeBase64(smtpPassword));
    if (!response.startsWith("235")) {
      throw new Error(`SMTP password rejected: ${response}`);
    }

    response = await client.send(`MAIL FROM:<${message.fromEmail}>`);
    if (!response.startsWith("250")) {
      throw new Error(`MAIL FROM rejected: ${response}`);
    }

    response = await client.send(`RCPT TO:<${message.recipient}>`);
    if (!response.startsWith("250") && !response.startsWith("251")) {
      throw new Error(`RCPT TO rejected: ${response}`);
    }

    response = await client.send("DATA");
    if (!response.startsWith("354")) {
      throw new Error(`DATA rejected: ${response}`);
    }

    response = await client.sendData(message.raw);
    if (!response.startsWith("250")) {
      throw new Error(`Message rejected: ${response}`);
    }

    await client.send("QUIT");
  } finally {
    await client.close();
  }
}

async function forwardToBackend(payload: NormalizedContactPayload) {
  const response = await fetch(`${backendUrl()}/api/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data: Record<string, unknown> = {};

  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      data = { message: text };
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const normalizedPayload = normalizePayload(payload);
  const missingFields = [
    "first_name",
    "last_name",
    "email",
    "subject",
    "message",
  ].filter((field) => !normalizedPayload[field as keyof NormalizedContactPayload]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", missing_fields: missingFields },
      { status: 400 }
    );
  }

  const emailMessage = buildMessage(normalizedPayload);

  try {
    try {
      const backendResponse = await forwardToBackend(normalizedPayload);
      if (backendResponse.ok) {
        return NextResponse.json(backendResponse.data, {
          status: backendResponse.status,
        });
      }

      if (backendResponse.status >= 400 && backendResponse.status < 500) {
        return NextResponse.json(backendResponse.data, {
          status: backendResponse.status,
        });
      }
    } catch {
      // Fall back to SMTP/local storage when the backend cannot be reached.
    }

    await sendViaSmtp(emailMessage);
    return NextResponse.json(
      {
        message: `Your contact message was sent to ${emailMessage.recipient}.`,
        email_sent: true,
      },
      { status: 201 }
    );
  } catch (error) {
    const smtpError = error instanceof Error ? error.message : "SMTP delivery failed.";
    const saved = await saveLocally(normalizedPayload);

    return NextResponse.json(
      {
        message: "Your message was saved locally.",
        id: saved.id,
        fallback: true,
        email_sent: false,
        smtp_error: smtpError,
      },
      { status: 201 }
    );
  }
}
