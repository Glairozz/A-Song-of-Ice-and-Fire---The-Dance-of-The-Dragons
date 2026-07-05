"use client"

import { useRef } from "react"
import { motion, useInView, type Variants } from "framer-motion"

type AnimationVariant = "up" | "left" | "right" | "scale" | "3d"

interface ScrollRevealProps {
  children: React.ReactNode
  variant?: AnimationVariant
  delay?: number
  className?: string
}

const variants: Record<AnimationVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -100, rotateY: 15 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 100, rotateY: -15 },
    visible: { opacity: 1, x: 0, rotateY: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.3, rotateX: 45 },
    visible: { opacity: 1, scale: 1, rotateX: 0 },
  },
  "3d": {
    hidden: { opacity: 0, z: -100, rotateX: 15 },
    visible: { opacity: 1, z: 0, rotateX: 0 },
  },
}

export function ScrollReveal({ children, variant = "up", delay = 0, className = "" }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration: 1,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={className}
      style={{ perspective: variant === "3d" || variant === "scale" ? "1000px" : undefined }}
    >
      {children}
    </motion.div>
  )
}
