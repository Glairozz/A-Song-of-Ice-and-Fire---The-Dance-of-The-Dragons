import type { EntityEventRef, EntityRef, Location } from "@/data/types"

/* ------------------------------------------------------------------ *
 * Ref helpers — keep the table below readable.
 * ------------------------------------------------------------------ */
const char = (slug: string, label: string): EntityRef => ({ type: "character", slug, label })
const house = (slug: string, label: string): EntityRef => ({ type: "house", slug, label })
const loc = (slug: string, label: string): EntityRef => ({ type: "location", slug, label })
const ev = (slug: string, label: string): EntityEventRef => ({ type: "event", slug, label })

/**
 * The ten places of the explorer map, in canonical Westeros geography
 * (top of the canvas = the far north). `map.x` / `map.y` are percent
 * of the map artwork and match `public/map.webp`.
 */
export const locations: Location[] = [
  {
    slug: "kings-landing",
    name: "King's Landing",
    region: "The Crownlands",
    type: "city",
    image: "/location/kingslanding.webp",
    description:
      "Capital of the Seven Kingdoms and seat of the Iron Throne — where the Green Council crowned Aegon II and the Black cause rose in answer.",
    holder: "The Green Council / Aegon II, later Rhaenyra",
    houseRef: house("targaryen", "House Targaryen"),
    map: { x: 63, y: 66 },
    lore: [
      "King's Landing crowds the hills above the Blackwater Rush — the largest city in Westeros and the seat of the Iron Throne. When King Viserys I died in his bed in 129 AC his passing set the Dance of the Dragons alight: the Green Council debated through the night, Queen Alicent's party put the crown on young Aegon's head before dawn, and every friend of Rhaenyra still inside the capital was seized in the same hours.",
      "Rhaenyra took the city from the air without a sword drawn, but her rule was brief and bitter — hard taxes, a hard winter, and a capital full of starving folk. In 130 AC the smallfolk rose beneath the Shepherd and stormed the Dragonpit, the great dome where the dragons were caged, killing beast after beast while Rhaenyra watched the smoke from the Red Keep.",
      "Rhaenyra fled the mob and lost her life at Dragonstone; Aegon II returned to a ruined throne and was poisoned within the year. The war's reckoning closed in the same halls that had opened it — the boy Aegon III crowned in the Great Hall, and Cregan Stark's brief Hour of the Wolf passing the final judgments.",
    ],
    notable: [
      char("viserys-i-targaryen", "Viserys I Targaryen"),
      char("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      char("aegon-ii-targaryen", "Aegon II Targaryen"),
      char("alicent-hightower", "Alicent Hightower"),
      char("otto-hightower", "Otto Hightower"),
      char("criston-cole", "Criston Cole"),
      char("corlys-velaryon", "Corlys Velaryon"),
      char("borros-baratheon", "Borros Baratheon"),
    ],
    events: [
      ev("death-of-viserys-i", "Death of Viserys I"),
      ev("crowning-of-aegon-ii", "Crowning of Aegon II"),
      ev("blood-and-cheese", "Blood and Cheese"),
      ev("battle-of-rooks-rest", "Battle of Rook's Rest"),
      ev("rhaenyra-takes-kings-landing", "Rhaenyra Takes King's Landing"),
      ev("storming-of-the-dragonpit", "Storming of the Dragonpit"),
      ev("aegon-iii-crowned", "Aegon III Crowned"),
      ev("trial-of-corlys-velaryon", "Trial of Corlys Velaryon"),
      ev("hour-of-the-wolf", "Hour of the Wolf"),
      ev("death-of-aegon-ii", "Death of Aegon II"),
    ],
    nearby: [
      loc("dragonstone", "Dragonstone"),
      loc("riverlands", "The Riverlands"),
      loc("vale-of-arryn", "The Vale of Arryn"),
      loc("oldtown", "Oldtown"),
    ],
  },
  {
    slug: "dragonstone",
    name: "Dragonstone",
    region: "The Crownlands",
    type: "castle",
    image: "/location/dragonstone.jpg",
    description:
      "The volcanic Targaryen island in Blackwater Bay, where Rhaenyra was proclaimed queen and where she met her end.",
    holder: "Rhaenyra Targaryen",
    houseRef: house("targaryen", "House Targaryen"),
    map: { x: 75, y: 63 },
    lore: [
      "Dragonstone is a black, volcanic island guarding the mouth of Blackwater Bay, its keep carved into the shapes of dragons. The Targaryens held it as their seat before the Conquest, and in its great hall the Painted Table — Aegon's war table, carved in the shape of Westeros — still stands. Rhaenyra was living here with her sons when her father died and the Greens crowned Aegon II in the capital.",
      "From this island the Black cause was born: Rhaenyra was proclaimed queen by her own council, Daemon rode for Harrenhal, and the Velaryon fleet closed the bay. In the first days of 130 AC the Triarchy's ships broke through the Gullet and shattered that blockade. Thousands died, Spicetown was never rebuilt, Prince Jacaerys fell from Vermax, and Prince Viserys was taken and given up for dead.",
      "Dragonstone later became Rhaenyra's refuge and then her tomb. Driven from King's Landing, she returned only to fall into Aegon II's hands, and Sunfyre devoured her in the Dragonmont. Her young sons were kept as hostages, and the island's dragons dwindled until the last of them died here, decades later, in the reign of Aegon III.",
    ],
    notable: [
      char("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      char("daemon-targaryen", "Daemon Targaryen"),
      char("aegon-ii-targaryen", "Aegon II Targaryen"),
      char("daenerys-targaryen", "Daenerys Targaryen"),
    ],
    events: [
      ev("rhaenyra-claims-the-crown", "Rhaenyra Claims the Crown"),
      ev("lucerys-at-storms-end", "Lucerys at Storm's End"),
      ev("battle-of-the-gullet", "Battle of the Gullet"),
      ev("death-of-rhaenyra", "Death of Rhaenyra"),
      ev("death-of-the-last-dragon", "Death of the Last Dragon"),
    ],
    nearby: [
      loc("kings-landing", "King's Landing"),
      loc("vale-of-arryn", "The Vale of Arryn"),
      loc("riverlands", "The Riverlands"),
    ],
  },
  {
    slug: "winterfell",
    name: "Winterfell",
    region: "The North",
    type: "castle",
    image: "/location/winterfell.jpg",
    description:
      "House Stark's ancient northern seat, warmed by hot springs — home of the Winter Wolves who marched south for Rhaenyra.",
    holder: "House Stark — Cregan Stark, a late ally of the Blacks",
    houseRef: house("stark", "House Stark"),
    map: { x: 44, y: 26 },
    lore: [
      "Winterfell has been the seat of the Starks since the Age of Heroes — a sprawl of stone walls and timber halls warmed by hot springs that steam its walls and its godswood, where a white weirwood older than the Andals still looks out over the northern snows. Beneath its crypts lie the kings of the North, the Kings of Winter, generation after generation.",
      "In the Dance the North answered Rhaenyra. Prince Jacaerys Velaryon flew to Winterfell and won young Cregan Stark's friendship and the pact that went with it, and out of the snows came the Winter Wolves — a great host of Northmen who marched a thousand miles south to fight for the Black queen, dying by the thousand in the battles of the Riverlands.",
      "Winterfell itself was never besieged; the war's fire fell to the south. Cregan Stark reached King's Landing only at the war's end, and there his brief rule — the Hour of the Wolf — settled the accounts of those who had served Aegon II, before he led his weary men home to the snow.",
    ],
    notable: [char("eddard-stark", "Eddard Stark")],
    events: [],
    nearby: [
      loc("the-wall", "The Wall"),
      loc("beyond-the-wall", "Beyond the Wall"),
      loc("riverlands", "The Riverlands"),
      loc("vale-of-arryn", "The Vale of Arryn"),
    ],
  },
  {
    slug: "oldtown",
    name: "Oldtown",
    region: "The Reach",
    type: "city",
    image: "/location/oldtown.webp",
    description:
      "The ancient city on the Honeywine, seat of House Hightower, the Citadel and the Faith's southern heart.",
    holder: "House Hightower — for the Green cause",
    houseRef: house("hightower", "House Hightower"),
    map: { x: 34, y: 80 },
    lore: [
      "Where the Honeywine meets the Sunset Sea lies Oldtown, the oldest city in the Seven Kingdoms and second only to King's Landing in size. On Battle Isle the ancient Hightower looks out over the harbour, among the river's islands the Citadel trains the maesters who keep the realm's records, and in the Starry Sept the Faith keeps its southern seat.",
      "Oldtown gave the Dance its Green faction. Otto Hightower, Hand of the King to Viserys I, was of this city, and his daughter Alicent — queen to Viserys and mother to Aegon II, Helaena, Aemond and Daeron — made the succession a matter of blood. The Hightowers declared for the Greens, and the city's levies marched with the Green cause.",
      "The city's own streets saw little of the war, though the fighting reached the Reach in 130 AC: the Hightower host and its allies twice clashed over the market town of Tumbleton near the crownland border — the First and Second Battles of Tumbleton, the bloodiest of the war's later years. The maesters of the Citadel, serving both crowns, wrote down what the swords decided.",
    ],
    notable: [
      char("alicent-hightower", "Alicent Hightower"),
      char("otto-hightower", "Otto Hightower"),
    ],
    events: [
      ev("first-battle-of-tumbleton", "First Battle of Tumbleton"),
      ev("second-battle-of-tumbleton", "Second Battle of Tumbleton"),
    ],
    nearby: [
      loc("dorne", "Dorne"),
      loc("iron-islands", "The Iron Islands"),
      loc("kings-landing", "King's Landing"),
      loc("riverlands", "The Riverlands"),
    ],
  },
  {
    slug: "the-wall",
    name: "The Wall",
    region: "The North",
    type: "landmark",
    image: "/location/thewall.jpg",
    description:
      "A colossal wall of ice across Westeros, garrisoned by the Night's Watch — beyond it, the Dance never reached.",
    holder: "The Night's Watch",
    map: { x: 46, y: 7 },
    lore: [
      "The Wall is a rampart of ice and stone seven hundred feet high and three hundred miles long, spanning the width of Westeros and garrisoned by the Night's Watch from three surviving castles — Castle Black, Eastwatch-by-the-Sea and the Shadow Tower. Of the nineteen forts raised to guard it, only the Watch's worn towers still hold.",
      "Legend gives the Wall's raising to Bran the Builder and the magic of the Children of the Forest, in the aftermath of the Long Night. The Watch itself was sworn to serve the realms of men — no lands, no titles, no crowns — a brotherhood that answers to no king and no queen.",
      "The Dance of the Dragons passed the Wall by. In the reign of Jaehaerys I, Queen Alysanne Targaryen had flown Silverwing to Castle Black, and the dragon refused to cross the ice, turning back against some unseen will. While the Targaryens burned each other's cities a thousand leagues south, the Watch kept its lonely vigil in the cold.",
    ],
    notable: [],
    events: [],
    nearby: [loc("beyond-the-wall", "Beyond the Wall"), loc("winterfell", "Winterfell")],
  },
  {
    slug: "beyond-the-wall",
    name: "Beyond the Wall",
    region: "The Far North",
    type: "region",
    image: "/location/beyondthewall.jpg",
    description:
      "Harsh northern wilderness of Free Folk, giants and old magic, untouched by the Dance of the Dragons.",
    holder: "The Free Folk — no single lord",
    map: { x: 58, y: 3 },
    lore: [
      "Beyond the Wall lies a wilderness of forest, mountain and ice, claimed by no king south of the ice. Here the Free Folk — the wildlings — live in a thousand small clans and camps, holding no castle and bending no knee to the Iron Throne. Giants still walk the far north, and in the deep woods the weirwoods stand as they have since the Age of Heroes.",
      "To the Free Folk the Wall is the mark of an old theft — the south's seizure of the lands south of the ice — and the Night's Watch its eternal enemy. The two have raided and burned each other for centuries, but neither has ever broken the other, and the realms of men have slept behind the seven hundred feet of ice.",
      "The Dance never came this far north. No host from south of the Wall marched into the haunts of the Free Folk, and no dragon flew over the ice — Silverwing herself had turned back from it a generation before. While Rhaenyra and Aegon burned each other's cities, the wildlings kept their own wars beyond the snow, beyond the reach of dragonlords and iron crowns alike.",
    ],
    notable: [],
    events: [],
    nearby: [loc("the-wall", "The Wall"), loc("winterfell", "Winterfell")],
  },
  {
    slug: "riverlands",
    name: "The Riverlands",
    region: "The Riverlands",
    type: "region",
    image: "/location/riverlands.jpg",
    description:
      "Westeros' war-torn crossroads, where Harrenhal, the Gods Eye and a dozen battles shaped the Dance.",
    holder: "Contested — House Tully and its bannermen for the Blacks",
    houseRef: house("tully", "House Tully"),
    map: { x: 44, y: 50 },
    lore: [
      "The Riverlands are the lowland crossroads at the centre of Westeros, watered by the Trident and ruled from Riverrun by House Tully. On the shore of the Gods Eye squats Harrenhal, the greatest castle in the realm, raised by Harren the Black and burned to its stones by Aegon's dragon in the Conquest — and cursed, every lord who holds it soon dying badly.",
      "No region bled harder in the Dance. Criston Cole set the Brackens and the Blackwoods at each other's throats to draw the Black banners out, Prince Daemon took Harrenhal without a blow, and Prince Aemond One-Eye swept the Riverlands from the air with Vhagar, burning the lands of any who sheltered Rhaenyra's friends. The Winter Wolves and the levies of the river lords fought and died in action after action.",
      "It ended above the Gods Eye. Daemon Targaryen on Caraxes met Prince Aemond on Vhagar over the black lake; Daemon leapt from Caraxes's back onto Vhagar and drove Dark Sister through the eye, and men and dragons alike crashed into the water below. Aemond, Daemon, Caraxes and Vhagar all perished — one of the last great dragon-duels of the Dance.",
    ],
    notable: [
      char("daemon-targaryen", "Daemon Targaryen"),
      char("aemond-targaryen", "Aemond Targaryen"),
      char("tywin-lannister", "Tywin Lannister"),
      char("walder-frey", "Walder Frey"),
    ],
    events: [ev("battle-of-the-gods-eye", "Battle of the Gods Eye")],
    nearby: [
      loc("kings-landing", "King's Landing"),
      loc("vale-of-arryn", "The Vale of Arryn"),
      loc("winterfell", "Winterfell"),
      loc("oldtown", "Oldtown"),
    ],
  },
  {
    slug: "vale-of-arryn",
    name: "The Vale of Arryn",
    region: "The Vale",
    type: "region",
    image: "/location/vale.webp",
    description:
      "Mountainous, isolated realm behind the Mountains of the Moon, ruled from the Eyrie for the Black cause.",
    holder: "House Arryn — Lady Jeyne Arryn for the Blacks",
    houseRef: house("arryn", "House Arryn"),
    map: { x: 64, y: 47 },
    lore: [
      "The Vale of Arryn lies behind the Mountains of the Moon — a green valley walled in by peaks, entered only through the pass defended by the Bloody Gate. Above it all sits the Eyrie, a handful of slender white towers perched high on the mountainside, reachable only by a winding trail and abandoned each winter for the Gates of the Moon below.",
      "When the Dance began, Lady Jeyne Arryn — the Maiden of the Vale — was among the first to declare for Rhaenyra. Her knights guarded the Bloody Gate and the high roads, the Vale's strength stood unbroken behind them, and the valley served the Black queen as a quiet, safe corner of the realm while the war burned further south.",
      "The Eyrie itself never saw a battle. No host came up the Mountain of the Moon in those years; the lords of the Vale kept to their halls, and the war's worst never touched the green valley behind the Bloody Gate.",
    ],
    notable: [char("eddard-stark", "Eddard Stark")],
    events: [],
    nearby: [
      loc("riverlands", "The Riverlands"),
      loc("kings-landing", "King's Landing"),
      loc("dragonstone", "Dragonstone"),
      loc("winterfell", "Winterfell"),
    ],
  },
  {
    slug: "iron-islands",
    name: "The Iron Islands",
    region: "The Iron Islands",
    type: "region",
    image: "/location/ironislands.jpg",
    description:
      "Bleak seafaring isles ruled from Pyke, whose Red Kraken harried the western coasts in Rhaenyra's name.",
    holder: "House Greyjoy — Dalton Greyjoy, the Red Kraken, for the Blacks",
    houseRef: house("greyjoy", "House Greyjoy"),
    map: { x: 18, y: 44 },
    lore: [
      "The Iron Islands are a chain of bleak, rain-lashed rocks off Westeros' western coast, where fields are thin and the sea provides. From Pyke, House Greyjoy rules beneath the banner of the kraken, and the ironborn keep the old way — reaving and taking, as the Drowned God made them, for they do not sow.",
      "In 129 AC Lord Dalton Greyjoy — the Red Kraken — chose black over green and took the islands for the Black queen. While Lord Jason Lannister campaigned in the riverlands, Dalton burned the Lannister fleet and sacked Lannisport, carrying off gold and grain, and his longships harried the western seas — the Iron Islands' richest hour of the war.",
      "The Dance never came to the islands themselves. Dalton outlived the war only to be murdered in his bed at Faircastle in 133 AC, his throat cut by one of his salt wives; with no rock wife and only two young salt sons behind him, Pyke fell at once into the old squabbles of sisters and cousins — the isles slipping to the war's edge, their kraken lost as the realm's last dragons died.",
    ],
    notable: [],
    events: [],
    nearby: [loc("riverlands", "The Riverlands"), loc("oldtown", "Oldtown")],
  },
  {
    slug: "dorne",
    name: "Dorne",
    region: "Dorne",
    type: "region",
    image: "/location/dorne.avif",
    description:
      "Southern desert realm of red mountains and proud customs, which sat out the Dance of the Dragons.",
    holder: "House Martell — neutral throughout the Dance",
    houseRef: house("martell", "House Martell"),
    map: { x: 52, y: 90 },
    lore: [
      "Dorne is the hot southern realm of red mountains, wind-scoured deserts and the lazy Greenblood, ruled from the Sunspear? — seat of House Martell, the princes of Dorne. It is the only part of Westeros that joined the Seven Kingdoms by marriage rather than by conquest — the match of Daeron II and Princess Myriah Martell — and it keeps its own laws, its own titles, and its own proud customs.",
      "The Dornish had not forgotten the age of dragonfire: Daeron I, the Young Dragon, had taken their land and died of it, and the realm's dragons were never loved in the south-east. When the Dance came, Prince Qoren Martell answered neither crown, and Dorne's passes stayed shut while the rest of the realm burned.",
      "As it began, so it ended — Dorne sat the war out entirely. No battle of the Dance was fought on Dornish sand, no dragon ever burned its towns, and while the Targaryens devoured one another the princes of Dorne watched from the red mountains and waited, unbothered, for the winner who never came.",
    ],
    notable: [char("oberyn-martell", "Oberyn Martell")],
    events: [],
    nearby: [loc("oldtown", "Oldtown"), loc("kings-landing", "King's Landing")],
  },
]

export const locationBySlug = (slug: string) => locations.find((l) => l.slug === slug)

/** The five locations featured on the home page and the map preview. */
export const featuredLocations: Location[] = [
  "kings-landing",
  "dragonstone",
  "winterfell",
  "oldtown",
  "the-wall",
].map((slug) => locations.find((l) => l.slug === slug)!).filter(Boolean)
