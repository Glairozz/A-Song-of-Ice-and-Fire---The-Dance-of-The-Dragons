import type { Metadata } from "next"
import { ScrollReveal } from "@/components/ScrollReveal"
import { CharacterGrid } from "./CharacterGrid"

export const metadata: Metadata = {
  title: "Characters",
  description:
    "Thirty-eight figures of Westeros — from Rhaenyra Targaryen, Daemon and the Greens of the Dance of the Dragons, to the Starks, Lannisters and Targaryens of A Song of Ice and Fire.",
}

export default function CharactersPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <header className="mb-12 text-center">
            <p className="eyebrow">Those Who Played the Game</p>
            <h1 className="mt-4 text-3xl font-bold text-gold-primary md:text-5xl">
              Characters of the Realm
            </h1>
            <div className="rule mx-auto my-6 max-w-md">
              <span />
            </div>
          </header>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <div className="mx-auto mb-12 max-w-4xl space-y-4 text-sm leading-relaxed text-cream/70 md:text-base">
            <p>
              From the iron court of King&apos;s Landing to the icy ramparts of
              Winterfell, Westeros is shaped by men and women who reach for the
              crown — and by those caught in their reach. This chronicle gathers
              the principal figures of two ages: the{" "}
              <strong className="text-gold-primary">Dance of the Dragons</strong>
              , the Targaryen civil war that burned through the royal family in
              the century after the Conquest, and the{" "}
              <strong className="text-gold-primary">
                War of the Five Kings
              </strong>{" "}
              that defines A Song of Ice and Fire.
            </p>
            <p>
              On the Dance side stand Rhaenyra Targaryen and her Blacks, the
              Green faction of Aegon II and Queen Alicent, the rogue prince
              Daemon, the one-eyed Aemond and his Vhagar, the Sea Snake Corlys
              Velaryon, and the kings, queens and knights whose choices led the
              realm to dragonfire. Centuries later, the Starks of Winterfell,
              the Lannisters of Casterly Rock and the last Targaryens carry the
              same inheritance of blood, ambition and prophecy.
            </p>
            <p>
              Filter by era or great house, or search for a name to move
              directly to a profile — every figure links onward to their house,
              their dragon, the places they ruled and the battles they fought.
            </p>
          </div>
        </ScrollReveal>

        <CharacterGrid />
      </div>
    </div>
  )
}
