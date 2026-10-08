import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ScrollReveal } from "@/components/ScrollReveal"
import { locationBySlug, locations } from "@/data/locations"
import type { EntityRef } from "@/data/types"
import { entityGlyph, hrefForRef } from "@/lib/links"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return locations.map((loc) => ({ slug: loc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const loc = locationBySlug(slug)
  if (!loc) return { title: "Location not found" }
  return {
    title: loc.name,
    description: `${loc.description} Region of ${loc.region}, held by ${loc.holder ?? "no single lord"}.`,
  }
}

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"

function RefChips({ refs, glyph }: { refs: EntityRef[]; glyph: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {refs.map((ref) => (
        <Link key={`${ref.type}-${ref.slug}`} href={hrefForRef(ref)} className={CHIP}>
          <span aria-hidden="true">{glyph}</span>
          {ref.label}
        </Link>
      ))}
    </div>
  )
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const loc = locationBySlug(slug)
  if (!loc) notFound()

  const typeLabel = loc.type.charAt(0).toUpperCase() + loc.type.slice(1)
  const facts: { label: string; value: string }[] = [
    { label: "Region", value: loc.region },
    { label: "Type", value: typeLabel },
    { label: "Held by", value: loc.holder ?? "Uncertain" },
  ]

  return (
    <div className="pb-16">
      {/* ------------------------------------------------------------ *
       * Hero
       * ------------------------------------------------------------ */}
      <section className="relative mt-16 h-[50vh] min-h-[340px] w-full">
        <Image
          src={loc.image}
          alt={loc.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-4 pb-8">
            <Link
              href="/locations"
              className="mb-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-cream/60 transition hover:text-gold-light"
            >
              ← All locations
            </Link>
            <p className="eyebrow mb-2">
              {loc.region} · {loc.type}
            </p>
            <h1 className="text-4xl font-bold text-gold-primary md:text-6xl">{loc.name}</h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        {/* ---------------------------------------------------------- *
         * Fact grid
         * ---------------------------------------------------------- */}
        <ScrollReveal variant="up" className="-mt-2">
          <div className="panel parchment mt-6 grid grid-cols-1 gap-px overflow-hidden p-0 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-gold-primary/10 p-5 sm:border-b-0">
                <p className="eyebrow mb-2">{f.label}</p>
                <p className="text-sm leading-relaxed text-cream">{f.value}</p>
              </div>
            ))}
            <div className="p-5">
              <p className="eyebrow mb-2">Allegiance</p>
              {loc.houseRef ? (
                <Link href={hrefForRef(loc.houseRef)} className={CHIP}>
                  <span aria-hidden="true">{entityGlyph.house}</span>
                  {loc.houseRef.label}
                </Link>
              ) : (
                <p className="text-sm text-cream/60">None — beyond the game of crowns</p>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* ---------------------------------------------------------- *
         * Lore
         * ---------------------------------------------------------- */}
        <ScrollReveal variant="up" delay={0.1}>
          <div className="mt-10 space-y-5">
            {loc.lore.map((para, i) => (
              <p
                key={i}
                className="max-w-3xl text-sm leading-relaxed text-cream/75 md:text-base"
              >
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* ---------------------------------------------------------- *
         * Cross-links
         * ---------------------------------------------------------- */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ScrollReveal variant="up" delay={0.05}>
            <div className="panel h-full p-6">
              <div className="rule mb-5">
                <span />
              </div>
              <h2 className="mb-4 text-lg font-bold text-gold-primary">Notable Figures</h2>
              {loc.notable.length > 0 ? (
                <RefChips refs={loc.notable} glyph={entityGlyph.character} />
              ) : (
                <p className="text-sm text-cream/50">
                  No great names of the Dance are tied to this place — it kept its own counsel.
                </p>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.1}>
            <div className="panel h-full p-6">
              <div className="rule mb-5">
                <span />
              </div>
              <h2 className="mb-4 text-lg font-bold text-gold-primary">Key Events</h2>
              {loc.events.length > 0 ? (
                <RefChips refs={loc.events} glyph={entityGlyph.event} />
              ) : (
                <p className="text-sm text-cream/50">
                  None of the Dance&apos;s pitched battles were fought here.
                </p>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.15}>
            <div className="panel h-full p-6">
              <div className="rule mb-5">
                <span />
              </div>
              <h2 className="mb-4 text-lg font-bold text-gold-primary">Nearby</h2>
              <RefChips refs={loc.nearby} glyph={entityGlyph.location} />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={0.2}>
            <div className="panel flex h-full flex-col items-start justify-center gap-4 p-6">
              <div className="rule w-full">
                <span />
              </div>
              <p className="text-sm leading-relaxed text-cream/65">
                Find {loc.name} on the interactive explorer — select it from the map to see its
                neighbours, its holders and the events that unfolded around it.
              </p>
              <Link href={`/map?focus=${loc.slug}`} className="btn-ghost inline-block">
                View on the map →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
