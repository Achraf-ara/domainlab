import { NextResponse } from "next/server"
import { fetchTrendSeries } from "@/lib/providers/trends"
import { ipFromRequest, rateLimit } from "@/lib/rate-limit"
import { CACHE_HEADERS } from "@/lib/cache-headers"

// Mock trend data generator
function generateMockTrends(keyword: string) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Generate realistic trend data based on keyword
  const baseScore = keyword.includes("ai") ? 70 : keyword.includes("crypto") ? 60 : 45
  const series = months.map((month, index) => {
    const variation = Math.sin(index * 0.5) * 15 + Math.random() * 10 - 5
    const score = Math.max(10, Math.min(100, baseScore + variation))
    return { month, score: Math.round(score) }
  })

  return series
}

export async function GET(req: Request) {
  const ip = ipFromRequest(req)
  const rl = await rateLimit(ip, "trends")
  if (!rl.allowed) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })

  const { searchParams } = new URL(req.url)
  const keyword = searchParams.get("keyword") || "ai tools"

  try {
    const series = await fetchTrendSeries(keyword)
    if (series && series.length > 0) {
      return NextResponse.json({ keyword, series, source: "google-trends" }, { headers: CACHE_HEADERS.api })
    }
    throw new Error("No data returned")
  } catch (error) {
    // Fallback to mock data
    console.log("Google Trends not available, using mock data")
    const series = generateMockTrends(keyword)
    return NextResponse.json(
      {
        keyword,
        series,
        source: "mock",
        note: "Using sample trend data. Configure Google Trends API for real data.",
      },
      { headers: CACHE_HEADERS.api },
    )
  }
}
