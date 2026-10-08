/**
 * Shared data contract for the whole encyclopedia.
 *
 * Every content module (dragons, characters, houses, locations, events)
 * is typed here so pages, search and cross-links all agree on shape.
 * Cross-references between entities are always stored as { type, slug, label }
 * and resolved to hrefs through `src/lib/links.ts`.
 */

export type EntityType =
  | "dragon"
  | "character"
  | "house"
  | "location"
  | "event"
  | "organization"
  | "race"
  | "magic"

export interface EntityRef {
  type: EntityType
  slug: string
  /** Human readable label used in chips and search results. */
  label: string
}

export type Era = "ancestor" | "dance" | "got"
export type CharacterEra = "dance" | "got"
export type LifeStatus = "alive" | "dead" | "unknown"

/** 0-100 values rendered as segmented stat bars on dragon profiles. */
export interface DragonStats {
  size: number
  age: number
  combat: number
  speed: number
}

export interface Dragon {
  slug: string
  name: string
  epithet?: string
  era: Era
  /** "targaryen" = bonded to the royal house, "wild" = unclaimed beast. */
  allegiance: "targaryen" | "wild"
  status: LifeStatus
  /** Display colour of the scales, e.g. "Bronze". */
  color: string
  /** Rider display name during the Dance (or at their height). */
  rider?: string
  riderRef?: EntityRef
  houseRef?: EntityRef
  stats: DragonStats
  /** One-line card copy. */
  description: string
  /** Long-form profile paragraphs. */
  lore: string[]
  /** Event refs, e.g. known battles. */
  battles: EntityRef[]
  images: string[]
  /** Everything else related to this dragon. */
  refs: EntityRef[]
}

export interface Character {
  slug: string
  name: string
  epithet?: string
  era: CharacterEra
  /** House slug, matches House.slug. */
  house: string
  houseLabel: string
  title?: string
  status: LifeStatus
  /** e.g. "101 AC" / "c. 98 AC". Free text, kept short. */
  born?: string
  died?: string
  image?: string
  description: string
  lore: string[]
  /** The dragon this character rode, if any. */
  dragonRef?: EntityRef
  refs: EntityRef[]
}

export interface House {
  slug: string
  name: string
  words: string
  region: string
  seat: string
  image: string
  /** Representative accent colour (hex) used for gradients/borders. */
  color: string
  /** Emoji sigil used on compact cards. */
  sigil: string
  description: string
  lore: string[]
  locationRef?: EntityRef
  notable: EntityRef[]
  dragons: EntityRef[]
  refs: EntityRef[]
}

export type LocationType = "city" | "castle" | "region" | "landmark"

export interface Location {
  slug: string
  name: string
  region: string
  type: LocationType
  image: string
  description: string
  lore: string[]
  /** Who holds it during the Dance (free text). */
  holder?: string
  houseRef?: EntityRef
  /**
   * Position of the marker on the explorer map, in percent of the
   * map canvas (0 = left/top, 100 = right/bottom).
   */
  map: { x: number; y: number }
  notable: EntityRef[]
  events: EntityEventRef[]
  nearby: EntityRef[]
}

/** Convenience alias: events already are entity refs of type "event". */
export type EntityEventRef = EntityRef & { type: "event" }

export type EventPhase = "spark" | "war" | "aftermath"

export interface TimelineEvent {
  slug: string
  title: string
  /** Year in After Conquest, e.g. 130. */
  year: number
  phase: EventPhase
  summary: string
  description: string[]
  /** Who or what the event is about. */
  refs: EntityRef[]
  locationRef?: EntityRef
  /** Named deaths, victories, consequences. */
  outcome: string[]
}
