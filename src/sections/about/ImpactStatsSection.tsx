import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(!startOnView)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView && !started) setStarted(true)
  }, [isInView, started])

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    let raf: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, end, duration])

  return { count, ref }
}

function StatCounter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(end)
  return (
    <div ref={ref} className="text-center flex-1 md:px-6">
      <div className="font-heading text-display text-primary tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <p className="text-white/60 text-sm font-sans mt-2">{label}</p>
    </div>
  )
}

export default function ImpactStatsSection() {
  return (
    <section className="bg-dark-green py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <StatCounter end={10} suffix="+" label="Years of Experience" />
          </motion.div>

          <div className="hidden md:block w-px h-16 bg-border-dark" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <StatCounter end={500} suffix="+" label="Installations Completed" />
          </motion.div>

          <div className="hidden md:block w-px h-16 bg-border-dark" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <StatCounter end={99} suffix="%" label="Customer Satisfaction" />
          </motion.div>

          <div className="hidden md:block w-px h-16 bg-border-dark" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.36, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <StatCounter end={50} suffix="k+" label="Tons of CO2 Offset" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-white/50 text-base font-sans text-center mt-10 max-w-xl mx-auto"
        >
          Our numbers speak for themselves. Every project brings us closer to a sustainable future.
        </motion.p>
      </div>
    </section>
  )
}
