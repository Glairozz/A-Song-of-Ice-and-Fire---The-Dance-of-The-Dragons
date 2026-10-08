"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Search, CornerDownLeft } from "lucide-react"
import type { EntityType } from "@/data/types"
import { entityGlyph } from "@/lib/links"
import { searchAll } from "@/data/search"

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const results = useMemo(() => searchAll(query, 10), [query])

  /* Close + reset so the next open always starts fresh. */
  const close = useCallback(() => {
    setQuery("")
    setActive(0)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, results.length - 1))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === "Enter" && results[active]) {
        const href = results[active].href
        close()
        router.push(href)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, results, active, close, router])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            role="dialog"
            aria-label="Search the archive"
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gold-primary/30 bg-ink/95 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-gold-primary/20 px-4 py-3">
              <Search size={18} className="text-gold-primary shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                placeholder="Search dragons, houses, characters, places, events…"
                className="w-full bg-transparent text-cream placeholder:text-cream/40 outline-none text-sm md:text-base"
                aria-label="Search query"
              />
              <kbd className="hidden md:block rounded border border-gold-primary/30 px-2 py-0.5 text-[10px] uppercase tracking-widest text-cream/50">
                esc
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-cream/50">
                  {query
                    ? `Nothing in the archive matches “${query}”.`
                    : "Start typing to search the archive."}
                </p>
              )}

              {results.map((r, i) => (
                <button
                  key={`${r.type}-${r.slug}`}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    close()
                    router.push(r.href)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === active ? "bg-gold-primary/15" : "hover:bg-gold-primary/10"
                  }`}
                >
                  <span className="text-lg" aria-hidden>
                    {entityGlyph[r.type as EntityType]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-cream">
                      {r.title}
                    </span>
                    <span className="block truncate text-xs text-cream/50">
                      {r.subtitle}
                    </span>
                  </span>
                  <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.2em] text-gold-primary/70 sm:block">
                    {r.type}
                  </span>
                  {i === active && (
                    <CornerDownLeft size={14} className="shrink-0 text-cream/50" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gold-primary/20 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cream/40">
              <span>↑ ↓ to navigate</span>
              <span>Enter to open</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
