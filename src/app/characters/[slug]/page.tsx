import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ScrollReveal } from "@/components/ScrollReveal"
import { characterBySlug, characters, houseSigil } from "@/data/characters"
import type { Character, EntityRef, LifeStatus } from "@/data/types"
import { cn } from "@/lib/utils"
import { entityGlyph, hrefForRef } from "@/lib/links"

export async function generateStaticParams() {
  return characters.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const char = characterBySlug(slug)

  if (!char) return { title: "Character not found" }

  return {
    title: char.name,
    description: char.description,
    openGraph: {
      title: `${char.name}${char.epithet ? ` · ${char.epithet}` : ""}`,
      description: char.description,
      ...(char.image ? { images: [char.image] } : {}),
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

const statusLabel: Record<LifeStatus, string> = {
  alive: "Alive",
  dead: "Dead",
  unknown: "Fate Unknown",
}

function statusBadgeClass(status: LifeStatus) {
  if (status === "dead") return "border-blood-bright/60 bg-blood/40 text-blood-bright"
  if (status === "alive") return "border-gold-primary/60 bg-gold-primary/20 text-gold-light"
  return "border-cream/30 bg-black/40 text-cream/70"
}

const eraLabel: Record<Character["era"], string> = {
  dance: "The Dance of the Dragons",
  got: "A Song of Ice and Fire",
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export default async function CharacterProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const char = characterBySlug(slug)

  if (!char) notFound()

  const index = characters.findIndex(c => c.slug === char.slug)
  const prev = index > 0 ? characters[index - 1] : undefined
  const next =
    index >= 0 && index < characters.length - 1 ? characters[index + 1] : undefined

  const related = characters
    .filter(c => c.house === char.house && c.slug !== char.slug)
    .slice(0, 6)

  const appearing = char.refs.filter(
    r => r.type === "event" || r.type === "location",
  )
  const kin = char.refs.filter(r => r.type === "character" || r.type === "house")
  const showAppears = appearing.length > 0 || kin.length === 0

  return (
    <div className="pb-20 pt-24">
      {/* Back link */}
      <div className="mx-auto mb-6 max-w-6xl px-4">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
        >
          ← All Characters
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[45vh] min-h-[340px] w-full md:h-[55vh]">
          {char.image && (
            <Image
              src={char.image}
              alt={char.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-8">
            <p className="eyebrow">{eraLabel[char.era]}</p>
            <h1 className="mt-3 text-4xl font-bold text-gold-primary md:text-6xl">
              {char.name}
            </h1>
            {char.epithet && (
              <p className="mt-2 font-cinzel text-lg italic text-cream/75 md:text-2xl">
                {char.epithet}
              </p>
            )}
            {char.title && (
              <p className="mt-1.5 text-sm text-cream/70 md:text-base">{char.title}</p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                href={`/houses/${char.house}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-primary/40 bg-gold-primary/15 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold-light transition hover:border-gold-primary/70 hover:bg-gold-primary/25"
              >
                <span aria-hidden="true">{houseSigil[char.house] ?? "🏰"}</span>
                {char.houseLabel}
              </Link>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em]",
                  statusBadgeClass(char.status),
                )}
              >
                {statusLabel[char.status]}
              </span>
              <span className="rounded-full border border-cream/25 bg-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-cream/70 backdrop-blur-sm">
                {eraLabel[char.era]}
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
              <Link
                href={`/houses/${char.house}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"
              >
                <span aria-hidden="true">{houseSigil[char.house] ?? "🏰"}</span>
                {char.houseLabel}
              </Link>
            </Fact>
            <Fact label="Title">
              {char.title ? (
                char.title
              ) : (
                <span className="text-cream/50">—</span>
              )}
            </Fact>
            <Fact label="Status">{statusLabel[char.status]}</Fact>
            <Fact label="Born">
              {char.born ?? <span className="text-cream/50">Unknown</span>}
            </Fact>
            <Fact label="Died">
              {char.died ?? (
                <span className="text-cream/50">
                  {char.status === "alive" ? "Still living" : "Unknown"}
                </span>
              )}
            </Fact>
          </dl>
        </ScrollReveal>

        {/* Dragon */}
        {char.dragonRef && (
          <ScrollReveal variant="up">
            <section>
              <div className="rule mb-6">
                <p className="eyebrow">Dragon</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <RefChip item={char.dragonRef} />
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Lore */}
        <ScrollReveal variant="up">
          <section>
            <div className="rule mb-6">
              <p className="eyebrow">Lore</p>
            </div>
            <div className="max-w-3xl space-y-5">
              {char.lore.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-cream/75 md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Appears in */}
        {showAppears && (
          <ScrollReveal variant="up">
            <section>
              <div className="rule mb-6">
                <p className="eyebrow">Appears in</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {appearing.map(r => (
                  <RefChip key={`${r.type}-${r.slug}`} item={r} />
                ))}
                {appearing.length === 0 &&
                  char.refs.map(r => (
                    <RefChip key={`${r.type}-${r.slug}`} item={r} />
                  ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Kin & allies */}
        {kin.length > 0 && (
          <ScrollReveal variant="up">
            <section>
              <div className="rule mb-6">
                <p className="eyebrow">Kin &amp; Allies</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {kin.map(r => (
                  <RefChip key={`${r.type}-${r.slug}`} item={r} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Related figures */}
        {related.length > 0 && (
          <ScrollReveal variant="up">
            <section>
              <div className="rule mb-6">
                <p className="eyebrow">Related Figures</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/characters/${r.slug}`}
                    className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-gold-primary/20 bg-black/40 p-3 backdrop-blur-sm transition-all duration-500 hover:border-gold-primary/50"
                  >
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border border-gold-primary/20">
                      {r.image && (
                        <Image
                          src={r.image}
                          alt={r.name}
                          fill
                          sizes="80px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gold-primary transition-colors group-hover:text-gold-light">
                        {r.name}
                      </p>
                      {r.title && (
                        <p className="truncate text-xs italic text-cream/60">{r.title}</p>
                      )}
                      <p className="mt-1 inline-flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-cream/45">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            r.status === "alive"
                              ? "bg-emerald-400"
                              : r.status === "dead"
                                ? "bg-blood-bright"
                                : "bg-cream/50",
                          )}
                          aria-hidden="true"
                        />
                        {statusLabel[r.status]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Prev / next */}
        <ScrollReveal variant="up">
          <nav className="flex items-center justify-between gap-4 border-t border-gold-primary/20 pt-8">
            {prev ? (
              <Link
                href={`/characters/${prev.slug}`}
                className="text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
              >
                ← {prev.name}
              </Link>
            ) : (
              <Link
                href="/characters"
                className="text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
              >
                ← All characters
              </Link>
            )}
            {next ? (
              <Link
                href={`/characters/${next.slug}`}
                className="text-right text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
              >
                {next.name} →
              </Link>
            ) : (
              <Link
                href="/timeline"
                className="text-right text-[0.7rem] uppercase tracking-[0.3em] text-gold-primary/80 transition hover:text-gold-primary"
              >
                The Dance Timeline →
              </Link>
            )}
          </nav>
        </ScrollReveal>
      </div>
    </div>
  )
}
