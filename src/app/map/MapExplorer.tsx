"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { locationBySlug, locations } from "@/data/locations"
import type { Location } from "@/data/types"
import { entityGlyph, hrefForRef } from "@/lib/links"
import { cn } from "@/lib/utils"

/**
 * `public/map.webp` is 2148 × 1399 — the stage matches the artwork's
 * aspect ratio exactly, so marker percents always line up with the map.
 * The artwork shows Westeros (left third), the Narrow Sea and Essos.
 */
const MAP_W = 2148
const MAP_H = 1399
const MAP_ASPECT = MAP_W / MAP_H

const MIN_ZOOM = 1
const MAX_ZOOM = 2
const ZOOM_STEP = 0.25
const SELECT_ZOOM = 1.6

const CHIP =
  "inline-flex items-center gap-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/10 px-3 py-1 text-xs text-cream transition hover:border-gold-primary/60 hover:bg-gold-primary/20"

interface Offset {
  x: number
  y: number
}

/** Map stage box inside the viewport, in viewport-local px. */
function stageBox(vpW: number, vpH: number) {
  const h = vpW / MAP_ASPECT
  const top = (vpH - h) / 2
  return { w: vpW, h, top }
}

/** A location's marker in viewport-local px. */
function contentPoint(target: Location, vpW: number, vpH: number): Offset {
  const s = stageBox(vpW, vpH)
  return { x: (target.map.x / 100) * s.w, y: s.top + (target.map.y / 100) * s.h }
}

/** Keep the scaled map covering the viewport — never reveal the void. */
function clampOffset(dx: number, dy: number, zoom: number, vpW: number, vpH: number): Offset {
  const s = stageBox(vpW, vpH)
  const x = Math.min(0, Math.max(vpW * (1 - zoom), dx))
  const minY = vpH - zoom * (s.top + s.h)
  const maxY = -zoom * s.top
  const y =
    minY > maxY ? (vpH - zoom * s.h) / 2 - zoom * s.top : Math.min(maxY, Math.max(minY, dy))
  return { x, y }
}

const round2 = (n: number) => Math.round(n * 100) / 100

/* ------------------------------------------------------------------ *
 * Searchable list of locations — rendered in the desktop side panel
 * and (on smaller screens) below the map. Both copies share one query.
 * ------------------------------------------------------------------ */
interface PlacesListProps {
  query: string
  onQueryChange: (q: string) => void
  selectedSlug: string | null
  onSelect: (slug: string) => void
  inputId: string
}

function PlacesList({ query, onQueryChange, selectedSlug, onSelect, inputId }: PlacesListProps) {
  const q = query.trim().toLowerCase()
  const shown = q
    ? locations.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.region.toLowerCase().includes(q) ||
          l.type.toLowerCase().includes(q),
      )
    : locations

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="eyebrow mb-0">Places of the Realm</h3>
        <span className="rounded-full border border-gold-primary/20 bg-black/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-cream/50">
          {shown.length} of {locations.length}
        </span>
      </div>

      <label className="relative mb-3 block">
        <span className="sr-only">Search locations by name or region</span>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search castles, cities, regions…"
          className="w-full rounded-xl border border-gold-primary/20 bg-black/40 px-3.5 py-2.5 pr-9 text-sm text-cream outline-none transition placeholder:text-cream/35 focus:border-gold-primary/70 focus:bg-black/60"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-primary/60"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </label>

      {shown.length > 0 ? (
        <ul className="grid gap-2">
          {shown.map((loc) => {
            const isSel = loc.slug === selectedSlug
            return (
              <li key={loc.slug}>
                <button
                  type="button"
                  onClick={() => onSelect(loc.slug)}
                  aria-pressed={isSel}
                  className={cn(
                    "group flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                    isSel
                      ? "border-gold-primary/70 bg-gold-primary/15"
                      : "border-gold-primary/20 bg-black/30 hover:border-gold-primary/50 hover:bg-gold-primary/10",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-cream">{loc.name}</span>
                    <span className="block truncate text-[11px] uppercase tracking-wider text-cream/45">
                      {loc.region} · {loc.type}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "text-gold-primary transition-opacity",
                      isSel ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-gold-primary/25 bg-black/20 px-4 py-6 text-center text-xs leading-relaxed text-cream/45">
          Nothing in the realm matches {`“${query.trim()}”`}. Try a castle, a city or a region —
          or a place involved in the Dance.
        </p>
      )}
    </div>
  )
}

export function MapExplorer() {
  const searchParams = useSearchParams()
  const viewportRef = useRef<HTMLDivElement>(null)
  const initRef = useRef(false)
  const movedRef = useRef(false)
  const dragRef = useRef<{
    id: number
    startX: number
    startY: number
    ox: number
    oy: number
  } | null>(null)

  const [vp, setVp] = useState<{ w: number; h: number } | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [query, setQuery] = useState("")

  const selected = selectedSlug ? locationBySlug(selectedSlug) : undefined

  /* Keep the latest zoom readable from the long-lived observer below. */
  const zoomRef = useRef(zoom)
  zoomRef.current = zoom

  /* Measure the viewport (needed for all pan / zoom maths). */
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect
      setVp({ w: r.width, h: r.height })
      // Re-clamp the pan offset whenever the frame changes size so the
      // scaled map can never expose an empty edge.
      setOffset((o) => clampOffset(o.x, o.y, zoomRef.current, r.width, r.height))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  /* Honour /map?focus=<slug> deep links once the viewport is measured. */
  useEffect(() => {
    if (initRef.current || !vp) return
    initRef.current = true
    const slug = searchParams.get("focus")
    if (slug && locationBySlug(slug)) select(slug, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, vp])

  /* Escape closes the detail panel. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSlug(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /* ---------------------------------------------------------------- *
   * Selection + zoom
   * ---------------------------------------------------------------- */
  function select(slug: string, center = false) {
    const target = locationBySlug(slug)
    if (!target) return
    setSelectedSlug(slug)
    if (!center || !vp) return
    const m = contentPoint(target, vp.w, vp.h)
    const next = Math.max(zoom, SELECT_ZOOM)
    setZoom(next)
    setOffset(clampOffset(vp.w / 2 - next * m.x, vp.h / 2 - next * m.y, next, vp.w, vp.h))
  }

  function zoomTo(raw: number) {
    const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, round2(raw)))
    if (!vp) {
      setZoom(next)
      return
    }
    const cx = vp.w / 2
    const cy = vp.h / 2
    let dx: number
    let dy: number
    const sel = selectedSlug ? locationBySlug(selectedSlug) : null
    if (sel) {
      // Origin = selected marker: it keeps its screen position while zooming.
      const m = contentPoint(sel, vp.w, vp.h)
      dx = zoom * m.x + offset.x - next * m.x
      dy = zoom * m.y + offset.y - next * m.y
    } else {
      // No selection: keep the centre of the view fixed.
      dx = cx - ((cx - offset.x) / zoom) * next
      dy = cy - ((cy - offset.y) / zoom) * next
    }
    setZoom(next)
    setOffset(clampOffset(dx, dy, next, vp.w, vp.h))
  }

  function reset() {
    setZoom(MIN_ZOOM)
    setOffset({ x: 0, y: 0 })
  }

  /* ---------------------------------------------------------------- *
   * Drag-to-pan (pointer events, only while zoomed in)
   * ---------------------------------------------------------------- */
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (zoom <= MIN_ZOOM) return
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      ox: offset.x,
      oy: offset.y,
    }
    movedRef.current = false
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = dragRef.current
    if (!d || d.id !== e.pointerId || !vp) return
    const rawX = d.ox + (e.clientX - d.startX)
    const rawY = d.oy + (e.clientY - d.startY)
    if (!movedRef.current && Math.hypot(rawX - d.ox, rawY - d.oy) > 4) {
      movedRef.current = true
      setDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    if (movedRef.current) setOffset(clampOffset(rawX, rawY, zoom, vp.w, vp.h))
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (dragRef.current?.id === e.pointerId) dragRef.current = null
    setDragging(false)
  }

  function onMarkerClick(slug: string) {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    select(slug, false)
  }

  /* ---------------------------------------------------------------- *
   * Render
   * ---------------------------------------------------------------- */
  return (
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* ---------------------------------------------------------- *
       * Canvas + list
       * ---------------------------------------------------------- */}
      <div className="min-w-0">
        <div
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{ touchAction: zoom > MIN_ZOOM ? "none" : "auto" }}
          className={cn(
            "relative aspect-[2148/1399] min-h-[420px] w-full overflow-hidden rounded-2xl border border-gold-primary/35 bg-black shadow-[0_30px_80px_-50px_rgba(184,107,0,0.7)]",
            zoom > MIN_ZOOM && (dragging ? "cursor-grabbing" : "cursor-grab"),
          )}
        >
          {/* Stage — matches the artwork exactly; centred vertically when
              the min-height makes the frame taller than the map. */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: "0 0",
                transition: dragging
                  ? "none"
                  : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Image
                src="/map.webp"
                alt="Map of Westeros"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {/* Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,9,8,0.65)_100%)]" />

              {/* Markers */}
              {locations.map((loc) => {
                const isSel = loc.slug === selectedSlug
                return (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => onMarkerClick(loc.slug)}
                    aria-label={`Show ${loc.name} on the map`}
                    aria-pressed={isSel}
                    className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none"
                    style={{ left: `${loc.map.x}%`, top: `${loc.map.y}%` }}
                  >
                    {/* Counter-scaled so markers keep a constant screen size. */}
                    <span
                      className="relative block h-4 w-4"
                      style={{ transform: `scale(${1 / zoom})` }}
                    >
                      <span className="absolute inset-0 rounded-full border border-gold-light opacity-0 transition-all duration-500 group-hover:scale-[2.2] group-hover:opacity-100 group-focus-visible:scale-[2.2] group-focus-visible:opacity-100" />
                      {isSel && (
                        <span className="absolute inset-0 animate-ping rounded-full border-2 border-gold-light/70" />
                      )}
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full border transition-colors",
                          isSel
                            ? "border-gold-light"
                            : "border-gold-primary/70 group-hover:border-gold-light",
                        )}
                      />
                      <span
                        className={cn(
                          "absolute inset-[3.5px] rounded-full transition-colors",
                          isSel
                            ? "bg-gold-light shadow-[0_0_14px_rgba(212,130,15,0.95)]"
                            : "bg-gold-primary shadow-[0_0_8px_rgba(184,107,0,0.85)] group-hover:bg-gold-light",
                        )}
                      />
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold-primary/50 bg-ink/95 px-2.5 py-1 text-[11px] tracking-wide text-cream opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        {loc.name}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Zoom controls */}
          <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
            <button
              type="button"
              aria-label="Zoom in"
              disabled={zoom >= MAX_ZOOM}
              onClick={() => zoomTo(zoom + ZOOM_STEP)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/40 bg-ink/85 text-lg text-cream backdrop-blur transition hover:border-gold-primary/80 hover:bg-gold-primary/25 disabled:pointer-events-none disabled:opacity-35"
            >
              +
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              disabled={zoom <= MIN_ZOOM}
              onClick={() => zoomTo(zoom - ZOOM_STEP)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-primary/40 bg-ink/85 text-lg text-cream backdrop-blur transition hover:border-gold-primary/80 hover:bg-gold-primary/25 disabled:pointer-events-none disabled:opacity-35"
            >
              −
            </button>
            <button
              type="button"
              aria-label="Reset the map view"
              onClick={reset}
              className="flex h-9 items-center gap-1.5 rounded-full border border-gold-primary/40 bg-ink/85 px-3 text-[11px] uppercase tracking-widest text-cream backdrop-blur transition hover:border-gold-primary/80 hover:bg-gold-primary/25"
            >
              Reset
            </button>
          </div>

          {/* Scale readout */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-full border border-gold-primary/30 bg-ink/80 px-3 py-1 text-[11px] tracking-widest text-cream/70 backdrop-blur">
            ×{zoom.toFixed(2).replace(/\.?0+$/, "")} · drag to pan · click a marker
          </div>
        </div>

        {/* Searchable list of all ten locations — shown under the map on
            compact screens; the desktop side panel hosts its own copy. */}
        <div className="mt-4 lg:hidden">
          <PlacesList
            query={query}
            onQueryChange={setQuery}
            selectedSlug={selectedSlug}
            onSelect={(slug) => select(slug, true)}
            inputId="places-mobile"
          />
        </div>
      </div>

      {/* ---------------------------------------------------------- *
       * Detail panel — right drawer on desktop, bottom sheet on mobile
       * ---------------------------------------------------------- */}
      <aside
        aria-label="Location details"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 max-h-[58vh] overflow-y-auto rounded-t-3xl border-t border-gold-primary/40 bg-ink/95 shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur transition-transform duration-500 lg:sticky lg:top-24 lg:z-auto lg:max-h-[calc(100vh-8rem)] lg:translate-y-0 lg:rounded-2xl lg:border lg:border-gold-primary/30",
          selected ? "translate-y-0" : "translate-y-full",
        )}
      >
        {selected ? (
          <div>
            <div className="relative h-32 shrink-0 overflow-hidden">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                aria-label="Close location panel"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-gold-primary/40 bg-ink/80 text-cream transition hover:border-gold-primary/80 hover:bg-gold-primary/25"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <p className="eyebrow mb-1">{selected.region}</p>
                <h2 className="text-xl font-bold text-gold-primary">{selected.name}</h2>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-gold-primary/20 bg-black/40 px-3 py-2">
                  <span className="block text-[10px] uppercase tracking-widest text-gold-primary/70">
                    Type
                  </span>
                  <span className="text-cream capitalize">{selected.type}</span>
                </div>
                <div className="rounded-lg border border-gold-primary/20 bg-black/40 px-3 py-2">
                  <span className="block text-[10px] uppercase tracking-widest text-gold-primary/70">
                    Region
                  </span>
                  <span className="text-cream">{selected.region}</span>
                </div>
              </div>

              {selected.holder && (
                <p className="text-xs leading-relaxed text-cream/70">
                  <span className="text-gold-primary/80">Held by: </span>
                  {selected.holder}
                </p>
              )}

              <p className="text-sm leading-relaxed text-cream/75">{selected.description}</p>
              <p className="line-clamp-4 border-l-2 border-gold-primary/40 pl-3 text-xs italic leading-relaxed text-cream/50">
                {selected.lore[0]}
              </p>

              {selected.houseRef && (
                <div>
                  <h3 className="eyebrow mb-2">Allegiance</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link href={hrefForRef(selected.houseRef)} className={CHIP}>
                      <span aria-hidden="true">{entityGlyph.house}</span>
                      {selected.houseRef.label}
                    </Link>
                  </div>
                </div>
              )}

              {selected.notable.length > 0 && (
                <div>
                  <h3 className="eyebrow mb-2">Notable figures</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.notable.map((ref) => (
                      <Link key={ref.slug} href={hrefForRef(ref)} className={CHIP}>
                        <span aria-hidden="true">{entityGlyph.character}</span>
                        {ref.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {selected.events.length > 0 && (
                <div>
                  <h3 className="eyebrow mb-2">Key events</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.events.map((ref) => (
                      <Link key={ref.slug} href={hrefForRef(ref)} className={CHIP}>
                        <span aria-hidden="true">{entityGlyph.event}</span>
                        {ref.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="eyebrow mb-2">Nearby</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.nearby.map((ref) => (
                    <button
                      key={ref.slug}
                      type="button"
                      onClick={() => select(ref.slug, true)}
                      className={CHIP}
                    >
                      <span aria-hidden="true">{entityGlyph.location}</span>
                      {ref.label}
                    </button>
                  ))}
                </div>
              </div>

              <Link
                href={`/locations/${selected.slug}`}
                className="flex w-full items-center justify-center rounded-full border border-gold-primary/40 bg-gold-primary/10 px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-cream transition hover:border-gold-primary/80 hover:bg-gold-primary/25"
              >
                Full entry →
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden flex-col gap-4 p-4 lg:flex lg:min-h-[280px]">
            <div className="text-center">
              <span className="text-2xl text-gold-primary" aria-hidden="true">
                ✦
              </span>
              <p className="mt-2 text-xs leading-relaxed text-cream/60">
                Choose a marker on the map — or search the realm below — to read its story, its
                people and the events that shaped the Dance.
              </p>
            </div>
            <PlacesList
              query={query}
              onQueryChange={setQuery}
              selectedSlug={selectedSlug}
              onSelect={(slug) => select(slug, true)}
              inputId="places-desktop"
            />
          </div>
        )}
      </aside>
    </div>
  )
}
