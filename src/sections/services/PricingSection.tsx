import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

/* ─── Pricing Data ─── */
const pricingPlans = [
  {
    name: 'Basic',
    price: '$299',
    period: '/mo',
    description: '5kW solar panel system',
    featured: false,
    features: [
      '5kW solar panel system',
      'Standard inverter',
      'Basic monitoring app',
      '10-year warranty',
      'Annual maintenance (1 visit)',
      'Email support',
    ],
    ctaStyle: 'outline' as const,
  },
  {
    name: 'Advanced',
    price: '$599',
    period: '/mo',
    description: '10kW solar panel system',
    featured: true,
    features: [
      '10kW solar panel system',
      'Premium inverter',
      'Advanced monitoring + app',
      '20-year warranty',
      'Bi-annual maintenance (2 visits)',
      'Priority phone & email support',
      'Battery storage ready',
      'Energy efficiency audit',
    ],
    ctaStyle: 'primary' as const,
  },
  {
    name: 'Premium',
    price: '$999',
    period: '/mo',
    description: '20kW solar panel system',
    featured: false,
    features: [
      '20kW solar panel system',
      'Premium hybrid inverter',
      'Full smart home integration',
      '25-year comprehensive warranty',
      'Quarterly maintenance (4 visits)',
      '24/7 dedicated support line',
      'Battery storage included',
      'EV charging station included',
      'Real-time optimization AI',
    ],
    ctaStyle: 'outline' as const,
  },
]

/* ─── Pricing Card ─── */
function PricingCard({ plan }: { plan: typeof pricingPlans[0] }) {
  return (
    <motion.div
      variants={staggerItem}
      className={`relative bg-white rounded-xl p-8 transition-all duration-500 ease-smooth ${
        plan.featured
          ? 'border-2 border-[#10b981] hover:shadow-[0_16px_48px_rgba(16,185,129,0.15)]'
          : 'border border-[#e5e7eb] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]'
      }`}
    >
      {/* Featured Badge */}
      {plan.featured && (
        <span className="absolute -top-3 right-6 bg-[#10b981] text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-full px-3 py-1">
          Most Popular
        </span>
      )}

      {/* Plan Name */}
      <h3 className="font-heading text-2xl text-[#2A3441] mb-2">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-heading text-display text-[#081A3A]">{plan.price}</span>
        <span className="text-[#6b7280] text-sm font-sans">{plan.period}</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={18} className="text-[#10b981] shrink-0 mt-0.5" />
            <span className="text-[#6b7280] text-base font-sans">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      {plan.ctaStyle === 'primary' ? (
        <button className="w-full inline-flex items-center justify-center bg-[#10b981] text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]">
          Get Started
        </button>
      ) : (
        <button className="w-full inline-flex items-center justify-center border border-[#10b981] text-[#10b981] font-sans font-medium rounded-full px-6 py-3 transition-all hover:bg-[#10b981] hover:text-white">
          Get Started
        </button>
      )}
    </motion.div>
  )
}

/* ─── Section ─── */
export default function PricingSection() {
  return (
    <section className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-[#10b981] uppercase text-xs font-sans font-medium tracking-widest mb-4 inline-block">
            Pricing
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-[#2A3441]">
            Affordable & Transparent Pricing for Every{' '}
            <span className="italic text-[#10b981]">Energy Need</span>
          </h2>
          <p className="text-[#6b7280] text-base leading-relaxed max-w-xl mx-auto mt-4">
            Choose the plan that fits your energy goals. All plans include professional installation, monitoring, and our satisfaction guarantee.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 items-start"
        >
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
