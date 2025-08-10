"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles } from "lucide-react"

const defaultTlds = [".com", ".net", ".org", ".io", ".ai", ".dev"]

export default function HeroQuickSearch() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [tld, setTld] = useState(".com")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q.trim()) params.set("q", q.trim())
    if (tld) params.set("tlds", tld)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#42cae5_0%,#01040b_100%)] opacity-10" aria-hidden />
      <div className="relative grid gap-6 p-6 md:grid-cols-3 md:items-center md:p-10">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Find, value, and track domains in one place</h1>
          <p className="mt-3 max-w-prose text-muted-foreground">
            Search across TLDs, run WHOIS, get AI valuations and trends. Build your portfolio with confidence.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#42cae5]" />
            <span>{"AI suggestions powered by Groq (fallback if no key set)"}</span>
          </div>
        </div>
        <form onSubmit={onSubmit} className="rounded-xl border bg-background p-3 shadow-sm">
          <label htmlFor="q" className="mb-2 block text-sm font-medium">
            Quick search
          </label>
          <div className="flex gap-2">
            <Input
              id="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="e.g., solar, fintech, zen"
              aria-label="Domain keyword"
            />
            <Select value={tld} onValueChange={setTld}>
              <SelectTrigger className="w-28" aria-label="TLD">
                <SelectValue placeholder=".com" />
              </SelectTrigger>
              <SelectContent>
                {defaultTlds.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="mt-3 w-full bg-[#01040b] text-white hover:bg-black">
            Search domains
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Try advanced filters on the Search page for traffic, backlinks, age, and more.
          </p>
        </form>
      </div>
    </section>
  )
}
