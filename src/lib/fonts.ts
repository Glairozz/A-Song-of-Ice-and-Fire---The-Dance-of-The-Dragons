import { Cinzel, Cinzel_Decorative, Inter } from "next/font/google"

/** Body / UI text — a clean sans so long lore passages stay readable. */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
})

/** Headings, titles, navigation — classic roman serif. */
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
})

/** Brand / hero display face — ornate, used sparingly. */
export const cinzelDeco = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
})
