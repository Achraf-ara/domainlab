import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

function makeCorsHeaders(origin: string | null, allowedOrigins: string[]) {
  const allowed = origin && allowedOrigins.some((o) => origin.startsWith(o))
  return {
    "Access-Control-Allow-Origin": allowed ? origin! : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  }
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin")
  const defaults = [process.env.APP_URL || "", "http://localhost:3000"].filter(Boolean) as string[]
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const headers = makeCorsHeaders(origin, allowed.length ? allowed : defaults)
  return new Response(null, { status: 204, headers })
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin")
  const defaults = [process.env.APP_URL || "", "http://localhost:3000"].filter(Boolean) as string[]
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const headers = makeCorsHeaders(origin, allowed.length ? allowed : defaults)

  const user = process.env.SMTP_EMAIL
  const pass = process.env.SMTP_PASS
  const receiver = process.env.CONTACT_RECEIVER

  if (!user || !pass || !receiver) {
    return new NextResponse(
      JSON.stringify({ error: "Email not configured. Set SMTP_EMAIL, SMTP_PASS, CONTACT_RECEIVER." }),
      {
        status: 501,
        headers,
      },
    )
  }

  const body = await req.json().catch(() => null)
  const from_name = String(body?.from_name || "").trim()
  const from_email = String(body?.from_email || "").trim()
  const subject = String(body?.subject || "").trim()
  const message = String(body?.message || "").trim()

  if (!from_name || !from_email || !subject || !message) {
    return new NextResponse(JSON.stringify({ error: "from_name, from_email, subject, message required" }), {
      status: 400,
      headers,
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"${from_name}" <${user}>`,
      to: receiver,
      subject: `New Contact | ${subject} - ${from_email}`,
      text: message,
      replyTo: from_email,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2 style="color: #444;">New Contact Message via ${process.env.APP_URL || "domainLab"}</h2>
          <p><strong>Name :</strong> ${from_name}</p>
          <p><strong>Email :</strong> <a href="mailto:${from_email}">${from_email}</a></p>
          <p><strong>Subject :</strong> ${subject}</p>
          <hr />
          <p style="white-space: pre-line;"><strong>Message :</strong> ${message}</p>
        </div>
      `,
    })

    return new NextResponse(JSON.stringify({ success: true, message: "Email sent" }), { status: 200, headers })
  } catch (error: any) {
    console.error("Email error:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to send email: " + error.message }), {
      status: 500,
      headers,
    })
  }
}
