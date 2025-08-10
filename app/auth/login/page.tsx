"use client"

import Link from "next/link"

import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)

  const [lemail, setLEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function sendLink(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setErr(null)
    setMsg(null)
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, redirect: "/account" }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Failed to send link")
      setMsg("Check your inbox for a login link. It expires in 15 minutes.")
      setEmail("")
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setSending(false)
    }
  }

  async function loginPwd(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    setMsg(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: lemail, password }),
      })
      const json = await await res.json()
      if (!res.ok) throw new Error(json.error || "Login failed")
      window.location.href = "/account"
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-120px)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Use an email link or your password.</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="link" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">Email link</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="link" className="mt-4">
              <form onSubmit={sendLink} className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="email-link">
                    Email
                  </label>
                  <Input
                    id="email-link"
                    type="email"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending || !email}
                  className="bg-[#42cae5] text-black hover:bg-[#35b9d4]"
                >
                  {sending ? "Sending…" : "Send login link"}
                </Button>
                {msg && <div className="text-sm text-emerald-600">{msg}</div>}
                {err && <div className="text-sm text-destructive">{err}</div>}
              </form>
            </TabsContent>
            <TabsContent value="password" className="mt-4">
              <form onSubmit={loginPwd} className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="email-pwd">
                    Email
                  </label>
                  <Input
                    id="email-pwd"
                    type="email"
                    placeholder="you@domain.com"
                    value={lemail}
                    onChange={(e) => setLEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="pwd">
                    Password
                  </label>
                  <Input
                    id="pwd"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="bg-[#01040b] text-white hover:bg-black">
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
                {err && <div className="text-sm text-destructive">{err}</div>}
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm">
            {"Don't have an account? "}
            <Link href="/auth/register" className="text-[#42cae5] underline">
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
