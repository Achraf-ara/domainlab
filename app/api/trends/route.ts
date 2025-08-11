import { NextResponse } from "next/server"
import { ipFromRequest } from "@/lib/ip"
import { rateLimit } from "@/lib/rate-limit"
import { fetchTrendSeries } from "@/lib/google-trends"
import { generateMockTrends } from "@/lib/mock-trends"
import { CACHE_HEADERS } from "@/constants/cache-headers"

export async function GET(req: Request) {
  try {
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
      throw new Error("No data returned from Google Trends API")
    } catch (error) {
      console.error("Google Trends API error or no data, falling back to mock:", error)
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
  } catch (error: any) {
    console.error("Unhandled error in /api/trends:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
