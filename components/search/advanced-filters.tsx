"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

export type Filters = {
  lengthMin: number
  lengthMax: number
  priceMin: number
  priceMax: number
  trafficMin: number
  backlinksMin: number
  ageMin: number
  tlds: string[]
  keyword: string
  tags: string[]
}

const ALL_TLDS = [".com", ".net", ".org", ".io", ".ai", ".co", ".dev", ".xyz", ".app", ".gg"]
const ALL_TAGS = ["brandable", "keyword", "geo", "trend"]

export default function AdvancedFilters({
  value,
  onChange,
}: {
  value?: Partial<Filters>
  onChange: (f: Filters) => void
}) {
  const [filters, setFilters] = useState<Filters>({
    lengthMin: value?.lengthMin ?? 3,
    lengthMax: value?.lengthMax ?? 16,
    priceMin: value?.priceMin ?? 0,
    priceMax: value?.priceMax ?? 5000,
    trafficMin: value?.trafficMin ?? 0,
    backlinksMin: value?.backlinksMin ?? 0,
    ageMin: value?.ageMin ?? 0,
    tlds: value?.tlds ?? [".com", ".io", ".ai"],
    keyword: value?.keyword ?? "",
    tags: value?.tags ?? [],
  })

  useEffect(() => {
    onChange(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return (
    <div className="grid gap-6 rounded-xl border p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            value={filters.keyword}
            onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
            placeholder="e.g., solar, dev, zen"
          />
        </div>
        <div>
          <Label>{"TLDs"}</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALL_TLDS.map((tld) => {
              const selected = filters.tlds.includes(tld)
              return (
                <button
                  key={tld}
                  type="button"
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      tlds: selected ? f.tlds.filter((t) => t !== tld) : [...f.tlds, tld],
                    }))
                  }
                  className={`rounded-full border px-3 py-1 text-sm ${
                    selected ? "bg-[#42cae5]/20 border-[#42cae5]" : "hover:bg-muted"
                  }`}
                  aria-pressed={selected}
                >
                  {tld}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Range
          label="Length"
          value={[filters.lengthMin, filters.lengthMax]}
          min={2}
          max={30}
          step={1}
          onValueChange={([a, b]) => setFilters((f) => ({ ...f, lengthMin: a, lengthMax: b }))}
        />
        <Range
          label="Price ($)"
          value={[filters.priceMin, filters.priceMax]}
          min={0}
          max={50000}
          step={50}
          onValueChange={([a, b]) => setFilters((f) => ({ ...f, priceMin: a, priceMax: b }))}
        />
        <Range
          label="Traffic"
          value={[filters.trafficMin, 200000]}
          min={0}
          max={200000}
          step={1000}
          onValueChange={([a, _]) => setFilters((f) => ({ ...f, trafficMin: a }))}
          single
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <Range
          label="Backlinks"
          value={[filters.backlinksMin, 100000]}
          min={0}
          max={100000}
          step={500}
          onValueChange={([a, _]) => setFilters((f) => ({ ...f, backlinksMin: a }))}
          single
        />
        <Range
          label="Age (yrs)"
          value={[filters.ageMin, 30]}
          min={0}
          max={30}
          step={1}
          onValueChange={([a, _]) => setFilters((f) => ({ ...f, ageMin: a }))}
          single
        />
        <div>
          <Label>Tags</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => {
              const checked = filters.tags.includes(tag)
              return (
                <label key={tag} className="inline-flex items-center gap-2 rounded border px-2 py-1">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(v) =>
                      setFilters((f) => ({
                        ...f,
                        tags: v ? [...f.tags, tag] : f.tags.filter((t) => t !== tag),
                      }))
                    }
                    aria-label={`Toggle ${tag}`}
                  />
                  <span className="text-sm capitalize">{tag}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filters.keyword && <Badge variant="secondary">Keyword: {filters.keyword}</Badge>}
          {filters.tlds.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
          {filters.tags.map((t) => (
            <Badge key={t} variant="default" className="capitalize">
              {t}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() =>
            setFilters({
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
          }
        >
          <RefreshCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}

function Range({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
  single = false,
}: {
  label: string
  value: [number, number]
  min: number
  max: number
  step: number
  onValueChange: (v: [number, number]) => void
  single?: boolean
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-xs text-muted-foreground">{single ? value[0] : `${value[0]} – ${value[1]}`}</span>
      </div>
      <Slider
        value={single ? [value[0]] : value}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onValueChange((single ? [vals[0], value[1]] : [vals[0], vals[1]]) as [number, number])}
      />
    </div>
  )
}
