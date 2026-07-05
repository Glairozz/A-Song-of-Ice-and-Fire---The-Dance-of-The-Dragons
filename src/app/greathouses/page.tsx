"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { motion } from "framer-motion"

interface Character {
  src: string
  name: string
  description: string
}

interface HouseSection {
  house: string
  era?: string
  characters: Character[]
}

const houses = [
  { src: "/housesimages/Targaryen.jpg", name: "House Targaryen", description: "House Targaryen is a once-great dynasty descended from ancient Valyria, known for its dragons, silver hair, and fiery ambition. For centuries they ruled Westeros through fire and blood, their power rooted in both prophecy and destruction. Their legacy is defined by internal conflict, political intrigue, and the struggle to balance destiny with human weakness. Though often brilliant and visionary, Targaryens are equally prone to madness, making their rule both magnificent and tragic." },
  { src: "/housesimages/Stark.webp", name: "House Stark", description: "House Stark is one of Westeros' oldest families, descended from the First Men and deeply tied to the harsh, honorable North. They rule from Winterfell with a steadfast code of integrity and loyalty, values that set them apart in a world of political corruption. Known for their solemn nature and resilience, the Starks embody duty and sacrifice, often paying a heavy price for their unwavering principles. Their house words — 'Winter is Coming' — reflect both the climate they endure and the hardships that define their story." },
  { src: "/housesimages/Lannister.webp", name: "House Lannister", description: "House Lannister is the wealthiest and most politically formidable family in Westeros, ruling from the golden halls of Casterly Rock. With immense resources, sharp intellect, and an obsession with legacy, the Lannisters dominate court politics through strategy, intimidation, and charm. Their reputation is shaped by pride and ruthlessness, but also brilliance and ambition. Above all, they are defined by the belief that power must be seized and maintained at any cost — and that a Lannister always pays their debts." },
  { src: "/housesimages/Velaryon.jpg", name: "House Velaryon", description: "House Velaryon is an ancient Valyrian house renowned for its naval mastery, seafaring prowess, and deep ties to House Targaryen. From their seat at Driftmark, they command the wealth of global trade routes and boast some of the finest fleets in history. Though lacking dragons, their influence often rivals that of kings, built on ambition, exploration, and political shrewdness. Their identity blends maritime strength with Valyrian heritage, making them essential players in every major conflict of their era." },
  { src: "/housesimages/Hightower.png", name: "House Hightower", description: "House Hightower is one of the oldest and most respected noble families, ruling from the towering beacon of Oldtown. Known for their wealth, scholarship, and connection to the Citadel and Faith of the Seven, they are a powerful cultural and political force. Reserved yet calculating, the Hightowers often exert influence subtly rather than through open warfare. Their ambitions run deep, and through diplomacy, marriage, and manipulation, they shape the realm from behind the scenes." },
  { src: "/housesimages/Baratheon.webp", name: "House Baratheon", description: "House Baratheon is a storm-forged dynasty known for its fierce warriors, tempestuous tempers, and unyielding resilience. Founded by Orys Baratheon after Aegon's Conquest, they rule the Stormlands with a blend of raw strength and stubborn pride. Baratheons are often larger-than-life figures — bold, charismatic, and prone to conflict — whose actions help spark major turning points in Westerosi history. Their storm-born nature makes them both formidable allies and dangerous rivals." },
  { src: "/housesimages/Greyjoy.jpg", name: "House Greyjoy", description: "House Greyjoy rules the Iron Islands with a harsh, seafaring culture built on raiding, independence, and devotion to the Drowned God. The Ironborn value strength over diplomacy, believing in taking what is not freely given. Their identity is shaped by salt, steel, and storm, producing fierce leaders and brutal rebellions. While their isolation makes them outsiders to mainland politics, their ambition and naval power ensure they are never truly ignored." },
  { src: "/housesimages/Tyrell.jpg", name: "House Tyrell", description: "House Tyrell is a wealthy and politically savvy family that rules the fertile Reach, the breadbasket of the realm. Known for elegance, charm, and strategic marriages, they thrive in court diplomacy where others rely on brute force. Their public image is friendly and refined, but beneath the flowers lies sharp ambition and formidable cunning. The Tyrells excel at subtle influence, building alliances and shaping kingdoms with a smile." },
  { src: "/housesimages/Tully.webp", name: "House Tully", description: "House Tully governs the Riverlands from Riverrun, valuing family, loyalty, and honor above all else. Positioned at the crossroads of Westeros, their lands frequently become battlegrounds, forcing them into difficult alliances and costly conflicts. Though sometimes underestimated, the Tullys have strong leaders and deep emotional bonds that drive their decisions. Their house motto — 'Family, Duty, Honor' — perfectly reflects their priorities and the burdens they carry." },
  { src: "/housesimages/Arryn.jpg", name: "House Arryn", description: "House Arryn is one of the oldest and noblest Westerosi families, ruling the Vale from the impregnable Eyrie. Proud and honorable, they maintain a tradition of justice and chivalry, emphasizing purity of blood and moral integrity. Their mountainous homeland keeps them isolated and difficult to challenge, giving them strategic strength and political stability. Even so, internal vulnerabilities and personal tragedies often shape their fate." },
  { src: "/housesimages/Bolton.webp", name: "House Bolton", description: "House Bolton is a cold, ruthless Northern house infamous for cruelty, deception, and a chilling tradition of flaying their enemies. Their power comes not from honor but fear, manipulation, and calculated brutality. While they briefly rise to dominance through betrayal, their lack of loyalty ultimately weakens them. They stand as the dark mirror of the Stark values — ambitious, treacherous, and defined by terror." },
  { src: "/housesimages/Mormont.png", name: "House Mormont", description: "House Mormont is a loyal Northern house known for its fierce warriors and resilient leadership despite its small size. Ruling Bear Island, they live harsh lives shaped by rugged terrain and constant threats, forging them into some of the North's toughest fighters. Their matriarchal lineage produces remarkable women and devoted commanders who embody Northern honor. Though humble in resources, their courage commands respect across the realm." },
  { src: "/housesimages/Frey.jpg", name: "House Frey", description: "House Frey is a populous but lowborn-seeming house that rose to prominence by controlling the vital Twins crossing. Though wealthier and more influential than their reputation suggests, they are widely viewed as untrustworthy opportunists. Their ambition and resentment culminate in the infamous Red Wedding, securing them power through betrayal rather than honor. The Freys represent the brutal pragmatism of Westerosi politics at its worst." },
  { src: "/housesimages/Martell.jpg", name: "House Martell", description: "House Martell rules the sun-scorched deserts of Dorne with a culture that values independence, passion, and fierce resilience. Unlike much of Westeros, they embrace gender equality, cultural diversity, and a deep sense of honor tied to vengeance and loyalty. Their ruling style is measured and patient, but when wronged, they retaliate with deadly precision. The Martells' unique traditions and fiery defiance set them apart from every other realm in the Seven Kingdoms." },
]

const characterSections: HouseSection[] = [
  {
    house: "House Targaryen",
    era: "House of the Dragon Era",
    characters: [
      { src: "/characters/targaryan/viserys-1.jpg", name: "Viserys I Targaryen", description: "A well-meaning king whose desire for peace blinds him to the brewing conflict within his own family." },
      { src: "/characters/targaryan/daemon.jpeg", name: "Daemon Targaryen", description: "A fierce, unpredictable warrior-prince whose ambition and loyalty constantly clash." },
      { src: "/characters/targaryan/rhaenyra.jpg", name: "Rhaenyra Targaryen", description: "The named heir to the Iron Throne who must fight tradition, politics, and betrayal to claim her birthright." },
      { src: "/characters/targaryan/aegon-ii.jpg", name: "Aegon II Targaryen", description: "A reluctant ruler placed on the throne through political scheming that sparks civil war." },
      { src: "/characters/targaryan/aemond.avif", name: "Aemond Targaryen", description: "A cold, calculating prince defined by ambition, discipline, and the power of his dragon Vhagar." },
      { src: "/characters/targaryan/helaena.webp", name: "Helaena Targaryen", description: "A gentle, prophetic queen whose visions often foreshadow tragedy." },
      { src: "/characters/targaryan/baela.jpg", name: "Baela Targaryen", description: "A bold, dragonriding granddaughter of the king known for her fiery spirit." },
      { src: "/characters/targaryan/rhaena.webp", name: "Rhaena Targaryen", description: "A quieter, kinder Targaryen struggling to find her place amid a house of dragons and war." },
    ],
  },
  {
    house: "House Targaryen",
    era: "Game of Thrones Era",
    characters: [
      { src: "/characters/targaryan/daenerys.jpg", name: "Daenerys Targaryen", description: "An exiled princess who rises from nothing to command armies and dragons in pursuit of a better world." },
      { src: "/characters/targaryan/viserys.jpg", name: "Viserys Targaryen (GoT)", description: "Daenerys' bitter older brother obsessed with reclaiming the throne." },
      { src: "/characters/targaryan/rhaegar.avif", name: "Rhaegar Targaryen", description: "A noble and tragic prince whose choices ignite the events leading to the main series." },
      { src: "/characters/targaryan/aerys-ii.jpg", name: 'Aerys II "The Mad King"', description: "The last Targaryen king before Robert's Rebellion, driven to paranoia and cruelty." },
      { src: "/characters/targaryan/jon-snow.avif", name: "Jon Snow / Aegon Targaryen", description: "A humble warrior with a secret royal lineage who continually chooses honor over ambition." },
    ],
  },
  {
    house: "House Stark",
    characters: [
      { src: "/characters/stark/eddard.jpg", name: "Eddard Stark", description: "A deeply honorable lord whose integrity often puts him at odds with political corruption." },
      { src: "/characters/stark/catelyn.webp", name: "Catelyn Stark", description: "A devoted mother and strategist driven by love for her family." },
      { src: "/characters/stark/robb.webp", name: "Robb Stark", description: "A young king whose brilliance in war is undermined by tragedy and political missteps." },
      { src: "/characters/stark/sansa.webp", name: "Sansa Stark", description: "A once-naive girl who transforms into a sharp, resilient political leader." },
      { src: "/characters/stark/arya.webp", name: "Arya Stark", description: "A bold survivor who trains as an assassin to avenge her family." },
      { src: "/characters/stark/bran.webp", name: "Bran Stark", description: "The Stark son who becomes a mystical seer tied to the world's ancient magic." },
      { src: "/characters/stark/rickon.webp", name: "Rickon Stark", description: "The youngest Stark, symbolic of the family's innocence lost in war." },
      { src: "/characters/stark/benjen.webp", name: "Benjen Stark", description: "A loyal ranger of the Night's Watch who protects the realms of men." },
    ],
  },
  {
    house: "House Lannister",
    characters: [
      { src: "/characters/lannister/tywin.webp", name: "Tywin Lannister", description: "A ruthless political mastermind obsessed with strengthening his house's legacy." },
      { src: "/characters/lannister/jaime.webp", name: "Jaime Lannister", description: "A conflicted knight torn between honor, love, and reputation." },
      { src: "/characters/lannister/cersei.webp", name: "Cersei Lannister", description: "A fiercely protective and vengeful queen driven by paranoia and ambition." },
      { src: "/characters/lannister/tyrion.webp", name: "Tyrion Lannister", description: "A sharp-witted strategist who survives through intellect and resilience." },
      { src: "/characters/lannister/joffrey.png", name: "Joffrey Baratheon", description: "A cruel, impulsive boy-king whose tyranny earns him countless enemies." },
      { src: "/characters/lannister/myrcella.jpg", name: "Myrcella Baratheon", description: "A kind princess caught in the deadly politics of her family." },
      { src: "/characters/lannister/tommen.jpg", name: "Tommen Baratheon", description: "A gentle, easily swayed boy-king overwhelmed by the chaos around him." },
      { src: "/characters/lannister/kevan.webp", name: "Kevan Lannister", description: "Tywin's dutiful brother who seeks stability amid Lannister infighting." },
    ],
  },
  {
    house: "House Velaryon",
    characters: [
      { src: "/characters/velaryon/corlys.webp", name: "Corlys Velaryon", description: "A legendary seafarer known as the Sea Snake whose ambition rivals any king's." },
      { src: "/characters/velaryon/rhaenys.webp", name: "Rhaenys Targaryen", description: "The 'Queen Who Never Was,' wise and dignified despite being passed over for the throne." },
      { src: "/characters/velaryon/laenor.jpg", name: "Laenor Velaryon", description: "A nobleman and dragonrider whose life is defined by duty and constraint." },
      { src: "/characters/velaryon/laena.avif", name: "Laena Velaryon", description: "A proud dragonrider who lives and dies with fierce independence." },
      { src: "/characters/velaryon/vaemond.webp", name: "Vaemond Velaryon", description: "A sharp-tongued commander who challenges the legitimacy of Rhaenyra's sons." },
    ],
  },
  {
    house: "House Hightower",
    characters: [
      { src: "/characters/hightower/otto.webp", name: "Otto Hightower", description: "A calculating hand of the king who manipulates events to secure Hightower power." },
      { src: "/characters/hightower/alicent.jpg", name: "Alicent Hightower", description: "A queen torn between political duty and personal resentment as war looms." },
      { src: "/characters/hightower/criston.webp", name: "Ser Criston Cole", description: "A skilled knight whose shifting loyalties help spark the Dance of the Dragons." },
    ],
  },
  {
    house: "House Baratheon",
    characters: [
      { src: "/characters/baratheon/robert.webp", name: "Robert Baratheon", description: "A once-great warrior king who becomes disillusioned by ruling." },
      { src: "/characters/baratheon/stannis.webp", name: "Stannis Baratheon", description: "A rigid, duty-bound commander whose choices grow darker in desperation." },
      { src: "/characters/baratheon/renly.avif", name: "Renly Baratheon", description: "A charismatic claimant who inspires loyalty through charm." },
      { src: "/characters/baratheon/shireen.webp", name: "Shireen Baratheon", description: "A gentle, educated girl loved dearly by her few protectors." },
      { src: "/characters/baratheon/borros.webp", name: "Borros Baratheon (HotD)", description: "A proud lord whose allegiances shape the early war." },
    ],
  },
  {
    house: "House Tyrell",
    characters: [
      { src: "/characters/tyrell/olenna.webp", name: "Olenna Tyrell", description: "A razor-tongued political mastermind known as the Queen of Thorns." },
      { src: "/characters/tyrell/margaery.jpg", name: "Margaery Tyrell", description: "A charismatic queen who navigates the court with charm and strategy." },
      { src: "/characters/tyrell/loras.webp", name: "Loras Tyrell", description: "A famed knight known for his skill and loyalty." },
    ],
  },
  {
    house: "House Tully",
    characters: [
      { src: "/characters/tully/catelyn.jpg", name: "Catelyn Stark (Tully)", description: "A strong Tully daughter who protects her family fiercely." },
      { src: "/characters/tully/lysa.webp", name: "Lysa Arryn", description: "An anxious, emotionally unstable ruler whose decisions shake the Vale." },
      { src: "/characters/tully/edmure.webp", name: "Edmure Tully", description: "A well-meaning but often underestimated lord." },
      { src: "/characters/tully/blackfish.webp", name: 'Brynden "Blackfish" Tully', description: "A seasoned warrior and respected commander." },
    ],
  },
  {
    house: "House Arryn",
    characters: [
      { src: "/characters/arryn/jon.webp", name: "Jon Arryn", description: "The death that triggers the events of GoT, once a wise and stabilizing Hand of the King." },
      { src: "/characters/arryn/robin.webp", name: "Robin Arryn", description: "The sickly, sheltered heir to the Vale, heavily influenced by his mother." },
    ],
  },
  {
    house: "House Mormont",
    characters: [
      { src: "/characters/mormont/jeor.webp", name: "Jeor Mormont", description: "The honorable Lord Commander of the Night's Watch." },
      { src: "/characters/mormont/jorah.webp", name: "Jorah Mormont", description: "A disgraced knight seeking redemption through loyalty to Daenerys." },
      { src: "/characters/mormont/lyanna.webp", name: "Lyanna Mormont", description: "A young but fierce leader admired for her bravery." },
    ],
  },
  {
    house: "House Frey",
    characters: [
      { src: "/characters/frey/walder.webp", name: "Walder Frey", description: "A petty, treacherous lord responsible for the Red Wedding." },
    ],
  },
  {
    house: "House Martell",
    characters: [
      { src: "/characters/martell/doran.webp", name: "Doran Martell", description: "A patient, careful ruler who avoids unnecessary war." },
      { src: "/characters/martell/oberyn.jpg", name: "Oberyn Martell", description: "A passionate, deadly warrior driven by vengeance." },
      { src: "/characters/martell/ellaria.jpg", name: "Ellaria Sand", description: "Oberyn's partner who eventually embraces ruthless revenge." },
    ],
  },
]

export default function GreatHouses() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-primary text-center mb-12">
            Great Houses of Westeros
          </h1>
        </ScrollReveal>

        <div className="space-y-8 mb-16">
          {houses.map((house, i) => (
            <ScrollReveal key={house.name} variant="up" delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex flex-col md:flex-row gap-6 bg-black/40 border border-gold-primary/20 rounded-2xl p-6 backdrop-blur-sm hover:border-gold-primary/50 transition-all duration-500"
              >
                <div className="relative w-full md:w-48 h-48 md:h-48 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gold-primary/30">
                  <Image src={house.src} alt={house.name} fill className="object-cover" sizes="192px" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gold-primary mb-3">{house.name}</h2>
                  <p className="text-cream/70 text-sm md:text-base leading-relaxed">{house.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal variant="up">
          <h2 className="text-2xl md:text-4xl font-bold text-gold-primary text-center mb-8">Characters</h2>
        </ScrollReveal>

        {characterSections.map((section, idx) => (
          <div key={`${section.house}-${section.era ?? idx}`} className="mb-12">
            <ScrollReveal variant="up" delay={0.1}>
              <h2 className="text-2xl font-bold text-cream mb-2">{section.house}</h2>
              {section.era && <h3 className="text-gold-light mb-6 text-lg">{section.era}</h3>}
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {section.characters.map((char, i) => (
                <ScrollReveal key={char.name} variant="up" delay={i * 0.03}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group bg-black/30 border border-gold-primary/10 rounded-xl overflow-hidden hover:border-gold-primary/40 transition-all duration-500"
                  >
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={char.src}
                        alt={char.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-cream font-bold text-sm md:text-base mb-1">{char.name}</h3>
                      <p className="text-cream/50 text-xs leading-relaxed">{char.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
