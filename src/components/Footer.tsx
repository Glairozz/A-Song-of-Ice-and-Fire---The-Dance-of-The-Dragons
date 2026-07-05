"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative border-t border-gold-primary/20 bg-black/50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold-primary text-lg font-bold mb-4">About</h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              A fan-made tribute to the world of A Song of Ice and Fire and House of the Dragon.
              Explore the rich lore of Westeros and beyond.
            </p>
          </div>
          <div>
            <h3 className="text-gold-primary text-lg font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              {["Great Houses", "Dragons", "Races", "Locations"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-cream/60 hover:text-gold-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-gold-primary text-lg font-bold mb-4">Disclaimer</h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              This is a non-profit fan project. All content belongs to George R.R. Martin,
              HBO, and associated rights holders.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gold-primary/10 text-center">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Fan Project &mdash; For the Throne
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
