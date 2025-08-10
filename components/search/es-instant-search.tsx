"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type Hit = {
  id: string
  domain: string
  tld: string
  tags?: string[]
  traffic?: number
  backlinks?: number
  age?: number
  price?: number
  available?: boolean
}

export default function ESInstantSearch({ title = "Instant results (Elasticsearch)" }: { title?: string }) {
  const [q, setQ] = useState("")
  const [hits, setHits] = useState<Hit[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const size = 12

  const debouncedFetch = useDebounced(async (query: string, pg: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/elasticsearch/search?q=${encodeURIComponent(query)}&page=${pg}&size=${size}`, {
        cache: "no-store",
      })
      const json = await res.json()
      if (res.ok) {
        setHits(json.hits || [])
        setTotal(json.total || 0)
      } else {
        setHits([])
        setTotal(0)
      }
    } finally {
      setLoading(false)
    }
  }, 350)

  useEffect(() => {
    debouncedFetch(q, page)
  }, [q, page, debouncedFetch])

  return (
    <div className="rounded-xl border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{total ? `${total} results` : "—"}</div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Type to search indexed domains…"
          value={q}
          onChange={(e) => {
            setPage(1)
            setQ(e.target.value)
          }}
        />
        <div className="flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => {
              setQ("")
              setPage(1)
            }}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hits.map((h) => (
          <div key={h.id} className="rounded-lg border p-3 text-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="font-medium truncate">{h.domain}</div>
              <span
                className={`rounded px-2 py-0.5 text-[11px] ${
                  h.available
                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}
              >
                {h.available ? "available" : "taken"}
              </span>
            </div>
            <div className="mt-1 grid grid-cols-3 gap-2">
              <Field label="Price" value={typeof h.price === "number" ? `$${h.price.toLocaleString()}` : "—"} />
              <Field label="Traffic" value={h.traffic ?? "—"} />
              <Field label="Backlinks" value={h.backlinks ?? "—"} />
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {(h.tags || []).map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        {!loading && hits.length === 0 && (
          <div className="col-span-full rounded border p-4 text-center text-sm text-muted-foreground">
            No results. Start typing to search the index.
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <div className="text-xs text-muted-foreground">Page {page}</div>
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={() => setPage((p) => p + 1)}
          disabled={hits.length < size}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded border p-2 text-center">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{String(value)}</div>
    </div>
  )
}

function useDebounced<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  const [timer, setTimer] = useState<any>(null)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoFn = useCallback(fn, [])
  return useMemo(
    () =>
      (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer)
        const t = setTimeout(() => memoFn(...args), delay)
        setTimer(t)
      },
    [memoFn, delay, timer],
  ) as T
}
