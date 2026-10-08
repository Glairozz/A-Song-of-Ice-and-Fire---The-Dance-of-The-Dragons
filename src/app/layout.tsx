import type { Metadata, Viewport } from "next"
import { cinzel, cinzelDeco, inter } from "@/lib/fonts"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ReturnToTop } from "@/components/ReturnToTop"
import { SmoothScroll } from "@/components/SmoothScroll"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "A Song of Ice and Fire — The Dance of the Dragons",
    template: "%s · The Dance of the Dragons",
  },
  description:
    "An interactive archive of the Targaryen civil war known as the Dance of the Dragons — dragons, great houses, characters, locations, magic and a year-by-year timeline of the war.",
  keywords: [
    "ASOIAF",
    "A Song of Ice and Fire",
    "House of the Dragon",
    "Dance of the Dragons",
    "Targaryen",
    "dragons",
    "Westeros",
    "lore",
    "encyclopedia",
  ],
  openGraph: {
    title: "A Song of Ice and Fire — The Dance of the Dragons",
    description:
      "Explore the Targaryen civil war: dragon profiles, great houses, an interactive map of Westeros and a full timeline of the Dance.",
    type: "website",
    siteName: "The Dance of the Dragons",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelDeco.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <SmoothScroll>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <ReturnToTop />
        </SmoothScroll>
      </body>
    </html>
  )
}
