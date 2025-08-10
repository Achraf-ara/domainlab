import { getESClient } from "@/lib/elasticsearch"

const sample = [
  {
    id: "solarpulse.com",
    domain: "solarpulse.com",
    tld: ".com",
    tags: ["brandable", "trend"],
    traffic: 42000,
    backlinks: 5500,
    age: 5,
    price: 2399,
    available: true,
  },
  {
    id: "quantgrid.io",
    domain: "quantgrid.io",
    tld: ".io",
    tags: ["keyword"],
    traffic: 18000,
    backlinks: 3400,
    age: 3,
    price: 1499,
    available: true,
  },
  {
    id: "pixelforge.ai",
    domain: "pixelforge.ai",
    tld: ".ai",
    tags: ["brandable"],
    traffic: 32000,
    backlinks: 9900,
    age: 2,
    price: 2999,
    available: false,
  },
  {
    id: "zenatlas.dev",
    domain: "zenatlas.dev",
    tld: ".dev",
    tags: ["brandable"],
    traffic: 8000,
    backlinks: 900,
    age: 1,
    price: 399,
    available: true,
  },
]

async function main() {
  const { client, index } = getESClient()
  const exists = await client.indices.exists({ index })
  if (!exists) {
    await client.indices.create({
      index,
      body: {
        mappings: {
          properties: {
            domain: { type: "text" },
            tld: { type: "keyword" },
            tags: { type: "keyword" },
            traffic: { type: "integer" },
            backlinks: { type: "integer" },
            age: { type: "integer" },
            price: { type: "integer" },
            available: { type: "boolean" },
            updatedAt: { type: "date" },
          },
        },
      },
    })
  }

  const now = new Date().toISOString()
  const ops: any[] = []
  for (const it of sample) {
    ops.push({ index: { _index: index, _id: it.id } })
    ops.push({ ...it, updatedAt: now })
  }
  const res = await client.bulk({ refresh: "wait_for", operations: ops as any })
  console.log("Seeded:", { errors: res.errors, items: res.items?.length })
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
