"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

interface Dragon {
  name: string
  description: string
  images: string[]
}

const ancestorEra: Dragon[] = [
  { name: "Balerion the Black Dread", description: "The largest and most feared Targaryen dragon; black scales, black fire, and wings that blocked out the sun. Ridden by Aegon the Conqueror.", images: Array.from({ length: 5 }, (_, i) => `/dragons/balerion/b${i + 1}.webp`).map((s, i) => s.replace(".webp", [".webp", ".jpg", ".jpg", ".jpg", ".jpeg"][i])) },
  { name: "Vhagar", description: "A titan nearly as large as Balerion; bronze and green; lived for over 170 years. Ridden by Visenya, then Laena, then Aemond.", images: [`/dragons/vhagar/v1.jpg`, `/dragons/vhagar/v2.webp`, `/dragons/vhagar/v3.jpg`, `/dragons/vhagar/v4.webp`, `/dragons/vhagar/v5.jpg`] },
  { name: "Meraxes", description: "Massive silver dragon with golden eyes; ridden by Rhaenys Targaryen. Fell during the Dornish Wars.", images: [`/dragons/meraxes/m1.webp`, `/dragons/meraxes/m2.jpg`, `/dragons/meraxes/m3.jpg`, `/dragons/meraxes/m4.jpg`, `/dragons/meraxes/m5.jpg`] },
  { name: "Vermithor (Bronze Fury)", description: "Huge bronze dragon once ridden by King Jaehaerys I; one of the largest dragons ever after Balerion and Vhagar.", images: [`/dragons/vermithor/v1.webp`, `/dragons/vermithor/v2.jpg`, `/dragons/vermithor/v3.webp`, `/dragons/vermithor/v4.avif`, `/dragons/vermithor/v5.jpg`] },
  { name: "Silverwing", description: "A gentle silver dragon ridden by Queen Alysanne; known for her calm temperament.", images: [`/dragons/silverwing/s1.webp`, `/dragons/silverwing/s2.jpg`, `/dragons/silverwing/s3.jpg`, `/dragons/silverwing/s4.jpg`, `/dragons/silverwing/s5.png`] },
]

const danceEra: Dragon[] = [
  { name: "Caraxes (Blood Wyrm)", description: "Long, serpentine, blood-red dragon with a piercing scream; ridden by Daemon Targaryen.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/caraxes/c${i + 1}.jpg`).map((s, i) => i === 4 ? `/dragons2/caraxes/c5.png` : s) },
  { name: "Syrax", description: "Yellow-gold dragon ridden by Rhaenyra Targaryen; fast and aggressive, raised mostly in captivity.", images: [`/dragons2/syrax/s1.jpg`, `/dragons2/syrax/s2.jpg`, `/dragons2/syrax/s3.webp`, `/dragons2/syrax/s4.jpg`, `/dragons2/syrax/s5.jpg`] },
  { name: "Sunfyre (the Golden)", description: "Brilliant golden scales; considered the most beautiful dragon in history; ridden by Aegon II.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/sunfyre/s${i + 1}.jpg`) },
  { name: "Meleys (Red Queen)", description: "Red and pink scaled, extremely fast; ridden by Rhaenys Targaryen.", images: [`/dragons2/meleys/m1.jpg`, `/dragons2/meleys/m2.webp`, `/dragons2/meleys/m3.jpg`, `/dragons2/meleys/m4.jpg`, `/dragons2/meleys/m5.jpg`] },
  { name: "Moondancer", description: "Small but incredibly quick green dragon ridden by Baela Targaryen; built for agility rather than size.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/moondancer/m${i + 1}.jpg`) },
  { name: "Seasmoke", description: "Grey-white dragon, nimble and responsive; ridden first by Laenor Velaryon (show) and later Addam of Hull.", images: [`/dragons2/seasmoke/s1.avif`, `/dragons2/seasmoke/s2.jpg`, `/dragons2/seasmoke/s3.jpg`, `/dragons2/seasmoke/s4.webp`, `/dragons2/seasmoke/s5.jpg`] },
  { name: "Vermax", description: "Fiery young dragon ridden by Jacaerys Velaryon; known for rapid growth.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/vermax/v${i + 1}.jpg`) },
  { name: "Arrax", description: "White-and-gold young dragon ridden by Lucerys Velaryon; quick but inexperienced.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/arrax/a${i + 1}.jpg`) },
  { name: "Tessarion (Blue Queen)", description: "Shimmering cobalt dragon with copper flames; graceful and mid-sized.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/tessarion/t${i + 1}.jpg`) },
  { name: "Tyraxes", description: "Small, still-growing dragon bonded to Joffrey Velaryon; not battle-tested.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/tyraxes/t${i + 1}.jpg`) },
  { name: "Sheepstealer", description: "Wild brown dragon known for stealing livestock; eventually bonded to Ulf White.", images: [`/dragons2/sheepstealer/s1.jpg`, `/dragons2/sheepstealer/s2.jpg`, `/dragons2/sheepstealer/s3.webp`, `/dragons2/sheepstealer/s4.jpg`, `/dragons2/sheepstealer/s5.jpg`] },
  { name: "Cannibal", description: "Untamed black dragon of Dragonstone who fed on dead dragons and hatchlings; never ridden.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/cannibal/c${i + 1}.jpg`) },
  { name: "Grey Ghost", description: "Wild pale-grey dragon that avoided humans; rarely seen.", images: Array.from({ length: 5 }, (_, i) => `/dragons2/greyghost/g${i + 1}.jpg`) },
]

const gotEra: Dragon[] = [
  { name: "Drogon", description: "Black-and-red, largest of Daenerys's dragons; fierce, intelligent, and the closest in spirit to Balerion.", images: Array.from({ length: 5 }, (_, i) => `/dragons3/drogon/d${i + 1}.jpg`) },
  { name: "Rhaegal", description: "Green-and-bronze dragon; aggressive but loyal; named after Rhaegar Targaryen.", images: [`/dragons3/rhaegal/r1.jpg`, `/dragons3/rhaegal/r2.jpg`, `/dragons3/rhaegal/r3.webp`, `/dragons3/rhaegal/r4.jpg`, `/dragons3/rhaegal/r5.jpg`] },
  { name: "Viserion", description: "Cream-and-gold dragon; fiery and swift; becomes an undead ice dragon in the show.", images: Array.from({ length: 5 }, (_, i) => `/dragons3/viserion/v${i + 1}.jpg`) },
]

function DragonCard({ dragon, index }: { dragon: Dragon; index: number }) {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  return (
    <ScrollReveal variant="up" delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-black/40 border border-gold-primary/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gold-primary/50 transition-all duration-500"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold text-gold-primary mb-2">{dragon.name}</h3>
          <p className="text-cream/60 text-sm leading-relaxed mb-4">{dragon.description}</p>
        </div>
        <div className="overflow-hidden px-4 pb-4" ref={emblaRef}>
          <div className="flex gap-3">
            {dragon.images.map((src, i) => (
              <div key={i} className="flex-[0_0_200px] md:flex-[0_0_240px] relative h-40 md:h-44 rounded-xl overflow-hidden border border-gold-primary/20 group">
                <Image
                  src={src}
                  alt={`${dragon.name} ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="240px"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  )
}

export default function Dragons() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-primary text-center mb-8">
            Dragons that ruled Westeros
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <div className="max-w-4xl mx-auto mb-12 space-y-4 text-cream/70 text-sm md:text-base leading-relaxed">
            <p>Dragons in the world of Westeros trace their origins back to the ancient Valyrian Freehold, where they were first tamed and bred into living weapons. Giants like Balerion the Black Dread, Meraxes, and Vhagar helped carve out the Valyrian empire and later enabled Aegon the Conqueror to forge the Seven Kingdoms through fire and blood. These early dragons were immense, terrifying creatures—symbols of dominion whose legacy set the foundation for centuries of Targaryen power.</p>
            <p>During the <strong className="text-gold-primary">Dance of the Dragons</strong>, the last great age of dragonkind, more than twenty dragons still lived, each with unique temperaments, skills, and bonds to their riders. The skies of Westeros teemed with iconic beasts like the crimson Caraxes, the enormous and ancient Vhagar, the golden Sunfyre, and the bronze Vermithor. Carefully raised in Dragonstone and the Dragonpit, these dragons served not only as engines of war but also as political instruments—each one shaping succession, loyalty, and legitimacy during the brutal Targaryen civil war.</p>
            <p>By the era of <strong className="text-gold-primary">A Song of Ice and Fire</strong>, dragons have all but vanished from the world. Only three survive—Drogon, Rhaegal, and Viserion—hatched by Daenerys Targaryen centuries after the last known dragon died. Unlike their ancestors, these dragons grow without the guidance of dragonkeepers, established breeding practices, or the vast Valyrian knowledge once used to control their kind. Their return marks a resurgence of magic and a reminder of the Targaryens&apos; lost greatness, providing a stark contrast to the disciplined, widespread power dragons once held during the height of their reign.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up">
          <h2 className="text-2xl md:text-3xl font-bold text-cream text-center mb-8">Dragons from the Ancestor Era</h2>
        </ScrollReveal>
        <div className="space-y-6 mb-16">
          {ancestorEra.map((dragon, i) => (
            <DragonCard key={dragon.name} dragon={dragon} index={i} />
          ))}
        </div>

        <ScrollReveal variant="up">
          <h2 className="text-2xl md:text-3xl font-bold text-cream text-center mb-8">Dance of the Dragon Era</h2>
        </ScrollReveal>
        <div className="space-y-6 mb-16">
          {danceEra.map((dragon, i) => (
            <DragonCard key={dragon.name} dragon={dragon} index={i} />
          ))}
        </div>

        <ScrollReveal variant="up">
          <h2 className="text-2xl md:text-3xl font-bold text-cream text-center mb-8">A Song of Ice and Fire Era</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {gotEra.map((dragon, i) => (
            <DragonCard key={dragon.name} dragon={dragon} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
