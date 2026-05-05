import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Plus,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

/* ─── Animation helpers ─── */
const easeSmooth = [0.16, 1, 0.3, 1] as [number, number, number, number]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSmooth } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.7, ease: easeSmooth },
  }),
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
    question: '¿Qué tipo de clientes atiende FRECOIN?',
    answer:
      'Atendemos a todo tipo de clientes: pequeñas y medianas empresas, comunidades de propietarios, naves industriales, locales comerciales, oficinas y particulares en Sant Vicenç dels Horts y el área metropolitana sur de Barcelona.',
  },
  {
    question: '¿Cuánto tiempo tarda una instalación de red?',
    answer:
      'Depende del alcance del proyecto. Una instalación de red para una oficina pequeña puede realizarse en 1–2 días. Proyectos en naves o edificios corporativos pueden requerir entre 1 y 2 semanas. Siempre acordamos el plazo antes de comenzar.',
  },
  {
    question: '¿Ofrecéis garantía en las instalaciones?',
    answer:
      'Sí. Todos nuestros trabajos incluyen garantía en materiales y mano de obra. Además, ofrecemos contratos de mantenimiento preventivo para que su instalación esté siempre en perfecto estado.',
  },
  {
    question: '¿Podéis trabajar fuera de horario para no interrumpir mi negocio?',
    answer:
      'Por supuesto. Nos adaptamos a las necesidades de cada cliente. Realizamos instalaciones en horario nocturno, fines de semana o por fases para minimizar el impacto en la actividad de su empresa.',
  },
  {
    question: '¿Dónde trabajáis?',
    answer:
      'Nuestra zona principal de actuación es Sant Vicenç dels Horts y el área metropolitana sur de Barcelona. Contáctanos indicando la ubicación de tu proyecto y te informaremos sin compromiso.',
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
      <img
        src="/contact-hero.jpg"
        alt="Instalaciones técnicas FRECOIN"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#081A3A]/70 to-[#081A3A]" />
      <div className="absolute inset-0 bg-[#081A3A]/40" />

      <div className="relative z-10 text-center px-5">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: easeSmooth }}
          className="text-primary uppercase text-xs font-sans font-medium tracking-widest mb-4"
        >
          Frecoin Comunicaciones
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: easeSmooth }}
          className="font-heading text-display text-white mb-4"
        >
          Solicitar <span className="italic text-primary">Presupuesto</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: easeSmooth }}
          className="text-white/70 text-base font-sans leading-relaxed max-w-lg mx-auto"
        >
          Cuéntanos tu proyecto y te respondemos sin compromiso en menos de 24 horas.
        </motion.p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 2: CONTACT FORM & INFO CARDS
   ═══════════════════════════════════════════ */
function ContactFormSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setTimeout(() => {
      setFormState('success')
      setTimeout(() => {
        setFormState('idle')
        setFormData({ name: '', phone: '', message: '' })
      }, 3000)
    }, 1500)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
            <motion.div variants={formStaggerItem}>
              <SectionTag text="Escríbenos" />
            </motion.div>
            <motion.h2
              variants={formStaggerItem}
              className="font-heading text-4xl text-text-dark mb-2"
            >
              Cuéntanos tu <span className="italic text-primary">Proyecto</span>
            </motion.h2>
            <motion.p variants={formStaggerItem} className="text-text-gray text-base leading-relaxed mb-8">
              Rellena el formulario y te contactamos en menos de 24 horas con un presupuesto sin compromiso.
            </motion.p>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-[#e5e7eb]"
              >
                <CheckCircle2 size={48} className="text-primary mb-4" />
                <h3 className="font-heading text-2xl text-text-dark mb-2">¡Mensaje enviado!</h3>
                <p className="text-text-gray text-base">Te contactamos en menos de 24 horas.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <motion.div variants={formStaggerItem}>
                  <label htmlFor="name" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                <motion.div variants={formStaggerItem}>
                  <label htmlFor="phone" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                <motion.div variants={formStaggerItem}>
                  <label htmlFor="message" className="block font-sans font-medium text-text-dark text-base mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntanos qué necesitas instalar o mejorar..."
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-3 w-full h-36 resize-none font-sans text-base text-text-dark outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9ca3af]"
                  />
                </motion.div>

                <motion.div variants={formStaggerItem}>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-sans font-medium rounded-full px-6 py-4 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,82,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <ArrowRight size={16} />
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
            variants={staggerContainer}
            className="lg:w-[40%]"
          >
            {/* WhatsApp CTA */}
            <motion.a
              variants={fadeRight}
              custom={0}
              href="https://wa.me/34614134292"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#25D366] rounded-xl p-8 mb-6 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="bg-white/20 rounded-lg p-3 shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="font-heading text-white text-xl font-medium">WhatsApp Directo</p>
                <p className="text-white/80 text-base font-sans">+34 614 134 292</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.div
              variants={fadeRight}
              custom={1}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb] mb-6"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <Phone size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-2">Teléfono</h3>
              <a href="tel:+34614134292" className="text-text-gray text-base leading-relaxed hover:text-primary transition-colors block mb-1">
                +34 614 134 292
              </a>
              <p className="text-[#9ca3af] text-sm font-sans">Lun–Vie: 8:00 – 18:00</p>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={fadeRight}
              custom={2}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb] mb-6"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <Mail size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-2">Email</h3>
              <a href="mailto:info@frecoin.es" className="text-text-gray text-base leading-relaxed hover:text-primary transition-colors block mb-1">
                info@frecoin.es
              </a>
              <p className="text-[#9ca3af] text-sm font-sans">Respondemos en menos de 24 h</p>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              variants={fadeRight}
              custom={3}
              className="bg-white rounded-xl p-8 border border-[#e5e7eb]"
            >
              <div className="bg-primary/10 rounded-lg p-2 w-fit mb-4">
                <Clock size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-dark mb-3">Horario</h3>
              <div className="space-y-1">
                <p className="text-text-gray text-sm font-sans">Lunes – Viernes: 8:00 – 18:00</p>
                <p className="text-text-gray text-sm font-sans">Sant Vicenç dels Horts, Barcelona</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   SECTION 3: FAQ ACCORDION
   ═══════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-light-gray py-20 lg:py-24">
      <div className="px-5 md:px-8 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: easeSmooth }}
          className="text-center mb-12"
        >
          <SectionTag text="FAQ" />
          <h2 className="font-heading text-4xl text-text-dark mb-4">
            Preguntas <span className="italic text-primary">Frecuentes</span>
          </h2>
          <p className="text-text-gray text-base leading-relaxed max-w-2xl mx-auto">
            Respondemos a las dudas más habituales sobre nuestros servicios de instalación.
          </p>
        </motion.div>

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
   SECTION 4: CTA BANNER
   ═══════════════════════════════════════════ */
function CTABannerSection() {
  return (
    <section className="bg-dark-green py-20">
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
          ¿Prefieres llamar?{' '}
          <span className="italic text-primary">Te atendemos ya</span>
        </motion.h2>
        <motion.p variants={staggerItem} className="text-white/70 text-base leading-relaxed mb-8">
          Nuestro equipo está disponible de lunes a viernes de 8:00 a 18:00 para atenderte.
        </motion.p>
        <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+34614134292"
            className="inline-flex items-center gap-3 bg-white text-dark-green font-sans font-medium rounded-full px-8 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Phone size={20} />
            +34 614 134 292
          </a>
          <a
            href="https://wa.me/34614134292"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-sans font-medium rounded-full px-8 py-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </motion.div>
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
      <ContactFormSection />
      <FAQSection />
      <CTABannerSection />
    </div>
  )
}
