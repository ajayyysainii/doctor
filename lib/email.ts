import nodemailer from "nodemailer";

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS must be set in env");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function formatSlotForEmail(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

/** Send teleconsultation confirmation email to the patient. */
export async function sendBookingEmail(params: {
  to: string;
  patientName: string;
  slotStartIso: string;
  joinUrl: string;
}): Promise<void> {
  const fromName = process.env.SMTP_FROM_NAME ?? "Dr SK Palsania Clinic";
  const fromAddr = process.env.SMTP_USER ?? "";
  const from = `"${fromName}" <${fromAddr}>`;

  const slotLabel = formatSlotForEmail(params.slotStartIso);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Consultation Confirmed</title>
  <style>
    body { margin: 0; padding: 0; background: #f0f6fa; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #008de4 0%, #0056c7 100%); padding: 36px 40px; text-align: center; }
    .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; color: rgba(255,255,255,0.85); font-size: 14px; }
    .body { padding: 36px 40px; }
    .greeting { font-size: 16px; color: #1a1a2e; margin: 0 0 20px; }
    .info-card { background: #f8fafd; border: 1px solid #e5edf5; border-radius: 12px; padding: 20px 24px; margin: 20px 0; }
    .info-row { display: flex; align-items: flex-start; margin-bottom: 12px; }
    .info-row:last-child { margin-bottom: 0; }
    .info-label { font-size: 12px; font-weight: 700; color: #7a8fab; text-transform: uppercase; letter-spacing: 0.5px; width: 80px; flex-shrink: 0; padding-top: 2px; }
    .info-value { font-size: 14px; color: #1a1a2e; font-weight: 500; }
    .cta { text-align: center; margin: 28px 0 20px; }
    .cta a { display: inline-block; background: linear-gradient(135deg, #008de4 0%, #0056c7 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 36px; border-radius: 12px; letter-spacing: 0.2px; }
    .note { font-size: 13px; color: #6b7a90; text-align: center; margin: 0; }
    .footer { background: #f8fafd; border-top: 1px solid #e5edf5; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #9ba8bc; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>✅ Video Consultation Confirmed</h1>
      <p>Your booking is confirmed and payment received.</p>
    </div>
    <div class="body">
      <p class="greeting">Hi <strong>${params.patientName}</strong>,</p>
      <p style="font-size:14px;color:#4a5568;margin:0 0 20px;">Your video consultation has been successfully booked. Here are your appointment details:</p>

      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Date &amp; Time</span>
          <span class="info-value">${slotLabel} (IST)</span>
        </div>
        <div class="info-row">
          <span class="info-label">Link</span>
          <span class="info-value" style="word-break:break-all;"><a href="${params.joinUrl}" style="color:#008de4;">${params.joinUrl}</a></span>
        </div>
      </div>

      <div class="cta">
        <a href="${params.joinUrl}">Join Video Consultation</a>
      </div>

      <p class="note">Please join a few minutes early with a stable internet connection and good lighting.</p>
    </div>
    <div class="footer">
      <p>This email was sent by ${fromName}. If you have any questions, please contact us.</p>
    </div>
  </div>
</body>
</html>
`.trim();

  const text = [
    `Hi ${params.patientName},`,
    "",
    "Your video consultation is confirmed.",
    `Time (IST): ${slotLabel}`,
    `Join here: ${params.joinUrl}`,
    "",
    "Please join a few minutes early with a stable connection.",
    "",
    `— ${fromName}`,
  ].join("\n");

  const transport = createTransport();
  await transport.sendMail({
    from,
    to: params.to,
    subject: `✅ Video Consultation Confirmed — ${slotLabel}`,
    text,
    html,
  });
  console.log(`[email] ✅ Confirmation email sent to patient: ${params.to} (${params.patientName}) for slot ${slotLabel}`);
}

/** Send a notification email to the admin when a new booking is paid. */
export async function sendAdminBookingEmail(params: {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  slotStartIso: string;
  joinUrl: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("[email] ADMIN_EMAIL not set; skipping admin email.");
    return;
  }

  const fromName = process.env.SMTP_FROM_NAME ?? "Dr SK Palsania Clinic";
  const fromAddr = process.env.SMTP_USER ?? "";
  const from = `"${fromName}" <${fromAddr}>`;

  const slotLabel = formatSlotForEmail(params.slotStartIso);

  const text = [
    "New paid video consultation.",
    `Patient: ${params.patientName}`,
    `Phone: ${params.patientPhone}`,
    `Email: ${params.patientEmail}`,
    `Time (IST): ${slotLabel}`,
    `Join: ${params.joinUrl}`,
  ].join("\n");

  const transport = createTransport();
  await transport.sendMail({
    from,
    to: adminEmail,
    subject: `New Booking — ${params.patientName} at ${slotLabel}`,
    text,
  });
  console.log(`[email] ✅ Admin notification email sent to: ${adminEmail} for patient ${params.patientName} at ${slotLabel}`);
}
