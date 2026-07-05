"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"

export default function Lobby() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal variant="up">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-gold-primary mb-4">
              Hi there, <strong className="text-cream">Thronies</strong>!
            </h1>
            <p className="text-cream/80 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Welcome, devoted fans of Westeros and beyond! Step into a world where dragons soar over ancient castles,
              where honor and ambition clash in the halls of kings and queens, and where every choice can tip the balance
              of kingdoms. Here, the fire of the Targaryens meets the icy resolve of the North, and every story—whether
              whispered in taverns or shouted across battlefields—carries the weight of history. Whether you pledge loyalty
              to a noble house, dream of dragons in the skies, or simply marvel at the intrigue that binds the Known World
              together, you&apos;ve found your place among those who cherish the legends of ice and fire.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={0.2}>
          <div className="relative rounded-2xl overflow-hidden border-2 border-gold-primary/30 shadow-xl shadow-gold-primary/10">
            <div className="relative h-[400px] md:h-[600px]">
              <Image
                src="/map.webp"
                alt="Map of Westeros"
                fill
                className="object-contain bg-gradient-to-b from-zinc-900 to-black p-4"
                priority
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.4}>
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gold-primary text-center mb-6">The Map</h2>
            <p className="text-cream/70 text-sm md:text-base leading-relaxed text-center">
              The maps of Game of Thrones and House of the Dragon unveil the sprawling, intricate world of Westeros and
              its surrounding lands—a realm shaped by politics, war, and legend. From the icy expanse of the North and the
              towering Wall to the sun-drenched shores of Dorne, each region is steeped in history and defined by its
              house&apos;s influence. The continents are dotted with formidable castles, bustling cities, and treacherous
              forests, while the seas carry fleets, trade, and the threat of invaders. In House of the Dragon, the focus
              often shifts to Dragonstone and King&apos;s Landing, highlighting the ancestral seats of House Targaryen, yet
              the map still reminds us of the larger political web spanning the Known World. Every river, mountain, and
              coastline tells a story of conquest, loyalty, and ambition, making the maps not just tools for navigation,
              but gateways into the epic saga of ice, fire, and dragons.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
