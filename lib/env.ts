export const ENV = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DB: process.env.MONGODB_DB || "domainlab",
  JWT_SECRET: process.env.JWT_SECRET || "",
  // AI
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  GROQ_MODEL: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
  // WHOIS
  IP2WHOIS_API_KEY: process.env.IP2WHOIS_API_KEY || "",
  IP2WHOIS_API_URL: process.env.IP2WHOIS_API_URL || "https://api.ip2whois.com/v2",
  // Availability / Pricing
  DOMAINR_CLIENT_ID: process.env.DOMAINR_CLIENT_ID || "",
  GODADDY_API_KEY: process.env.GODADDY_API_KEY || "",
  GODADDY_API_SECRET: process.env.GODADDY_API_SECRET || "",
  // Expired domains provider (Apify)
  APIFY_API_TOKEN: process.env.APIFY_API_TOKEN || "",
  // Rate limiting
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX || 120),
  RATE_LIMIT_WINDOW_S: Number(process.env.RATE_LIMIT_WINDOW_S || 60),
}
