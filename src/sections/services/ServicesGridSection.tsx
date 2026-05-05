import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

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
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
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

/* ─── Service Data ─── */
const services = [
  {
    num: '01',
    title: 'Solar Panel Installation',
    image: '/service-1.jpg',
    description:
      'Our certified technicians design and install custom solar panel systems optimized for your property\'s unique sun exposure and energy needs. We handle everything from permits to grid connection.',
    features: ['Custom system design', 'Professional installation', 'Permitting assistance', 'Grid connection'],
  },
  {
    num: '02',
    title: 'Energy Storage Solutions',
    image: '/service-2.jpg',
    description:
      'Store excess solar energy for use during nighttime or outages with our state-of-the-art battery systems. Achieve true energy independence with smart storage technology.',
    features: ['Battery backup systems', 'Load shifting optimization', 'Outage protection', 'Smart monitoring'],
  },
  {
    num: '03',
    title: 'Consultation & Maintenance',
    image: '/service-3.jpg',
    description:
      'Our experts provide comprehensive energy audits, system diagnostics, and ongoing maintenance to ensure your solar investment continues performing at peak efficiency for decades.',
    features: ['Free energy audits', 'System performance checks', 'Cleaning services', '24/7 monitoring'],
  },
  {
    num: '04',
    title: 'EV Charging Stations',
    image: '/service-4.jpg',
    description:
      'Power your electric vehicle with clean solar energy. We install Level 2 and DC fast charging stations for homes, businesses, and public spaces.',
    features: ['Home EV chargers', 'Commercial charging hubs', 'Solar-integrated charging', 'Network management'],
  },
  {
    num: '05',
    title: 'Hybrid Solar Systems',
    image: '/service-5.jpg',
    description:
      'Combine solar panels with wind or backup generators for maximum energy reliability. Perfect for off-grid locations or areas with inconsistent sunlight.',
    features: ['Solar + wind hybrid', 'Grid-tie with backup', 'Off-grid solutions', 'Smart switching'],
  },
  {
    num: '06',
    title: 'Energy Efficiency Audits',
    image: '/service-6.jpg',
    description:
      'Identify energy waste and optimization opportunities with our detailed efficiency audits. Receive a comprehensive report with actionable recommendations and projected ROI.',
    features: ['Thermal imaging', 'Usage analysis', 'Efficiency recommendations', 'ROI projections'],
  },
]

/* ─── Service Card ─── */
function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-xl border border-[#e5e7eb] overflow-hidden group transition-all duration-500 ease-smooth hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Number overlay */}
        <span className="absolute top-3 left-3 font-heading text-5xl text-[#10b981]/15 font-bold select-none">
          {service.num}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-2xl text-[#2A3441] mb-3">
          {service.title}
        </h3>
        <p className="text-[#6b7280] text-base leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check size={14} className="text-[#10b981] shrink-0" />
              <span className="text-[#6b7280] text-sm font-sans">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <span className="inline-flex items-center gap-1 text-[#10b981] font-sans font-medium text-sm group/link cursor-pointer">
          Learn More
          <ArrowRight
            size={14}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Section ─── */
export default function ServicesGridSection() {
  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <SectionTag text="What We Do" />
          <h2 className="font-heading text-4xl lg:text-5xl text-[#2A3441] max-w-3xl">
            Comprehensive <span className="italic text-[#10b981]">Renewable Energy</span> Solutions
          </h2>
          <p className="text-[#6b7280] text-base leading-relaxed max-w-2xl mt-4">
            From initial consultation to ongoing maintenance, we provide end-to-end services that make transitioning to clean energy seamless and hassle-free.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {services.map((service) => (
            <ServiceCard key={service.num} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
