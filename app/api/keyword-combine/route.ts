import { NextResponse } from "next/server"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
  try {
    const ip = ipFromRequest(req)
    const rl = await rateLimit(ip, "keyword-combine")
    if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

    const body = await req.json().catch(() => null)
    const listA: string[] = body?.listA || []
    const listB: string[] = body?.listB || []
    const tlds: string[] = body?.tlds || [".com"]
    if (!Array.isArray(listA) || !Array.isArray(listB) || !Array.isArray(tlds)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }
    const combos = new Set<string>()
    for (const a of listA)
      for (const b of listB)
        for (const t of tlds) {
          combos.add(`${a}${b}${t}`)
          combos.add(`${b}${a}${t}`)
        }
    return NextResponse.json({ suggestions: Array.from(combos).slice(0, 500) })
  } catch (error: any) {
    console.error("Unhandled error in /api/keyword-combine:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
