"use client"

import { ScrollReveal } from "@/components/ScrollReveal"
import { motion } from "framer-motion"

const races = [
  { name: "First Men", description: "The oldest human race in Westeros; strong ties to the Old Gods. Northerners like the Starks descend from them." },
  { name: "Andals", description: "Invaders who conquered most of Westeros after the First Men; followers of the Faith of the Seven." },
  { name: "Valyrians", description: "Dragonlords from ancient Valyria with silver-gold hair and violet eyes; ancestors of the Targaryens and Velaryons." },
  { name: "Children of the Forest", description: "Small, magical, ancient beings who lived in Westeros before humans; created the weirwoods." },
  { name: "Giants", description: "Large, near-extinct humanoids beyond the Wall; primitive but intelligent." },
  { name: "White Walkers (The Others)", description: "Supernatural ice beings who command the dead; ancient enemies of the living." },
  { name: "Wights", description: "Reanimated corpses controlled by the White Walkers; not a race, but an undead force." },
  { name: "Free Folk (Wildlings)", description: "Human tribes north of the Wall; fiercely independent and culturally unique." },
  { name: "Essosi Peoples", description: "Includes Dothraki (horse nomads), Ghiscari (slaver cities), Qartheen (merchant rulers), Braavosi, Lyseni, Volantenes, and more — each with distinct cultures and traditions." },
]

export default function Races() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="up">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-primary text-center mb-8">Races</h1>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-12 max-w-4xl mx-auto text-center">
            The world of Westeros and Essos is inhabited primarily by humans, but their identities are shaped by ancient
            lineages and cultural divisions. The First Men, the earliest human settlers, formed deep ties to the land and
            the Old Gods, while the later Andal invaders reshaped most of Westeros through conquest and their Faith of the
            Seven. The Valyrians, once rulers of a dragon-riding empire, stand apart due to their distinctive features and
            magical origins, represented most prominently by House Targaryen. Alongside humans exist older or supernatural
            beings: the Children of the Forest, mystical and nature-bound; giants, fading remnants of a wilder age; and the
            White Walkers, ancient ice entities tied to forgotten magic.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race, i) => (
            <ScrollReveal key={race.name} variant="up" delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-black/40 border border-gold-primary/20 rounded-2xl p-6 backdrop-blur-sm hover:border-gold-primary/50 transition-all duration-500 h-full"
              >
                <h2 className="text-lg md:text-xl font-bold text-gold-primary mb-3">{race.name}</h2>
                <p className="text-cream/60 text-sm leading-relaxed">{race.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
