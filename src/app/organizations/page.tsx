"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/ScrollReveal"
import { motion } from "framer-motion"

const organizations = [
  { name: "Night's Watch", description: "A sworn brotherhood protecting the Wall; vows of celibacy, loyalty, and service.", src: "/org/nightwatch.jpg" },
  { name: "Kingsguard", description: "Elite white-armored knights who protect the king.", src: "/org/kingsguard.jpg" },
  { name: "Small Council", description: "Ruling advisory council in King's Landing; handles royal governance.", src: "/org/smallcouncil.webp" },
  { name: "Citadel", description: "Scholarly order in Oldtown where maesters train.", src: "/org/citadel.webp" },
  { name: "Faith of the Seven", description: "Main religion of most Westerosi; includes septons, septas, and the Faith Militant.", src: "/org/faith7.webp" },
  { name: "Dothraki Khalsar", description: "Nomadic horse tribe led by a khal; structured around warfare and raiding.", src: "/org/khalsar.webp" },
  { name: "Unsullied", description: "Elite slave-soldier army trained for discipline and obedience.", src: "/org/unsullied.jpg" },
  { name: "Iron Bank of Braavos", description: "The most powerful financial institution in the known world.", src: "/org/ironbank.jpg" },
  { name: "Faceless Men", description: "An ancient assassin cult from Braavos who worship the Many-Faced God.", src: "/org/facelessmen.jpg" },
  { name: "Golden Company", description: "A massive, elite sellsword army founded by exiled Westerosi.", src: "/org/goldencompany.jpg" },
]

export default function Organizations() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal variant="up">
          <h1 className="text-3xl md:text-5xl font-bold text-gold-primary text-center mb-8">Organizations</h1>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.1}>
          <p className="text-cream/70 text-sm md:text-base leading-relaxed mb-12 max-w-4xl mx-auto text-center">
            The societies of this world are driven by powerful institutions that shape politics, warfare, knowledge, and
            faith. The Night&apos;s Watch stands as a grim guardian of the North, bound by oaths that transcend noble
            houses, while the Kingsguard represents the crown&apos;s elite protectors. The Citadel governs learning through
            its maesters, influencing rulers through counsel, medicine, and recordkeeping. Religious and military groups
            also hold significant sway. The Faith of the Seven guides much of Westeros through tradition and law, while
            Essos hosts organizations like the Faceless Men, Unsullied, and the Golden Company—each with their own
            philosophies and formidable influence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizations.map((org, i) => (
            <ScrollReveal key={org.name} variant="up" delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-black/40 border border-gold-primary/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-gold-primary/50 transition-all duration-500 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={org.src}
                    alt={org.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gold-primary mb-2">{org.name}</h2>
                  <p className="text-cream/60 text-sm leading-relaxed">{org.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
