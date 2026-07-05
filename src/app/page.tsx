"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ScrollReveal } from "@/components/ScrollReveal"

const greetings = [
  "You stand before the blood of the dragon—be honored and speak true.",
  "You're welcome here, though the North keeps its eyes open.",
  "The Rock welcomes those who come with respect.",
]

const carousel1 = [
  { src: "/lopp/war1.webp", title: "The War Begins" },
  { src: "/lopp/war2.avif", title: "Dragons Soar" },
  { src: "/lopp/war3.webp", title: "Battle Lines" },
  { src: "/lopp/war4.webp", title: "Fire and Blood" },
  { src: "/lopp/war5.jpg", title: "Crown Ablaze" },
  { src: "/lopp/war6.avif", title: "Dragon's Fury" },
  { src: "/lopp/war7.jpg", title: "Iron Throne" },
  { src: "/lopp/war8.jpg", title: "War Council" },
  { src: "/lopp/war9.jpg", title: "Siege Lines" },
  { src: "/lopp/war10.webp", title: "Dragon Riders" },
  { src: "/lopp/war11.avif", title: "Final Stand" },
  { src: "/lopp/war12.jpg", title: "Aftermath" },
]

const carousel2 = [
  { src: "/lopp/war13.webp", title: "Royal Procession" },
  { src: "/lopp/war14.jpg", title: "King's Landing" },
  { src: "/lopp/war15.avif", title: "Northern Forces" },
  { src: "/lopp/war16.jpg", title: "Dragonstone" },
  { src: "/lopp/war17.jpg", title: "Harrenhal" },
  { src: "/lopp/war18.jpg", title: "The Reach" },
  { src: "/lopp/war19.jpg", title: "Dorne Warriors" },
  { src: "/lopp/war20.jpg", title: "Iron Fleet" },
  { src: "/lopp/war21.jpg", title: "The Wall" },
  { src: "/lopp/war22.jpg", title: "Winterfell" },
  { src: "/lopp/war23.avif", title: "The Crownlands" },
  { src: "/lopp/war24.avif", title: "Riverlands" },
]

function CarouselSection({ images, delay }: { images: typeof carousel1; delay: number }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  useEffect(() => {
    if (!emblaApi) return
    const onUpdate = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    emblaApi.on("select", onUpdate)
    emblaApi.on("reInit", onUpdate)
    onUpdate()
  }, [emblaApi])

  return (
    <ScrollReveal variant="up" delay={delay}>
      <div className="relative group">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex gap-4 py-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-[0_0_280px] md:flex-[0_0_320px] relative overflow-hidden rounded-xl group/card cursor-pointer"
              >
                <div className="relative h-48 md:h-56 overflow-hidden rounded-xl border-2 border-gold-primary/30 transition-all duration-500 hover:border-gold-primary hover:shadow-xl hover:shadow-gold-primary/30">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    sizes="320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                    <p className="text-cream text-sm font-bold text-center">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-gold-primary/30 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-primary/30 disabled:opacity-0"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-gold-primary/30 flex items-center justify-center text-cream opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-primary/30 disabled:opacity-0"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </ScrollReveal>
  )
}

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [greetIndex, setGreetIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [particles] = useState<{ x: number; y: number; size: number; speed: number; delay: number }[]>([])

  useEffect(() => {
    const p = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }))
    particles.push(...p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loading) return
    const greetInterval = setInterval(() => {
      setGreetIndex((prev) => (prev + 1) % greetings.length)
    }, 2500)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(greetInterval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => {
      clearInterval(greetInterval)
      clearInterval(progressInterval)
    }
  }, [loading])

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold-primary/40"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.speed,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={greetIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-4 mb-8"
          >
            <h2 className="text-cream text-lg md:text-xl lg:text-2xl font-bold max-w-2xl mx-auto leading-relaxed">
              {greetings[greetIndex]}
            </h2>
          </motion.div>
        </AnimatePresence>

        <div className="relative w-64 md:w-96">
          <div className="relative overflow-hidden rounded-full h-2 bg-zinc-800 border border-gold-primary/30">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-dark via-gold-primary to-gold-light rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-12 text-center"
        >
          <Image
            src="/map.webp"
            alt="Map of Westeros"
            width={300}
            height={200}
            className="rounded-lg opacity-60 mx-auto"
          />
          <h2 className="text-cream/80 text-sm md:text-base max-w-xl mx-auto mt-4 px-4 leading-relaxed">
            Welcome to the <strong className="text-gold-primary">Known World</strong>! Where humans and dragons rise,
            clash, and carve their legends into the very bones of the earth. Step carefully—every step is a story, and
            every story has its price.
          </h2>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <CarouselSection images={carousel1} delay={0.1} />
        <CarouselSection images={carousel2} delay={0.3} />
      </div>
    </div>
  )
}
