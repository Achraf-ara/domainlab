"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type WhoisData = {
  domain: string
  registered: boolean
  registrar?: string
  creationDate?: string
  expiryDate?: string
  rawWhois?: string
  source?: string
}

export default function Page() {
  const [domain, setDomain] = useState("")
  const [data, setData] = useState<WhoisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function lookup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const res = await fetch(`/api/whois?domain=${encodeURIComponent(domain)}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Failed")
      setData(json)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">WHOIS Lookup</h1>
        <p className="mt-1 text-sm text-muted-foreground">Check registration details with caching to control costs.</p>
        <form onSubmit={lookup} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input placeholder="example.com" value={domain} onChange={(e) => setDomain(e.target.value)} />
          <Button className="bg-[#42cae5] text-black hover:bg-[#35b9d4]" disabled={!domain || loading}>
            {loading ? "Looking up…" : "Lookup"}
          </Button>
        </form>
        {error && (
          <div className="mt-4 rounded border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {data && (
          <Card className="mt-6">
            <CardContent className="grid gap-2 p-4 text-sm">
              <div>
                <span className="font-medium">Domain:</span> {data.domain}
              </div>
              <div>
                <span className="font-medium">Registered:</span> {String(data.registered)}
              </div>
              {data.registrar && (
                <div>
                  <span className="font-medium">Registrar:</span> {data.registrar}
                </div>
              )}
              {data.creationDate && (
                <div>
                  <span className="font-medium">Created:</span> {data.creationDate}
                </div>
              )}
              {data.expiryDate && (
                <div>
                  <span className="font-medium">Expires:</span> {data.expiryDate}
                </div>
              )}
              {data.source && <div className="text-muted-foreground">Source: {data.source}</div>}
              {data.rawWhois && (
                <pre className="mt-2 max-h-64 overflow-auto rounded bg-muted p-3 text-xs">{data.rawWhois}</pre>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  )
}
