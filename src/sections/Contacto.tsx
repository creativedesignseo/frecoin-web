import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    title: 'TELEFONO / WHATSAPP',
    value: '+34 614 134 292',
    href: 'tel:+34614134292',
  },
  {
    icon: Mail,
    title: 'EMAIL',
    value: 'info@frecoin.es',
    href: 'mailto:info@frecoin.es',
  },
  {
    icon: MessageCircle,
    title: 'WHATSAPP DIRECTO',
    value: 'Escribir ahora',
    href: 'https://wa.me/34614134292',
  },
];

export default function Contacto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', mensaje: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.fromTo('.contact-right', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ nombre: '', telefono: '', mensaje: '' });
  };

  return (
    <section ref={sectionRef} id="contacto" className="relative py-[100px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-tag justify-center mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
            CONTACTO
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
            HABLEMOS DE TU <span className="text-gripz-primary">PROYECTO</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[40%_60%] gap-10 lg:gap-20 max-w-5xl mx-auto">
          {/* Left */}
          <div className="contact-left flex flex-col gap-6">
            {contactInfo.map((info, i) => (
              <a key={i} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-full bg-gripz-primary/10 flex items-center justify-center group-hover:bg-gripz-primary transition-colors">
                  <info.icon size={24} className="text-gripz-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[12px] text-gripz-gray-400 uppercase tracking-wider">{info.title}</p>
                  <p className="text-[16px] font-semibold text-gripz-black group-hover:text-gripz-primary transition-colors">{info.value}</p>
                </div>
              </a>
            ))}
            <div className="mt-4 p-6 bg-gripz-cream rounded-xl">
              <p className="text-[14px] text-gripz-gray-600 leading-relaxed">
                <strong>Zona de cobertura:</strong> Sant Vicenc dels Horts y area metropolitana sur de Barcelona.
              </p>
              <p className="text-[14px] text-gripz-gray-600 leading-relaxed mt-2">
                Atendemos directamente en su empresa o domicilio. Sin oficina fisica — vamos a usted.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right bg-gripz-cream rounded-xl p-6 lg:p-8">
            <h3 className="font-montserrat font-bold text-[18px] text-gripz-black mb-5">ENVIANOS UN MENSAJE</h3>
            {submitted ? (
              <div className="bg-gripz-primary/10 border border-gripz-primary/30 rounded-lg p-6 text-center">
                <p className="text-gripz-primary font-semibold text-[16px]">¡Mensaje enviado!</p>
                <p className="text-gripz-gray-600 text-[14px] mt-1">Nos pondremos en contacto contigo lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" required placeholder="Nombre completo*" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                <input type="tel" required placeholder="Telefono*" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                <textarea required rows={4} placeholder="¿Que necesitas?*" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors resize-none" />
                <button type="submit" className="btn-primary w-full justify-center text-[14px]">
                  ENVIAR MENSAJE <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
