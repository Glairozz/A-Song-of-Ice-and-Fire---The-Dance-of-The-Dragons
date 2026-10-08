"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "The Dance",
    links: [
      { href: "/dragons", label: "Dragons" },
      { href: "/characters", label: "Characters" },
      { href: "/timeline", label: "Timeline" },
      { href: "/map", label: "Interactive Map" },
    ],
  },
  {
    title: "Westeros",
    links: [
      { href: "/greathouses", label: "Great Houses" },
      { href: "/locations", label: "Locations" },
      { href: "/organizations", label: "Organizations" },
      { href: "/lobby", label: "Gallery" },
    ],
  },
  {
    title: "Lore",
    links: [
      { href: "/magic", label: "Magic" },
      { href: "/races", label: "Races" },
    ],
  },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative border-t border-gold-primary/20 bg-black/60 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.2em] text-gold-primary">
              THE DANCE
              <span className="mt-1 block text-[10px] tracking-[0.4em] text-cream/50">
                OF THE DRAGONS
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/55">
              An interactive archive of the Targaryen civil war and the wider
              world of A Song of Ice and Fire — every entry cross-linked.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-4">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/60 transition-colors hover:text-gold-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gold-primary/10 pt-6">
          <p className="text-xs leading-relaxed text-cream/40">
            This is a non-profit fan project. All characters, lore and imagery
            belong to George R.R. Martin, HBO and the associated rights holders.
          </p>
          <p className="mt-3 text-xs text-cream/30">
            &copy; {new Date().getFullYear()} The Dance of the Dragons — built with
            Next.js.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
