import type { Metadata } from "next"
import { ScrollReveal } from "@/components/ScrollReveal"
import { dragons } from "@/data/dragons"
import { DragonFilters } from "./DragonFilters"

export const metadata: Metadata = {
  title: "Dragons",
  description:
    "Twenty-one dragons of Westeros and Essos — from Balerion the Black Dread and Vhagar, through the beasts of the Dance of the Dragons, to Drogon, Rhaegal and Viserion.",
}

export default function DragonsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <header className="mb-12 text-center">
            <p className="eyebrow">The Sky Belongs to Them</p>
            <h1 className="mt-4 text-3xl font-bold text-gold-primary md:text-5xl">
              Dragons that ruled Westeros
            </h1>
            <div className="rule mx-auto my-6 max-w-md">
              <span />
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <div className="mx-auto mb-14 max-w-4xl space-y-4 text-sm leading-relaxed text-cream/70 md:text-base">
            <p>
              Dragons in the world of Westeros trace their origins back to the
              ancient Valyrian Freehold, where they were first tamed and bred
              into living weapons. Giants like Balerion the Black Dread, Meraxes
              and Vhagar helped carve out the Valyrian empire and later enabled
              Aegon the Conqueror to forge the Seven Kingdoms through fire and
              blood. These early dragons were immense, terrifying creatures —
              symbols of dominion whose legacy set the foundation for centuries
              of Targaryen power.
            </p>
            <p>
              During the{" "}
              <strong className="text-gold-primary">Dance of the Dragons</strong>
              , the last great age of dragonkind, more than twenty dragons still
              lived, each with unique temperaments, skills and bonds to their
              riders. The skies of Westeros teemed with iconic beasts like the
              crimson Caraxes, the enormous and ancient Vhagar, the golden
              Sunfyre and the bronze Vermithor. Carefully raised in Dragonstone
              and the Dragonpit, these dragons served not only as engines of war
              but also as political instruments — each one shaping succession,
              loyalty and legitimacy during the brutal Targaryen civil war.
            </p>
            <p>
              By the era of{" "}
              <strong className="text-gold-primary">
                A Song of Ice and Fire
              </strong>
              , dragons have all but vanished from the world. Only three
              survive — Drogon, Rhaegal and Viserion — hatched by Daenerys
              Targaryen centuries after the last known dragon died. Unlike their
              ancestors, these dragons grow without the guidance of dragonkeepers
              or the vast Valyrian knowledge once used to control their kind.
              Their return marks a resurgence of magic and a reminder of the
              Targaryens&apos; lost greatness.
            </p>
          </div>
        </ScrollReveal>

        <DragonFilters dragons={dragons} />
      </div>
    </div>
  )
}
