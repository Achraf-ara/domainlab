"use client"

import { useEffect, useMemo, useState } from "react"
import AdvancedFilters, { type Filters } from "@/components/search/advanced-filters"
import DomainCard, { type DomainItem } from "@/components/domain-card"
import ExportButtons from "@/components/export-buttons"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import ESInstantSearch from "@/components/search/es-instant-search"

export default function Page() {
  const [filters, setFilters] = useState<Filters>({
    lengthMin: 3,
    lengthMax: 16,
    priceMin: 0,
    priceMax: 5000,
    trafficMin: 0,
    backlinksMin: 0,
    ageMin: 0,
    tlds: [".com", ".io", ".ai"],
    keyword: "",
    tags: [],
  })
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DomainItem[]>([])

  async function runSearch() {
    setLoading(true)
    const params = new URLSearchParams()
    if (filters.keyword) params.set("query", filters.keyword)
    if (filters.tlds.length) params.set("tlds", filters.tlds.join(","))
    params.set("lengthMin", String(filters.lengthMin))
    params.set("lengthMax", String(filters.lengthMax))
    params.set("priceMin", String(filters.priceMin))
    params.set("priceMax", String(filters.priceMax))
    params.set("trafficMin", String(filters.trafficMin))
    params.set("backlinksMin", String(filters.backlinksMin))
    params.set("ageMin", String(filters.ageMin))
    if (filters.tags.length) params.set("tags", filters.tags.join(","))
    const res = await fetch(`/api/search?${params.toString()}`, { cache: "no-store" })
    const json = await res.json()
    setResults(json.results || [])
    setLoading(false)
  }

  useEffect(() => {
    // initial example query to showcase results
    runSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const exportable = useMemo(
    () =>
      results.map((r) => ({
        domain: r.domain,
        tld: r.tld,
        available: r.available,
        price: r.price,
        traffic: r.traffic,
        backlinks: r.backlinks,
        age: r.age,
        tags: (r.tags || []).join("|"),
      })),
    [results],
  )

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Use easy mode (keyword + TLD) or advanced filters to refine by metrics and tags.
        </p>
        <div className="mt-6 grid gap-6">
          <ESInstantSearch title="Instant search (Elasticsearch)" />
          <AdvancedFilters value={filters} onChange={setFilters} />
          <div className="flex items-center justify-between">
            <Button onClick={runSearch} className="bg-[#01040b] text-white hover:bg-black">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching…
                </>
              ) : (
                "Run search"
              )}
            </Button>
            <ExportButtons data={exportable} filenameBase="domainlab-search" />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <DomainCard key={item.domain} item={item} />
            ))}
            {!loading && results.length === 0 && (
              <div className="text-sm text-muted-foreground">No results. Try relaxing filters.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
