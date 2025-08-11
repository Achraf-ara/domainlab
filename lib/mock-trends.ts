import { seededRandom } from "./random"

export function generateMockTrends(keyword: string) {
  const rnd = seededRandom(keyword)
  const series = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const month = date.toLocaleString("en-US", { month: "short" })
    const score = Math.floor(rnd() * 100) + 1 // Score between 1 and 100
    series.push({ month, score })
  }
  return series
}
