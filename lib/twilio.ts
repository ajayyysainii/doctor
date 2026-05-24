import twilio from "twilio";

function client() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set");
  return twilio(sid, token);
}

/** E.164 after +, 10–15 digits, no letters (rejects .env.example placeholders like +1xxxxxxxxxx). */
const E164_BODY = /^[1-9]\d{9,14}$/;

/**
 * Returns `whatsapp:+15551234567` or null if missing / invalid / placeholder.
 */
export function normalizeWhatsappAddress(raw: string | undefined): string | null {
  if (!raw) return null;
  let s = raw.trim();
  if (!s) return null;
  if (s.toLowerCase().startsWith("whatsapp:")) {
    s = s.slice("whatsapp:".length).trim();
  }
  if (!s.startsWith("+")) return null;
  const body = s.slice(1).replace(/\s/g, "");
  if (!E164_BODY.test(body)) return null;
  if (/[a-z]/i.test(body)) return null;
  return `whatsapp:+${body}`;
}

function resolveWhatsappFrom(): string | null {
  const normalized = normalizeWhatsappAddress(process.env.TWILIO_WHATSAPP_FROM);
  if (!normalized) {
    console.warn(
      "[twilio] TWILIO_WHATSAPP_FROM is missing or invalid. Use a real WhatsApp sender, e.g. whatsapp:+14155238886 (sandbox). Skipping WhatsApp sends.",
    );
    return null;
  }
  return normalized;
}

function formatSlotForMessage(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export async function sendBookingWhatsapp(params: {
  to: string;
  slotStartIso: string;
  joinUrl: string;
  patientName: string;
}): Promise<void> {
  const from = resolveWhatsappFrom();
  if (!from) return;

  const to = normalizeWhatsappAddress(params.to);
  if (!to) {
    console.warn("[twilio] Patient phone is not a valid E.164 number; skipping user WhatsApp.");
    return;
  }

  const body = [
    `Hi ${params.patientName}, your video consultation is confirmed.`,
    `Time (IST): ${formatSlotForMessage(params.slotStartIso)}`,
    `Join here: ${params.joinUrl}`,
    "Please join a few minutes early with a stable connection.",
  ].join("\n");

  await client().messages.create({
    from,
    to,
    body,
  });
}

export async function notifyAdminBookingWhatsapp(params: {
  slotStartIso: string;
  joinUrl: string;
  patientName: string;
  patientPhone: string;
}): Promise<void> {
  const adminTo = process.env.TWILIO_ADMIN_WHATSAPP_TO;
  if (!adminTo) {
    console.warn("TWILIO_ADMIN_WHATSAPP_TO not set; skipping admin WhatsApp");
    return;
  }
  const from = resolveWhatsappFrom();
  if (!from) return;

  const to = normalizeWhatsappAddress(adminTo);
  if (!to) {
    console.warn("[twilio] TWILIO_ADMIN_WHATSAPP_TO is not a valid E.164 number; skipping admin WhatsApp.");
    return;
  }

  const body = [
    "New paid video consultation.",
    `Patient: ${params.patientName} (${params.patientPhone})`,
    `Time (IST): ${formatSlotForMessage(params.slotStartIso)}`,
    `Join: ${params.joinUrl}`,
  ].join("\n");

  await client().messages.create({
    from,
    to,
    body,
  });
}
