"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, SunMedium, Search } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href: "/search", label: "Search" },
  { href: "/whois", label: "WHOIS" },
  { href: "/valuation", label: "Valuation" },
  { href: "/expired", label: "Expired" },
  { href: "/bulk-tools", label: "Bulk Tools" },
  { href: "/trends", label: "Trends" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/account", label: "Account" },
]

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#42cae5] via-[#2db5d1] to-[#01040b] shadow-lg" />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-transparent" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight leading-none">
          <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">Name</span>
          <span className="text-foreground">Pulse</span>
        </span>
        <span className="text-xs text-muted-foreground font-medium">Domain Intelligence</span>
      </div>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const root = document.documentElement
    const sysPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const stored = (localStorage.getItem("np_theme") as "light" | "dark" | null) || (sysPrefersDark ? "dark" : "light")
    setTheme(stored)
    root.classList.toggle("dark", stored === "dark")
  }, [])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    localStorage.setItem("np_theme", next)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="py-4">
                <Brand />
              </div>
              <nav className="mt-8 grid gap-2">
                {links.map((l) => {
                  const active = pathname === l.href
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "bg-gradient-to-r from-[#42cae5]/10 to-[#01040b]/10 text-[#01040b] dark:text-white border border-[#42cae5]/20"
                          : "hover:bg-muted/60"
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <Brand />
          <nav className="hidden gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gradient-to-r from-[#42cae5]/10 to-[#01040b]/10 text-[#01040b] dark:text-white"
                      : "hover:bg-muted/60"
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/search">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent border-[#42cae5]/30 hover:bg-[#42cae5]/10"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-[#42cae5] to-[#01040b]" aria-hidden />
    </header>
  )
}
