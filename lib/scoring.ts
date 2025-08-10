export function scoreLength(len: number) {
  // shorter is better until ~6, then diminishing
  if (len <= 4) return 1
  if (len <= 6) return 0.9
  if (len <= 8) return 0.75
  if (len <= 12) return 0.6
  if (len <= 16) return 0.45
  return 0.3
}

export function scoreAge(age: number) {
  if (age >= 10) return 1
  if (age >= 5) return 0.8
  if (age >= 2) return 0.6
  if (age >= 1) return 0.5
  return 0.3
}

export function tldMultiplier(tld: string) {
  switch (tld) {
    case ".com":
      return 1.0
    case ".io":
    case ".ai":
      return 0.85
    case ".co":
    case ".dev":
      return 0.7
    case ".org":
    case ".net":
      return 0.6
    default:
      return 0.5
  }
}

export function scoreKeywordCPC(cpc: number) {
  // normalized: $0-$10+
  if (cpc >= 10) return 1
  if (cpc >= 5) return 0.8
  if (cpc >= 1) return 0.6
  return 0.4
}

export function scoreBacklinks(backlinks: number) {
  if (backlinks >= 100000) return 1
  if (backlinks >= 10000) return 0.8
  if (backlinks >= 1000) return 0.6
  return 0.4
}

export function scoreComps(comps: number) {
  if (comps >= 50) return 1
  if (comps >= 10) return 0.8
  if (comps >= 3) return 0.6
  return 0.4
}

export function priceFromScore(score: number, base: number) {
  // apply base * multiplier band
  const low = Math.max(100, Math.round(base * score * 0.8))
  const mid = Math.max(200, Math.round(base * score * 1.4))
  const high = Math.max(300, Math.round(base * score * 2.2))
  return { low, mid, high }
}
