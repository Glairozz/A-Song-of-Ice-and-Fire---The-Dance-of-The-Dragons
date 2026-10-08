"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ScrollReveal } from "@/components/ScrollReveal"
import { cn } from "@/lib/utils"
import { entityGlyph, hrefForRef } from "@/lib/links"
import { eventBySlug, events, timelineYears } from "@/data/events"
import type { EntityRef, EventPhase, TimelineEvent } from "@/data/types"

type Filter = "all" | EventPhase

const phaseMeta: Record<EventPhase, { label: string; dot: string; badge: string }> = {
  spark: {
    label: "Spark",
    dot: "bg-gold-light",
    badge: "border-gold-primary/50 bg-gold-primary/15 text-gold-light",
  },
  war: {
    label: "War",
    dot: "bg-blood-bright",
    badge: "border-blood/60 bg-blood/25 text-blood-bright",
  },
  aftermath: {
    label: "Aftermath",
    dot: "bg-cream/50",
    badge: "border-cream/30 bg-cream/10 text-cream/70",
  },
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "spark", label: "Spark" },
  { key: "war", label: "War" },
  { key: "aftermath", label: "Aftermath" },
]

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"

function RefChip({ entity }: { entity: EntityRef }) {
  return (
    <Link href={hrefForRef(entity)} className={CHIP}>
      <span aria-hidden>{entityGlyph[entity.type]}</span>
      <span>{entity.label}</span>
    </Link>
  )
}

interface EventCardProps {
  event: TimelineEvent
  expanded: boolean
  highlighted: boolean
  onToggle: () => void
}

function EventCard({ event, expanded, highlighted, onToggle }: EventCardProps) {
  const meta = phaseMeta[event.phase]
  const epilogue = event.year > 135

  return (
    <div className="relative pl-10 md:pl-16">
      {/* Rail marker for this card */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-7 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ink",
          meta.dot,
          highlighted && "ring-4 ring-gold-primary/40"
        )}
      />
      <article
        id={event.slug}
        className={cn(
          "panel scroll-mt-24 p-5 md:p-7",
          highlighted && "border-gold-primary/80 shadow-[0_18px_44px_-24px_rgba(184,107,0,0.8)] ring-2 ring-gold-primary/70"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={`${event.slug}-detail`}
          className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary/70"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 font-cinzel text-xs tracking-widest text-gold-light">
              {event.year} AC
            </span>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]",
                meta.badge
              )}
            >
              {meta.label}
            </span>
            {epilogue && (
              <span className="rounded-full border border-cream/30 bg-cream/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream/80">
                Epilogue
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-gold-primary transition-colors group-hover:text-gold-light md:text-2xl">
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-cream/65 md:text-base">{event.summary}</p>

          <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-gold-primary/80 transition-colors group-hover:text-gold-light">
            {expanded ? "Close chronicle" : "Read chronicle"}
            <span className={cn("transition-transform duration-300", expanded && "rotate-180")}>
              ▾
            </span>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`${event.slug}-detail`}
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-gold-primary/20 pt-5">
                {event.description.map((paragraph, i) => (
                  <p
                    key={i}
                    className="mb-4 text-sm leading-relaxed text-cream/75 last:mb-0 md:text-[0.95rem]"
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="mt-6">
                  <p className="eyebrow mb-3">The Ledger</p>
                  <ul className="space-y-2">
                    {event.outcome.map((line, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-cream/70">
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-primary"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="eyebrow mb-3">In this chronicle</p>
                  <div className="flex flex-wrap gap-2">
                    {event.refs.map((entity) => (
                      <RefChip key={`${entity.type}-${entity.slug}`} entity={entity} />
                    ))}
                    {event.locationRef && <RefChip entity={event.locationRef} />}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </div>
  )
}

export function Timeline() {
  const [filter, setFilter] = useState<Filter>("all")
  const [open, setOpen] = useState<string[]>([])
  const [highlighted, setHighlighted] = useState<string | null>(null)

  // Deep links from other pages: /timeline#<slug>
  useEffect(() => {
    const applyHash = () => {
      const slug = decodeURIComponent(window.location.hash.replace(/^#/, ""))
      if (!slug || !eventBySlug(slug)) return
      setFilter("all")
      setHighlighted(slug)
      setOpen((prev) => (prev.includes(slug) ? prev : [...prev, slug]))
      window.setTimeout(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 180)
    }

    applyHash()
    window.addEventListener("hashchange", applyHash)
    return () => window.removeEventListener("hashchange", applyHash)
  }, [])

  const groups = useMemo(
    () =>
      timelineYears
        .map((year) => ({
          year,
          items: events.filter(
            (event) => event.year === year && (filter === "all" || event.phase === filter)
          ),
        }))
        .filter((group) => group.items.length > 0),
    [filter]
  )

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Phase filter */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        <span className="eyebrow mr-1">Phase</span>
        {FILTERS.map((option) => {
          const active = filter === option.key
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition",
                active
                  ? option.key === "war"
                    ? "border-blood-bright/70 bg-blood/30 text-blood-bright"
                    : option.key === "aftermath"
                      ? "border-cream/50 bg-cream/15 text-cream"
                      : "border-gold-primary/70 bg-gold-primary/25 text-gold-light"
                  : "border-gold-primary/25 text-cream/55 hover:border-gold-primary/60 hover:text-cream"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <div className="relative">
        {/* The rail */}
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-gold-primary/70 via-gold-primary/25 to-transparent"
        />

        {groups.map((group) => (
          <section key={group.year} className="relative mb-12 last:mb-0">
            {/* Year anchor */}
            <div className="relative mb-6 pl-10 md:pl-16">
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold-primary bg-ink"
              />
              <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                <span className="font-cinzel text-4xl leading-none text-gold-primary/90 md:text-6xl">
                  {group.year}
                </span>
                <div className="pb-1">
                  <p className="eyebrow">
                    After Conquest · {group.items.length}{" "}
                    {group.items.length === 1 ? "event" : "events"}
                  </p>
                  {group.year > 135 && (
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-cream/50">
                      Epilogue
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {group.items.map((event, i) => {
                const card = (
                  <EventCard
                    event={event}
                    expanded={open.includes(event.slug)}
                    highlighted={highlighted === event.slug}
                    onToggle={() =>
                      setOpen((prev) =>
                        prev.includes(event.slug)
                          ? prev.filter((slug) => slug !== event.slug)
                          : [...prev, event.slug]
                      )
                    }
                  />
                )

                // Deep-linked cards render without the reveal animation so the
                // browser can land the hash scroll on a stable target.
                if (highlighted === event.slug) return <div key={event.slug}>{card}</div>

                return (
                  <ScrollReveal
                    key={event.slug}
                    variant="up"
                    delay={Math.min(i * 0.07, 0.28)}
                  >
                    {card}
                  </ScrollReveal>
                )
              })}
            </div>
          </section>
        ))}

        {groups.length === 0 && (
          <p className="pl-10 text-sm text-cream/60 md:pl-16">
            No events answer to this phase — the chronicle keeps its silence.
          </p>
        )}
      </div>
    </div>
  )
}
