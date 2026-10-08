"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ScrollReveal"
import { locations } from "@/data/locations"
import type { Location } from "@/data/types"
import { entityGlyph } from "@/lib/links"
import { cn } from "@/lib/utils"

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-[11px] text-cream/85 transition group-hover:border-gold-primary/50"

/** Broad travel regions used by the filter pills. */
const FILTERS: { key: string; label: string; slugs?: string[] }[] = [
  { key: "all", label: "All" },
  { key: "crownlands", label: "Crownlands", slugs: ["kings-landing", "dragonstone"] },
  { key: "north", label: "North", slugs: ["winterfell", "the-wall", "beyond-the-wall"] },
  { key: "riverlands", label: "Riverlands", slugs: ["riverlands"] },
  { key: "vale", label: "Vale", slugs: ["vale-of-arryn"] },
  { key: "islands", label: "Islands", slugs: ["iron-islands"] },
  { key: "south", label: "South", slugs: ["oldtown", "dorne"] },
]

function LocationCard({ loc, index }: { loc: Location; index: number }) {
  const chips = loc.events.length > 0 ? loc.events.slice(0, 3) : loc.nearby.slice(0, 2)
  const hidden = loc.events.length > 3 ? loc.events.length - 3 : 0

  return (
    <ScrollReveal variant="up" delay={Math.min(index * 0.05, 0.3)} className="h-full">
      <motion.div whileHover={{ y: -8, scale: 1.02 }} className="h-full">
        <Link
          href={`/locations/${loc.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-primary/20 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-gold-primary/50"
        >
          <div className="relative h-48 shrink-0 overflow-hidden">
            <Image
              src={loc.image}
              alt={loc.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute right-3 top-3 rounded-full border border-gold-primary/40 bg-ink/80 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gold-light backdrop-blur">
              {loc.type}
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <h2 className="text-lg font-bold text-gold-primary transition-colors group-hover:text-gold-light">
                {loc.name}
              </h2>
              <p className="text-[11px] uppercase tracking-widest text-cream/45">{loc.region}</p>
            </div>

            <p className="flex-1 text-sm leading-relaxed text-cream/60">{loc.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {chips.map((ref) => (
                <span key={`${ref.type}-${ref.slug}`} className={CHIP}>
                  <span aria-hidden="true">
                    {ref.type === "event" ? entityGlyph.event : entityGlyph.location}
                  </span>
                  {ref.label}
                </span>
              ))}
              {hidden > 0 && (
                <span className="inline-flex items-center rounded-full border border-gold-primary/20 px-2.5 py-1 text-[11px] text-gold-primary/80">
                  +{hidden} more
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Locations() {
  const [filter, setFilter] = useState("all")

  const shown = useMemo(() => {
    const active = FILTERS.find((f) => f.key === filter)
    if (!active?.slugs) return locations
    return locations.filter((l) => active.slugs!.includes(l.slug))
  }, [filter])

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <div className="mb-6 text-center">
            <p className="eyebrow mb-3">Realm Atlas</p>
            <h1 className="text-3xl font-bold text-gold-primary md:text-5xl">Major Locations</h1>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <p className="mx-auto mb-10 max-w-4xl text-center text-sm leading-relaxed text-cream/70 md:text-base">
            The geography of Westeros and Essos is shaped by powerful political centers and
            culturally distinct regions. King&apos;s Landing stands at the heart of the Seven
            Kingdoms as a symbol of royal authority, while Dragonstone represents the origins and
            strength of House Targaryen. Further north, Winterfell and the Wall anchor a harsher
            world shaped by ancient threats, while the exotic landscapes of Essos—from the Free
            Cities to Slaver&apos;s Bay—expand the story&apos;s scale and diversity. Each location
            carries centuries of history and conflict, influencing the struggles of characters and
            the shifting balance of power.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.15}>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition",
                  filter === f.key
                    ? "border-gold-primary/70 bg-gold-primary/25 text-cream"
                    : "border-gold-primary/25 bg-gold-primary/5 text-cream/60 hover:border-gold-primary/60 hover:bg-gold-primary/15 hover:text-cream",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((loc, i) => (
            <LocationCard key={loc.slug} loc={loc} index={i} />
          ))}
        </div>

        {shown.length === 0 && (
          <p className="py-12 text-center text-sm text-cream/50">
            No locations in this region of the realm.
          </p>
        )}
      </div>
    </div>
  )
}
