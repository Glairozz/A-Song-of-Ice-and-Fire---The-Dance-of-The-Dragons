"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { motion } from "framer-motion"

const magicElements = [
  { name: "Warging / Skinchanging", description: "Ability to enter the minds of animals or other beings; strongest among the First Men and wildlings.", src: "/magic/skinchanging.jpg" },
  { name: "Greensight", description: "Prophetic visions or dreams; sometimes linked to weirwoods or children of the forest.", src: "/magic/greensight.jpg" },
  { name: "Weirwood Trees", description: "White-barked, red-leafed trees tied to ancient magic and memory.", src: "/magic/weirwoodtrees.webp" },
  { name: "Ice Magic (White Walkers)", description: "Magic that raises the dead, controls cold, and empowers ice creatures.", src: "/magic/icemagic.jpg" },
  { name: "Fire Magic (R'hllor / Red Priests)", description: "Miracles like resurrection (Beric, Jon Snow), shadowborn assassins, and prophetic flames.", src: "/magic/firemagic.jpg" },
  { name: "Valyrian Steel", description: "Magic-forged metal that can kill White Walkers; nearly lost art.", src: "/magic/valyriansteel.jpg" },
  { name: "Glass Candles", description: "Obsidian artifacts used by the Valyrians for seeing across distances and influencing dreams.", src: "/magic/glasscandles.jpg" },
  { name: "Dragonglass (Obsidian)", description: "Volcanic glass that kills White Walkers; found in abundance at Dragonstone.", src: "/magic/dragonglass.jpg" },
]

export default function Magic() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-primary text-center mb-8">Mystical Elements</h1>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-12 max-w-4xl mx-auto text-center">
            Magic in this world is ancient, powerful, and often unpredictable. Dragons represent the most iconic form of
            magic—creatures tied deeply to the Valyrian bloodline and capable of reshaping kingdoms through fire and fear.
            Other forces, such as the warging abilities of the North or the prophetic visions of greenseers, hint at a
            deeper natural magic rooted in the Children of the Forest and the sacred weirwoods. Contrasting these are the
            sorceries of fire and ice. The White Walkers wield cold magic that raises the dead, while the followers of
            R&apos;hllor call upon flames for resurrection and prophecy. Rare materials like dragonglass and Valyrian
            steel, forged through lost magical arts, stand as remnants of bygone ages.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.2}>
          <div className="bg-black/40 border border-gold-primary/20 rounded-2xl p-6 backdrop-blur-sm mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-gold-primary text-center mb-4">Dragons</h2>
            <p className="text-cream/60 text-sm md:text-base leading-relaxed text-center mb-6 max-w-2xl mx-auto">
              Fire-breathing reptiles born of Valyria; magic returns to the world when Daenerys hatches three eggs.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gold-primary/20 group">
                  <Image
                    src={`/magic/dragons/d${i + 1}.jpg`}
                    alt={`Dragon ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magicElements.map((el, i) => (
            <ScrollReveal key={el.name} variant="up" delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-black/40 border border-gold-primary/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gold-primary/50 transition-all duration-500 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={el.src}
                    alt={el.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gold-primary mb-2">{el.name}</h2>
                  <p className="text-cream/60 text-sm leading-relaxed">{el.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
