import type { EntityRef, TimelineEvent } from "./types"

/**
 * The Dance of the Dragons, year by year — 129–135 AC plus a single
 * epilogue entry for the last dragon (153 AC).
 *
 * Slugs are stable: other pages deep-link to /timeline#<slug>, so
 * never rename them. Order is chronological (ascending by `year`).
 */

const ch = (slug: string, label: string): EntityRef => ({ type: "character", slug, label })
const dr = (slug: string, label: string): EntityRef => ({ type: "dragon", slug, label })
const ho = (slug: string, label: string): EntityRef => ({ type: "house", slug, label })
const lo = (slug: string, label: string): EntityRef => ({ type: "location", slug, label })

export const events: TimelineEvent[] = [
  {
    slug: "death-of-viserys-i",
    title: "The Death of Viserys I",
    year: 129,
    phase: "spark",
    summary:
      "King Viserys I dies in his sleep; before the realm is told, the Small Council moves to put his son Aegon on the Iron Throne.",
    description: [
      "Viserys I Targaryen died at King's Landing in 129 AC, old and weary, having reigned longer than any king since the Conquest. For years he had kept his daughter Rhaenyra as his named heir and had the lords of the realm renew their oaths to her. The king never reconciled his family, however, and the court had hardened into two camps: the greens of Queen Alicent and the blacks of the princess.",
      "The king's death was kept quiet while the Small Council, led by Ser Criston Cole with Queen Alicent and the Hightowers behind them, made its arrangements. Before word of Viserys's passing had spread beyond the Red Keep, the party of the queen had already decided that the crown would pass to her son, Prince Aegon, and that Rhaenyra's claim would be set aside.",
      "Rhaenyra, pregnant and at Dragonstone, learned of her father's death too late to answer it. The greens offered her terms she could not accept — that her sons be disinherited and that she herself submit to her brother. Instead she prepared to press her claim by fire and blood.",
    ],
    refs: [
      ch("viserys-i-targaryen", "Viserys I Targaryen"),
      ch("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      ch("alicent-hightower", "Queen Alicent"),
      ch("otto-hightower", "Otto Hightower"),
      ch("criston-cole", "Ser Criston Cole"),
      ho("targaryen", "House Targaryen"),
      ho("hightower", "House Hightower"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Viserys I died after the longest reign since Aegon the Conqueror.",
      "The Small Council concealed his death long enough to crown Aegon first.",
      "Rhaenyra's claim was rejected; the realm divided into blacks and greens.",
      "The succession dispute became open war within the year.",
    ],
  },
  {
    slug: "crowning-of-aegon-ii",
    title: "The Crowning of Aegon II",
    year: 129,
    phase: "spark",
    summary:
      "Prince Aegon is crowned Aegon II in the Dragonpit, with Queen Helaena beside him, and the Crownlands turn against Rhaenyra.",
    description: [
      "With Viserys I dead, the greens moved at once to make Prince Aegon king. The prince himself had no great appetite for the crown, but his mother Queen Alicent convinced him that Rhaenyra would never forgive his claim and that his life depended on taking the throne first.",
      "The coronation was held in the Dragonpit before the smallfolk of the city, and Aegon's dragon Sunfyre was paraded before the crowd. The sight of the golden beast, so much praised by singers, did much to win the cheering of the thousands who packed the great stone arena, and the prince was anointed and crowned as Aegon II.",
      "Queen Helaena was crowned beside him, giving the greens a royal pair. Ravens flew to the strongholds of the realm declaring that Viserys's will had been set aside and that Aegon II reigned, while Rhaenyra and her sons were attainted as traitors to the Iron Throne.",
    ],
    refs: [
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      ch("helaena-targaryen", "Queen Helaena"),
      ch("alicent-hightower", "Queen Alicent"),
      ch("criston-cole", "Ser Criston Cole"),
      ch("otto-hightower", "Otto Hightower"),
      dr("sunfyre", "Sunfyre"),
      ho("targaryen", "House Targaryen"),
      ho("hightower", "House Hightower"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Aegon II took the Iron Throne with the backing of the Small Council.",
      "Queen Helaena was crowned alongside him, giving the greens legitimacy.",
      "Rhaenyra and her sons were attainted as traitors.",
      "The court and the Crownlands declared for the new king.",
    ],
  },
  {
    slug: "rhaenyra-claims-the-crown",
    title: "Rhaenyra Claims the Crown",
    year: 129,
    phase: "spark",
    summary:
      "At Dragonstone, Rhaenyra crowns herself queen and sends ravens calling her brother's supporters traitors to the realm.",
    description: [
      "Rhaenyra had held the oaths the lords of Westeros swore to her as a girl, and she would not bend to her brother's coronation. At Dragonstone, the ancient seat of her house, she was crowned queen in a ceremony of her own, and her eldest sons were declared princes of the realm.",
      "Her husband Prince Daemon and Lord Corlys Velaryon rallied to her, and the Blacks' envoys rode out to the great houses that had sworn her oaths — the Starks of Winterfell, the Baratheons, the Tullys and the Greyjoys. The greens sent envoys of their own, and every raven that flew was another bid for a war that had not yet begun in earnest.",
      "The balance of strength was already clear. Rhaenyra held Dragonstone and the sea lanes through the Velaryon fleet, while her brother held the capital, the treasury and much of the Reach. Both sides commanded dragons, and both believed the realm would break before it bent.",
    ],
    refs: [
      ch("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      ch("daemon-targaryen", "Prince Daemon"),
      ch("corlys-velaryon", "Lord Corlys Velaryon"),
      ho("targaryen", "House Targaryen"),
      ho("velaryon", "House Velaryon"),
      ho("stark", "House Stark"),
    ],
    locationRef: lo("dragonstone", "Dragonstone"),
    outcome: [
      "Rhaenyra was crowned at Dragonstone and recognized as queen by the Blacks.",
      "House Velaryon and its fleet became the backbone of her cause.",
      "Her sons were named princes, rejecting Aegon II's line.",
      "The realm split formally and irrevocably into blacks and greens.",
    ],
  },
  {
    slug: "lucerys-at-storms-end",
    title: "Lucerys at Storm's End",
    year: 129,
    phase: "spark",
    summary:
      "Prince Lucerys flies Arrax to Storm's End to win Lord Baratheon's allegiance — and is cut from the sky by Aemond on Vhagar.",
    description: [
      "The Stormlands were one of the great houses still uncommitted, and Rhaenyra sent her second son, Prince Lucerys Velaryon, to treat with Lord Borros Baratheon at Storm's End. The boy flew his young dragon Arrax through a gathering storm to reach the castle walls.",
      "Lucerys arrived to find Prince Aemond Targaryen already there, the giant dragon Vhagar chained in the yard below. Lord Baratheon had already been won over: Aemond had promised to wed one of his daughters, and he turned Rhaenyra's petition away with scant courtesy. The boy had no choice but to leave with his message unanswered.",
      "Lucerys flew out into the storm, and Aemond followed on Vhagar — ancient, enormous, and far larger than Arrax. Over Shipbreaker Bay the older dragon caught the younger. Both prince and dragon were destroyed, and Aemond returned alone. With her son dead, Rhaenyra abandoned any thought of peace, and the war began in earnest.",
    ],
    refs: [
      ch("aemond-targaryen", "Prince Aemond"),
      ch("borros-baratheon", "Lord Borros Baratheon"),
      dr("arrax", "Arrax"),
      dr("vhagar", "Vhagar"),
      ho("baratheon", "House Baratheon"),
      ho("targaryen", "House Targaryen"),
    ],
    outcome: [
      "Prince Lucerys Velaryon and his dragon Arrax were killed over Shipbreaker Bay.",
      "Lord Borros Baratheon turned the Blacks away and held the Stormlands for the crown.",
      "Aemond One-eye showed that no dragon was safe in the open sky.",
      "The murder of her son closed the door to any negotiated peace.",
    ],
  },
  {
    slug: "blood-and-cheese",
    title: "Blood and Cheese",
    year: 130,
    phase: "war",
    summary:
      "Daemon's agents slip into the Red Keep, where Queen Helaena is forced to watch as her son is murdered to avenge Lucerys.",
    description: [
      "To answer Lucerys's death, Prince Daemon sent two men into King's Landing: a brute known only as Blood and a man called Cheese who knew the hidden ways of the Red Keep. Working together, the pair gained the royal apartments while the court slept.",
      "They took Queen Helaena and her children. The killers demanded that she name her husband's heir, and whatever answer she gave, they murdered the elder of her sons, Prince Jaehaerys, before her eyes, and let the younger live. The crime was done deliberately, so that the queen would carry it with her always.",
      "Few at either court doubted that the killers had been sent by Prince Daemon to avenge his stepson. The murder horrified the city and shamed even some of the greens' allies, and it made the war a private matter of vengeance on both sides. Queen Helaena never recovered her joy, and no peace talk would follow the deed.",
    ],
    refs: [
      ch("daemon-targaryen", "Prince Daemon"),
      ch("helaena-targaryen", "Queen Helaena"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      ho("targaryen", "House Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Prince Jaehaerys, the elder son of Aegon II, was murdered in the Red Keep.",
      "Queen Helaena was made to choose between her children and never recovered.",
      "The murder ended any hope of a negotiated settlement.",
      "The war became one of personal vengeance on both sides.",
    ],
  },
  {
    slug: "battle-of-the-gullet",
    title: "The Battle of the Gullet",
    year: 130,
    phase: "war",
    summary:
      "Velaryon sails and Prince Jacaerys on Vermax break the Triarchy's fleet in the Gullet — at the cost of the Blacks' heir.",
    description: [
      "The Narrow Sea was the spine of Rhaenyra's cause, and the Triarchy of the Free Cities had thrown in with the greens. Its fleet sailed for Blackwater Bay to break the Velaryon blockade and strike at Dragonstone, and in 130 AC Lord Corlys Velaryon met it in the waters of the Gullet with Prince Jacaerys Targaryen flying above the ships.",
      "Vermax dove into the enemy line, setting sails and rigging ablaze, and the Velaryon galleys went in among the burning ships. The Triarchy's fleet was shattered and the invasion scattered, but in the press of the battle the young dragon was brought down among the masts and Prince Jacaerys was lost with him. Neither prince nor dragon was ever recovered.",
      "It was a victory that cost Rhaenyra her eldest son and true heir. The blockade held and Dragonstone was never taken, but the Blacks had spent the best of their fleet and their best prince in a single morning, and the war went on.",
    ],
    refs: [
      ch("corlys-velaryon", "Lord Corlys Velaryon"),
      ch("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      dr("vermax", "Vermax"),
      ho("velaryon", "House Velaryon"),
      ho("targaryen", "House Targaryen"),
    ],
    outcome: [
      "The Triarchy's invasion fleet was broken and Blackwater Bay stayed closed.",
      "Prince Jacaerys Velaryon, Rhaenyra's heir, was killed with his dragon Vermax.",
      "The Velaryon fleet held the sea at a ruinous price.",
      "Rhaenyra lost her firstborn and the future of her line.",
    ],
  },
  {
    slug: "battle-of-rooks-rest",
    title: "The Battle of Rook's Rest",
    year: 130,
    phase: "war",
    summary:
      "Ser Criston Cole springs a trap at Rook's Rest; Aegon and Aemond burn Rhaenys and Meleys, and Aegon II himself is broken.",
    description: [
      "Ser Criston Cole, leading the green cause in the field, marched on the Crownlands and drew out the Blacks by besieging Rook's Rest. Queen Rhaenys Targaryen flew to relieve the castle aboard the red dragon Meleys, and the vanguard of the Blacks followed her to the field.",
      "The trap was sprung in the hills around the castle. Aegon II himself took the field on Sunfyre, and above the fighting the golden dragon and the red closed in a wild wheel of flame. From concealment Aemond and Vhagar came down on them — Sunfyre and Meleys were fighting evenly when the ancient dragon struck, and the sky turned to fire.",
      "The greens won the field, but at a terrible price. Queen Rhaenys and Meleys were both killed, while Sunfyre was so badly hurt that the golden dragon never fully flew again. Aegon II was burned and maimed, dependent on milk of the poppy for the rest of his days, and though Rook's Rest was relieved, the greens had a broken king and no dragon fit for war. Only Vhagar and Aemond came through the battle untouched.",
    ],
    refs: [
      ch("criston-cole", "Ser Criston Cole"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      ch("aemond-targaryen", "Prince Aemond"),
      ch("rhaenys-targaryen", "Princess Rhaenys"),
      dr("meleys", "Meleys"),
      dr("sunfyre", "Sunfyre"),
      dr("vhagar", "Vhagar"),
    ],
    outcome: [
      "Princess Rhaenys Targaryen and her dragon Meleys were killed.",
      "Aegon II was burned and maimed; Sunfyre never recovered from its wounds.",
      "The greens won a decisive field victory in the Crownlands.",
      "Prince Aemond and Vhagar became the most feared weapons in the war.",
    ],
  },
  {
    slug: "rhaenyra-takes-kings-landing",
    title: "Rhaenyra Takes King's Landing",
    year: 130,
    phase: "war",
    summary:
      "With the green field army broken, Rhaenyra enters King's Landing, sits the Iron Throne, and makes the capital her own.",
    description: [
      "Rook's Rest left the greens without an army in the field, and their hold on the capital faltered. In 130 AC Rhaenyra Targaryen flew on Syrax over the city and her forces entered King's Landing; Aegon II had already been carried away out of reach, and the queen's enemies in the city were left to her judgment.",
      "Rhaenyra rode to the Red Keep and took the Iron Throne she had been denied. The banners of House Targaryen flew over the city once more, and for a season the Blacks ruled the seat of government, the treasury and the laws of the realm — the war at last seemed to be turning its decisive corner.",
      "But the queen held the throne without holding the city. The war had cut off trade and grain, the smallfolk who had cheered Aegon's coronation now resented his rival, and the greens' partisans remained at large in the streets. Aegon II had escaped, Aemond and Vhagar were burning the Riverlands at will, and Rhaenyra's victory in King's Landing was only the beginning of her ruin.",
    ],
    refs: [
      ch("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      ch("daemon-targaryen", "Prince Daemon"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      dr("syrax", "Syrax"),
      ho("targaryen", "House Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Rhaenyra took King's Landing and sat the Iron Throne.",
      "The greens abandoned the capital; Aegon II escaped the city.",
      "The Blacks controlled the government but not the crowds.",
      "Famine and unrest spread through the occupied capital.",
    ],
  },
  {
    slug: "first-battle-of-tumbleton",
    title: "The First Battle of Tumbleton",
    year: 130,
    phase: "war",
    summary:
      "Two dragonseeds burn the green army at Tumbleton — then turn traitor, and the Reach learns dragons can be bought.",
    description: [
      "The war spread to the Reach in 130 AC when a green host gathered at Tumbleton, a town on the doorstep of the Riverlands. Against them rode Queen Rhaenyra's dragonseeds: Hugh Hammer on the great bronze Vermithor and Ulf White on Silverwing, common men of unknown blood who had claimed the old royal dragons for their own.",
      "The dragons decided the day. Vermithor and Silverwing set the field ablaze, the green army broke, and in the rout the town of Tumbleton was burned and plundered. It was the largest victory the Blacks had won since Rook's Rest had gone against them — and it meant nothing.",
      "Before long both dragonseeds went over to the greens, whether for promises of land and titles or for simple greed, no two accounts agree. They had been lifted from nothing and given dragons, and Tumbleton became the town where the realm learned that a dragonrider's loyalty could be bought. From that day they were known as the Two Betrayers.",
    ],
    refs: [
      dr("vermithor", "Vermithor"),
      dr("silverwing", "Silverwing"),
      ho("targaryen", "House Targaryen"),
    ],
    outcome: [
      "The green host at Tumbleton was broken and the town burned.",
      "Common-born dragonseeds proved they could fight and win with dragons.",
      "Both riders soon turned traitor, the 'Betrayers of Tumbleton.'",
      "The war reached the Reach, far beyond the Crownlands.",
    ],
  },
  {
    slug: "storming-of-the-dragonpit",
    title: "The Storming of the Dragonpit",
    year: 130,
    phase: "war",
    summary:
      "Whipped up by a street preacher, the smallfolk storm the Dragonpit and slaughter the dragons inside — among them Rhaenyra's Syrax.",
    description: [
      "Rhaenyra's occupation starved and taxed the city, and in the streets a preacher known as the Shepherd railed against the queen and the monsters she kept. His following swelled until the anger of the poor became the anger of a mob, and in 130 AC thousands poured through the streets toward the Dragonpit, where the city's dragons were stabled.",
      "The mob broke through the great doors and killed the dragons within at a fearful cost in lives — the beasts were chained and could not flee, and young and old died fighting in the smoke. Rhaenyra's own dragon Syrax was among the slain, and Prince Joffrey, the queen's young son, was killed as he tried to reach the dragons. When it was done, the Dragonpit was a charnel house and the queen had lost her wings and her city in a single day.",
      "Rhaenyra watched the smoke from the Red Keep and understood that King's Landing was lost to her. The storming of the Dragonpit destroyed in hours what generations of Targaryens had built, and it was the beginning of the queen's flight from the capital.",
    ],
    refs: [
      ch("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      dr("syrax", "Syrax"),
      dr("tyraxes", "Tyraxes"),
      ho("targaryen", "House Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "The Dragonpit was stormed and every dragon inside it was killed.",
      "Rhaenyra's dragon Syrax perished in the attack.",
      "Prince Joffrey Velaryon died trying to defend the dragons.",
      "Rhaenyra lost both her dragons and the loyalty of the city.",
      "The greens' partisans rose in the streets as the queen's grip failed.",
    ],
  },
  {
    slug: "battle-of-the-gods-eye",
    title: "The Battle of the Gods Eye",
    year: 130,
    phase: "war",
    summary:
      "Daemon and Aemond meet above the Gods Eye: Caraxes and Vhagar crash into the lake, and both dragonriders die.",
    description: [
      "Prince Aemond One-eye had hunted the Blacks across the Riverlands with Vhagar, burning Harrenhal and terrorizing the countryside, and no rider dared face him in the open sky. Prince Daemon Targaryen, who had been hunting Aemond alongside the dragonseeds, flew out alone on Caraxes to meet him above the Gods Eye lake.",
      "The two dragons closed and fought, locked together in fire and screaming, until both fell from the sky and crashed into the waters below. As they fell, Daemon is said to have leapt from Caraxes onto Vhagar's back and driven Dark Sister through his nephew's eye — no other account of the duel agrees on the details, and none disagree on the result.",
      "Both dragons died. Vhagar's body was recovered from the lake with Aemond still chained in his saddle, Dark Sister still in his eye; Caraxes dragged itself ashore and died of its wounds; and Daemon Targaryen was never seen again. The greens had lost their last great dragon, and the war's fiercest enemies had destroyed each other in a single afternoon.",
    ],
    refs: [
      ch("daemon-targaryen", "Prince Daemon"),
      ch("aemond-targaryen", "Prince Aemond"),
      dr("caraxes", "Caraxes"),
      dr("vhagar", "Vhagar"),
      dr("sheepstealer", "Sheepstealer"),
      ho("targaryen", "House Targaryen"),
    ],
    outcome: [
      "Prince Aemond One-eye and the great dragon Vhagar both perished.",
      "Daemon Targaryen was never seen again; Dark Sister was recovered from the lake.",
      "Caraxes died of its wounds on the shore of the Gods Eye.",
      "The greens lost their last great dragon and their most feared rider.",
      "The dragon Sheepstealer and its rider vanished from the war.",
    ],
  },
  {
    slug: "death-of-rhaenyra",
    title: "The Death of Rhaenyra",
    year: 130,
    phase: "war",
    summary:
      "Betrayed at Dragonstone, Rhaenyra is taken by her brother and fed to Sunfyre before her son, and the Blacks' queen dies.",
    description: [
      "The storming of the Dragonpit broke Rhaenyra's hold on King's Landing. With her dragons dead and the city in revolt, the queen fled the capital with her surviving children and supporters, making for Dragonstone — the one seat she was certain was hers.",
      "The castle had been given over to her enemies. Aegon II, recovering from Rook's Rest on Dragonstone with his maimed dragon Sunfyre, had sent word ahead, and the garrison met Rhaenyra with chains rather than garlands. She was taken prisoner and brought before the brother she had spent the war trying to depose.",
      "Aegon II had his sister killed and her body cast to Sunfyre, who devoured her before the eyes of her young son — the boy who would reign after them both as Aegon III. Rhaenyra, who had been named her father's heir and had fought a realm for the crown, died in her brother's halls at the age of thirty-three, and the Blacks' cause passed to her surviving sons.",
    ],
    refs: [
      ch("rhaenyra-targaryen", "Rhaenyra Targaryen"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      dr("sunfyre", "Sunfyre"),
      ho("targaryen", "House Targaryen"),
    ],
    locationRef: lo("dragonstone", "Dragonstone"),
    outcome: [
      "Rhaenyra Targaryen, the Blacks' queen, was killed at Dragonstone.",
      "Sunfyre devoured her before her young son.",
      "Her son's ordeal marked the boy who would become Aegon III.",
      "The Blacks' cause passed to Rhaenyra's surviving children.",
      "Aegon II recovered his throne — for a few months only.",
    ],
  },
  {
    slug: "death-of-aegon-ii",
    title: "The Death of Aegon II",
    year: 131,
    phase: "aftermath",
    summary:
      "With northern armies marching on the capital, Aegon II is poisoned by his own men so that the war can end.",
    description: [
      "Aegon II outlived Rhaenyra, but by 131 AC his cause was finished. The Blacks' allies were closing on the capital: the northern host of Lord Cregan Stark was marching south, the riverlords were in the field, and King's Landing itself was exhausted by famine, sickness and four years of war.",
      "The king was a ruin — burned at Rook's Rest, maimed, and dependent on milk of the poppy — and Sunfyre was long dead, so there was no dragon to carry him from the wreck of his kingdom. His own lords and councillors, facing a siege they could not win, chose the city over the crown they had made.",
      "Aegon II was poisoned by men who had once crowned him, the deed done to open the gates and spare the capital from sack. When the great lords of the realm arrived, there was no green king left to treat with, and the survivors of his party sued for peace on the Blacks' terms.",
    ],
    refs: [
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
      ho("targaryen", "House Targaryen"),
      ho("stark", "House Stark"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Aegon II was poisoned by his own court to end the war without a siege.",
      "The green cause collapsed with the death of its king.",
      "Northmen under Cregan Stark were already marching on the capital.",
      "The survivors of the greens sued for peace on the Blacks' terms.",
    ],
  },
  {
    slug: "aegon-iii-crowned",
    title: "Aegon III Is Crowned",
    year: 131,
    phase: "aftermath",
    summary:
      "Rhaenyra's surviving son is crowned Aegon III and wed to Jaehaera, joining the rival claims in one marriage.",
    description: [
      "With Aegon II dead, no one was left to contest the throne. The boy who had watched his mother die at Dragonstone was brought to the capital and crowned as Aegon III — the second king of that name in barely two years, and the first to reign over a realm with nothing left to fight for.",
      "To bind the two parties together, the boy-king was wed to Jaehaera, the daughter of Aegon II and Helaena, marrying the line of the greens to the line of the blacks. The match could not undo the war's dead, but it ended the question of the succession that had started it.",
      "What the new king inherited was ruin: burned fields, an empty treasury, a court of survivors squabbling over the peace, and dragons dying one after another. The war was over, but the boy called the Dragonbane would spend his reign measuring what it had cost.",
    ],
    refs: [
      ho("targaryen", "House Targaryen"),
      ho("velaryon", "House Velaryon"),
      ch("corlys-velaryon", "Lord Corlys Velaryon"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Aegon the Younger was crowned Aegon III in King's Landing.",
      "The marriage of Aegon III and Jaehaera joined the rival lines.",
      "The Blacks took the peace; the greens' leaders were dead or attainted.",
      "A boy-king inherited an empty treasury and a dwindling brood of dragons.",
    ],
  },
  {
    slug: "second-battle-of-tumbleton",
    title: "The Second Battle of Tumbleton",
    year: 133,
    phase: "aftermath",
    summary:
      "Addam of Hull attacks Tumbleton by night with Seasmoke; the town burns again and Vermithor, Tessarion and the betrayers die.",
    description: [
      "The Two Betrayers held Tumbleton for the greens and did as they pleased within its walls, growing fat on plunder and talk of great rewards — Hugh Hammer spoke openly of a crown of his own, and the dragons that had won the town now terrorized it. The regime in King's Landing, governed by regents for the boy-king, could not abide the traitors' boast.",
      "Addam of Hull, a dragonseed whose own loyalty was being questioned by the court, flew on Seasmoke to answer them. He struck Tumbleton without warning, and the town became a slaughter yard: in the fighting Vermithor and Tessarion were brought down, Prince Daeron the Daring died, and the streets burned for a second time.",
      "When it was done, Tumbleton lay in ashes and no king would ever reward the betrayers. Both dragonseeds met violent ends in the days of chaos that followed, Silverwing fled the town never to return to war, and the last dragons of the Reach were dead. The south was bled white, and the war's wreckage had outlasted the war itself.",
    ],
    refs: [
      dr("seasmoke", "Seasmoke"),
      dr("vermithor", "Vermithor"),
      dr("silverwing", "Silverwing"),
      dr("tessarion", "Tessarion"),
      ho("targaryen", "House Targaryen"),
    ],
    outcome: [
      "Addam of Hull and Prince Daeron the Daring both died in the fighting.",
      "Vermithor, Tessarion and Seasmoke perished; Silverwing fled.",
      "The Two Betrayers were killed; their treason earned them nothing.",
      "Tumbleton was burned and plundered a second time.",
      "The greens lost their last dragonriders.",
    ],
  },
  {
    slug: "trial-of-corlys-velaryon",
    title: "The Trial of Corlys Velaryon",
    year: 134,
    phase: "aftermath",
    summary:
      "The Sea Snake is accused of treason by the new regime, stripped of his offices — and spared by the boy-king he served.",
    description: [
      "The regents governing for Aegon III distrusted the old heroes of the Blacks, and none was more suspect than Lord Corlys Velaryon, who was accused of having dealt with the greens in the war's darkest days and of treachery thereafter. The old admiral, past his ninetieth year and the last of his name's great generation, was brought to account in King's Landing.",
      "The charges were pressed hard by men who wanted the Velaryons' fleet and Driftmark brought under the crown's hand. Corlys had bent the knee to one king after another and outlived them all, but bending had never been the same as obedience, and his enemies meant to make an example of him.",
      "The boy-king would not have it. Aegon III refused to sign the warrant for the old man's death, and Corlys was deprived of his offices instead. He died at Driftmark soon after, and Driftmark passed to his granddaughters Baela and Rhaena — the Sea Snake's line survived him, and the realm took note that the new king's justice would not be bought by a faction.",
    ],
    refs: [
      ch("corlys-velaryon", "Lord Corlys Velaryon"),
      ch("baela-targaryen", "Princess Baela"),
      ch("rhaena-targaryen", "Princess Rhaena"),
      ho("velaryon", "House Velaryon"),
      ho("targaryen", "House Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Corlys Velaryon was charged with treason and deprived of his offices.",
      "Aegon III refused to order the old man's execution.",
      "The Sea Snake died in 134 AC, past his ninetieth year.",
      "Driftmark passed to his granddaughters Baela and Rhaena.",
      "The last great lord of the war's first generation was gone.",
    ],
  },
  {
    slug: "hour-of-the-wolf",
    title: "The Hour of the Wolf",
    year: 135,
    phase: "aftermath",
    summary:
      "Lord Cregan Stark rules as Hand for a season and delivers a single day of northern judgments — the Hour of the Wolf.",
    description: [
      "The northern host that had marched south for King's Landing arrived to find the war already over. Its leader, Lord Cregan Stark of Winterfell, was made Hand of the King, and he set about giving the boy-king's government something it had lacked since the war began: a will of its own.",
      "In 135 AC the Hand delivered the realm's justice in a single day of trials that passed into song as the Hour of the Wolf. Those accused of bringing about the death of Aegon II and of profiting from the murder of kings were brought before him, and men who had expected to be pardoned for serving whatever king was winning went to the block instead. Among the condemned was Larys Strong, the Clubfoot, who had served Aegon II to the end.",
      "Then, having run the capital to his own satisfaction, the Wolf resigned the Handship. Cregan Stark refused the offices and rewards that were pressed on him and marched home to Winterfell, leaving a court awed by northern justice and no wiser as to what the next regent would bring.",
    ],
    refs: [
      ho("stark", "House Stark"),
      ho("targaryen", "House Targaryen"),
      ch("aegon-ii-targaryen", "Aegon II Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "Justice was delivered on those behind the death of Aegon II.",
      "Larys Strong was among the condemned sent to the block.",
      "Cregan Stark served as Hand and then resigned of his own accord.",
      "He refused rewards and marched the northern host home to Winterfell.",
      "The regency's weakness was answered, briefly, by a Stark's justice.",
    ],
  },
  {
    slug: "death-of-the-last-dragon",
    title: "Epilogue: The Last Dragon Dies",
    year: 153,
    phase: "aftermath",
    summary:
      "Epilogue — in 153 AC the last dragon dies in King's Landing, a stunted shadow of the old beasts, and dragonkind ends.",
    description: [
      "The Dance killed almost every dragon alive, and what survived the war died in the years that followed — one at a time, each smaller than the last. The dragonkeepers grew old with nothing to tend, the breeding houses on Dragonstone went silent, and no new hatchling survived its shell.",
      "By 153 AC only a single dragon remained, a stunted and sickly thing, scarcely a shadow of Balerion or Vhagar. It died in King's Landing during the reign of Aegon III, and with it the age of dragons in Westeros ended. The king had done what he could to keep the last of them alive, and the failure haunted him: he was remembered afterward as Aegon the Dragonbane.",
      "No egg hatched again for nearly three hundred years, until Daenerys Targaryen woke three stone eggs in the red waste. House Targaryen had ruled the Seven Kingdoms on the strength of its dragons, and after the Dance it ruled them on the strength of custom alone — the fire had gone out of the world, and the chronicle of the Dance is also the chronicle of how it went.",
    ],
    refs: [
      ho("targaryen", "House Targaryen"),
      ch("daenerys-targaryen", "Daenerys Targaryen"),
    ],
    locationRef: lo("kings-landing", "King's Landing"),
    outcome: [
      "The last dragon died in 153 AC during the reign of Aegon III.",
      "No dragon hatched again for nearly three hundred years.",
      "Aegon III earned his name: the Dragonbane.",
      "House Targaryen lost the weapons that had made it supreme.",
    ],
  },
]

/** Look up a single event by its anchor slug (used by deep links and search). */
export const eventBySlug = (slug: string): TimelineEvent | undefined =>
  events.find((event) => event.slug === slug)

/** Every year the timeline covers, unique and sorted ascending. */
export const timelineYears: number[] = [...new Set(events.map((event) => event.year))].sort(
  (a, b) => a - b
)
