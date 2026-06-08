const AUTH_COOKIE_NAME = "careers_admin_session";
const TOKEN_SALT = "wm-website-careers-admin";

export function getCareersAdminPassword() {
  return process.env.CAREERS_ADMIN_PASSWORD ?? "123";
}

export function getCareersAdminCookieName() {
  return AUTH_COOKIE_NAME;
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return toHex(new Uint8Array(digest));
}

export async function getCareersAdminToken(password: string) {
  return sha256(`${password}:${TOKEN_SALT}`);
}

export async function isValidCareersAdminToken(token: string) {
  const password = getCareersAdminPassword();
  if (!password || !token) {
    return false;
  }

  return token === (await getCareersAdminToken(password));
}

export function isValidCareersAdminPassword(password: string) {
  return Boolean(password) && password === getCareersAdminPassword();
}

export function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) {
    return "";
  }

  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}
