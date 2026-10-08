import type { EntityRef, EntityType } from "@/data/types"

/**
 * Single source of truth for turning a typed entity reference into a route.
 * Events deep-link to their anchor on the timeline page.
 */
export function hrefForRef(ref: EntityRef): string {
  switch (ref.type) {
    case "dragon":
      return `/dragons/${ref.slug}`
    case "character":
      return `/characters/${ref.slug}`
    case "house":
      return `/houses/${ref.slug}`
    case "location":
      return `/locations/${ref.slug}`
    case "event":
      return `/timeline#${ref.slug}`
    case "organization":
      return `/organizations`
    case "race":
      return `/races`
    case "magic":
      return `/magic`
    default:
      return "/"
  }
}

export const entityNoun: Record<EntityType, string> = {
  dragon: "Dragon",
  character: "Character",
  house: "Great House",
  location: "Location",
  event: "Event",
  organization: "Organization",
  race: "Race",
  magic: "Magic",
}

/** Emoji marker per entity type, used in search results and chips. */
export const entityGlyph: Record<EntityType, string> = {
  dragon: "🐉",
  character: "⚔️",
  house: "🏰",
  location: "🗺️",
  event: "📜",
  organization: "🛡️",
  race: "🧬",
  magic: "✨",
}
