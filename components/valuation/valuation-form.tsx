"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Valuation = {
  low: number
  mid: number
  high: number
  confidence: number
  metrics: Record<string, number>
  narrative: string
}

export default function ValuationForm() {
  const [domain, setDomain] = useState("")
  const [loading, setLoading] = useState(false)
  const [valuation, setValuation] = useState<Valuation | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setValuation(null)
    try {
      const res = await fetch("/api/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, save: false }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      setValuation(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Enter a domain, e.g., solarpulse.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          aria-label="Domain to value"
        />
        <Button type="submit" className="bg-[#42cae5] text-black hover:bg-[#35b9d4]" disabled={loading || !domain}>
          {loading ? "Valuing..." : "Get valuation"}
        </Button>
      </form>
      {error && (
        <div className="rounded border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {valuation && (
        <Card>
          <CardContent className="grid gap-4 p-4">
            <div className="grid gap-2 sm:grid-cols-4">
              <div>
                <div className="text-xs text-muted-foreground">Low</div>
                <div className="text-lg font-semibold">${valuation.low.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Mid</div>
                <div className="text-lg font-semibold">${valuation.mid.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">High</div>
                <div className="text-lg font-semibold">${valuation.high.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Confidence</div>
                <div className="flex items-center gap-2">
                  <Progress value={valuation.confidence * 100} className="h-2" />
                  <Badge variant="outline">{Math.round(valuation.confidence * 100)}%</Badge>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">AI narrative</div>
              <p className="text-sm text-muted-foreground">{valuation.narrative}</p>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Metric breakdown</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                {Object.entries(valuation.metrics).map(([k, v]) => (
                  <div key={k} className="rounded border p-2 text-center text-xs">
                    <div className="text-muted-foreground">{k}</div>
                    <div className="font-medium">{(typeof v === "number" ? v : 0).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
