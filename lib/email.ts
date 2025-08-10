import nodemailer from "nodemailer"

export async function sendMail({
  to,
  subject,
  text,
  html,
  from,
  replyTo,
}: {
  to: string
  subject: string
  text?: string
  html?: string
  from?: string
  replyTo?: string
}) {
  const user = process.env.SMTP_EMAIL
  const pass = process.env.SMTP_PASS
  if (!user || !pass) {
    throw new Error("SMTP_EMAIL and SMTP_PASS are required")
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: from || process.env.EMAIL_FROM || `NamePurse <${user}>`,
    to,
    subject,
    text,
    html,
    replyTo,
  })

  return true
}

export async function sendMagicLinkEmail({ to, link }: { to: string; link: string }) {
  const subject = "Your NamePurse login link"
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto; color: #111">
      <h2 style="margin: 0 0 8px 0;">Sign in to NamePurse</h2>
      <p style="margin: 0 0 16px 0;">Click the secure link below to finish signing in:</p>
      <p style="margin: 0 0 16px 0;">
        <a href="${link}" style="background:#42cae5; color:#000; text-decoration:none; padding:10px 14px; border-radius:8px; display:inline-block">Sign in</a>
      </p>
      <p style="margin: 0 0 8px 0;">Or copy and paste this URL into your browser:</p>
      <p style="word-break:break-all; margin: 0 0 8px 0;">${link}</p>
      <p style="margin: 16px 0 0 0; font-size: 12px; color: #666;">This link expires in 15 minutes.</p>
    </div>
  `
  return sendMail({ to, subject, html })
}
