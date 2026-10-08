import type { EntityType } from "@/data/types"
import { dragons } from "@/data/dragons"
import { characters } from "@/data/characters"
import { houses } from "@/data/houses"
import { locations } from "@/data/locations"
import { events } from "@/data/events"
import { hrefForRef } from "@/lib/links"

export interface SearchEntry {
  type: EntityType
  slug: string
  title: string
  subtitle: string
  /** Lowercased haystack: title + subtitle + aliases. */
  keywords: string
  href: string
}

function ref(type: EntityType, slug: string, label: string) {
  return hrefForRef({ type, slug, label })
}

/** Built once from the static content modules — cheap and synchronous. */
const index: SearchEntry[] = [
  ...dragons.map((d) => ({
    type: "dragon" as const,
    slug: d.slug,
    title: d.name,
    subtitle: [d.epithet, d.rider, d.color].filter(Boolean).join(" · "),
    keywords: `${d.name} ${d.epithet ?? ""} ${d.rider ?? ""} ${d.color} ${d.description}`.toLowerCase(),
    href: ref("dragon", d.slug, d.name),
  })),
  ...characters.map((c) => ({
    type: "character" as const,
    slug: c.slug,
    title: c.name,
    subtitle: [c.title, c.houseLabel].filter(Boolean).join(" · "),
    keywords: `${c.name} ${c.epithet ?? ""} ${c.title ?? ""} ${c.houseLabel} ${c.description}`.toLowerCase(),
    href: ref("character", c.slug, c.name),
  })),
  ...houses.map((h) => ({
    type: "house" as const,
    slug: h.slug,
    title: h.name,
    subtitle: `${h.words} · ${h.region}`,
    keywords: `${h.name} ${h.words} ${h.region} ${h.seat} ${h.description}`.toLowerCase(),
    href: ref("house", h.slug, h.name),
  })),
  ...locations.map((l) => ({
    type: "location" as const,
    slug: l.slug,
    title: l.name,
    subtitle: `${l.region} · ${l.type}`,
    keywords: `${l.name} ${l.region} ${l.type} ${l.holder ?? ""} ${l.description}`.toLowerCase(),
    href: ref("location", l.slug, l.name),
  })),
  ...events.map((e) => ({
    type: "event" as const,
    slug: e.slug,
    title: e.title,
    subtitle: `${e.year} AC`,
    keywords: `${e.title} ${e.year} AC ${e.summary}`.toLowerCase(),
    href: ref("event", e.slug, e.title),
  })),
]

export const searchSize = index.length

/**
 * Ranked search: exact prefix > word prefix > substring, then by title length.
 * Empty query returns a small set of suggestions so the palette is never blank.
 */
export function searchAll(query: string, limit = 10): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return index.slice(0, limit)

  const scored: { entry: SearchEntry; score: number }[] = []
  for (const entry of index) {
    const title = entry.title.toLowerCase()
    let score = 0
    if (title.startsWith(q)) score = 100
    else if (title.includes(q)) score = 70
    else if (entry.keywords.includes(q)) score = 40
    else {
      const words = q.split(/\s+/).filter(Boolean)
      if (words.length > 1 && words.every((w) => entry.keywords.includes(w))) {
        score = 30
      }
    }
    if (score > 0) scored.push({ entry, score: score - entry.title.length / 100 })
  }

  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.entry)
}
