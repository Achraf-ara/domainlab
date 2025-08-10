"use client"

import type React from "react"
import type { ReactElement } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Shield, Zap, Search } from "lucide-react"

const defaultTlds = [".com", ".net", ".org", ".io", ".ai", ".dev"]

export default function HeroSection(): ReactElement {
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
    <section className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#42cae5]/5 via-transparent to-[#01040b]/5" />
      <div className="absolute inset-0"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%2342cae5\" fillOpacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        }}
      />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-[#42cae5]/30 text-[#01040b] dark:text-white">
                <Sparkles className="h-3.5 w-3.5 mr-2 text-[#42cae5]" />
                AI-Powered Domain Intelligence
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight lg:text-6xl xl:text-7xl">
                Discover, Value & Track{" "}
                <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">
                  Premium Domains
                </span>
              </h1>
              <p className="text-lg text-muted-foreground lg:text-xl max-w-2xl">
                The complete platform for domain investors. Search across TLDs, get AI valuations, track trends, and build your portfolio with confidence.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#42cae5]/5 to-transparent border border-[#42cae5]/10">
                <TrendingUp className="h-5 w-5 text-[#42cae5] flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Real-time Trends</div>
                  <div className="text-xs text-muted-foreground">Market insights</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#01040b]/5 to-transparent border border-[#01040b]/10">
                <Shield className="h-5 w-5 text-[#01040b] dark:text-white flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">WHOIS Cache</div>
                  <div className="text-xs text-muted-foreground">Cost control</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#42cae5]/5 to-transparent border border-[#42cae5]/10">
                <Zap className="h-5 w-5 text-[#42cae5] flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Instant Search</div>
                  <div className="text-xs text-muted-foreground">Elasticsearch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#42cae5] to-[#01040b] rounded-2xl blur-xl opacity-20" />
            <form onSubmit={onSubmit} className="relative bg-background/80 backdrop-blur-sm border border-[#42cae5]/20 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Start Your Search</h3>
                  <p className="text-sm text-muted-foreground">Find available domains or analyze existing ones</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="domain-search" className="block text-sm font-medium mb-2">
                      Domain or Keyword
                    </label>
                    <Input
                      id="domain-search"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="e.g., solar, fintech, zen"
                      className="h-12 text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tld-select" className="block text-sm font-medium mb-2">
                      TLD Extension
                    </label>
                    <Select value={tld} onValueChange={setTld}>
                      <SelectTrigger className="h-12" id="tld-select">
                        <SelectValue />
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
                </div>

                <Button type="submit" size="lg" className="w-full h-12 bg-gradient-to-r from-[#42cae5] to-[#01040b] text-white hover:opacity-90 transition-opacity">
                  <Search className="h-5 w-5 mr-2" />
                  Search Domains
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Advanced filters available on the search page
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
