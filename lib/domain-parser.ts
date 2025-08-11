export function parseDomainParts(domain: string) {
  const parts = domain.split(".")
  if (parts.length < 2) {
    return { sld: domain, tld: "" }
  }
  const tld = "." + parts.slice(1).join(".")
  const sld = parts[0]
  return { sld, tld }
}
