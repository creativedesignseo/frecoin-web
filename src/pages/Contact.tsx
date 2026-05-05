import { useState, useRef, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Plus,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

/* ─── Animation helpers ─── */
const easeSmooth = [0.16, 1, 0.3, 1] as [number, number, number, number]

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.7, ease: easeSmooth },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
}

const formStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const formStaggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
}

/* ─── FAQ Data ─── */
const faqItems = [
  {
    question: 'How much can I save with solar panels?',
    answer:
      'On average, homeowners save between 50–90% on their electricity bills after installing solar panels. The exact savings depend on your energy usage, local electricity rates, system size, and available sunlight. Most systems pay for themselves within 5–8 years.',
  },
  {
    question: 'How long does the installation process take?',
    answer:
      'A typical residential installation takes 1–3 days, while commercial projects may take 1–2 weeks. The entire process — from initial consultation to system activation — usually spans 4–8 weeks, including permitting and utility approval.',
  },
  {
    question: 'What maintenance do solar panels require?',
    answer:
      'Solar panels require minimal maintenance. We recommend an annual cleaning and inspection to ensure optimal performance. Our monitoring system alerts us to any issues automatically, and our maintenance team handles all repairs under warranty.',
  },
  {
    question: 'Do solar panels work on cloudy days?',
    answer:
      'Yes, solar panels continue to generate electricity on cloudy days, typically at 10–25% of their rated capacity. Modern panels are increasingly efficient in low-light conditions, and battery storage systems ensure you have power even during extended cloudy periods.',
  },
  {
    question: 'What financing options are available?',
    answer:
      'We offer multiple financing options including cash purchase, solar loans with competitive rates, leases, and power purchase agreements (PPAs). Our team will help you find the option that best fits your budget and energy goals.',
  },
]

/* ─── Section Tag Component ─── */
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

/* ═══════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/contact-hero.jpg"
        alt="Wind turbines on green hills"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081A3A]/70 to-[#081A3A]" />
      <div className="absolute inset-0 bg-[#081A3A]/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-5">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeSmooth }}
          className="text-primary uppercase text-xs font-sans font-medium tracking-widest mb-4"
        >
          Get in Touch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: easeSmooth }}
          className="font-heading text-display text-white mb-4"
        >
          Contact <span className="italic text-primary">Us</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: easeSmooth }}
          className="text-white/70 text-base font-sans leading-relaxed max-w-lg mx-auto"
        >
          Have questions about solar energy? We&apos;re here to help you every step of the way.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-white/40 text-sm font-sans mt-6"
        >
          Home / Contact
        </motion.p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 2: MAP
   ═══════════════════════════════════════════ */
function MapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative w-full h-80 bg-[#e5e7eb] overflow-hidden">
      {/* Placeholder map styled with dark theme */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="w-full h-full relative"
      >
        <iframe
          title="Auron Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220363277!2d-118.243685!3d34.052234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAzJzA4LjAiTiAxMTjCsDE0JzM3LjMiVw!5e0!3m2!1sen!2sus!4v1"
          className="w-full h-full border-0"
          style={{ filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Bottom gradient blend */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #F6F8FB 0%, transparent 100%)',
          }}
        />
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 3: CONTACT FORM & INFO CARDS
   ═══════════════════════════════════════════ */

const subjectOptions = [
  'General Inquiry',
  'Solar Installation',
  'Maintenance Request',
  'Commercial Project',
  'Partnership',
  'Other',
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
]

function ContactFormSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    // Simulate submission
    setTimeout(() => {
      setFormState('success')
      setTimeout(() => {
        setFormState('idle')
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      }, 3000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="bg-beige py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column — Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={formStaggerContainer}
            className="lg:w-[60%]"
          >
            <motion.h2
              variants={formStaggerItem}
              className="font-heading text-4xl text-text-dark mb-2"
            >
              Send Us a <span className="italic text-primary">Message</span>
            </motion.h2>
            <motion.p variants={formStaggerItem} className="text-text-gray text-base leading-relaxed mb-8">
              Fill out the form below and our team will get back to you within 24 hours.
            </motion.p>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-[#e5e7eb]"
              >
                <CheckCircle2 size={48} className="text-green-500 mb-4" />
                <h3 className="font-heading text-2xl text-text-dark mb-2">Message Sent Successfully!</h3>
                <p className="text-text-gray text-base">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <motion.div variants={formStaggerItem}>
                  <label htmlFor="name" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={formStaggerItem}>
                  <label htmlFor="email" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div variants={formStaggerItem}>
                  <label htmlFor="phone" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                {/* Subject */}
                <motion.div variants={formStaggerItem}>
                  <label htmlFor="subject" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a subject...
                    </option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Message */}
                <motion.div variants={formStaggerItem}>
                  <label htmlFor="message" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project or question..."
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full h-36 resize-none font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={formStaggerItem}>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-medium rounded-full px-6 py-4 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Right Column — Info Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeRight}
            className="lg:w-[40%]"
          >
            {/* Card 1: Office */}
            <motion.div
              variants={fadeRight}
              custom={0}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb] mb-6"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-2">Our Office</h3>
              <p className="text-text-gray text-base leading-relaxed mb-3">
                123 Solar Street, Green Valley, CA 90210
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary font-sans font-medium text-sm hover:underline"
              >
                Get Directions
                <ArrowRight size={14} />
              </a>
            </motion.div>

            {/* Card 2: Phone */}
            <motion.div
              variants={fadeRight}
              custom={1}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb] mb-6"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <Phone size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-2">Phone</h3>
              <p className="text-text-gray text-base leading-relaxed mb-1">(555) 123-4567</p>
              <p className="text-[#9ca3af] text-sm font-sans">Mon–Fri: 8AM – 6PM</p>
            </motion.div>

            {/* Card 3: Email */}
            <motion.div
              variants={fadeRight}
              custom={2}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb] mb-6"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <Mail size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-2">Email</h3>
              <p className="text-text-gray text-base leading-relaxed mb-1">hello@auronenergy.com</p>
              <p className="text-[#9ca3af] text-sm font-sans">We reply within 24 hours</p>
            </motion.div>

            {/* Card 4: Business Hours */}
            <motion.div
              variants={fadeRight}
              custom={3}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb]"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <Clock size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-3">Business Hours</h3>
              <div className="space-y-1">
                <p className="text-text-gray text-sm font-sans">Monday – Friday: 8:00 AM – 6:00 PM</p>
                <p className="text-text-gray text-sm font-sans">Saturday: 9:00 AM – 2:00 PM</p>
                <p className="text-text-gray text-sm font-sans">Sunday: Closed</p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeRight} custom={4} className="mt-6 flex items-center gap-3">
              <span className="text-text-gray text-sm font-sans mr-1">Follow Us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[#e5e7eb] flex items-center justify-center text-text-gray transition-all duration-300 hover:bg-primary hover:border-primary hover:text-white"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 4: FAQ ACCORDION
   ═══════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        {/* Heading — centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: easeSmooth }}
          className="text-center mb-12"
        >
          <SectionTag text="FAQ" />
          <h2 className="font-heading text-4xl text-text-dark mb-4">
            Frequently Asked <span className="italic text-primary">Questions</span>
          </h2>
          <p className="text-text-gray text-base leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about our services and solar energy.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="border-b border-[#e5e7eb]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="font-sans font-medium text-text-dark text-base pr-4">
                  {item.question}
                </span>
                <span className="text-primary shrink-0">
                  {openIndex === i ? <X size={18} /> : <Plus size={18} />}
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: easeSmooth }}
                className="overflow-hidden"
              >
                <p className="text-text-gray text-base leading-relaxed pb-6">
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 5: CTA BANNER
   ═══════════════════════════════════════════ */
function CTABannerSection() {
  return (
    <section className="bg-darker-green py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="px-5 md:px-8 lg:px-16 xl:px-20 max-w-2xl mx-auto text-center"
      >
        <motion.h2
          variants={staggerItem}
          className="font-heading text-4xl text-white mb-4"
        >
          Prefer to Talk? <span className="italic text-primary">Call Us Now</span>
        </motion.h2>
        <motion.p variants={staggerItem} className="text-white/70 text-base leading-relaxed mb-8">
          Our friendly team is standing by to answer your questions and schedule your free consultation.
        </motion.p>
        <motion.a
          variants={staggerItem}
          href="tel:+15551234567"
          className="inline-flex items-center gap-3 text-primary text-2xl font-sans font-medium transition-all duration-300 hover:opacity-80"
        >
          <Phone size={28} />
          (555) 123-4567
        </motion.a>
        <motion.p variants={staggerItem} className="text-white/40 text-base mt-6">
          Or email us at hello@auronenergy.com
        </motion.p>
      </motion.div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════ */
export default function Contact() {
  return (
    <div>
      <HeroSection />
      <MapSection />
      <ContactFormSection />
      <FAQSection />
      <CTABannerSection />
    </div>
  )
}
