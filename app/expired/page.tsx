"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ExportButtons from "@/components/export-buttons"
import { AlertCircle, Database } from "lucide-react"

type Expired = {
  domain: string
  dropDate: string
  traffic: number
  backlinks: number
  age: number
  priceGuide: number
  tags: string[]
}

type ApiResponse = {
  results: Expired[]
  source: string
  note?: string
}

export default function Page() {
  const [q, setQ] = useState("")
  const [items, setItems] = useState<Expired[]>([])
  const [loading, setLoading] = useState(false)
  const [source, setSource] = useState<string>("")
  const [note, setNote] = useState<string>("")

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`/api/expired?query=${encodeURIComponent(q)}`)
      const json: ApiResponse = await res.json()
      setItems(json.results || [])
      setSource(json.source || "")
      setNote(json.note || "")
    } catch (error) {
      console.error("Failed to load expired domains:", error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Expired Domains</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Discover recently expired domains with existing traffic, backlinks, and SEO value.
            </p>
          </div>

          {/* Data Source Notice */}
          {source === "mock" && note && (
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
              <CardContent className="flex items-start gap-3 p-4">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Sample Data</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{note}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                placeholder="Search by keyword or domain..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="sm:w-80"
              />
              <Button onClick={load} className="bg-[#01040b] text-white hover:bg-black" disabled={loading}>
                {loading ? "Loading…" : "Search"}
              </Button>
            </div>

            <div className="flex items-center gap-4">
              {source && (
                <Badge variant="outline" className="gap-2">
                  <Database className="h-3 w-3" />
                  {source === "mock" ? "Sample Data" : "Live Data"}
                </Badge>
              )}
              <ExportButtons data={items} filenameBase="namepulse-expired" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((x) => (
              <Card key={x.domain} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-lg">{x.domain}</div>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Drops: {x.dropDate}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Metric label="Traffic" value={x.traffic.toLocaleString()} />
                    <Metric label="Backlinks" value={x.backlinks.toLocaleString()} />
                    <Metric label="Age" value={`${x.age} years`} />
                    <Metric label="Est. Value" value={`$${x.priceGuide.toLocaleString()}`} />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {x.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {!loading && items.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No expired domains found</p>
                <p className="text-sm mt-1">Try a different search term or check back later for new drops.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-muted/30">
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
      <div className="text-sm font-semibold mt-1">{value}</div>
    </div>
  )
}
