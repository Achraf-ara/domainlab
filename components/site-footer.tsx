import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#42cae5] to-[#01040b]" />
              <span className="text-lg font-bold">
                <span className="bg-gradient-to-r from-[#42cae5] to-[#01040b] bg-clip-text text-transparent">Name</span>
                <span>Pulse</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The complete domain intelligence platform for investors, entrepreneurs, and agencies.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Tools</h4>
            <div className="space-y-2 text-sm">
              <Link href="/search" className="block text-muted-foreground hover:text-foreground transition-colors">
                Domain Search
              </Link>
              <Link href="/valuation" className="block text-muted-foreground hover:text-foreground transition-colors">
                AI Valuation
              </Link>
              <Link href="/whois" className="block text-muted-foreground hover:text-foreground transition-colors">
                WHOIS Lookup
              </Link>
              <Link href="/trends" className="block text-muted-foreground hover:text-foreground transition-colors">
                Trend Analysis
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link href="/bulk-tools" className="block text-muted-foreground hover:text-foreground transition-colors">
                Bulk Tools
              </Link>
              <Link href="/expired" className="block text-muted-foreground hover:text-foreground transition-colors">
                Expired Domains
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Account</h4>
            <div className="space-y-2 text-sm">
              <Link href="/auth/login" className="block text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Create Account
              </Link>
              <Link href="/account" className="block text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NamePulse. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/api/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
