"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ScrollReveal"
import { characters, houseSigil } from "@/data/characters"
import type { Character, CharacterEra, LifeStatus } from "@/data/types"
import { cn } from "@/lib/utils"

type EraKey = "all" | CharacterEra

const ERA_PILLS: { key: EraKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "dance", label: "Dance" },
  { key: "got", label: "ASOIAF" },
]

const ERA_CARD_LABEL: Record<CharacterEra, string> = {
  dance: "The Dance",
  got: "Ice & Fire",
}

/** Every house that actually appears in the roster, sorted by label. */
const HOUSE_PILLS: { slug: string; label: string }[] = Array.from(
  new Map(characters.map(c => [c.house, c.houseLabel])).entries(),
)
  .map(([slug, label]) => ({ slug, label }))
  .sort((a, b) => a.label.localeCompare(b.label))

const STATUS_DOT: Record<LifeStatus, string> = {
  alive: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
  dead: "bg-blood-bright shadow-[0_0_8px_rgba(220,38,38,0.8)]",
  unknown: "bg-cream/50",
}

const STATUS_WORD: Record<LifeStatus, string> = {
  alive: "Alive",
  dead: "Dead",
  unknown: "Fate unknown",
}

function CharacterCard({ char, index }: { char: Character; index: number }) {
  return (
    <ScrollReveal
      variant="up"
      delay={Math.min(index, 5) * 0.05}
      className="h-full"
    >
      <motion.div whileHover={{ y: -6 }} className="h-full">
        <Link
          href={`/characters/${char.slug}`}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-primary/20 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-gold-primary/50"
        >
          {/* Portrait */}
          <div className="relative aspect-[3/4] shrink-0 overflow-hidden">
            {char.image && (
              <Image
                src={char.image}
                alt={char.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-primary/40 bg-ink/80 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-widest text-gold-light backdrop-blur">
                <span aria-hidden="true">{houseSigil[char.house] ?? "🏰"}</span>
                {char.houseLabel}
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-cream/25 bg-ink/80 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-widest text-cream/80 backdrop-blur">
                <span
                  className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[char.status])}
                  aria-hidden="true"
                />
                {STATUS_WORD[char.status]}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-2.5 p-5">
            <div>
              <h3 className="text-xl font-bold text-gold-primary transition-colors group-hover:text-gold-light">
                {char.name}
              </h3>
              {char.epithet && (
                <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.24em] text-cream/50">
                  {char.epithet}
                </p>
              )}
              {char.title && (
                <p className="mt-1.5 text-[0.72rem] italic text-cream/70">
                  {char.title}
                </p>
              )}
            </div>

            <p className="flex-1 text-sm leading-relaxed text-cream/60 line-clamp-3">
              {char.description}
            </p>

            <div className="flex items-center justify-between border-t border-gold-primary/15 pt-3">
              <span className="text-[0.6rem] uppercase tracking-[0.26em] text-gold-primary/70">
                {ERA_CARD_LABEL[char.era]}
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.26em] text-cream/40 transition-colors group-hover:text-gold-primary">
                Profile →
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </ScrollReveal>
  )
}

export function CharacterGrid() {
  const [era, setEra] = useState<EraKey>("all")
  const [house, setHouse] = useState("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return characters.filter(c => {
      if (era !== "all" && c.era !== era) return false
      if (house !== "all" && c.house !== house) return false
      if (!q) return true

      return (
        c.name.toLowerCase().includes(q) ||
        c.houseLabel.toLowerCase().includes(q) ||
        (c.epithet ?? "").toLowerCase().includes(q) ||
        (c.title ?? "").toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      )
    })
  }, [era, house, query])

  const pillClass = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-1.5 text-[0.66rem] uppercase tracking-widest transition",
      active
        ? "border-gold-primary/70 bg-gold-primary/25 text-cream"
        : "border-gold-primary/25 bg-gold-primary/5 text-cream/60 hover:border-gold-primary/60 hover:bg-gold-primary/15 hover:text-cream",
    )

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-40 -mx-4 mb-8 border-y border-gold-primary/20 bg-ink/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ERA_PILLS.map(p => (
              <button
                key={p.key}
                type="button"
                onClick={() => setEra(p.key)}
                aria-pressed={era === p.key}
                className={pillClass(era === p.key)}
              >
                {p.label}
              </button>
            ))}

            <label className="relative ml-1 md:ml-3">
              <span className="sr-only">Search characters</span>
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, house, title…"
                className="w-56 rounded-full border border-gold-primary/25 bg-black/40 px-4 py-1.5 pr-9 text-xs text-cream placeholder:text-cream/40 transition focus:border-gold-primary/60 focus:outline-none md:w-72"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gold-primary/70"
              >
                🔍
              </span>
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setHouse("all")}
              aria-pressed={house === "all"}
              className={pillClass(house === "all")}
            >
              <span aria-hidden="true">🏰 </span>All houses
            </button>
            {HOUSE_PILLS.map(h => (
              <button
                key={h.slug}
                type="button"
                onClick={() => setHouse(h.slug)}
                aria-pressed={house === h.slug}
                className={pillClass(house === h.slug)}
              >
                <span aria-hidden="true">{houseSigil[h.slug] ?? "🏰"} </span>
                {h.label.replace(/^House /, "")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cream/40">
        {filtered.length} {filtered.length === 1 ? "figure" : "figures"} shown
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-cream/60">
          No one in the chronicles answers to that description.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((char, i) => (
            <CharacterCard key={char.slug} char={char} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
