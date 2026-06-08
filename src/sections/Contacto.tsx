import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MessageCircle, Send } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Phone,
    title: 'TELÉFONO / WHATSAPP',
    value: '+34 614 134 292',
    href: 'tel:+34614134292',
  },
  {
    icon: Mail,
    title: 'EMAIL',
    // NOTA: info@frecoin.es aún no existe (pendiente decisión Google Workspace).
    // Usamos lfreire@ provisionalmente. Cambiar cuando se cree info@.
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
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', mensaje: '' });
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

  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg('');
    try {
      const res = await fetch('/send-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contacto' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        trackEvent('form_submit', { form_id: 'contacto_main', location: 'contacto' });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
        setFormData({ nombre: '', telefono: '', email: '', mensaje: '' });
      } else {
        setErrorMsg(data.error || 'No se pudo enviar. Llámanos por WhatsApp.');
      }
    } catch {
      setErrorMsg('Error de red. Llámanos por WhatsApp.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={sectionRef} id="contacto" className="relative py-[60px] sm:py-[80px] lg:py-[120px] bg-white overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-tag justify-center mb-4">
              CONTACTO
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
            HABLEMOS DE TU PROYECTO
          </h2>
        </div>

        <div className="grid lg:grid-cols-[40%_60%] gap-10 lg:gap-20 max-w-5xl mx-auto">
          {/* Left */}
          <div className="contact-left flex flex-col gap-6">
            {contactInfo.map((info, i) => (
              <a key={i} href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-4 group">
                <info.icon size={28} className="text-gripz-primary flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="text-[12px] text-gripz-gray-400 uppercase tracking-wider">{info.title}</p>
                  <p className="text-[16px] font-semibold text-gripz-black group-hover:text-gripz-primary transition-colors">{info.value}</p>
                </div>
              </a>
            ))}
            <div className="mt-4 p-6 bg-gripz-cream rounded-xl">
              <p className="text-[14px] text-gripz-gray-600 leading-relaxed">
                <strong>Zona de cobertura:</strong> Barcelona y Cataluña.
              </p>
              <p className="text-[14px] text-gripz-gray-600 leading-relaxed mt-2">
                Atendemos directamente en su empresa o domicilio. Sin oficina física — vamos a usted.
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right bg-gripz-cream rounded-xl p-6 lg:p-8">
            <h3 className="font-montserrat font-bold text-[18px] text-gripz-black mb-5">ENVÍANOS UN MENSAJE</h3>
            {submitted ? (
              <div className="bg-gripz-primary/10 border border-gripz-primary/30 rounded-lg p-6 text-center">
                <p className="text-gripz-primary font-semibold text-[16px]">¡Mensaje enviado!</p>
                <p className="text-gripz-gray-600 text-[14px] mt-1">Nos pondremos en contacto contigo lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" required placeholder="Nombre completo*" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" required placeholder="Teléfono*" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                  <input type="email" placeholder="Email (opcional)" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                </div>
                <textarea required rows={4} placeholder="¿Qué necesitas?*" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[14px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors resize-none" />

                {/* Cláusula informativa RGPD — formulario de Contacto (texto oficial validado por la asesoría jurídica del cliente, 05-jun-2026) */}
                <div className="text-[11px] text-gripz-gray-600 leading-[1.5] space-y-2">
                  <details className="group">
                    <summary className="flex items-center gap-1.5 cursor-pointer select-none text-gripz-gray-500 hover:text-gripz-black transition-colors [&::-webkit-details-marker]:hidden marker:hidden">
                      <span className="transition-transform group-open:rotate-90 text-[8px]">▶</span>
                      Información básica sobre protección de datos
                    </summary>
                    <p className="mt-2 pl-3">
                      De conformidad con lo dispuesto en la normativa vigente de Protección de datos, le informamos que los datos que nos facilite serán tratados por el responsable del tratamiento, con la finalidad de atender su solicitud, consulta o petición de información. La base jurídica del tratamiento es su consentimiento y/o la aplicación de medidas precontractuales a petición del interesado. Sus datos no se comunicarán a terceros salvo obligación legal. Puede ejercitar los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad mediante petición escrita dirigida al email info@frecoin.es. Más información sobre protección de datos en nuestra{' '}
                      <Link to="/politica-privacidad" className="text-gripz-primary hover:underline font-semibold">Política de Privacidad</Link>.
                    </p>
                  </details>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 accent-gripz-primary flex-shrink-0" />
                    <span>
                      He leído y acepto la{' '}
                      <Link to="/politica-privacidad" className="text-gripz-primary hover:underline font-semibold">Política de Privacidad</Link>
                    </span>
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-[12px] text-red-600">{errorMsg}</p>
                )}

                <button type="submit" disabled={sending} className="btn-primary w-full justify-center text-[14px] disabled:opacity-60">
                  {sending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'} <Send size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
