import type { EntityRef, House } from "./types"

/**
 * The fourteen great houses of the realm.
 *
 * Slugs are stable route identifiers for /houses/[slug] and are referenced
 * from characters, events and locations through EntityRef. Descriptions are
 * the one-line card copy; `lore` holds the long-form profile paragraphs.
 */

const ref = (type: EntityRef["type"], slug: string, label: string): EntityRef => ({
  type,
  slug,
  label,
})
const char = (slug: string, label: string) => ref("character", slug, label)
const dragon = (slug: string, label: string) => ref("dragon", slug, label)
const event = (slug: string, label: string) => ref("event", slug, label)

export const houses: House[] = [
  {
    slug: "targaryen",
    name: "House Targaryen",
    words: "Fire and Blood",
    region: "The Crownlands",
    seat: "Dragonstone",
    image: "/housesimages/Targaryen.jpg",
    color: "#7b1f1f",
    sigil: "🐉",
    description:
      "A once-great dynasty descended from ancient Valyria, known for its dragons, silver hair and fiery ambition — magnificent and tragic in equal measure.",
    lore: [
      "House Targaryen is a once-great dynasty descended from ancient Valyria, known for its dragons, silver hair, and fiery ambition. For centuries they ruled Westeros through fire and blood, their power rooted in both prophecy and destruction. Their legacy is defined by internal conflict, political intrigue, and the struggle to balance destiny with human weakness.",
      "Though often brilliant and visionary, Targaryens are equally prone to madness, making their rule both magnificent and tragic. No schism cut the dynasty deeper than the Dance of the Dragons, when Queen Rhaenyra and King Aegon II pressed rival claims to the Iron Throne and set dragon against dragon in the skies over Westeros. Brother fought sister, uncle fought niece, and the royal house devoured itself.",
      "The war burned out the last great dragons and left the family diminished; within three generations the dynasty was overthrown in Robert's Rebellion. Yet Targaryen blood survived in exile, and the old words — fire and blood — were never forgotten.",
    ],
    locationRef: ref("location", "dragonstone", "Dragonstone"),
    notable: [
      char("viserys-i-targaryen", "Viserys I Targaryen"),
      char("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      char("daemon-targaryen", "Daemon Targaryen"),
      char("aegon-ii-targaryen", "Aegon II Targaryen"),
      char("aemond-targaryen", "Aemond Targaryen"),
      char("helaena-targaryen", "Helaena Targaryen"),
      char("baela-targaryen", "Baela Targaryen"),
      char("rhaena-targaryen", "Rhaena Targaryen"),
      char("daenerys-targaryen", "Daenerys Targaryen"),
      char("rhaegar-targaryen", "Rhaegar Targaryen"),
      char("jon-snow", "Jon Snow"),
    ],
    dragons: [
      dragon("balerion", "Balerion"),
      dragon("vhagar", "Vhagar"),
      dragon("vermithor", "Vermithor"),
      dragon("caraxes", "Caraxes"),
      dragon("syrax", "Syrax"),
      dragon("sunfyre", "Sunfyre"),
      dragon("meleys", "Meleys"),
    ],
    refs: [
      event("death-of-viserys-i", "Death of Viserys I"),
      event("rhaenyra-claims-the-crown", "Rhaenyra Claims the Crown"),
      event("crowning-of-aegon-ii", "Crowning of Aegon II"),
      event("blood-and-cheese", "Blood and Cheese"),
      event("battle-of-rooks-rest", "Battle of Rook's Rest"),
      event("rhaenyra-takes-kings-landing", "Rhaenyra Takes King's Landing"),
      event("storming-of-the-dragonpit", "Storming of the Dragonpit"),
      event("battle-of-the-gods-eye", "Battle of the Gods Eye"),
      event("death-of-rhaenyra", "Death of Rhaenyra"),
      event("death-of-aegon-ii", "Death of Aegon II"),
      event("aegon-iii-crowned", "Aegon III Crowned"),
    ],
  },
  {
    slug: "stark",
    name: "House Stark",
    words: "Winter is Coming",
    region: "The North",
    seat: "Winterfell",
    image: "/housesimages/Stark.webp",
    color: "#6b7280",
    sigil: "🐺",
    description:
      "One of Westeros' oldest families, descended from the First Men and bound to the harsh, honorable North by a steadfast code of integrity and loyalty.",
    lore: [
      "House Stark is one of Westeros' oldest families, descended from the First Men and deeply tied to the harsh, honorable North. They rule from Winterfell with a steadfast code of integrity and loyalty, values that set them apart in a world of political corruption. Known for their solemn nature and resilience, the Starks embody duty and sacrifice, often paying a heavy price for their unwavering principles.",
      "Their house words — Winter is Coming — reflect both the climate they endure and the hardships that define their story. It is a warning rather than a threat: the Starks prepare for the worst while everyone else enjoys the sun, and that readiness has saved the North more than once.",
      "The Starks paid dearly for their honor. In the Dance of the Dragons their young lord Cregan Stark marched south to deliver Northern justice in the Hour of the Wolf, and generations later Eddard Stark would lose his head in King's Landing for the same unyielding integrity — yet the North remembered, and always returned to the direwolf banner.",
    ],
    locationRef: ref("location", "winterfell", "Winterfell"),
    notable: [
      char("eddard-stark", "Eddard Stark"),
      char("robb-stark", "Robb Stark"),
      char("catelyn-stark", "Catelyn Stark"),
      char("sansa-stark", "Sansa Stark"),
      char("arya-stark", "Arya Stark"),
      char("bran-stark", "Bran Stark"),
    ],
    dragons: [],
    refs: [event("hour-of-the-wolf", "Hour of the Wolf")],
  },
  {
    slug: "lannister",
    name: "House Lannister",
    words: "Hear Me Roar",
    region: "The Westerlands",
    seat: "Casterly Rock",
    image: "/housesimages/Lannister.webp",
    color: "#a8862c",
    sigil: "🦁",
    description:
      "The wealthiest and most politically formidable family in Westeros, ruling from the golden halls of Casterly Rock.",
    lore: [
      "House Lannister is the wealthiest and most politically formidable family in Westeros, ruling from the golden halls of Casterly Rock. With immense resources, sharp intellect, and an obsession with legacy, the Lannisters dominate court politics through strategy, intimidation, and charm. Their reputation is shaped by pride and ruthlessness, but also brilliance and ambition.",
      "Above all, they are defined by the belief that power must be seized and maintained at any cost — and by the saying every child in the Westerlands learns: a Lannister always pays his debts. The official words, Hear Me Roar, are rarely spoken; the threat behind them is understood regardless.",
      "During the Dance of the Dragons the Lannisters backed the Greens. Ser Tyland Lannister, master of coin, hid the crown's gold from Rhaenyra and rose to become Hand to Aegon II, surviving the fall of the city by sheer cunning. Centuries later, Tywin Lannister would forge the house into the true power behind the Iron Throne.",
    ],
    notable: [
      char("tywin-lannister", "Tywin Lannister"),
      char("jaime-lannister", "Jaime Lannister"),
      char("cersei-lannister", "Cersei Lannister"),
      char("tyrion-lannister", "Tyrion Lannister"),
    ],
    dragons: [],
    refs: [
      event("crowning-of-aegon-ii", "Crowning of Aegon II"),
      event("rhaenyra-takes-kings-landing", "Rhaenyra Takes King's Landing"),
    ],
  },
  {
    slug: "velaryon",
    name: "House Velaryon",
    words: "The Old, the True, the Brave",
    region: "The Crownlands",
    seat: "Driftmark",
    image: "/housesimages/Velaryon.jpg",
    color: "#1f5f7b",
    sigil: "🐚",
    description:
      "An ancient Valyrian house renowned for naval mastery and deep ties to House Targaryen, whose fleets rival the power of kings.",
    lore: [
      "House Velaryon is an ancient Valyrian house renowned for its naval mastery, seafaring prowess, and deep ties to House Targaryen. From their seat at Driftmark, they command the wealth of global trade routes and boast some of the finest fleets in history. Though lacking dragons of their own for much of their history, their influence often rivals that of kings, built on ambition, exploration, and political shrewdness.",
      "Their identity blends maritime strength with Valyrian heritage, making them essential players in every major conflict of their era. Lord Corlys Velaryon, the Sea Snake, sailed further than any man before him and amassed a fortune that could buy kingdoms, while Queen Rhaenys — the Queen Who Never Was — proved that a Velaryon dragon could match any throne in the realm.",
      "The house stood at the centre of the Dance of the Dragons. The Strong boys — Jacaerys, Lucerys and Joffrey — were of Velaryon blood and dragonriders, and the war took them one by one: Lucerys fell at Storm's End, the fleet burned at the Gullet, and Prince Aemond killed Rhaenys over Rook's Rest. After the war, Corlys stood trial for his part in it.",
    ],
    notable: [
      char("corlys-velaryon", "Corlys Velaryon"),
      char("rhaenys-targaryen", "Rhaenys Targaryen"),
      char("laena-velaryon", "Laena Velaryon"),
      char("laenor-velaryon", "Laenor Velaryon"),
      char("vaemond-velaryon", "Vaemond Velaryon"),
    ],
    dragons: [
      dragon("seasmoke", "Seasmoke"),
      dragon("vermax", "Vermax"),
      dragon("arrax", "Arrax"),
    ],
    refs: [
      event("lucerys-at-storms-end", "Lucerys at Storm's End"),
      event("battle-of-the-gullet", "Battle of the Gullet"),
      event("battle-of-rooks-rest", "Battle of Rook's Rest"),
      event("trial-of-corlys-velaryon", "Trial of Corlys Velaryon"),
    ],
  },
  {
    slug: "hightower",
    name: "House Hightower",
    words: "We Light the Way",
    region: "The Reach",
    seat: "Oldtown",
    image: "/housesimages/Hightower.png",
    color: "#c2652b",
    sigil: "🗼",
    description:
      "One of the oldest and most respected noble families, ruling from the towering beacon of Oldtown and shaping the realm from behind the scenes.",
    lore: [
      "House Hightower is one of the oldest and most respected noble families, ruling from the towering beacon of Oldtown. Known for their wealth, scholarship, and connection to the Citadel and the Faith of the Seven, they are a powerful cultural and political force. Reserved yet calculating, the Hightowers often exert influence subtly rather than through open warfare.",
      "Their ambitions run deep, and through diplomacy, marriage, and manipulation, they shape the realm from behind the scenes. The beacon that gives their sigil its light is an apt symbol: the Hightowers prefer to guide others from a distance, letting rivals spend themselves while they conserve their strength.",
      "Nowhere was that patience more dangerous than in King's Landing. Otto Hightower, as Hand, placed his daughter Alicent before Viserys I and pressed the king's second son Aegon's claim; Queen Alicent and Ser Criston Cole then carried the Greens to Aegon's coronation. The Hightower bargain lit the fuse of the Dance of the Dragons — and their words, We Light the Way, took on a darker meaning entirely.",
    ],
    locationRef: ref("location", "oldtown", "Oldtown"),
    notable: [
      char("otto-hightower", "Otto Hightower"),
      char("alicent-hightower", "Alicent Hightower"),
      char("criston-cole", "Ser Criston Cole"),
    ],
    dragons: [],
    refs: [
      event("crowning-of-aegon-ii", "Crowning of Aegon II"),
      event("rhaenyra-takes-kings-landing", "Rhaenyra Takes King's Landing"),
      event("first-battle-of-tumbleton", "First Battle of Tumbleton"),
    ],
  },
  {
    slug: "baratheon",
    name: "House Baratheon",
    words: "Ours is the Fury",
    region: "The Stormlands",
    seat: "Storm's End",
    image: "/housesimages/Baratheon.webp",
    color: "#c2871b",
    sigil: "🦌",
    description:
      "A storm-forged dynasty of fierce warriors, tempestuous tempers and unyielding resilience, whose lords help spark the great turning points of Westerosi history.",
    lore: [
      "House Baratheon is a storm-forged dynasty known for its fierce warriors, tempestuous tempers, and unyielding resilience. Founded by Orys Baratheon after Aegon's Conquest — who took the words and banner of the fallen Storm Kings — they rule the Stormlands with a blend of raw strength and stubborn pride. Baratheons are often larger-than-life figures: bold, charismatic, and prone to conflict.",
      "Their storm-born nature makes them both formidable allies and dangerous rivals. A Baratheon rarely does anything by halves; the same fury that wins battles also shatters alliances, and every generation seems to produce a man who would rather fight than scheme.",
      "In the Dance of the Dragons, Lord Borros Baratheon declared for Aegon II after Prince Lucerys was killed beneath his own roof at Storm's End — a betrayal that stripped Rhaenyra of her last great bannerman. Generations later, Robert Baratheon's fury toppled the Targaryens entirely, and his brothers Stannis and Renly each pressed their own claim to the Iron Throne.",
    ],
    notable: [
      char("borros-baratheon", "Ser Borros Baratheon"),
      char("robert-baratheon", "Robert Baratheon"),
      char("stannis-baratheon", "Stannis Baratheon"),
      char("renly-baratheon", "Renly Baratheon"),
    ],
    dragons: [],
    refs: [event("lucerys-at-storms-end", "Lucerys at Storm's End")],
  },
  {
    slug: "greyjoy",
    name: "House Greyjoy",
    words: "We Do Not Sow",
    region: "The Iron Islands",
    seat: "Pyke",
    image: "/housesimages/Greyjoy.jpg",
    color: "#2f6b66",
    sigil: "🐙",
    description:
      "Rulers of the Iron Islands, forged by a harsh seafaring culture of raiding, independence and devotion to the Drowned God.",
    lore: [
      "House Greyjoy rules the Iron Islands with a harsh, seafaring culture built on raiding, independence, and devotion to the Drowned God. The Ironborn value strength over diplomacy, believing in taking what is not freely given. Their identity is shaped by salt, steel, and storm, producing fierce leaders and brutal rebellions.",
      "Their words — We Do Not Sow — say everything about the Ironborn worldview: a reaver takes what he wants from those who toil, and calls it honour. From the sea-cliffs of Pyke, the Greyjoys have raised fleets and raised rebellions, testing the patience of every king on the mainland.",
      "While their isolation makes them outsiders to mainland politics, their ambition and naval power ensure they are never truly ignored. Even in the Dance of the Dragons, when the great houses drew sides, the Ironborn watched from their islands and waited for the moment that raiding would pay best — and when Dalton Greyjoy finally struck, it was for the Blacks and against the west coast.",
    ],
    locationRef: ref("location", "iron-islands", "Iron Islands"),
    notable: [],
    dragons: [],
    refs: [],
  },
  {
    slug: "tyrell",
    name: "House Tyrell",
    words: "Growing Strong",
    region: "The Reach",
    seat: "Highgarden",
    image: "/housesimages/Tyrell.jpg",
    color: "#5f8a3a",
    sigil: "🌹",
    description:
      "A wealthy, politically savvy family ruling the fertile Reach — the breadbasket of the realm — where flowers conceal sharp ambition.",
    lore: [
      "House Tyrell is a wealthy and politically savvy family that rules the fertile Reach, the breadbasket of the realm. Known for elegance, charm, and strategic marriages, they thrive in court diplomacy where others rely on brute force. Their public image is friendly and refined, but beneath the flowers lies sharp ambition and formidable cunning.",
      "The Tyrells excel at subtle influence, building alliances and shaping kingdoms with a smile. Raised in the perfumed courts of Highgarden, they learned early that a shared meal, a well-placed marriage or a quietly starved supply line can accomplish what a siege cannot.",
      "During the Dance of the Dragons the Reach was split: the mighty Hightowers of Oldtown carried their banners for the Greens, while Highgarden itself kept its own counsel and watched the realm burn. Generations later, the rose would bloom at court again — Queen Margaery's charms and the Queen of Thorns's poison proving that the Reach's greatest weapon had always been patience.",
    ],
    notable: [
      char("olenna-tyrell", "Olenna Tyrell"),
      char("margaery-tyrell", "Margaery Tyrell"),
    ],
    dragons: [],
    refs: [],
  },
  {
    slug: "tully",
    name: "House Tully",
    words: "Family, Duty, Honor",
    region: "The Riverlands",
    seat: "Riverrun",
    image: "/housesimages/Tully.webp",
    color: "#a8443f",
    sigil: "🐟",
    description:
      "Lords of the Riverlands who prize family, duty and honor above all else, forever caught between greater powers at the crossroads of Westeros.",
    lore: [
      "House Tully governs the Riverlands from Riverrun, valuing family, loyalty, and honor above all else. Positioned at the crossroads of Westeros, their lands frequently become battlegrounds, forcing them into difficult alliances and costly conflicts. Though sometimes underestimated, the Tullys have strong leaders and deep emotional bonds that drive their decisions.",
      "Their house motto — Family, Duty, Honor — perfectly reflects their priorities and the burdens they carry. Every Tully lord must weigh the safety of his children against the obligations of his seat, and the riverlands rarely give them time to choose.",
      "No war proved that cruelty more clearly than the Dance of the Dragons, when every army marching on King's Landing tore through the Riverlands on the way. Riverrun's bannermen were split, its fields burned, and its people paid the price of other houses' ambitions — a pattern repeated again in the War of the Five Kings, when Catelyn Tully's children paid the heaviest price of all.",
    ],
    locationRef: ref("location", "riverlands", "The Riverlands"),
    notable: [char("catelyn-stark", "Catelyn Stark (Tully)")],
    dragons: [],
    refs: [],
  },
  {
    slug: "arryn",
    name: "House Arryn",
    words: "As High as Honor",
    region: "The Vale",
    seat: "The Eyrie",
    image: "/housesimages/Arryn.jpg",
    color: "#5a8fbf",
    sigil: "🦅",
    description:
      "One of the oldest and noblest Westerosi families, ruling the Vale from the impregnable Eyrie with a tradition of justice and chivalry.",
    lore: [
      "House Arryn is one of the oldest and noblest Westerosi families, ruling the Vale from the impregnable Eyrie. Proud and honorable, they maintain a tradition of justice and chivalry, emphasizing purity of blood and moral integrity. Their mountainous homeland keeps them isolated and difficult to challenge, giving them strategic strength and political stability.",
      "Even so, internal vulnerabilities and personal tragedies often shape their fate. The Eyrie's strength is also its cage: in winter the mountain passes close, and the lords of the Vale grow restless behind them.",
      "During the Dance of the Dragons the Vale sat quietly under Lady Jane Arryn, who kept her bannermen at home and let the realm bleed without her — a neutrality that preserved the Vale but earned the Arryns no friends. In later ages they would answer more readily: Jon Arryn's fostering of the Stark and Baratheon boys helped ignite Robert's Rebellion, and his death set the whole Song of Ice and Fire in motion.",
    ],
    locationRef: ref("location", "vale-of-arryn", "The Vale of Arryn"),
    notable: [],
    dragons: [],
    refs: [],
  },
  {
    slug: "bolton",
    name: "House Bolton",
    words: "Our Blades Are Sharp",
    region: "The North",
    seat: "The Dreadfort",
    image: "/housesimages/Bolton.webp",
    color: "#9c8674",
    sigil: "☠️",
    description:
      "A cold, ruthless Northern house infamous for cruelty, deception and the chilling tradition of flaying their enemies.",
    lore: [
      "House Bolton is a cold, ruthless Northern house infamous for cruelty, deception, and a chilling tradition of flaying their enemies. Their power comes not from honor but fear, manipulation, and calculated brutality. While they briefly rise to dominance through betrayal, their lack of loyalty ultimately weakens them.",
      "For thousands of years the Boltons were the Starks' rivals — rival kings in their own right, said to wear the skins of defeated Starks in the Dreadfort's cold halls. They bent the knee in the end, but never forgot the North they believed was theirs by right.",
      "They stand as the dark mirror of Stark values — ambitious, treacherous, and defined by terror. In the ages after the Dance, that patience finally paid: Roose Bolton's treachery at the Twins and Ramsay's cruelty at Winterfell briefly put a flayed man in the Winterfell seat, before the North remembered whose words were truly coming.",
    ],
    notable: [],
    dragons: [],
    refs: [],
  },
  {
    slug: "mormont",
    name: "House Mormont",
    words: "Here We Stand",
    region: "The North",
    seat: "Bear Island",
    image: "/housesimages/Mormont.png",
    color: "#7a5230",
    sigil: "🐻",
    description:
      "A loyal Northern house of fierce warriors and resilient leadership, whose matriarchal line produces remarkable women and devoted commanders.",
    lore: [
      "House Mormont is a loyal Northern house known for its fierce warriors and resilient leadership despite its small size. Ruling Bear Island, they live harsh lives shaped by rugged terrain and constant threats, forging them into some of the North's toughest fighters. Their matriarchal lineage produces remarkable women and devoted commanders who embody Northern honor.",
      "Though humble in resources, their courage commands respect across the realm. Bear Island gives the Mormonts little to spend and much to defend, and every generation of the house seems to answer that arithmetic with steel rather than gold.",
      "The house has always answered the North's call. Jeor Mormont gave up his seat to take the black and rose to become Lord Commander of the Night's Watch, guarding the realms of men beyond the Wall; Jorah Mormont carried his exile across the sea to serve Daenerys Targaryen; and young Lyanna Mormont stood before the lords of the North and reminded them that the Stark in Winterfell remembers every debt.",
    ],
    notable: [char("jorah-mormont", "Jorah Mormont")],
    dragons: [],
    refs: [],
  },
  {
    slug: "frey",
    name: "House Frey",
    words: "We Stand Together",
    region: "The Riverlands",
    seat: "The Twins",
    image: "/housesimages/Frey.jpg",
    color: "#8a7f6d",
    sigil: "🌉",
    description:
      "A populous house that rose to prominence by controlling the vital Twins crossing — wealthy, influential and widely distrusted.",
    lore: [
      "House Frey is a populous but lowborn-seeming house that rose to prominence by controlling the vital Twins crossing of the Green Fork. Though wealthier and more influential than their reputation suggests, they are widely viewed as untrustworthy opportunists — a family that grew rich charging tolls to everyone and pledged its sword to whichever side looked likely to win.",
      "Their ambition and resentment at being looked down upon by older, prouder houses runs through everything they do. Walder Frey's brood is vast, its branches tangled in marriages arranged to bind the riverlands to the Twins, and the family's reach far exceeds the respect it is given.",
      "That resentment culminated in the infamous Red Wedding, securing them power through betrayal rather than honor — and making the phrase bolted to the Twins, House Frey, forever synonymous with the brutal pragmatism of Westerosi politics at its worst.",
    ],
    locationRef: ref("location", "riverlands", "The Riverlands"),
    notable: [char("walder-frey", "Walder Frey")],
    dragons: [],
    refs: [],
  },
  {
    slug: "martell",
    name: "House Martell",
    words: "Unbowed, Unbent, Unbroken",
    region: "Dorne",
    seat: "Sunspear",
    image: "/housesimages/Martell.jpg",
    color: "#d97b21",
    sigil: "☀️",
    description:
      "Rulers of the sun-scorched deserts of Dorne, a house that values independence, passion and fierce resilience above every other kingdom.",
    lore: [
      "House Martell rules the sun-scorched deserts of Dorne with a culture that values independence, passion, and fierce resilience. Unlike much of Westeros, they embrace gender equality, cultural diversity, and a deep sense of honor tied to vengeance and loyalty. Their ruling style is measured and patient, but when wronged, they retaliate with deadly precision.",
      "The Martells earned their words the hard way. When Nymeria landed with her ten thousand ships and married Mors Martell, the two forged a kingdom that even Aegon the Conqueror could not take — Dorne alone bent neither knee nor knee-cap to the dragons, resisting fire and blood with sand and stubbornness.",
      "The Martells' unique traditions and fiery defiance set them apart from every other realm in the Seven Kingdoms. During the Dance of the Dragons, Dorne watched the Targaryens destroy each other from behind its deserts — and Oberyn Martell, the Red Viper, carried that old grudge all the way to the gates of King's Landing generations later.",
    ],
    locationRef: ref("location", "dorne", "Dorne"),
    notable: [char("oberyn-martell", "Oberyn Martell")],
    dragons: [],
    refs: [],
  },
]

export const houseBySlug = (slug: string) => houses.find((house) => house.slug === slug)

/** The five houses headlining the /greathouses landing grid. */
export const featuredHouses: House[] = ["targaryen", "velaryon", "hightower", "stark", "lannister"]
  .map((slug) => houseBySlug(slug))
  .filter((house): house is House => Boolean(house))
