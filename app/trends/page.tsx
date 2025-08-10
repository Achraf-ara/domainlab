"use client"

import { useState } from "react"
import TrendsChart from "@/components/trends/trends-chart"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [kw, setKw] = useState("ai tools")
  const [applied, setApplied] = useState("ai tools")
  return (
    <main>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Trends</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track relative interest for your keywords. Data is mocked unless a trends integration is configured.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setApplied(kw)
          }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Input value={kw} onChange={(e) => setKw(e.target.value)} />
          <Button className="bg-[#42cae5] text-black hover:bg-[#35b9d4]">Apply</Button>
        </form>
        <div className="mt-6">
          <TrendsChart keyword={applied} />
        </div>
      </section>
    </main>
  )
}
