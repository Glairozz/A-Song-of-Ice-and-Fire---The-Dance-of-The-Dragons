"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { motion } from "framer-motion"

const locations = [
  { name: "King's Landing", description: "Capital of the Seven Kingdoms; home to the Red Keep and the Iron Throne.", src: "/location/kingslanding.webp" },
  { name: "Dragonstone", description: "Volcanic island and ancestral Targaryen seat; major dragon-hatching site.", src: "/location/dragonstone.jpg" },
  { name: "Winterfell", description: "Ancient northern stronghold of House Stark; built atop hot springs.", src: "/location/winterfell.jpg" },
  { name: "The Wall", description: "A colossal frozen barrier defending the realms of men from the far North; home to the Night's Watch.", src: "/location/thewall.jpg" },
  { name: "The North Beyond the Wall", description: "Harsh wilderness inhabited by Free Folk, giants, and White Walkers.", src: "/location/beyondthewall.jpg" },
  { name: "Oldtown", description: "Seat of the Hightowers; home to the Citadel and the Faith's origins.", src: "/location/oldtown.webp" },
  { name: "The Riverlands", description: "A central region often caught in wars; includes Riverrun and Harrenhal.", src: "/location/riverlands.jpg" },
  { name: "The Vale of Arryn", description: "Mountainous, isolated region guarded by the Eyrie.", src: "/location/vale.webp" },
  { name: "The Iron Islands", description: "Harsh seafaring land ruled by House Greyjoy.", src: "/location/ironislands.jpg" },
  { name: "Dorne", description: "Southern desert kingdom known for a hot climate and different customs.", src: "/location/dorne.avif" },
]

export default function Locations() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-primary text-center mb-8">Major Locations</h1>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-12 max-w-4xl mx-auto text-center">
            The geography of Westeros and Essos is shaped by powerful political centers and culturally distinct regions.
            King&apos;s Landing stands at the heart of the Seven Kingdoms as a symbol of royal authority, while Dragonstone
            represents the origins and strength of House Targaryen. Further north, Winterfell and the Wall anchor a harsher
            world shaped by ancient threats, while the exotic landscapes of Essos—from the Free Cities to Slaver&apos;s
            Bay—expand the story&apos;s scale and diversity. Each location carries centuries of history and conflict,
            influencing the struggles of characters and the shifting balance of power.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.name} variant="up" delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-black/40 border border-gold-primary/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gold-primary/50 transition-all duration-500 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={loc.src}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gold-primary mb-2">{loc.name}</h2>
                  <p className="text-cream/60 text-sm leading-relaxed">{loc.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
