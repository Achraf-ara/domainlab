"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExportButtons from "@/components/export-buttons"
import { Button } from "@/components/ui/button"

type SavedSearch = { id: string; name: string; params: Record<string, string>; createdAt: string }
type PortfolioItem = { domain: string; note?: string; addedAt: string }

export default function Page() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("dl_saved_searches") || "[]")
    const p = JSON.parse(localStorage.getItem("dl_portfolio") || "[]")
    setSavedSearches(s)
    setPortfolio(p)
  }, [])

  function clearLocal() {
    localStorage.removeItem("dl_saved_searches")
    localStorage.removeItem("dl_portfolio")
    setSavedSearches([])
    setPortfolio([])
  }

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Anonymous mode: your saved items are stored in this browser. Create server-side sync when configuring
          MongoDB/auth.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <List data={savedSearches} empty="No saved searches yet." />
              <div className="mt-3 flex justify-end">
                <ExportButtons data={savedSearches} filenameBase="domainlab-saved-searches" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <List data={portfolio} empty="No portfolio items yet." />
              <div className="mt-3 flex justify-end">
                <ExportButtons data={portfolio} filenameBase="domainlab-portfolio" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="destructive" onClick={clearLocal}>
            Clear local data
          </Button>
        </div>
      </section>
    </main>
  )
}

function List({ data, empty }: { data: any[]; empty: string }) {
  if (!data.length) return <div className="text-sm text-muted-foreground">{empty}</div>
  return (
    <ul className="grid gap-2 text-sm">
      {data.map((it, i) => (
        <li key={i} className="rounded border p-2">
          <pre className="overflow-auto text-xs">{JSON.stringify(it, null, 2)}</pre>
        </li>
      ))}
    </ul>
  )
}
