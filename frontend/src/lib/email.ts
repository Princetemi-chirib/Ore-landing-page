import nodemailer from "nodemailer";

type WaitlistEntryLike = {
  email: string;
  whatsapp?: string;
  role?: string;
  goal?: string;
  capture?: string;
  firstFeature?: string;
  frequency?: string;
  country?: string;
  consent?: string;
  createdAt: string;
};

function env(name: string) {
  const v = process.env[name];
  return v && v.trim().length > 0 ? v.trim() : undefined;
}

function envBool(name: string) {
  const v = env(name);
  if (!v) return undefined;
  return v === "1" || v.toLowerCase() === "true" || v.toLowerCase() === "yes";
}

function envNum(name: string) {
  const v = env(name);
  if (!v) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function isEmailConfigured() {
  return Boolean(env("WAITLIST_NOTIFY_TO") && env("SMTP_HOST"));
}

export async function sendWaitlistNotification(entry: WaitlistEntryLike) {
  const to = env("WAITLIST_NOTIFY_TO");
  const host = env("SMTP_HOST");
  if (!to || !host) return;

  const port = envNum("SMTP_PORT") ?? 587;
  const secure = envBool("SMTP_SECURE") ?? port === 465;
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const from = env("SMTP_FROM") ?? user ?? "waitlist@ore.local";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  const lines: Array<[string, string | undefined]> = [
    ["Email", entry.email],
    ["WhatsApp", entry.whatsapp],
    ["Role", entry.role],
    ["Improve most", entry.goal],
    ["Capture today", entry.capture],
    ["First feature", entry.firstFeature],
    ["Frequency", entry.frequency],
    ["Country", entry.country],
    ["Consent", entry.consent],
    ["Submitted at", entry.createdAt],
  ];

  const text = lines
    .filter(([, v]) => v && v.trim().length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5;">
      <h2 style="margin:0 0 12px;">New Ọ̀rẹ́ waitlist submission</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${lines
          .filter(([, v]) => v && v.trim().length > 0)
          .map(
            ([k, v]) => `
              <tr>
                <td style="padding:6px 10px 6px 0; color:#444; font-weight:600; white-space:nowrap;">${k}</td>
                <td style="padding:6px 0; color:#111;">${escapeHtml(v!)}</td>
              </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;

  await transporter.sendMail({
    from,
    to,
    subject: `Waitlist: ${entry.email}`,
    text,
    html,
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

