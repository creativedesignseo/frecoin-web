import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import { Phone } from 'lucide-react'

/* ─── Reuse Counter from Home pattern ─── */
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

function InlineCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const { count, ref } = useCountUp(end)
  return (
    <div ref={ref} className="font-heading text-3xl text-primary tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

/* ─── Section Tag ─── */
function SectionTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-6 h-[2px] bg-primary inline-block" />
      <span className="text-primary uppercase text-xs font-sans font-medium tracking-widest">
        {text}
      </span>
    </div>
  )
}

export default function InnovationSection() {
  return (
    <section className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:w-[45%] relative"
          >
            <img
              src="/about-solar-farm.jpg"
              alt="Solar farm"
              className="rounded-xl aspect-[3/4] object-cover shadow-xl w-full max-w-md"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:bottom-6 lg:-right-6 bg-primary text-white rounded-lg px-4 py-3 flex items-center gap-2 shadow-lg">
              <Phone size={16} className="shrink-0" />
              <span className="font-sans font-semibold text-sm">(555) 123-4567</span>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:w-[55%] lg:pl-12 mt-8 lg:mt-0"
          >
            <SectionTag text="Our Story" />
            <h2 className="font-heading text-4xl lg:text-5xl text-text-dark mb-4">
              Sustainable Future with{' '}
              <span className="italic text-primary">Solar Innovation</span>
            </h2>
            <p className="text-text-gray text-base leading-relaxed mb-4">
              Founded in 2014, Auron has grown from a small team of passionate engineers to one of the leading renewable energy providers in the country. Our journey began with a simple belief: that clean energy should be accessible to everyone.
            </p>
            <p className="text-text-gray text-base leading-relaxed mb-8">
              Over the past decade, we've installed over 500 solar systems, saved our clients millions in energy costs, and prevented over 50,000 tons of CO2 from entering the atmosphere. But we're just getting started.
            </p>

            {/* Inline Stats */}
            <div className="flex gap-8 mt-8">
              <div>
                <InlineCounter end={10} suffix="+" />
                <p className="text-text-gray text-sm font-sans mt-1">Years</p>
              </div>
              <div>
                <InlineCounter end={500} suffix="+" />
                <p className="text-text-gray text-sm font-sans mt-1">Installations</p>
              </div>
              <div>
                <InlineCounter end={99} suffix="%" />
                <p className="text-text-gray text-sm font-sans mt-1">Satisfaction</p>
              </div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-6 py-3 mt-8 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
