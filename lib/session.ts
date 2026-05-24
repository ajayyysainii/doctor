import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

function getSecret(): string {
  const p = process.env.ADMIN_PASSWORD;
  if (!p) throw new Error("ADMIN_PASSWORD is not set");
  return p;
}

/** Signed session value: base64url(payload).hmac */
export function createAdminSessionValue(): string {
  const maxAgeSec = 60 * 60 * 24 * 7; // 7 days
  const exp = Math.floor(Date.now() / 1000) + maxAgeSec;
  const payload = JSON.stringify({ exp });
  const secret = getSecret();
  const sig = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;
  let payload: string;
  try {
    payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return false;
  }
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(payload) as { exp?: number };
    if (typeof exp !== "number") return false;
    return Math.floor(Date.now() / 1000) <= exp;
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminSessionValue(jar.get(COOKIE_NAME)?.value);
}

export const adminCookieName = COOKIE_NAME;
