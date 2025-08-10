export const ENV = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DB: process.env.MONGODB_DB || "namepurse",
  JWT_SECRET: process.env.JWT_SECRET || "",
  // AI
  GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  GROQ_MODEL: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
  // WHOIS
  WHOIS_API_KEY: process.env.WHOIS_API_KEY || "",
  WHOIS_API_URL: process.env.WHOIS_API_URL || "https://www.whoisxmlapi.com/whoisserver/WhoisService",
  // Availability / Pricing
  DOMAINR_CLIENT_ID: process.env.DOMAINR_CLIENT_ID || "",
  GODADDY_API_KEY: process.env.GODADDY_API_KEY || "",
  GODADDY_API_SECRET: process.env.GODADDY_API_SECRET || "",
  // Comps (NameBio or other provider)
  NAMEBIO_KEY: process.env.NAMEBIO_KEY || "",
  NAMEBIO_API_URL: process.env.NAMEBIO_API_URL || "",
  // Expired domains provider
  EXPIRED_API_URL: process.env.EXPIRED_API_URL || "",
  EXPIRED_API_KEY: process.env.EXPIRED_API_KEY || "",
  // Rate limiting
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX || 120),
  RATE_LIMIT_WINDOW_S: Number(process.env.RATE_LIMIT_WINDOW_S || 60),
}
