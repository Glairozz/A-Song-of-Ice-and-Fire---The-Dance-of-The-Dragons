import type { Metadata } from "next"
import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { houses } from "@/data/houses"
import { HouseGrid } from "./HouseGrid"

export const metadata: Metadata = {
  title: "Great Houses",
  description:
    "The fourteen great houses of Westeros — their words, seats, sigils and the bloodlines that chose sides in the Dance of the Dragons.",
}

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

/** Portrait galleries kept from the original page — one grouping per house. */
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

export default function GreatHousesPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4">
        <ScrollReveal variant="up">
          <header className="mb-4 text-center">
            <p className="eyebrow mb-4">Bloodlines of the Realm</p>
            <h1 className="text-3xl font-bold text-gold-primary md:text-5xl">
              Great Houses of Westeros
            </h1>
          </header>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <div className="rule mx-auto mb-8 max-w-xl">
            <span />
          </div>
          <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center text-sm leading-relaxed text-cream/70 md:text-base">
            <p>
              The great houses are the bloodlines that bend the realm to their will — ancient
              families whose words are sworn as oaths, whose banners, once raised, are declarations
              of war, and whose marriages redraw the map. Fourteen stand above the rest, from the
              dragons of Dragonstone to the wolves of Winterfell, each carrying a sigil that has
              outlived a dozen kings.
            </p>
            <p>
              None mattered more to the <span className="text-gold-primary">Dance of the
              Dragons</span> than these. A Hightower queen and a Targaryen princess split the Iron
              Throne in two, and every other house was forced to choose a side — or be ground
              between them. Follow a banner below to its words, its seat, its notable figures and
              the full profile of the house behind it.
            </p>
          </div>
        </ScrollReveal>

        <HouseGrid houses={houses} />

        {/* Rich portrait galleries kept from the original page */}
        <div className="mt-24">
          <ScrollReveal variant="up">
            <div className="mb-10 text-center">
              <p className="eyebrow mb-3">Faces of Fire and Blood</p>
              <h2 className="text-2xl font-bold text-gold-primary md:text-4xl">
                Notable Figures of the Realm
              </h2>
            </div>
          </ScrollReveal>

          {characterSections.map((section, idx) => (
            <div key={`${section.house}-${section.era ?? idx}`} className="mb-12">
              <ScrollReveal variant="up" delay={0.1}>
                <div className="mb-5 flex items-baseline gap-3">
                  <h3 className="text-xl font-bold text-cream md:text-2xl">{section.house}</h3>
                  {section.era && (
                    <span className="text-sm text-gold-light md:text-lg">{section.era}</span>
                  )}
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {section.characters.map((char, i) => (
                  <ScrollReveal key={char.name} variant="up" delay={i * 0.03}>
                    <article className="panel group h-full overflow-hidden">
                      <div className="relative h-48 overflow-hidden md:h-56">
                        <Image
                          src={char.src}
                          alt={char.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <div className="p-4">
                        <h4 className="mb-1 text-sm font-bold text-cream md:text-base">
                          {char.name}
                        </h4>
                        <p className="text-xs leading-relaxed text-cream/50">{char.description}</p>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
