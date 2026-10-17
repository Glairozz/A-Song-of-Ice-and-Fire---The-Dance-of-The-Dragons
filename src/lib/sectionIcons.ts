/**
 * Custom section icons (served from /public/icons) used across the site —
 * homepage "Choose Your Path" cards, navigation bar and menus.
 */
export const sectionIcons = {
  dragons: "/icons/dragons.jpg",
  characters: "/icons/characters.jpg",
  houses: "/icons/houses.jpg",
  locations: "/icons/locations.jpg",
  map: "/icons/interactive-map.jpg",
  timeline: "/icons/timeline.jpg",
  organizations: "/icons/organization.jpg",
  magic: "/icons/magic.jpg",
  races: "/icons/races.jpg",
} as const

export type SectionIconKey = keyof typeof sectionIcons
