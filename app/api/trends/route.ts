import { NextResponse } from "next/server"
import { fetchTrendSeries } from "@/lib/providers/trends"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"

export async function GET(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "trends")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const { searchParams } = new URL(req.url)
  const keyword = searchParams.get("keyword") || "ai tools"
  const series = await fetchTrendSeries(keyword).catch((e) => {
    return []
  })
  if (!series.length) {
    return NextResponse.json({ error: "Unable to fetch Google Trends data at this time." }, { status: 502 })
  }
  return NextResponse.json({ keyword, series, source: "google-trends" })
}
