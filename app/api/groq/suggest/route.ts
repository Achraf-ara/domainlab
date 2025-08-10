import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { ENV } from "@/lib/env"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "groq-suggest")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const body = await req.json().catch(() => null)
  const keyword: string = body?.keyword || ""
  const tlds: string[] = Array.isArray(body?.tlds) ? body.tlds : [".com", ".io", ".ai"]
  if (!keyword) return NextResponse.json({ error: "keyword required" }, { status: 400 })

  if (!ENV.GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 501 })
  }
  try {
    const { text } = await generateText({
      model: groq(ENV.GROQ_MODEL),
      prompt: `Generate 20 creative, non-trademarked domain ideas from keyword "${keyword}" across TLDs ${tlds.join(
        ", ",
      )}. Return JSON array of strings.`,
    })
    const suggestions = JSON.parse(text)
    return NextResponse.json({ suggestions })
  } catch (e: any) {
    return NextResponse.json({ error: "Groq generation failed", details: String(e) }, { status: 502 })
  }
}
