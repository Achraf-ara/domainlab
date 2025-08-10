"use client"

import type React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function register(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Registration failed")
      window.location.href = "/account"
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <SiteHeader />
      <section className="container mx-auto max-w-xl px-4 py-10">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Use your email and a password to get started.</p>
        <form onSubmit={register} className="mt-6 grid gap-3 rounded-xl border p-4">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="mt-2 bg-[#42cae5] text-black hover:bg-[#35b9d4]">
            {loading ? "Creating…" : "Create account"}
          </Button>
          {err && <div className="text-sm text-destructive">{err}</div>}
        </form>
        <div className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#42cae5] underline">
            Sign in
          </a>
        </div>
      </section>
    </main>
  )
}
