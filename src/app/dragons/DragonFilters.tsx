"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import type { Dragon, Era } from "@/data/types"
import { eraLabel, statusLabel } from "@/data/dragons"
import { ScrollReveal } from "@/components/ScrollReveal"
import { cn } from "@/lib/utils"

type FilterKey = "all" | "targaryen" | "wild" | "dead" | "alive" | "largest" | "fastest"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "targaryen", label: "Targaryen" },
  { key: "wild", label: "Wild" },
  { key: "dead", label: "Dead" },
  { key: "alive", label: "Alive" },
  { key: "largest", label: "Largest" },
  { key: "fastest", label: "Fastest" },
]

const ERA_ORDER: Era[] = ["ancestor", "dance", "got"]

const ERA_SECTIONS: Record<Era, { title: string; blurb: string }> = {
  ancestor: {
    title: "Dragons of the Ancestor Era",
    blurb:
      "The great beasts of Old Valyria and the Conquest — dragons so vast that whole kingdoms knelt to their shadow.",
  },
  dance: {
    title: "Dragons of the Dance",
    blurb:
      "Twenty dragons still flew at the start of the Targaryen civil war, and nearly every one of them died in it.",
  },
  got: {
    title: "Dragons of Ice and Fire",
    blurb:
      "Centuries after the last dragon died, three eggs hatched in the east and fire returned to the world.",
  },
}

function MiniBar({ label, value }: { label: string; value: number }) {
  const filled = Math.round(value / 10)

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[0.6rem] uppercase tracking-[0.22em] text-cream/50">
        <span>{label}</span>
        <span className="tabular-nums text-gold-primary">{value}</span>
      </div>
      <div className="statbar h-1.5">
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} className={i < filled ? "on" : undefined} />
        ))}
      </div>
    </div>
  )
}

function DragonCard({ dragon, index }: { dragon: Dragon; index: number }) {
  return (
    <ScrollReveal variant="up" delay={Math.min(index, 5) * 0.05}>
      <Link href={`/dragons/${dragon.slug}`} className="block h-full group">
        <motion.div
          whileHover={{ y: -6 }}
          className="panel h-full flex flex-col overflow-hidden"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={dragon.images[0]}
              alt={dragon.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5">
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] backdrop-blur-sm",
                  dragon.allegiance === "targaryen"
                    ? "border-gold-primary/50 bg-gold-primary/20 text-gold-light"
                    : "border-cream/30 bg-black/40 text-cream/80",
                )}
              >
                {dragon.allegiance === "targaryen" ? "Targaryen" : "Wild"}
              </span>
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] backdrop-blur-sm",
                  dragon.status === "dead"
                    ? "border-blood-bright/50 bg-blood/30 text-blood-bright"
                    : dragon.status === "alive"
                      ? "border-cream/45 bg-black/40 text-cream/85"
                      : "border-cream/25 bg-black/40 text-cream/60",
                )}
              >
                {statusLabel[dragon.status]}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <h3 className="text-xl font-bold text-gold-primary transition-colors group-hover:text-gold-light">
                {dragon.name}
              </h3>
              {dragon.epithet && (
                <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.26em] text-cream/50">
                  {dragon.epithet}
                </p>
              )}
            </div>

            <p className="text-sm leading-relaxed text-cream/60 line-clamp-2">
              {dragon.description}
            </p>

            <div className="mt-auto grid grid-cols-2 gap-4">
              <MiniBar label="Size" value={dragon.stats.size} />
              <MiniBar label="Speed" value={dragon.stats.speed} />
            </div>

            <div className="flex items-center justify-between border-t border-gold-primary/15 pt-3">
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-gold-primary/70">
                {eraLabel[dragon.era]}
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.28em] text-cream/40 transition-colors group-hover:text-gold-primary">
                Profile →
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  )
}

function EraSection({
  era,
  dragons,
}: {
  era: Era
  dragons: Dragon[]
}) {
  const { title, blurb } = ERA_SECTIONS[era]

  return (
    <section className="mb-14 last:mb-0">
      <ScrollReveal variant="up">
        <div className="mb-8 text-center">
          <div className="rule mx-auto max-w-xl mb-5">
            <span />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-cream">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cream/60">
            {blurb}
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dragons.map((dragon, i) => (
          <DragonCard key={dragon.slug} dragon={dragon} index={i} />
        ))}
      </div>
    </section>
  )
}

export function DragonFilters({ dragons }: { dragons: Dragon[] }) {
  const [active, setActive] = useState<FilterKey>("all")

  const filtered = useMemo(() => {
    let list = dragons

    switch (active) {
      case "targaryen":
        list = dragons.filter(d => d.allegiance === "targaryen")
        break
      case "wild":
        list = dragons.filter(d => d.allegiance === "wild")
        break
      case "dead":
        list = dragons.filter(d => d.status === "dead")
        break
      case "alive":
        list = dragons.filter(d => d.status === "alive")
        break
      case "largest":
        list = [...dragons].sort((a, b) => b.stats.size - a.stats.size)
        break
      case "fastest":
        list = [...dragons].sort((a, b) => b.stats.speed - a.stats.speed)
        break
      default:
        list = dragons
    }

    return list
  }, [active, dragons])

  const isSortMode = active === "largest" || active === "fastest"

  const sections = ERA_ORDER.map(era => ({
    era,
    dragons: filtered.filter(d => d.era === era),
  })).filter(s => s.dragons.length > 0)

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 -mx-4 mb-10 border-y border-gold-primary/20 bg-ink/90 px-4 py-3 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {FILTERS.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(f.key)}
              aria-pressed={active === f.key}
              className={cn(
                active === f.key ? "btn-gold" : "btn-ghost",
                "!px-4 !py-2 !text-[0.66rem] md:!px-5 md:!text-[0.7rem]",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cream/40">
        {filtered.length} {filtered.length === 1 ? "dragon" : "dragons"}
        {!isSortMode ? " shown" : active === "largest" ? " · largest first" : " · fastest first"}
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-cream/60">
          No dragons answer to that description.
        </p>
      ) : isSortMode ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dragon, i) => (
            <DragonCard key={dragon.slug} dragon={dragon} index={i} />
          ))}
        </div>
      ) : (
        sections.map(({ era, dragons: eraDragons }) => (
          <EraSection key={era} era={era} dragons={eraDragons} />
        ))
      )}
    </div>
  )
}
