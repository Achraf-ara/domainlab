"use client"

import type React from "react"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type ComboResult = {
  suggestions: string[]
}

export default function KeywordCombiner() {
  const [listA, setListA] = useState("solar\nwind\nnexus\npixel")
  const [listB, setListB] = useState("hub\nlabs\nprime\nverse")
  const [tlds, setTlds] = useState(".com,.io,.ai")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ComboResult | null>(null)

  async function generate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const body = {
      listA: listA
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      listB: listB
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      tlds: tlds
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      style: "brandable",
    }
    const res = await fetch("/api/keyword-combine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={generate} className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium">List A</label>
          <Textarea rows={8} value={listA} onChange={(e) => setListA(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">List B</label>
          <Textarea rows={8} value={listB} onChange={(e) => setListB(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">TLDs (comma separated)</label>
          <Input value={tlds} onChange={(e) => setTlds(e.target.value)} />
          <Button type="submit" className="mt-2 bg-[#42cae5] text-black hover:bg-[#35b9d4]" disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </form>
      {result && (
        <div className="grid gap-2">
          <div className="text-sm font-medium">Suggestions</div>
          <div className="flex flex-wrap gap-2">
            {result.suggestions.map((s) => (
              <Badge key={s} variant="outline" className="text-sm">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
