"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, SunMedium, Search } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href: "/", label: "Home" },
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
    <Link href="/" className="flex items-center gap-2">
      <div className="h-8 w-8 rounded bg-gradient-to-r from-[#42cae5] to-[#01040b]" />
      <span className="text-lg font-bold tracking-tight">
        <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">domain</span>
        <span className="text-foreground">Lab</span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const root = document.documentElement
    const sysPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const stored = (localStorage.getItem("dl_theme") as "light" | "dark" | null) || (sysPrefersDark ? "dark" : "light")
    setTheme(stored)
    root.classList.toggle("dark", stored === "dark")
  }, [])

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    localStorage.setItem("dl_theme", next)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="py-2">
                <Brand />
              </div>
              <nav className="mt-4 grid gap-1">
                {links.map((l) => {
                  const active = pathname === l.href
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`rounded px-3 py-2 text-sm ${active ? "bg-muted font-medium" : "hover:bg-muted/60"}`}
                    >
                      {l.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <Brand />
          <nav className="hidden gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded px-3 py-2 text-sm ${active ? "bg-muted font-medium" : "hover:bg-muted/60"}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/search">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === "dark" ? <SunMedium className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#42cae5] to-[#01040b]" aria-hidden />
    </header>
  )
}
