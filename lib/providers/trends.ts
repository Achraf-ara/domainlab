import googleTrends from "google-trends-api"

export async function fetchTrendSeries(keyword: string) {
  const results = await googleTrends.interestOverTime({
    keyword,
    startTime: new Date(Date.now() - 365 * 24 * 3600 * 1000),
  })
  const parsed = JSON.parse(results)
  const timeline = parsed?.default?.timelineData || []
  const series = timeline.map((p: any) => ({
    month: new Date(p.time * 1000).toLocaleString("en-US", { month: "short" }),
    score: Number(p.value?.[0] || 0),
  }))
  return series
}
