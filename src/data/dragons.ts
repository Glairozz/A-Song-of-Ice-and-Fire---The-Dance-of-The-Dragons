import type { Dragon, EntityRef, Era, LifeStatus } from "./types"

/* ------------------------------------------------------------------ *
 * Shared entity refs
 *
 * Every cross-reference is stored as { type, slug, label } so the pages
 * can render chips through `hrefForRef` without knowing any routes.
 * Slugs are shared with the characters / houses / timeline modules.
 * ------------------------------------------------------------------ */

const character = (slug: string, label: string): EntityRef => ({
  type: "character",
  slug,
  label,
})

const house = (slug: string, label: string): EntityRef => ({
  type: "house",
  slug,
  label,
})

const dragonRef = (slug: string, label: string): EntityRef => ({
  type: "dragon",
  slug,
  label,
})

const event = (slug: string, label: string): EntityRef => ({
  type: "event",
  slug,
  label,
})

const CH = {
  viserysI: character("viserys-i-targaryen", "Viserys I Targaryen"),
  rhaenyra: character("rhaenyra-targaryen", "Rhaenyra Targaryen"),
  daemon: character("daemon-targaryen", "Daemon Targaryen"),
  aegonII: character("aegon-ii-targaryen", "Aegon II Targaryen"),
  aemond: character("aemond-targaryen", "Aemond Targaryen"),
  baela: character("baela-targaryen", "Baela Targaryen"),
  laena: character("laena-velaryon", "Laena Velaryon"),
  laenor: character("laenor-velaryon", "Laenor Velaryon"),
  rhaenys: character("rhaenys-targaryen", "Rhaenys Targaryen"),
  corlys: character("corlys-velaryon", "Corlys Velaryon"),
  helaena: character("helaena-targaryen", "Helaena Targaryen"),
  daenerys: character("daenerys-targaryen", "Daenerys Targaryen"),
  jonSnow: character("jon-snow", "Jon Snow"),
} as const

const HOUSE = {
  targaryen: house("targaryen", "House Targaryen"),
  velaryon: house("velaryon", "House Velaryon"),
  hightower: house("hightower", "House Hightower"),
} as const

const EV = {
  stormsend: event("lucerys-at-storms-end", "Battle of Storm's End"),
  bloodAndCheese: event("blood-and-cheese", "Blood and Cheese"),
  gullet: event("battle-of-the-gullet", "Battle of the Gullet"),
  rooksRest: event("battle-of-rooks-rest", "Battle of Rook's Rest"),
  fallOfKingsLanding: event("rhaenyra-takes-kings-landing", "Fall of King's Landing"),
  dragonpit: event("storming-of-the-dragonpit", "Storming of the Dragonpit"),
  godsEye: event("battle-of-the-gods-eye", "Battle of the God's Eye"),
  deathOfRhaenyra: event("death-of-rhaenyra", "Death of Rhaenyra Targaryen"),
  tumbletonOne: event("first-battle-of-tumbleton", "First Battle of Tumbleton"),
  tumbletonTwo: event("second-battle-of-tumbleton", "Second Battle of Tumbleton"),
  deathOfViserys: event("death-of-viserys-i", "Death of Viserys I"),
} as const

/* ------------------------------------------------------------------ *
 * The dragons
 * ------------------------------------------------------------------ */

export const dragons: Dragon[] = [
  /* -------------------------------------------------- Ancestor era */

  {
    slug: "balerion",
    name: "Balerion",
    epithet: "The Black Dread",
    era: "ancestor",
    allegiance: "targaryen",
    status: "dead",
    color: "Black",
    rider: "Aegon the Conqueror",
    houseRef: HOUSE.targaryen,
    stats: { size: 100, age: 100, combat: 98, speed: 60 },
    description:
      "The largest dragon ever to fly — black-scaled, black-horned, with fire hot enough to melt the towers of Harrenhal.",
    lore: [
      "Balerion the Black Dread was born in the Freehold of Old Valyria and crossed the Narrow Sea with Aegon Targaryen and his sisters to Dragonstone. His scales were black as midnight, so were his horns, his tongue and his eyes, and the flames he breathed ran red-black — a heat that could melt stone and steel alike. No dragon before or since has matched his size; his wingspan was said to blot out the sun.",
      "He carried Aegon through the Conquest of Westeros. With Vhagar and Meraxes he burned Harren the Black and his granite towers of Harrenhal to nothing, and at the Field of Fire he and his sisters annihilated the combined armies of the Reach and the Westerlands. Where Balerion flew, kingdoms bent the knee: Torrhen Stark knelt rather than face the black dread, and Dorne alone refused the dragon and paid for it in fire.",
      "Balerion lived two hundred years, long enough to outlive even Aegon the Conqueror, who rode him last of the great kings. He died in 94 AC in Oldtown, and his blackened skull — still large enough to swallow a hound — is kept beneath the Red Keep. Every Targaryen dragon since has been measured against him, and in the far east men whisper that Daenerys Targaryen's Drogon is the Black Dread reborn.",
    ],
    battles: [],
    images: [
      "/dragons/balerion/b1.webp",
      "/dragons/balerion/b2.jpg",
      "/dragons/balerion/b3.jpg",
      "/dragons/balerion/b4.jpg",
      "/dragons/balerion/b5.jpeg",
    ],
    refs: [
      HOUSE.targaryen,
      dragonRef("vhagar", "Vhagar"),
      dragonRef("meraxes", "Meraxes"),
      dragonRef("drogon", "Drogon"),
    ],
  },

  {
    slug: "vhagar",
    name: "Vhagar",
    era: "ancestor",
    allegiance: "targaryen",
    status: "dead",
    color: "Bronze",
    rider: "Aemond Targaryen",
    riderRef: CH.aemond,
    houseRef: HOUSE.targaryen,
    stats: { size: 97, age: 96, combat: 95, speed: 64 },
    description:
      "Named for a Valyrian god: bronze and green, the largest dragon of the Dance, and the last of the Conquest dragons to die.",
    lore: [
      "Vhagar was one of the three dragons that left Valyria with the Targaryens of Dragonstone — Balerion, Meraxes and Vhagar — and one of the three that conquered Westeros. She was named for a Valyrian god of fire, and Visenya Targaryen rode her through every battle of the Conquest. Her flame was so hot that the stones of Harrenhal ran like wax.",
      "Vhagar outlived nearly every rider she ever bore. After Visenya came Prince Baelon the Brave, and after him Laena Velaryon; when Laena died in 115 AC, the twelve-year-old Aemond Targaryen claimed her alone at Dragonstone, losing an eye to the older boys in the struggle. Thereafter he was Aemond One-Eye, and Vhagar was his — by then as huge as Balerion had ever been, and the largest dragon alive.",
      "Over Storm's End in 129 AC, Aemond and Vhagar killed Lucerys Velaryon and the young Arrax — the first dragon-murder of the Dance, and the spark that made it a war without mercy. A year later at the God's Eye, Daemon Targaryen leapt from Caraxes' back onto Vhagar's neck with Dark Sister. Locked together, both dragons crashed into the lake, and neither rose again.",
    ],
    battles: [EV.stormsend, EV.godsEye],
    images: [
      "/dragons/vhagar/v1.jpg",
      "/dragons/vhagar/v2.webp",
      "/dragons/vhagar/v3.jpg",
      "/dragons/vhagar/v4.webp",
      "/dragons/vhagar/v5.jpg",
    ],
    refs: [
      CH.aemond,
      CH.laena,
      HOUSE.targaryen,
      dragonRef("caraxes", "Caraxes"),
    ],
  },

  {
    slug: "meraxes",
    name: "Meraxes",
    era: "ancestor",
    allegiance: "targaryen",
    status: "dead",
    color: "Silver",
    rider: "Rhaenys Targaryen",
    houseRef: HOUSE.targaryen,
    stats: { size: 88, age: 82, combat: 86, speed: 76 },
    description:
      "Silver-scaled and golden-eyed, the Conquest dragon of Queen Rhaenys — felled over Dorne by a single scorpion bolt.",
    lore: [
      "Meraxes was the silver she-dragon of Queen Rhaenys Targaryen, Aegon the Conqueror's sister-wife, and one of the three great beasts that crossed the Narrow Sea with the last dragonlords of Valyria. Golden-eyed and scale-bright, she carried Rhaenys through the Conquest and the burning of Harrenhal alongside Balerion and Vhagar.",
      "In 10 AC, during the subjugation of Dorne, Rhaenys flew Meraxes against the Hellholt. As the dragon wheeled above the castle, a scorpion's bolt pierced her eye. Dragon and rider came down out of the sky together, and Meraxes' death-throes destroyed much of the keep beneath her. Whether Queen Rhaenys was killed by the fall or buried in the rubble, no man could say — her body was never found.",
      "Her death broke something in Aegon the Conqueror. For a year the realm burned as dragonflame ravaged Dorne in answer, yet the Dornish would not be subdued, and Dorne remained beyond the reach of the Iron Throne for nearly two hundred years, joining the Seven Kingdoms only through the marriage pact of Daeron II.",
    ],
    battles: [],
    images: [
      "/dragons/meraxes/m1.webp",
      "/dragons/meraxes/m2.jpg",
      "/dragons/meraxes/m3.jpg",
      "/dragons/meraxes/m4.jpg",
      "/dragons/meraxes/m5.jpg",
    ],
    refs: [
      HOUSE.targaryen,
      dragonRef("balerion", "Balerion"),
      dragonRef("vhagar", "Vhagar"),
      dragonRef("meleys", "Meleys"),
    ],
  },

  {
    slug: "vermithor",
    name: "Vermithor",
    epithet: "The Bronze Fury",
    era: "ancestor",
    allegiance: "targaryen",
    status: "dead",
    color: "Bronze",
    rider: "Jaehaeraerys I Targaryen",
    houseRef: HOUSE.targaryen,
    stats: { size: 92, age: 88, combat: 90, speed: 70 },
    description:
      "The Bronze Fury — mount of King Jaehaeraerys I, later Hugh Hammer's, and the second-greatest dragon of the Dance.",
    lore: [
      "Vermithor, the Bronze Fury, was a bronze-and-tan dragon of Dragonstone who was claimed by the young Jaehaeraerys Targaryen and became the king's mount for the half-century of his peaceful reign. When Jaehaeraerys died in 103 AC the old dragon passed to no new master; for twenty-six years he brooded riderless in the Dragonmont, growing vast and restless.",
      "During the Sowing of the Dragonseed in 129 AC, of all the bastards and baseborn who came to Dragonstone seeking a dragon, it was the blacksmith Hugh Hammer whom Vermithor chose — a huge, raw-boned man said to have Targaryen blood in him. With Vermithor and Silverwing claimed, Queen Rhaenyra's cause suddenly had the two largest dragons in the world.",
      "In 130 AC came the Treason at Tumbleton: Hugh and Ulf turned their dragons on the very town they had been sent to defend, burning Black and Green alike — the Two Betrayers. After Hugh was murdered by the Caltrops, the riderless Vermithor went mad with rage, slew two score knights who dared attack him, and at the Second Battle of Tumbleton fought Seasmoke and Tessarion in the last great dragon-brawl of the war. He killed Seasmoke, then collapsed and died of his wounds.",
    ],
    battles: [EV.tumbletonOne, EV.tumbletonTwo],
    images: [
      "/dragons/vermithor/v1.webp",
      "/dragons/vermithor/v2.jpg",
      "/dragons/vermithor/v3.webp",
      "/dragons/vermithor/v4.avif",
      "/dragons/vermithor/v5.jpg",
    ],
    refs: [
      HOUSE.targaryen,
      dragonRef("silverwing", "Silverwing"),
      dragonRef("seasmoke", "Seasmoke"),
    ],
  },

  {
    slug: "silverwing",
    name: "Silverwing",
    era: "ancestor",
    allegiance: "targaryen",
    status: "dead",
    color: "Silver",
    rider: "Alysanne Targaryen",
    houseRef: HOUSE.targaryen,
    stats: { size: 82, age: 85, combat: 74, speed: 74 },
    description:
      "The gentle silver dragon of Good Queen Alysanne — twice widowed by riders, a survivor of the Dance, and a wild thing at the last.",
    lore: [
      "Silverwing was the silver she-dragon of Queen Alysanne Targaryen, and the beloved mount of one of the happiest royal marriages in Targaryen history. Alysanne flew her to the Wall, where the black brothers welcomed a queen's grace — and where, three times, Silverwing refused to fly beyond the Wall, turning back for reasons the maesters never understood. Ridersless after Alysanne's death, she remained at Dragonstone for decades.",
      "In 129 AC the dragon Ulf White claimed her during the Sowing, and the next year Silverwing was one of the two dragons of the Treason at Tumbleton — sent to defend the town for Queen Rhaenyra, she and Vermithor instead burned it, killing thousands on both sides. When the Caltrops later poisoned Ulf's wine, Silverwing was widowed a second time.",
      "Riderless and unclaimed, Silverwing circled the Second Battle of Tumbleton for hours without fighting, then descended at nightfall to lie between the corpses of Vermithor, Seasmoke and Tessarion. She was one of only four dragons left alive when the war ended, and the last of the old Conquest bloodlines: she flew to Red Lake, lived wild another two decades, and died sometime between 136 and 153 AC.",
    ],
    battles: [EV.tumbletonOne, EV.tumbletonTwo],
    images: [
      "/dragons/silverwing/s1.webp",
      "/dragons/silverwing/s2.jpg",
      "/dragons/silverwing/s3.jpg",
      "/dragons/silverwing/s4.jpg",
      "/dragons/silverwing/s5.png",
    ],
    refs: [
      HOUSE.targaryen,
      dragonRef("vermithor", "Vermithor"),
      dragonRef("cannibal", "The Cannibal"),
    ],
  },

  /* ---------------------------------------------------- Dance era */

  {
    slug: "caraxes",
    name: "Caraxes",
    epithet: "The Blood Wyrm",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Blood Red",
    rider: "Daemon Targaryen",
    riderRef: CH.daemon,
    houseRef: HOUSE.targaryen,
    stats: { size: 78, age: 72, combat: 94, speed: 84 },
    description:
      "A long, lean, blood-red wyrm with a scream like tearing metal — the savage mount of Daemon Targaryen.",
    lore: [
      "Caraxes was a blood-red dragon, long and lean and serpentine of neck, with a temper to match his colour — the singers called him the Blood Wyrm. He was the mount of Prince Daemon Targaryen from the Rogue Prince's youth, and the two were as alike as rider and beast could be: quick to wrath, fond of battle, and impossible to put down.",
      "Daemon rode Caraxes through the wars in the Stepstones, where he made himself king, and again in 130 AC when he took Harrenhal almost without a stroke and used it as the base for Queen Rhaenyra's march on the capital. Wherever Caraxes' shadow fell, garrisons opened their gates; the Blood Wyrm's reputation alone was worth a host.",
      "At the God's Eye in 130 AC, Daemon met Aemond One-Eye, riding Vhagar — the largest dragon alive against one of the fiercest. The two circled the lake until, at the last, Daemon leapt from Caraxes' saddle onto Vhagar's neck with the Valyrian steel spear Dark Sister. Both dragons fell locked together into the water, and neither rose; the Dance would never see their like again.",
    ],
    battles: [EV.godsEye],
    images: [
      "/dragons2/caraxes/c1.jpg",
      "/dragons2/caraxes/c2.jpg",
      "/dragons2/caraxes/c3.jpg",
      "/dragons2/caraxes/c4.jpg",
      "/dragons2/caraxes/c5.png",
    ],
    refs: [
      CH.daemon,
      HOUSE.targaryen,
      dragonRef("vhagar", "Vhagar"),
      EV.bloodAndCheese,
    ],
  },

  {
    slug: "syrax",
    name: "Syrax",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Yellow",
    rider: "Rhaenyra Targaryen",
    riderRef: CH.rhaenyra,
    houseRef: HOUSE.targaryen,
    stats: { size: 74, age: 55, combat: 68, speed: 72 },
    description:
      "The yellow she-dragon of Queen Rhaenyra Targaryen — pampered in the Dragonstone yards, and killed at the storming of the Dragonpit.",
    lore: [
      "Syrax was the yellow-scaled she-dragon of Queen Rhaenyra Targaryen, bonded to the princess in childhood and raised in the dragon yards of Dragonstone. She was a large and willful beast, but a court dragon: pampered, half-tame and untested by war, with no battle to her name when the succession was contested in 129 AC.",
      "When the realm divided after the death of King Viserys I, Syrax carried Rhaenyra's cause as surely as any sword. The queen's dragon was at her side through the fall of King's Landing and the taking of the Iron Throne, and Syrax's presence over the capital was the surest sign that the Blacks held the city.",
      "In 130 AC the Shepherd's rabble stormed the Dragonpit to slay the dragons caged there. Prince Joffrey, frantic for his own chained dragon Tyraxes, loosed Syrax from the yard and flew her down into the mob — and the queen's dragon, this one battle-dragon at last, fought and slew men in scores before she was hacked, speared and arrowed to death beneath the burning dome. Rhaenyra never rode a dragon again.",
    ],
    battles: [EV.fallOfKingsLanding, EV.dragonpit],
    images: [
      "/dragons2/syrax/s1.jpg",
      "/dragons2/syrax/s2.jpg",
      "/dragons2/syrax/s3.webp",
      "/dragons2/syrax/s4.jpg",
      "/dragons2/syrax/s5.jpg",
    ],
    refs: [
      CH.rhaenyra,
      CH.daemon,
      HOUSE.targaryen,
      EV.deathOfViserys,
    ],
  },

  {
    slug: "sunfyre",
    name: "Sunfyre",
    epithet: "The Golden",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Gold",
    rider: "Aegon II Targaryen",
    riderRef: CH.aegonII,
    houseRef: HOUSE.targaryen,
    stats: { size: 79, age: 52, combat: 91, speed: 80 },
    description:
      "The most beautiful dragon ever seen — golden-scaled mount of Aegon II, wounded again and again and still killing.",
    lore: [
      "Sunfyre the Golden was hatched for Prince Aegon, the elder son of Viserys I, and grew into what the maesters call the most beautiful dragon ever: scales of shining gold, eyes like molten amber, and wings that caught the light like a sheet of hammered metal. He was young at the Dance's outbreak, but brave, strong and utterly loyal to his rider.",
      "At the Battle of Rook's Rest, Sunfyre flew with Vhagar against Meleys and the Queen Who Never Was. The golden dragon tore into the Red Queen and was himself savagely wounded — his wing half-torn away — and when Meleys fell, Aegon II was broken by dragonfire and lance. Sunfyre could not fly; for months the great dragon crawled through the countryside, hiding and healing, while the Greens despaired of him.",
      "Against every expectation Sunfyre took wing again and flew to Dragonstone, where on the way he ambushed and devoured the wild dragon Grey Ghost in full view of fishermen. There he fought Baela Targaryen's Moondancer in a duel that mortally wounded them both, and afterwards Aegon II had the queen fed to his dying dragon. Sunfyre died of his wounds at Dragonstone in 130 AC, having outlived his enemy by only a few days.",
    ],
    battles: [EV.rooksRest, EV.deathOfRhaenyra],
    images: [
      "/dragons2/sunfyre/s1.jpg",
      "/dragons2/sunfyre/s2.jpg",
      "/dragons2/sunfyre/s3.jpg",
      "/dragons2/sunfyre/s4.jpg",
      "/dragons2/sunfyre/s5.jpg",
    ],
    refs: [
      CH.aegonII,
      HOUSE.targaryen,
      dragonRef("grey-ghost", "Grey Ghost"),
      EV.deathOfViserys,
    ],
  },

  {
    slug: "meleys",
    name: "Meleys",
    epithet: "The Red Queen",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Red",
    rider: "Rhaenys Targaryen",
    riderRef: CH.rhaenys,
    houseRef: HOUSE.targaryen,
    stats: { size: 80, age: 76, combat: 92, speed: 94 },
    description:
      "The Red Queen — crimson and fast as any dragon alive, mount of Rhaenys Targaryen, who fell at Rook's Rest.",
    lore: [
      "Meleys, the Red Queen, was the old she-dragon of Princess — later Queen — Rhaenys Targaryen, the so-called Queen Who Never Was. Red of scale and hot of temper, she was quick and bold for all her age, and the smallfolk swore no dragon in Westeros could outfly her; the court that she was the fastest beast alive, save perhaps Caraxes.",
      "Rhaenys had ridden Meleys for decades, and the pair were inseparable — the two of them were the Velaryon claim's greatest weapon. When the war turned, it was Rhaenys who scout, roused and struck for Queen Rhaenyra, and it was Meleys who carried her to the only open field-battle of the Dance's first year.",
      "At Rook's Rest in 130 AC, Meleys faced both Aegon II's Sunfyre and Aemond's Vhagar at once. The Red Queen bore the fight to them, beat the golden dragon from the sky and wounded him badly, but Vhagar struck from above and Meleys was dragged down. Dragon and rider died together on the field — the greatest single loss the Blacks would suffer, and the first dragon killed by another dragon in the war.",
    ],
    battles: [EV.rooksRest],
    images: [
      "/dragons2/meleys/m1.jpg",
      "/dragons2/meleys/m2.webp",
      "/dragons2/meleys/m3.jpg",
      "/dragons2/meleys/m4.jpg",
      "/dragons2/meleys/m5.jpg",
    ],
    refs: [
      CH.rhaenys,
      CH.corlys,
      HOUSE.targaryen,
      dragonRef("sunfyre", "Sunfyre"),
    ],
  },

  {
    slug: "moondancer",
    name: "Moondancer",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Pale Green",
    rider: "Baela Targaryen",
    riderRef: CH.baela,
    houseRef: HOUSE.targaryen,
    stats: { size: 44, age: 32, combat: 66, speed: 96 },
    description:
      "A slender, pale-green she-dragon of terrifying speed — mount of Baela Targaryen, who brought down Sunfyre over Dragonstone.",
    lore: [
      "Moondancer was the pale green she-dragon of Baela Targaryen, the elder daughter of Daemon Targaryen and Laena Velaryon. Small, slender and quick, she was built for agility rather than mass — a darting, whipping flier who could turn inside any dragon grown to twice her size.",
      "Moondancer's one great battle came at Dragonstone in 130 AC. Slipping back into the castle while Rhaenyra held King's Landing, Aegon II found the island defended, and Baela flew the Moondancer to meet him. She eluded Sunfyre's flames and his jaws, darted beneath his grasping claws and raked the larger dragon from above, wounding him so badly that the golden dragon would never truly fly again.",
      "Moondancer paid for it with her life. Mortally burned in the duel, she crashed to the ground with Baela still in the saddle; the princess survived her fall and was taken prisoner, but her dragon died of her wounds. Baela Targaryen would carry the loss — and her courage — for the rest of her life.",
    ],
    battles: [],
    images: [
      "/dragons2/moondancer/m1.jpg",
      "/dragons2/moondancer/m2.jpg",
      "/dragons2/moondancer/m3.jpg",
      "/dragons2/moondancer/m4.jpg",
      "/dragons2/moondancer/m5.jpg",
    ],
    refs: [
      CH.baela,
      CH.laena,
      CH.daemon,
      HOUSE.targaryen,
      dragonRef("sunfyre", "Sunfyre"),
    ],
  },

  {
    slug: "seasmoke",
    name: "Seasmoke",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Silver Grey",
    rider: "Addam of Hull",
    houseRef: HOUSE.velaryon,
    stats: { size: 58, age: 54, combat: 78, speed: 86 },
    description:
      "A quick silver-grey dragon, first Laenor Velaryon's and then Addam of Hull's — slain by Vermithor at Tumbleton.",
    lore: [
      "Seasmoke was a silver-grey dragon, nimble and responsive under the hand, who was claimed by Ser Laenor Velaryon, son of Lord Corlys. Laenor rode him from the youth, and Seasmoke was as much a fixture of Driftmark as the Velaryon banners — until Laenor's supposed death in 120 AC left the dragon riderless and, it was said, grieving.",
      "The dragon's second bond was the strangest of the war. Seasmoke began to haunt a baseborn boy of Hull — Addam, later Addam of Hull, whom Queen Rhaenyra legitimised as a Velaryon — and at last settled on his shoulder and took him as his rider. From that moment Addam was a dragonrider of the Blacks, and Seasmoke, who had been Laenor's, flew him loyally to the end.",
      "At the Second Battle of Tumbleton in 130 AC, Addam led the relief of the town atop Seasmoke: first he fought the riderless Tessarion in a nimble duel in the air, then, seeing the great Vermithor descend on the field, he turned the smaller dragon against the Bronze Fury himself. Vermithor's jaws closed on Seasmoke and killed him; Addam of Hull fell with him, and neither rose.",
    ],
    battles: [EV.tumbletonTwo],
    images: [
      "/dragons2/seasmoke/s1.avif",
      "/dragons2/seasmoke/s2.jpg",
      "/dragons2/seasmoke/s3.jpg",
      "/dragons2/seasmoke/s4.webp",
      "/dragons2/seasmoke/s5.jpg",
    ],
    refs: [
      HOUSE.velaryon,
      CH.laenor,
      dragonRef("vermithor", "Vermithor"),
    ],
  },

  {
    slug: "vermax",
    name: "Vermax",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Green",
    rider: "Jacaerys Velaryon",
    houseRef: HOUSE.velaryon,
    stats: { size: 60, age: 44, combat: 80, speed: 82 },
    description:
      "The green-and-orange dragon of Prince Jacaerys Velaryon — quick, brave, and lost with his rider in the Battle of the Gullet.",
    lore: [
      "Vermax was the dragon of Prince Jacaerys Velaryon, the eldest son of Rhaenyra Targaryen and Laenor Velaryon, and he grew as fast as his rider rose. Green-scaled with orange flame, Vermax was a young but eager war-dragon, trained from the egg at Dragonstone and bonded to Jace since boyhood.",
      "When the Greens contested the succession, it was Jacaerys who flew north on Vermax to treat with Lord Cregan Stark at Winterfell and Lady Jane Arryn in the Vale, binding the North and the Vale to his mother's cause with nothing but dragonfire and Targaryen pride. The alliances he won would matter as much as any battle.",
      "Vermax's first and last battle was the Gullet, on the fifth day of the first moon of 130 AC, when the Triarchy's fleets fell on the Velaryon anchororage. Flying too low — struck by a crossbow bolt, or caught by a grapnel — Vermax crashed into a burning galley and went down beneath the waves. Jacaerys freed himself from the drowning dragon, but Myrish crossbow quarrels finished him in the water.",
    ],
    battles: [EV.gullet],
    images: [
      "/dragons2/vermax/v1.jpg",
      "/dragons2/vermax/v2.jpg",
      "/dragons2/vermax/v3.jpg",
      "/dragons2/vermax/v4.jpg",
      "/dragons2/vermax/v5.jpg",
    ],
    refs: [
      HOUSE.velaryon,
      CH.rhaenyra,
      dragonRef("arrax", "Arrax"),
      dragonRef("tyraxes", "Tyraxes"),
    ],
  },

  {
    slug: "arrax",
    name: "Arrax",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Pearl White",
    rider: "Lucerys Velaryon",
    houseRef: HOUSE.velaryon,
    stats: { size: 42, age: 30, combat: 54, speed: 90 },
    description:
      "Pearlescent white with a golden chest — the young, quick dragon of Lucerys Velaryon, killed over Shipbreaker Bay.",
    lore: [
      "Arrax was a young pearl-white dragon with golden eyes and a golden chest, and the mount of Prince Lucerys Velaryon, second son of Rhaenyra Targaryen. Small for his age but quick and eager, Arrax had never been in a battle when his father's succession was stolen — and his first battle was to be his last.",
      "In 129 AC Lucerys rode Arrax through a gathering storm to Storm's End, carrying Rhaenyra's message to Lord Borros Baratheon. The errand was a feint of politics rather than war, but Aemond One-Eye was waiting: ahead of the castle gates he came after them on Vhagar, the largest dragon in the world, against a boy on a hatchling-grown dragon.",
      "Over Shipbreaker Bay, in wind and rain and lightning, Lucerys turned to fight. Arrax dodged Vhagar's flame and struck back, but the storm-slick air gave no room to run; Vhagar's jaws closed on the young dragon out of the dark, and Arrax and his rider fell together into the sea. It was the first dragon-killing of the Dance, and it made the war inevitable.",
    ],
    battles: [EV.stormsend],
    images: [
      "/dragons2/arrax/a1.jpg",
      "/dragons2/arrax/a2.jpg",
      "/dragons2/arrax/a3.jpg",
      "/dragons2/arrax/a4.jpg",
      "/dragons2/arrax/a5.jpg",
    ],
    refs: [
      HOUSE.velaryon,
      dragonRef("vhagar", "Vhagar"),
      dragonRef("vermax", "Vermax"),
      EV.bloodAndCheese,
    ],
  },

  {
    slug: "tessarion",
    name: "Tessarion",
    epithet: "The Blue Queen",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Cobalt Blue",
    rider: "Daeron Targaryen",
    houseRef: HOUSE.targaryen,
    stats: { size: 64, age: 48, combat: 83, speed: 87 },
    description:
      "The Blue Queen — cobalt scales shot with copper, a young but deadly dragon who died in the three-way fight at Tumbleton.",
    lore: [
      "Tessarion was a beautiful blue she-dragon — dark cobalt scales with copper claws, crest and belly — and the mount of Prince Daeron Targaryen, the youngest son of Viserys I. Small and young but wonderfully nimble, she was bonded to Daeron by 120 AC and grew with him into a first-rate war-dragon.",
      "Tessarion burned Bitterbridge in wrath after the death of her rider's nephew Prince Maelor, and she flew in the First Battle of Tumbleton, where the Treason of the Two Betrayers left the town in ash. Afterward Daeron and Tessarion kept to the Green camp at Tumbleton, where the dragon slept unhitched beside his pavilion, free to hunt and fly as she pleased.",
      "At the Second Battle of Tumbleton in 130 AC Daeron died in the opening moments — his tent afire, the manner of his end disputed — and Tessarion rose riderless, shrieking and spitting flame, to fight Addam of Hull and Seasmoke. When the great Vermithor entered the brawl she joined it of her own will; all three dragons fought, and when the dust settled Tessarion was the last to die, a mercy stroke ending her on the field.",
    ],
    battles: [EV.tumbletonOne, EV.tumbletonTwo],
    images: [
      "/dragons2/tessarion/t1.jpg",
      "/dragons2/tessarion/t2.jpg",
      "/dragons2/tessarion/t3.jpg",
      "/dragons2/tessarion/t4.jpg",
      "/dragons2/tessarion/t5.jpg",
    ],
    refs: [
      HOUSE.targaryen,
      HOUSE.hightower,
      dragonRef("seasmoke", "Seasmoke"),
      dragonRef("vermithor", "Vermithor"),
    ],
  },

  {
    slug: "tyraxes",
    name: "Tyraxes",
    era: "dance",
    allegiance: "targaryen",
    status: "dead",
    color: "Pale Violet",
    rider: "Joffrey Velaryon",
    houseRef: HOUSE.velaryon,
    stats: { size: 38, age: 26, combat: 42, speed: 68 },
    description:
      "A pale violet hatchling-grown dragon of Prince Joffrey Velaryon — chained in the Dragonpit and slain by the mob.",
    lore: [
      "Tyraxes hatched between 117 and 120 AC for Prince Joffrey Velaryon, the youngest of Queen Rhaenyra's sons by Laenor Velaryon. Described by those who saw him as a pale violet dragon with dark purple horns and purple flame, he was the smallest of the Velaryon brothers' mounts and the least tested — a young beast who never knew a battlefield.",
      "Because of his size and youth, Tyraxes was always kept within the walls: chained in his lair in the Dragonpit at King's Landing while the war raged beyond the city. That chain, meant to keep him safe, became the instrument of his death.",
      "When the Shepherd's mob stormed the Dragonpit in 130 AC, Tyraxes burned the front of his lair full of bodies until the entrance was a wall of corpses. But the crowd broke through the back door of the vault, and in the dark the young dragon, tangled in his own chains, could not turn on them — the mob slew him there. Of the five dragons that died beneath the burning dome, Tyraxes was one.",
    ],
    battles: [EV.dragonpit],
    images: [
      "/dragons2/tyraxes/t1.jpg",
      "/dragons2/tyraxes/t2.jpg",
      "/dragons2/tyraxes/t3.jpg",
      "/dragons2/tyraxes/t4.jpg",
      "/dragons2/tyraxes/t5.jpg",
    ],
    refs: [
      HOUSE.velaryon,
      CH.rhaenyra,
      dragonRef("vermax", "Vermax"),
      dragonRef("arrax", "Arrax"),
    ],
  },

  {
    slug: "sheepstealer",
    name: "Sheepstealer",
    era: "dance",
    allegiance: "targaryen",
    status: "unknown",
    color: "Muddy Brown",
    rider: "Nettles",
    stats: { size: 70, age: 64, combat: 74, speed: 76 },
    description:
      "A mud-brown wild dragon of Dragonstone who stole sheep — tamed at last by the girl Nettles, and never seen again.",
    lore: [
      "Sheepstealer was one of the three wild dragons of Dragonstone — the Cannibal, the Grey Ghost and herself — a muddy brown she-dragon old enough to have hunted the island's flocks for decades. She took her name from her habit: sheep simply disappeared from the Dragonmont's shepherds, and no man ever saw her catch them.",
      "In the Sowing of 129 AC, when every knight and bastard who tried was burned or driven off, it was a baseborn girl called Nettles who won her — by the oldest trick in the world, bringing the dragon a sheep every day until she could scratch behind her jaws. Nettles rode Sheepstealer for Queen Rhaenyra, and the two of them hunted and flew together like old friends.",
      "After the fall of King's Landing, Queen Rhaenyra — mad with grief and suspicion — declared Nettles a witch and ordered her executed. Daemon Targaryen, who had come to love the girl, warned her instead, and Nettles flew Sheepstealer out of Dragonstone in the night. They vanished into the Mountains of the Moon, and neither dragon nor rider was ever seen again; some maesters think they died there, and some folk in the hills still tell of them.",
    ],
    battles: [],
    images: [
      "/dragons2/sheepstealer/s1.jpg",
      "/dragons2/sheepstealer/s2.jpg",
      "/dragons2/sheepstealer/s3.webp",
      "/dragons2/sheepstealer/s4.jpg",
      "/dragons2/sheepstealer/s5.jpg",
    ],
    refs: [
      CH.daemon,
      dragonRef("cannibal", "The Cannibal"),
      dragonRef("grey-ghost", "Grey Ghost"),
    ],
  },

  {
    slug: "cannibal",
    name: "The Cannibal",
    era: "dance",
    allegiance: "wild",
    status: "unknown",
    color: "Black",
    stats: { size: 84, age: 74, combat: 96, speed: 74 },
    description:
      "The black beast of the Dragonmont who ate eggs, hatchlings and dead dragons — and never bent his neck to any rider.",
    lore: [
      "The Cannibal was a black-scaled dragon, smoke-dark and green-eyed, who made his lair in the cold caves at the back of the Dragonmont on Dragonstone. He was older and larger than any of the island's other wild dragons, and he had one distinguishing taste: he ate dragons. Eggs were stolen from their nests, hatchlings from the hatcheries, and the dead from the field.",
      "No rider ever lived who could claim him. When the Sowing of the Dragonseed came in 129 AC, every hopeful who approached the Cannibal's cave was burned and devoured — the dragon kept the other wild dragons' kills for himself, and it was said that more men died reaching him than ever rode a dragon in the war. Of the three wild dragons of Dragonstone, he alone never carried a human being.",
      "The Cannibal outlived the Dance untouched by it. He was seen feeding on the corpses of dragons after the war's last battles, and then — nothing: he simply vanished from Dragonstone, unclaimed, unbeaten and undefeated. Whether he died in his caves or flew away over the Narrow Sea, no man can say; he is one of the very few dragons whose fate is honestly unknown.",
    ],
    battles: [],
    images: [
      "/dragons2/cannibal/c1.jpg",
      "/dragons2/cannibal/c2.jpg",
      "/dragons2/cannibal/c3.jpg",
      "/dragons2/cannibal/c4.jpg",
      "/dragons2/cannibal/c5.jpg",
    ],
    refs: [
      HOUSE.targaryen,
      dragonRef("grey-ghost", "Grey Ghost"),
      dragonRef("sheepstealer", "Sheepstealer"),
    ],
  },

  {
    slug: "grey-ghost",
    name: "Grey Ghost",
    era: "dance",
    allegiance: "wild",
    status: "dead",
    color: "Pale Grey",
    stats: { size: 52, age: 50, combat: 58, speed: 92 },
    description:
      "The shy pale-grey phantom of Dragonstone, glimpsed only at dusk — devoured by Sunfyre in 130 AC.",
    lore: [
      "The Grey Ghost was the shyest of Dragonstone's three wild dragons: pale grey as smoke, lean and quick, and so shy of humankind that most maesters doubted he existed at all. Fishermen reported him only at dusk or dawn, skimming the wave-tops to snatch fish, and he left no corpses, no burned fields and no witnesses willing to swear an oath.",
      "His elusiveness cost him his life. In 130 AC, Aegon II's Sunfyre — left for dead after Rook's Rest — crawled back to Dragonstone by sea, and on the way the wounded golden dragon ambush-fed on the Grey Ghost in a rocky cove. Fishermen saw the whole thing: the phantom dragon, who had avoided every rider and every war, killed by a dragon too broken to fly.",
      "The Grey Ghost had never been claimed, never fought in the Dance, and never wronged a soul — he is remembered mostly as one of the war's quietest cruelties. The Cannibal and Sheepstealer kept their mystery; the ghost alone was caught.",
    ],
    battles: [],
    images: [
      "/dragons2/greyghost/g1.jpg",
      "/dragons2/greyghost/g2.jpg",
      "/dragons2/greyghost/g3.jpg",
      "/dragons2/greyghost/g4.jpg",
      "/dragons2/greyghost/g5.jpg",
    ],
    refs: [
      dragonRef("sunfyre", "Sunfyre"),
      dragonRef("cannibal", "The Cannibal"),
      dragonRef("sheepstealer", "Sheepstealer"),
    ],
  },

  /* ------------------------------------------- A Song of Ice and Fire */

  {
    slug: "drogon",
    name: "Drogon",
    era: "got",
    allegiance: "targaryen",
    status: "alive",
    color: "Black",
    rider: "Daenerys Targaryen",
    riderRef: CH.daenerys,
    houseRef: HOUSE.targaryen,
    stats: { size: 86, age: 34, combat: 95, speed: 88 },
    description:
      "Black and red with red eyes, named for Khal Drogo — the fierce, Balerion-sized dragon of Daenerys Targaryen.",
    lore: [
      "Drogon was the largest and fiercest of Daenerys Targaryen's three dragons, black of scale with red stripes and eyes like hot embers. He was named for Daenerys' dead husband, Khal Drogo, and hatched from the last of the three petrified eggs on the funeral pyre that made Daenerys a queen of the ashes — the first dragons born into the world in more than a century.",
      "Where his brothers were curious, Drogon was savage: he killed, hunted and burned with an intelligence that frightened even Daenerys. He grew with terrible speed, and in the fighting pits of Meereen he came to his mother when she called, bore her out of the riot and carried her into the wastes of the Dothraki sea — dragon and rider alone together for the first time.",
      "To every scholar and Targaryen alive, Drogon is Balerion the Black Dread made small and growing: the same black scales, the same black fire, the same unbowed spirit. Daenerys' reign, her claim to the Iron Throne, and the return of magic to the world are all bound up in him — and where Drogon flies, men remember what dragons were for.",
    ],
    battles: [],
    images: [
      "/dragons3/drogon/d1.jpg",
      "/dragons3/drogon/d2.jpg",
      "/dragons3/drogon/d3.jpg",
      "/dragons3/drogon/d4.jpg",
      "/dragons3/drogon/d5.jpg",
    ],
    refs: [
      CH.daenerys,
      HOUSE.targaryen,
      dragonRef("balerion", "Balerion"),
      dragonRef("rhaegal", "Rhaegal"),
    ],
  },

  {
    slug: "rhaegal",
    name: "Rhaegal",
    era: "got",
    allegiance: "targaryen",
    status: "alive",
    color: "Green",
    rider: "Jon Snow",
    riderRef: CH.jonSnow,
    houseRef: HOUSE.targaryen,
    stats: { size: 74, age: 34, combat: 78, speed: 80 },
    description:
      "Green and bronze, named for Rhaegar Targaryen — brother to Drogon, and in the end the dragon Jon Snow rode.",
    lore: [
      "Rhaegal was one of the three eggs that hatched on Khal Drogo's pyre — green of scale, with bronze horns and wing-edges like his namesake's colours. He was named for Rhaegar Targaryen, Daenerys' dead brother, whose children were murdered in the sack of King's Landing; the prince never knew the dragon that carries his name.",
      "Of the three, Rhaegal was the most alert and the most aggressive toward strangers, though he accepted Daenerys as surely as his brothers did. He flew in formation over Slaver's Bay and grew almost as large as Drogon — a war-dragon in all but the saddle, since his queen never rode him in the east.",
      "It was in Westeros that Rhaegal found a second rider: Jon Snow, revealed as a Targaryen prince, mounted him in the far North — dragon and rider circling the frozen land in the sight of Daenerys herself. The bond lasted days, not years; but as long as Rhaegal lives, three Targaryen dragons still beat their wings over the world, and the age of dragonkind is not yet ended.",
    ],
    battles: [],
    images: [
      "/dragons3/rhaegal/r1.jpg",
      "/dragons3/rhaegal/r2.jpg",
      "/dragons3/rhaegal/r3.webp",
      "/dragons3/rhaegal/r4.jpg",
      "/dragons3/rhaegal/r5.jpg",
    ],
    refs: [
      CH.jonSnow,
      CH.daenerys,
      HOUSE.targaryen,
      dragonRef("drogon", "Drogon"),
    ],
  },

  {
    slug: "viserion",
    name: "Viserion",
    era: "got",
    allegiance: "targaryen",
    status: "alive",
    color: "Cream",
    stats: { size: 72, age: 34, combat: 76, speed: 82 },
    description:
      "Cream and gold with blue-green eyes, named for Viserys — gentle with his own, deadly to everyone else.",
    lore: [
      "Viserion was the cream-and-gold dragon of Daenerys Targaryen, named for her murdered brother Viserys, who never lived to see a dragon of his own. He had eyes of blue-green and a temper to match his brothers: where Drogon raged, Viserion threatened, and his loss would be felt as keenly as any battle's.",
      "Hatched from the third of the three eggs on Drogo's pyre, Viserion was the most affectionate of the three — he let Daenerys' handmaidens scratch his face and played with the children of Meereen — but the smallfolk learned quickly that affection and danger are not opposites. Like his brothers he grew astonishingly fast, outgrowing pens, towers and eventually the whole idea of confinement.",
      "In the books Viserion remains among the living, winging between Dragonstone and the skies of the Narrow Sea, unclaimed by any rider. He is the quietest of the three, but a Targaryen dragon nonetheless: his name ties the last dragons to the dynasty's long memory, from Viserys I through the Dance and back again to the fire that made them.",
    ],
    battles: [],
    images: [
      "/dragons3/viserion/v1.jpg",
      "/dragons3/viserion/v2.jpg",
      "/dragons3/viserion/v3.jpg",
      "/dragons3/viserion/v4.jpg",
      "/dragons3/viserion/v5.jpg",
    ],
    refs: [
      CH.daenerys,
      HOUSE.targaryen,
      dragonRef("drogon", "Drogon"),
      dragonRef("rhaegal", "Rhaegal"),
    ],
  },
]

/** Lookup helper for dynamic routes and cross-links. */
export const dragonBySlug = (slug: string) => dragons.find(d => d.slug === slug)

/** Hand-picked showcase dragons used on the landing and index sections. */
export const featuredDragons: Dragon[] = [
  "vhagar",
  "caraxes",
  "sunfyre",
  "vermithor",
  "syrax",
  "meleys",
].flatMap(slug => {
  const dragon = dragonBySlug(slug)
  return dragon ? [dragon] : []
})

/** Short labels for chips, cards and badges. */
export const eraLabel: Record<Era, string> = {
  ancestor: "Ancestor Era",
  dance: "Dance Era",
  got: "Ice & Fire Era",
}

export const statusLabel: Record<LifeStatus, string> = {
  alive: "Alive",
  dead: "Dead",
  unknown: "Fate Unknown",
}
