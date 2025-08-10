"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ExportButtons from "@/components/export-buttons"

type Expired = {
  domain: string
  dropDate: string
  traffic: number
  backlinks: number
  age: number
  priceGuide: number
  tags: string[]
}

export default function Page() {
  const [q, setQ] = useState("")
  const [items, setItems] = useState<Expired[]>([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`/api/expired?query=${encodeURIComponent(q)}`)
    const json = await res.json()
    setItems(json.results || [])
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <SiteHeader />
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Expired Domains</h1>
        <p className="mt-1 text-sm text-muted-foreground">Filter by drop date, metrics, and trends.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input placeholder="Keyword (optional)" value={q} onChange={(e) => setQ(e.target.value)} />
          <Button onClick={load} className="bg-[#01040b] text-white hover:bg-black" disabled={loading}>
            {loading ? "Loading…" : "Search"}
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-end">
          <ExportButtons data={items} filenameBase="domainlab-expired" />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {items.map((x) => (
            <Card key={x.domain}>
              <CardContent className="grid gap-2 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold">{x.domain}</div>
                  <div className="rounded bg-[#42cae5]/20 px-2 py-1 text-xs">Drops: {x.dropDate}</div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  <Metric label="Traffic" value={x.traffic.toLocaleString()} />
                  <Metric label="Backlinks" value={x.backlinks.toLocaleString()} />
                  <Metric label="Age" value={`${x.age}y`} />
                  <Metric label="Price guide" value={`$${x.priceGuide.toLocaleString()}`} />
                  <Metric label="Tags" value={x.tags.join(", ")} />
                </div>
              </CardContent>
            </Card>
          ))}
          {!loading && items.length === 0 && (
            <div className="text-sm text-muted-foreground">No expired domains matched. Try a broader search.</div>
          )}
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border p-2 text-center">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}
