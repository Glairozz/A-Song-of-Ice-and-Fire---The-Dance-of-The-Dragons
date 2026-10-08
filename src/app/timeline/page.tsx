import type { Metadata } from "next"
import { ScrollReveal } from "@/components/ScrollReveal"
import { Timeline } from "./Timeline"

export const metadata: Metadata = {
  title: "Timeline",
  description:
    "A year-by-year chronicle of the Dance of the Dragons, 129–135 AC — the spark, the war and the aftermath, from the death of Viserys I to the last dragon.",
}

const legend = [
  {
    label: "Spark",
    dot: "bg-gold-light",
    text: "text-gold-light",
    gloss: "Oaths broken — the succession turns to open quarrel.",
  },
  {
    label: "War",
    dot: "bg-blood-bright",
    text: "text-blood-bright",
    gloss: "Battles, betrayals and dragons dying over Westeros.",
  },
  {
    label: "Aftermath",
    dot: "bg-cream/50",
    text: "text-cream/70",
    gloss: "Trials, reckonings and the long tail of the war.",
  },
]

export default function TimelinePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal variant="up">
          <header className="text-center">
            <p className="eyebrow">129 – 135 AC</p>
            <h1 className="mt-4 text-3xl font-bold text-gold-primary md:text-6xl">
              The Dance of the Dragons
            </h1>
            <div className="rule mx-auto my-7 max-w-sm">
              <span />
            </div>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-cream/70 md:text-base">
              When King Viserys I died, the realm divided between the daughter he had named and the
              son the court chose instead. For six years the Targaryens fought one another in the
              sky and on the ground, and burned their own inheritance doing it. What follows is the
              war as it happened — year by year, from the first death to the last. Open any entry
              for the full account, its ledger of consequences and the people it touched.
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {legend.map((item) => (
              <div key={item.label} className="flex items-start gap-2.5">
                <span
                  aria-hidden
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.dot}`}
                />
                <div>
                  <p className={`text-xs uppercase tracking-[0.22em] ${item.text}`}>{item.label}</p>
                  <p className="mt-0.5 max-w-[15rem] text-xs text-cream/50">{item.gloss}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-14">
          <Timeline />
        </div>
      </div>
    </div>
  )
}
