"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileUser,
  Mail,
  Phone,
  User,
  BriefcaseBusiness,
  MessageSquareText,
  Paperclip,
} from "lucide-react";

export const dynamic = "force-dynamic";

const availableRoles = [
  "Full Time Medical Representative",
  "Part Time Medical Representative",
];

export default function ApplyNowPage() {
  const initialRole = availableRoles[0];
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "https://hatemghazaly.pythonanywhere.com";

  const [role, setRole] = useState(initialRole);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(`Application for ${initialRole}`);
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const reveal = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  } as const;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setStatus("submitting");
    setFeedback("");
    setCvError("");

    try {
      const [first, ...rest] = firstName.trim().split(/\s+/);
      const normalizedFirstName = first ?? "";
      const normalizedLastName = lastName.trim() || rest.join(" ").trim() || "";

      let cv_attachment_name: string | undefined;
      let cv_attachment_type: string | undefined;
      let cv_attachment_base64: string | undefined;

      if (cvFile) {
        if (cvFile.size > 5 * 1024 * 1024) {
          setCvError("CV file must be 5MB or smaller.");
          throw new Error("CV file must be 5MB or smaller.");
        }

        cv_attachment_name = cvFile.name;
        cv_attachment_type = cvFile.type || "application/octet-stream";
        const fileBuffer = await cvFile.arrayBuffer();
        const bytes = new Uint8Array(fileBuffer);
        let binary = "";
        bytes.forEach((byte) => {
          binary += String.fromCharCode(byte);
        });
        cv_attachment_base64 = btoa(binary);
      }

      const response = await fetch(`${apiBaseUrl}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: normalizedFirstName,
          last_name: normalizedLastName,
          email,
          phone,
          subject,
          message,
          cv_attachment_name,
          cv_attachment_type,
          cv_attachment_base64,
        }),
      });

      const payload = (await response.json()) as
        | {
            message?: string;
            error?: string;
            warning?: string;
            smtp_error?: string;
          }
        | undefined;

      if (!response.ok) {
        throw new Error(
          payload?.error ?? "We could not send your application right now.",
        );
      }

      setStatus("success");
      setFeedback(
        payload?.warning
          ? `${payload.message ?? "Your application was saved."} ${payload.warning}${payload.smtp_error ? ` SMTP error: ${payload.smtp_error}` : ""}`
          : (payload?.message ?? "Your application was sent successfully."),
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setCvFile(null);
      form.reset();
      setRole(initialRole);
      setSubject(`Application for ${initialRole}`);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We could not send your application right now.",
      );
    }
  }

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 sm:py-12 lg:px-14 lg:py-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
            >
              <FileUser className="h-3.5 w-3.5" />
              Apply Now
            </motion.div>

            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
              variants={reveal}
            >
              Start Your Application
            </motion.h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
            >
              Share your details below and our team will review your application
              for the role that fits you best.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
        >
          <motion.div
            className="relative h-[260px] w-full overflow-hidden border-y border-white/70 bg-slate-100 sm:h-[320px] lg:h-[360px]"
            initial={{ opacity: 0, scale: 1.02, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.03 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/join.png"
                alt="Join Willi Med careers"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.22))]" />
          </motion.div>

          <div className="px-6 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                  Selected role
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {role}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-7 lg:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="First Name"
                  name="first_name"
                  value={firstName}
                  onChange={setFirstName}
                  icon={User}
                  required
                />
                <Field
                  label="Last Name"
                  name="last_name"
                  value={lastName}
                  onChange={setLastName}
                  icon={User}
                  required
                />
                <Field
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  icon={Mail}
                  required
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  value={phone}
                  onChange={setPhone}
                  type="tel"
                  icon={Phone}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(event) => {
                      const nextRole = event.target.value;
                      setRole(nextRole);
                      setSubject(`Application for ${nextRole}`);
                    }}
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                  >
                    {availableRoles.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label
                  htmlFor="cv"
                  className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400"
                >
                  CV Attachment
                </label>
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 transition hover:bg-slate-100">
                  <span className="inline-flex items-center gap-3">
                    <Paperclip className="h-4 w-4 text-slate-400" />
                    {cvFile ? cvFile.name : "Attach your CV (PDF, DOC, DOCX)"}
                  </span>
                  <span className="font-medium text-slate-900">
                    Choose file
                  </span>
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      setCvFile(file);
                      setCvError("");
                    }}
                  />
                </label>
                <p className="text-xs text-slate-500">
                  Maximum file size: 5MB.
                </p>
                {cvError ? (
                  <p className="text-sm text-rose-700">{cvError}</p>
                ) : null}
              </div>

              <div className="mt-4 space-y-2">
                <label
                  htmlFor="subject"
                  className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400"
                >
                  Subject
                </label>
                <div className="relative">
                  <MessageSquareText className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    type="text"
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                  Cover Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell us why you're a great fit..."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  name="message"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Sending..."
                    : "Submit Application"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-sm text-slate-500">
                  {status === "success"
                    ? "Your application was submitted."
                    : "This form now uses the contact API and includes your CV."}
                </p>
              </div>

              {status === "success" && feedback ? (
                <div className="mt-4 rounded-[24px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm leading-7 text-emerald-900">
                  {feedback}
                </div>
              ) : null}

              {status === "error" && feedback ? (
                <div className="mt-4 rounded-[24px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm leading-7 text-rose-900">
                  {feedback}
                </div>
              ) : null}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon: Icon,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon: typeof User;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          placeholder={label}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
        />
      </div>
    </div>
  );
}
