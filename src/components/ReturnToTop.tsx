"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"

export function ReturnToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          type="button"
          aria-label="Return to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark border-2 border-cream flex items-center justify-center cursor-pointer shadow-lg shadow-gold-primary/40 hover:shadow-xl hover:shadow-gold-primary/60 hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
        >
          <ChevronUp className="text-cream w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
