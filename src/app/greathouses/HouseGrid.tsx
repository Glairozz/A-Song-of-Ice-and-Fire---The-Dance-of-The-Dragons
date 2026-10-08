"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/ScrollReveal"
import { entityGlyph, hrefForRef } from "@/lib/links"
import { cn } from "@/lib/utils"
import type { House } from "@/data/types"

interface HouseGridProps {
  houses: House[]
}

/**
 * Filterable grid of house cards. The whole card links to the house profile;
 * the notable-figure chips sit above the stretched link so they stay clickable.
 */
export function HouseGrid({ houses }: HouseGridProps) {
  const [region, setRegion] = useState("All")
  const [query, setQuery] = useState("")

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(houses.map((house) => house.region)))],
    [houses],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return houses.filter((house) => {
      if (region !== "All" && house.region !== region) return false
      if (!q) return true
      return [house.name, house.region, house.seat, house.words, house.description].some((field) =>
        field.toLowerCase().includes(q),
      )
    })
  }, [houses, region, query])

  return (
    <div>
      {/* Search + region filters */}
      <div className="mb-10 flex flex-col items-center gap-5">
        <label className="relative w-full max-w-md">
          <span className="sr-only">Search houses</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search houses, seats, words…"
            className="w-full rounded-full border border-gold-primary/30 bg-black/40 px-5 py-2.5 text-sm text-cream outline-none transition placeholder:text-cream/40 focus:border-gold-primary/70 focus:bg-black/60"
          />
        </label>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {regions.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRegion(value)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs tracking-wide transition",
                region === value
                  ? "border-gold-primary bg-gold-primary text-ink"
                  : "border-gold-primary/30 bg-gold-primary/10 text-cream/70 hover:border-gold-primary/60 hover:bg-gold-primary/20 hover:text-cream",
              )}
            >
              {value}
            </button>
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-cream/40">
          {filtered.length} of {houses.length} houses
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="panel mx-auto max-w-md p-10 text-center">
          <p className="mb-2 text-3xl">🕯️</p>
          <p className="text-cream/70">No house answers to that name.</p>
          <button
            type="button"
            onClick={() => {
              setRegion("All")
              setQuery("")
            }}
            className="mt-4 text-xs uppercase tracking-[0.25em] text-gold-light underline-offset-4 hover:underline"
          >
            Clear the search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((house, index) => (
            <ScrollReveal key={house.slug} variant="up" delay={Math.min(index, 5) * 0.05} className="h-full">
              <motion.div whileHover={{ y: -6 }} className="h-full">
                <article className="panel group relative flex h-full flex-col overflow-hidden">
                  {/* Banner image with scrim */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={house.image}
                      alt={house.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
                    <span
                      className="absolute right-3 top-3 rounded-full border border-gold-primary/40 bg-ink/70 px-3 py-1 text-lg backdrop-blur-sm"
                      aria-hidden="true"
                    >
                      {house.sigil}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="text-lg font-bold text-gold-primary drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                        {house.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-cream/60">
                        {house.region} · {house.seat}
                      </p>
                    </div>
                  </div>

                  {/* House accent stripe */}
                  <div
                    className="h-0.5 w-full opacity-70"
                    style={{ backgroundColor: house.color }}
                    aria-hidden="true"
                  />

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <p className="font-display text-sm italic text-gold-light">
                      &ldquo;{house.words}&rdquo;
                    </p>
                    <p className="line-clamp-3 text-sm leading-relaxed text-cream/60">
                      {house.description}
                    </p>

                    {house.notable.length > 0 && (
                      <div className="mt-auto pt-1">
                        <p className="eyebrow mb-2">Notable figures</p>
                        <div className="flex flex-wrap gap-2">
                          {house.notable.slice(0, 3).map((figure) => (
                            <Link
                              key={`${figure.type}-${figure.slug}`}
                              href={hrefForRef(figure)}
                              className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"
                            >
                              <span aria-hidden="true">{entityGlyph[figure.type]}</span>
                              {figure.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stretched link: the whole card opens the house profile */}
                  <Link
                    href={`/houses/${house.slug}`}
                    aria-label={`View the profile of ${house.name}`}
                    className="absolute inset-0 z-0"
                  />
                </article>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
