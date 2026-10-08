import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ScrollReveal } from "@/components/ScrollReveal"
import { houses, houseBySlug } from "@/data/houses"
import type { EntityRef, House } from "@/data/types"
import { entityGlyph, hrefForRef } from "@/lib/links"

interface HousePageProps {
  params: Promise<{ slug: string }>
}

/**
 * Neighbouring profiles shown at the foot of a house page:
 * same-region houses first, then hand-picked allies and rivals.
 */
const relatedOrder: Record<string, string[]> = {
  targaryen: ["velaryon", "hightower", "stark", "baratheon"],
  stark: ["tully", "lannister", "bolton", "mormont"],
  lannister: ["baratheon", "targaryen", "tyrell", "frey"],
  velaryon: ["targaryen", "hightower", "stark"],
  hightower: ["targaryen", "tyrell", "velaryon"],
  baratheon: ["lannister", "stark", "targaryen"],
  greyjoy: ["targaryen", "tully", "stark"],
  tyrell: ["hightower", "lannister", "targaryen"],
  tully: ["stark", "arryn", "frey"],
  arryn: ["tully", "stark", "lannister"],
  bolton: ["stark", "frey", "mormont"],
  mormont: ["stark", "bolton", "tully"],
  frey: ["tully", "bolton", "lannister"],
  martell: ["targaryen", "tyrell", "baratheon"],
}

function relatedHouses(house: House): House[] {
  const candidates = [
    ...houses.filter((other) => other.region === house.region),
    ...(relatedOrder[house.slug] ?? []).flatMap((slug) => {
      const other = houseBySlug(slug)
      return other ? [other] : []
    }),
  ]

  const seen = new Set<string>([house.slug])
  const related: House[] = []
  for (const other of candidates) {
    if (seen.has(other.slug)) continue
    seen.add(other.slug)
    related.push(other)
    if (related.length === 3) break
  }
  return related
}

function RefChips({ items }: { items: EntityRef[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.slug}`}
          href={hrefForRef(item)}
          className="inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"
        >
          <span aria-hidden="true">{entityGlyph[item.type]}</span>
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: React.ReactNode
}) {
  return (
    <ScrollReveal variant="up">
      <section className="mb-14">
        <div className="mb-4 text-center">
          <p className="eyebrow mb-3">{kicker}</p>
          <h2 className="text-2xl font-bold text-cream md:text-3xl">{title}</h2>
        </div>
        <div className="rule mb-7">
          <span />
        </div>
        {children}
      </section>
    </ScrollReveal>
  )
}

export function generateStaticParams() {
  return houses.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: HousePageProps): Promise<Metadata> {
  const { slug } = await params
  const house = houseBySlug(slug)
  if (!house) return { title: "House Not Found" }

  return {
    title: house.name,
    description: `${house.description} Words: “${house.words}.” Seat: ${house.seat}, ${house.region}.`,
  }
}

export default async function HouseProfilePage({ params }: HousePageProps) {
  const { slug } = await params
  const house = houseBySlug(slug)
  if (!house) notFound()

  const events = house.refs.filter((item) => item.type === "event")
  const related = relatedHouses(house)

  const facts: { label: string; value: string; italic?: boolean }[] = [
    { label: "Region", value: house.region },
    { label: "Seat", value: house.seat },
    { label: "Words", value: house.words, italic: true },
    {
      label: "Notable members",
      value: house.notable.length > 0 ? String(house.notable.length) : "—",
    },
  ]

  return (
    <div className="pb-16">
      {/* Hero */}
      <header className="relative flex min-h-[62vh] items-end overflow-hidden">
        <Image
          src={house.image}
          alt={house.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
        <div className="parchment absolute inset-0" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-14 pt-40">
          <Link
            href="/greathouses"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/50 transition hover:text-gold-light"
          >
            ← Great Houses
          </Link>
          <div className="mt-8 flex items-center gap-5">
            <span className="text-5xl md:text-6xl" aria-hidden="true">
              {house.sigil}
            </span>
            <div>
              <p className="eyebrow">
                {house.region} · {house.seat}
              </p>
              <h1 className="mt-2 text-4xl font-bold text-gold-primary drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-6xl">
                {house.name}
              </h1>
            </div>
          </div>
          <p className="mt-6 font-display text-xl italic text-gold-light md:text-2xl">
            &ldquo;{house.words}&rdquo;
          </p>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: `linear-gradient(90deg, ${house.color}, transparent 70%)` }}
          aria-hidden="true"
        />
      </header>

      <div className="mx-auto max-w-5xl px-4 pt-12">
        {/* Fact grid */}
        <ScrollReveal variant="up">
          <dl className="panel parchment mb-14 grid grid-cols-2 gap-6 p-6 md:grid-cols-4 md:p-8">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow mb-2">{fact.label}</dt>
                <dd
                  className={`text-sm text-cream md:text-base ${
                    fact.italic ? "font-display italic text-gold-light" : "font-cinzel"
                  }`}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>

        {/* Lore */}
        <ScrollReveal variant="up">
          <section className="mb-14 space-y-5">
            {house.lore.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-cream/70 md:text-base">
                {paragraph}
              </p>
            ))}
          </section>
        </ScrollReveal>

        {house.notable.length > 0 && (
          <Section kicker="Those who bore the banner" title="Notable Figures">
            <RefChips items={house.notable} />
          </Section>
        )}

        {house.dragons.length > 0 && (
          <Section kicker="Fire and blood" title="Dragons">
            <RefChips items={house.dragons} />
          </Section>
        )}

        {events.length > 0 && (
          <Section kicker="Chronicle of the Dance" title="Key Events">
            <RefChips items={events} />
          </Section>
        )}

        {house.locationRef && (
          <Section kicker="Where the banner flies" title="Lands">
            <RefChips items={[house.locationRef]} />
          </Section>
        )}

        {/* Related houses */}
        <Section kicker="Banners nearby" title="Related Houses">
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((other) => (
              <Link
                key={other.slug}
                href={`/houses/${other.slug}`}
                className="panel group overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                </div>
                <div className="flex items-center justify-between gap-2 p-4">
                  <div>
                    <p className="text-base font-bold text-gold-primary">
                      <span aria-hidden="true">{other.sigil}</span> {other.name}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cream/50">
                      {other.region} · {other.seat}
                    </p>
                  </div>
                  <span className="text-xs text-gold-light opacity-0 transition group-hover:opacity-100">
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}
