import { Client } from "@elastic/elasticsearch"

export type DomainIndexRecord = {
  id?: string
  domain: string
  tld: string
  tags?: string[]
  traffic?: number
  backlinks?: number
  age?: number
  price?: number
  available?: boolean
  updatedAt?: string
}

export function getESConfig() {
  const node = process.env.ELASTICSEARCH_NODE
  const index = process.env.ELASTICSEARCH_INDEX || "domainlab"
  if (!node) {
    throw new Error("ELASTICSEARCH_NODE missing")
  }
  const username = process.env.ELASTICSEARCH_USERNAME
  const password = process.env.ELASTICSEARCH_PASSWORD
  const apiKey = process.env.ELASTICSEARCH_API_KEY

  const auth = apiKey ? { apiKey } : username && password ? { username, password } : undefined

  return { node, index, auth }
}

export function getESClient() {
  const cfg = getESConfig()
  const client = new Client({ node: cfg.node, auth: cfg.auth as any })
  return { client, index: cfg.index }
}
