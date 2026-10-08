import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ScrollReveal } from "@/components/ScrollReveal"
import { dragonBySlug, dragons, eraLabel, statusLabel } from "@/data/dragons"
import type { Dragon, EntityRef } from "@/data/types"
import { cn } from "@/lib/utils"
import { entityGlyph, hrefForRef } from "@/lib/links"

export async function generateStaticParams() {
  return dragons.map(dragon => ({ slug: dragon.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const dragon = dragonBySlug(slug)

  if (!dragon) return { title: "Dragon not found" }

  return {
    title: dragon.name,
    description: dragon.description,
    openGraph: {
      title: `${dragon.name}${dragon.epithet ? ` · ${dragon.epithet}` : ""}`,
      description: dragon.description,
      images: [dragon.images[0]],
    },
  }
}

/* ------------------------------------------------------------------ *
 * Small building blocks
 * ------------------------------------------------------------------ */

const chipClass =
  "inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"

function RefChip({ item }: { item: EntityRef }) {
  return (
    <Link href={hrefForRef(item)} className={chipClass}>
      {entityGlyph[item.type]} {item.label}
    </Link>
  )
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-cream/45">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-cream">{children}</dd>
    </div>
  )
}

function StatRow({
  label,
  value,
  blood = false,
}: {
  label: string
  value: number
  blood?: boolean
}) {
  const filled = Math.round(value / 10)

  return (
    <div className="grid grid-cols-[4.5rem_1fr_2.75rem] items-center gap-3 md:grid-cols-[6rem_1fr_3.25rem] md:gap-5">
      <span className="text-[0.65rem] uppercase tracking-[0.26em] text-cream/50">
        {label}
      </span>
      <div className={cn("statbar h-2.5 md:h-3", blood && "blood")}>
        {Array.from({ length: 10 }, (_, i) => (
          <i key={i} className={i < filled ? "on" : undefined} />
        ))}
      </div>
      <span className="text-right text-sm tabular-nums text-gold-primary">
        {value}
      </span>
    </div>
  )
}

function statusBadgeClass(status: Dragon["status"]) {
  if (status === "dead") return "border-blood-bright/60 bg-blood/40 text-blood-bright"
  if (status === "alive") return "border-gold-primary/60 bg-gold-primary/20 text-gold-light"
  return "border-cream/30 bg-black/40 text-cream/70"
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default async function DragonProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dragon = dragonBySlug(slug)

  if (!dragon) notFound()

  const gallery = dragon.images.slice(1)

  return (
    <div className="pb-20 pt-24">
      {/* Back link */}
      <div className="mx-auto mb-6 max-w-6xl px-4">
        <Link
          href="/dragons"
          className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
        >
          ← All Dragons
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[340px] w-full overflow-hidden md:h-[55vh]">
        <Image
          src={dragon.images[0]}
          alt={dragon.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-8">
            <p className="eyebrow">{eraLabel[dragon.era]}</p>
            <h1 className="mt-3 text-4xl font-bold text-gold-primary md:text-6xl">
              {dragon.name}
            </h1>
            {dragon.epithet && (
              <p className="mt-2 font-cinzel text-lg italic text-cream/75 md:text-2xl">
                {dragon.epithet}
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]",
                  statusBadgeClass(dragon.status),
                )}
              >
                {statusLabel[dragon.status]}
              </span>
              <span className="rounded-full border border-gold-primary/40 bg-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream/80 backdrop-blur-sm">
                {dragon.allegiance === "targaryen"
                  ? "Targaryen-Bonded"
                  : "Wild Dragon"}
              </span>
              <span className="rounded-full border border-cream/25 bg-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream/70 backdrop-blur-sm">
                {eraLabel[dragon.era]}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-10 max-w-6xl space-y-14 px-4">
        {/* Fact grid */}
        <ScrollReveal variant="up">
          <dl className="panel parchment grid grid-cols-2 gap-5 p-6 md:grid-cols-5">
            <Fact label="House">
              {dragon.houseRef ? (
                <RefChip item={dragon.houseRef} />
              ) : (
                <span className="text-cream/50">—</span>
              )}
            </Fact>
            <Fact label="Rider">
              {dragon.rider ? (
                dragon.riderRef ? (
                  <RefChip item={dragon.riderRef} />
                ) : (
                  dragon.rider
                )
              ) : (
                <span className="text-cream/50">Unridden</span>
              )}
            </Fact>
            <Fact label="Color">{dragon.color}</Fact>
            <Fact label="Status">{statusLabel[dragon.status]}</Fact>
            <Fact label="Era">{eraLabel[dragon.era]}</Fact>
          </dl>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal variant="up">
          <section>
            <div className="rule mb-6">
              <p className="eyebrow">Measure of the Beast</p>
            </div>
            <div className="panel space-y-5 p-6 md:p-8">
              <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3 md:grid-cols-[6rem_1fr] md:gap-5">
                <span className="text-[0.65rem] uppercase tracking-[0.26em] text-cream/50">
                  Bond
                </span>
                <p className="text-sm text-cream">
                  {dragon.rider ? (
                    dragon.riderRef ? (
                      <Link
                        href={hrefForRef(dragon.riderRef)}
                        className="text-gold-primary transition hover:text-gold-light"
                      >
                        {dragon.rider}
                      </Link>
                    ) : (
                      dragon.rider
                    )
                  ) : (
                    <span className="text-cream/60">
                      Unridden — a free and wild beast
                    </span>
                  )}
                </p>
              </div>
              <StatRow label="Size" value={dragon.stats.size} />
              <StatRow label="Age" value={dragon.stats.age} />
              <StatRow label="Combat" value={dragon.stats.combat} blood />
              <StatRow label="Speed" value={dragon.stats.speed} />
            </div>
          </section>
        </ScrollReveal>

        {/* Battles */}
        <ScrollReveal variant="up">
          <section>
            <div className="rule mb-6">
              <p className="eyebrow">Known Battles</p>
            </div>
            {dragon.battles.length > 0 ? (
              <div className="flex flex-wrap gap-2.5">
                {dragon.battles.map(b => (
                  <RefChip key={`${b.type}-${b.slug}`} item={b} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-cream/55">
                No battle is recorded in the chronicles of the Dance — {dragon.name}
                {dragon.epithet ? ` ${dragon.epithet}` : ""} never met another dragon
                in the sky.
              </p>
            )}
          </section>
        </ScrollReveal>

        {/* Lore */}
        <ScrollReveal variant="up">
          <section>
            <div className="rule mb-6">
              <p className="eyebrow">Lore</p>
            </div>
            <div className="max-w-3xl space-y-5">
              {dragon.lore.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-cream/75 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Related */}
        {dragon.refs.length > 0 && (
          <ScrollReveal variant="up">
            <section>
              <div className="rule mb-6">
                <p className="eyebrow">Related</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {dragon.refs.map(r => (
                  <RefChip key={`${r.type}-${r.slug}`} item={r} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <ScrollReveal variant="up">
            <section>
              <div className="rule mb-6">
                <p className="eyebrow">Gallery</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {gallery.map((src, i) => (
                  <div
                    key={src}
                    className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-gold-primary/20 transition hover:border-gold-primary/50"
                  >
                    <Image
                      src={src}
                      alt={`${dragon.name} ${i + 2}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Prev / next */}
        <ScrollReveal variant="up">
          <nav className="flex items-center justify-between border-t border-gold-primary/20 pt-8">
            <Link
              href="/dragons"
              className="text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
            >
              ← Back to all dragons
            </Link>
            <Link href="/timeline" className="text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary">
              The Dance Timeline →
            </Link>
          </nav>
        </ScrollReveal>
      </div>
    </div>
  )
}
