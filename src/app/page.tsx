"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"
import { ArrowRight, Search, Map as MapIcon, ChevronRight } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"
import { SearchOverlay } from "@/components/SearchOverlay"
import { dragons, featuredDragons } from "@/data/dragons"
import { characters, featuredCharacters } from "@/data/characters"
import { houses, featuredHouses } from "@/data/houses"
import { locations } from "@/data/locations"
import { events } from "@/data/events"
import { sectionIcons } from "@/lib/sectionIcons"

/* Deterministic embers — same list on server and client. */
const embers = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  bottom: (i * 23) % 60,
  size: 2 + ((i * 7) % 4),
  duration: 6 + ((i * 3) % 7),
  delay: (i * 0.9) % 8,
  drift: ((i % 5) - 2) * 14,
}))

const realmLinks = [
  { href: "/dragons", icon: sectionIcons.dragons, label: "Dragons", note: `${dragons.length} beasts of flame` },
  { href: "/characters", icon: sectionIcons.characters, label: "Characters", note: `${characters.length} figures of the war` },
  { href: "/greathouses", icon: sectionIcons.houses, label: "Great Houses", note: `${houses.length} bloodlines` },
  { href: "/locations", icon: sectionIcons.locations, label: "Locations", note: `${locations.length} seats of power` },
  { href: "/map", icon: sectionIcons.map, label: "Interactive Map", note: "Click through Westeros" },
  { href: "/timeline", icon: sectionIcons.timeline, label: "Timeline", note: `${events.length} moments, 129–153 AC` },
  { href: "/organizations", icon: sectionIcons.organizations, label: "Organizations", note: "Orders & councils" },
  { href: "/magic", icon: sectionIcons.magic, label: "Magic", note: "Fire, greensight, steel" },
  { href: "/races", icon: sectionIcons.races, label: "Races", note: "Men, giants & more" },
]

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/map.webp"
            alt="Map of Westeros"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.28] saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
          <div className="absolute inset-0 parchment" />
        </div>

        {/* Slowly rising embers */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {embers.map((e, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-gold-light/70"
              style={{
                left: `${e.left}%`,
                bottom: `${e.bottom}%`,
                width: e.size,
                height: e.size,
                animation: `emberRise ${e.duration}s linear ${e.delay}s infinite`,
                ["--ember-drift" as string]: `${e.drift}px`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-4 pb-24 pt-32 text-center">
          <ScrollReveal variant="up">
            <p className="eyebrow mb-6">An Interactive Archive of Westeros</p>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,7vw,5.5rem)] font-bold leading-[1.05] text-cream">
              THE DANCE
              <span className="mt-1 block text-gold-primary">OF THE DRAGONS</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.2}>
            <div className="rule mx-auto my-8 max-w-md">
              <span />
            </div>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-cream/70 md:text-base">
              Fire and blood split a dynasty. Walk the Targaryen civil war year by
              year, mount the dragons that shaped it, trace the great houses,
              places and figures of the realm — every entry links to the next.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.3}>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="group mx-auto mt-10 flex w-full max-w-xl items-center gap-3 rounded-full border border-gold-primary/35 bg-black/50 px-5 py-3.5 text-left backdrop-blur-md transition-all hover:border-gold-primary/70 hover:bg-black/70"
            >
              <Search size={17} className="text-gold-primary" />
              <span className="flex-1 text-sm text-cream/50 transition-colors group-hover:text-cream/80">
                Search dragons, houses, characters, places, events…
              </span>
              <kbd className="rounded border border-gold-primary/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cream/50">
                ⌘K
              </kbd>
            </button>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.4}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/dragons" className="btn-gold inline-flex items-center gap-2">
                Enter the Realm <ArrowRight size={15} />
              </Link>
              <Link href="/map" className="btn-ghost inline-flex items-center gap-2">
                <MapIcon size={15} /> Explore the Map
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-cream/40">
          Scroll
        </div>
      </section>

      {/* -------------------------------------------------------- THE REALM */}
      <section className="relative mx-auto max-w-7xl px-4 py-20">
        <ScrollReveal variant="up">
          <p className="eyebrow text-center">The Known World, indexed</p>
          <h2 className="mt-3 text-center text-3xl font-bold text-cream md:text-4xl">
            Choose Your Path
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {realmLinks.map((item, i) => (
            <ScrollReveal key={item.href} variant="up" delay={i * 0.04}>
              <Link
                href={item.href}
                className="panel group flex h-full flex-col justify-between gap-3 p-4 md:p-5"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gold-primary/25 bg-black/40 p-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 md:h-14 md:w-14">
                    <Image
                      src={item.icon}
                      alt=""
                      width={56}
                      height={56}
                      className="h-full w-full rounded-md object-contain"
                    />
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-gold-primary"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-cream transition-colors group-hover:text-gold-primary md:text-lg">
                    {item.label}
                  </h3>
                  <p className="text-xs text-cream/50">{item.note}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- DRAGONS TEASER */}
      <section className="relative overflow-hidden border-y border-gold-primary/15 bg-black/40 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal variant="up">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Dragons of the Dance</p>
                <h2 className="mt-3 text-3xl font-bold text-cream md:text-4xl">
                  The Last Generation of Dragons
                </h2>
              </div>
              <Link
                href="/dragons"
                className="group inline-flex items-center gap-2 text-sm text-gold-primary transition-colors hover:text-gold-light"
              >
                All {dragons.length} dragons
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDragons.slice(0, 6).map((dragon, i) => (
              <ScrollReveal key={dragon.slug} variant="up" delay={i * 0.06} className="h-full">
                <Link
                  href={`/dragons/${dragon.slug}`}
                  className="panel group relative block h-full overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    {dragon.images[0] && (
                      <Image
                        src={dragon.images[0]}
                        alt={dragon.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full border border-gold-primary/40 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gold-primary backdrop-blur">
                      {dragon.status}
                    </span>
                  </div>
                  <div className="relative -mt-12 p-5">
                    <h3 className="text-xl font-bold text-cream transition-colors group-hover:text-gold-primary">
                      {dragon.name}
                    </h3>
                    {dragon.epithet && (
                      <p className="text-sm italic text-gold-primary/80">{dragon.epithet}</p>
                    )}
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cream/60">
                      {dragon.description}
                    </p>
                    <div className="mt-4 flex gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/45">
                      <span>Size {dragon.stats.size}</span>
                      <span>Combat {dragon.stats.combat}</span>
                      <span className="ml-auto text-gold-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- CHARACTERS + HOUSES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <ScrollReveal variant="up">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">The Players</p>
                  <h2 className="mt-3 text-3xl font-bold text-cream">
                    Figures of the Realm
                  </h2>
                </div>
                <Link
                  href="/characters"
                  className="text-sm text-gold-primary transition-colors hover:text-gold-light"
                >
                  All →
                </Link>
              </div>
            </ScrollReveal>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {featuredCharacters.slice(0, 6).map((c, i) => (
                <ScrollReveal key={c.slug} variant="up" delay={i * 0.05} className="h-full">
                  <Link
                    href={`/characters/${c.slug}`}
                    className="panel group block h-full overflow-hidden"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {c.image && (
                        <Image
                          src={c.image}
                          alt={c.name}
                          fill
                          sizes="(max-width: 640px) 33vw, 20vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    </div>
                    <div className="p-3">
                      <h3 className="truncate text-sm font-semibold text-cream transition-colors group-hover:text-gold-primary">
                        {c.name}
                      </h3>
                      <p className="truncate text-[11px] text-cream/50">{c.houseLabel}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal variant="up">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Bloodlines</p>
                  <h2 className="mt-3 text-3xl font-bold text-cream">Great Houses</h2>
                </div>
                <Link
                  href="/greathouses"
                  className="text-sm text-gold-primary transition-colors hover:text-gold-light"
                >
                  All →
                </Link>
              </div>
            </ScrollReveal>

            <div className="mt-6 space-y-3">
              {featuredHouses.slice(0, 5).map((h, i) => (
                <ScrollReveal key={h.slug} variant="up" delay={i * 0.05}>
                  <Link
                    href={`/houses/${h.slug}`}
                    className="panel group flex items-center gap-4 p-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gold-primary/25">
                      <Image
                        src={h.image}
                        alt={h.name}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span aria-hidden>{h.sigil}</span>
                        <h3 className="truncate text-base font-semibold text-cream transition-colors group-hover:text-gold-primary">
                          {h.name}
                        </h3>
                      </div>
                      <p className="truncate text-xs italic text-gold-primary/70">
                        “{h.words}”
                      </p>
                      <p className="truncate text-[11px] text-cream/45">
                        {h.region} · {h.seat}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-gold-primary"
                    />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ TIMELINE CTA */}
      <section className="relative overflow-hidden border-t border-gold-primary/15 bg-black/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal variant="up">
            <p className="eyebrow text-center">129 – 153 AC</p>
            <h2 className="mt-3 text-center text-3xl font-bold text-cream md:text-4xl">
              The War, Year by Year
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm text-cream/60">
              From the death of Viserys I to the last dragon&apos;s breath — every
              battle, betrayal and coronation, linked to the people who lived it.
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-10 max-w-3xl">
            {events.slice(0, 5).map((event, i) => (
              <ScrollReveal key={event.slug} variant="up" delay={i * 0.06}>
                <Link
                  href={`/timeline#${event.slug}`}
                  className="group flex items-start gap-4 border-b border-gold-primary/10 py-4 transition-colors hover:bg-gold-primary/5"
                >
                  <span className="w-16 shrink-0 pt-1 text-right font-[family-name:var(--font-cinzel)] text-lg font-bold text-gold-primary">
                    {event.year}
                  </span>
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 border border-gold-primary/60 transition-colors group-hover:bg-gold-primary" />
                  <span className="min-w-0">
                    <span className="block text-[15px] text-cream transition-colors group-hover:text-gold-primary">
                      {event.title}
                    </span>
                    <span className="block text-xs text-cream/50">{event.summary}</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal variant="up" delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/timeline" className="btn-ghost inline-flex items-center gap-2">
                Walk the full timeline <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --------------------------------------------------------- CLOSING */}
      <section className="relative overflow-hidden">
        <div className="relative h-[46vh] min-h-[320px]">
          <Image
            src="/lopp/war5.jpg"
            alt="A crown in flames"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-cream md:text-5xl">
              &ldquo;Fire and Blood.&rdquo;
            </h2>
            <p className="mt-4 max-w-xl text-sm text-cream/60">
              Every entry in this archive is cross-linked — dragons to riders,
              riders to houses, houses to seats, seats to battles.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/dragons" className="btn-gold">
                Enter the Realm
              </Link>
              <Link href="/timeline" className="btn-ghost">
                The Timeline
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {searchOpen && <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
