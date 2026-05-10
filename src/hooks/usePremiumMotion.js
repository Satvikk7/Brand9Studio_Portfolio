import { useMemo } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'

export const premiumEase = [0.22, 1, 0.36, 1]

export const hardwareAcceleration = {
  transformTemplate: (transform = '') => `${transform} translateZ(0)`
}

export function usePremiumRevealMotion(order = 0, distance = 24) {
  const shouldReduceMotion = useReducedMotion()

  return useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : distance,
        scale: shouldReduceMotion ? 1 : 0.985
      },
      whileInView: {
        opacity: 1,
        y: 0,
        scale: 1
      },
      viewport: { once: true, amount: 0.35 },
      transition: {
        duration: shouldReduceMotion ? 0 : 0.85,
        delay: shouldReduceMotion ? 0 : order * 0.07,
        ease: premiumEase
      }
    }),
    [distance, order, shouldReduceMotion]
  )
}

export function usePremiumTypographyReveal(targetRef, offset = ['start 0.9', 'start 0.2']) {
  const { scrollYProgress } = useScroll(targetRef ? { target: targetRef, offset } : undefined)

  const revealMask = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 1],
    ['inset(0 0 100% 0)', 'inset(0 0 52% 0)', 'inset(0 0 14% 0)', 'inset(0 0 0% 0)']
  )

  const revealOpacity = useTransform(scrollYProgress, [0, 0.1, 0.28, 1], [0, 0.45, 1, 1])

  return { scrollYProgress, revealMask, revealOpacity }
}

export function usePremiumParallax(scrollYProgress, depth = 14, scaleStart = 1.04) {
  const shouldReduceMotion = useReducedMotion()

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : depth, shouldReduceMotion ? 0 : -depth]
  )

  const scale = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 1 : scaleStart, 1])

  return { y, scale }
}
