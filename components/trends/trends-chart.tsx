"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useEffect, useState } from "react"

type TrendPoint = { month: string; score: number }
type TrendData = { keyword: string; series: TrendPoint[] }

export default function TrendsChart({ keyword = "ai tools" }: { keyword?: string }) {
  const [data, setData] = useState<TrendData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const res = await fetch(`/api/trends?keyword=${encodeURIComponent(keyword)}`)
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    load()
  }, [keyword])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend for “{keyword}”</CardTitle>
      </CardHeader>
      <CardContent>
        {loading || !data ? (
          <div className="grid min-h-[240px] place-items-center text-sm text-muted-foreground">Loading…</div>
        ) : (
          <ChartContainer
            config={{
              score: { label: "Score", color: "hsl(var(--chart-1))" },
            }}
            className="h-[280px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.series} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="score"
                  type="natural"
                  stroke="var(--color-score)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-score)" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
