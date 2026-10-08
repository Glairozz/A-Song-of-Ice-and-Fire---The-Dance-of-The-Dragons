import { Suspense } from "react"
import type { Metadata } from "next"
import { MapExplorer } from "./MapExplorer"

export const metadata: Metadata = {
  title: "Interactive Map",
  description:
    "Explore the realms of Westeros on an interactive map — zoom, pan and select the ten great locations of the Dance of the Dragons.",
}

function MapFrameFallback() {
  return (
    <div className="aspect-[2148/1399] min-h-[420px] w-full animate-pulse rounded-2xl border border-gold-primary/25 bg-black/40" />
  )
}

export default function MapPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-3">Interactive Map</p>
          <h1 className="text-3xl font-bold text-gold-primary md:text-5xl">
            The Realms of Westeros
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream/70 md:text-base">
            From the ice of the Wall to the deserts of Dorne — trace the ten places where the
            Dance of the Dragons was fought, ruled and remembered. Select a marker to read its
            story, or use the list to travel the realm.
          </p>
        </div>

        <Suspense fallback={<MapFrameFallback />}>
          <MapExplorer />
        </Suspense>
      </div>
    </div>
  )
}
