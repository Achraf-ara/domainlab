// Since @types/google-trends-api doesn't exist, we'll define minimal types
interface GoogleTrendsTimelineData {
  time: number
  value: number[]
}

interface GoogleTrendsResponse {
  default?: {
    timelineData?: GoogleTrendsTimelineData[]
  }
}

// Corrected import for google-trends-api
import googleTrends from "google-trends-api"

export async function fetchTrendSeries(keyword: string) {
  try {
    const results = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 365 * 24 * 3600 * 1000),
    })

    const parsed: GoogleTrendsResponse = JSON.parse(results)
    const timeline = parsed?.default?.timelineData || []

    const series = timeline.map((p) => ({
      month: new Date(p.time * 1000).toLocaleString("en-US", { month: "short" }),
      score: Number(p.value?.[0] || 0),
    }))

    return series
  } catch (error) {
    console.error("Google Trends API error:", error)
    throw error
  }
}
