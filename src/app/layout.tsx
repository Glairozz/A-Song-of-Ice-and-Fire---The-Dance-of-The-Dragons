import type { Metadata } from "next"
import { cinzel } from "@/lib/fonts"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { ReturnToTop } from "@/components/ReturnToTop"
import { SmoothScroll } from "@/components/SmoothScroll"
import "./globals.css"

export const metadata: Metadata = {
  title: "A Song of Ice and Fire & The Dance of the Dragons",
  description:
    "Explore the world of Westeros — houses, dragons, characters, locations, and mystical elements from Game of Thrones and House of the Dragon.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cinzel.variable}>
      <body className="font-cinzel min-h-screen flex flex-col antialiased">
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
