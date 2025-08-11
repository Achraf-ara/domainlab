"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send } from "lucide-react"

export default function ContactPage() {
  const [fromName, setFromName] = useState("")
  const [fromEmail, setFromEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    setStatusMessage(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: fromName,
          from_email: fromEmail,
          subject,
          message,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setStatusMessage(data.message || "Your message has been sent successfully!")
        setFromName("")
        setFromEmail("")
        setSubject("")
        setMessage("")
      } else {
        setStatus("error")
        setStatusMessage(data.error || "Failed to send message. Please try again.")
      }
    } catch (error: any) {
      setStatus("error")
      setStatusMessage("An unexpected error occurred. Please try again later.")
      console.error("Contact form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 lg:py-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
          <p className="mt-1 text-muted-foreground">
            Have a question or need support? Send us a message and we'll get back to you as soon as possible.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="from-name" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="from-name"
                type="text"
                placeholder="John Doe"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="from-email" className="text-sm font-medium">
                Your Email
              </label>
              <Input
                id="from-email"
                type="email"
                placeholder="john.doe@example.com"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                placeholder="Inquiry about domain valuation"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#42cae5] to-[#01040b] text-white hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Send className="h-4 w-4 mr-2 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {status && statusMessage && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                status === "success"
                  ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
                  : "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
              }`}
            >
              {statusMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
