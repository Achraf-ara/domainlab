export const CACHE_HEADERS = {
  // Static content - cache for 1 hour
  static: {
    "Cache-Control": "public, max-age=3600, s-maxage=3600",
  },
  // API responses - cache for 5 minutes
  api: {
    "Cache-Control": "public, max-age=300, s-maxage=300",
  },
  // WHOIS data - cache for 1 day
  whois: {
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  },
  // No cache for dynamic user data
  dynamic: {
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
}
