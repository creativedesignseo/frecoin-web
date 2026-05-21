import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Send, Phone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '', servicio: '', mensaje: '' });
  const [status, setStatus] = useState<SubmitState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/send-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'hero' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
        trackEvent('form_submit', { form_id: 'presupuesto_hero', location: 'hero' });
        setFormData({ nombre: '', telefono: '', email: '', servicio: '', mensaje: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'No se pudo enviar. Llámanos por WhatsApp.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Error de red. Llámanos por WhatsApp.');
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' });
      gsap.fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: 'power2.out' });
      gsap.fromTo('.hero-image', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1, delay: 0.1, ease: 'power2.out' });
      gsap.fromTo('.hero-form', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative lg:min-h-[640px] xl:min-h-screen w-full bg-white overflow-hidden pt-20">
      {/* Main Content */}
      <div className="container-gripz relative pt-4 pb-2 sm:pt-8 sm:pb-2 lg:pt-14 xl:pt-20 xl:pb-2">
        <div className="grid lg:grid-cols-[58%_42%] xl:grid-cols-[55%_45%] gap-8 items-center">
          {/* Left Column - Text */}
          <div className="relative z-10 max-w-xl">
            {/* Eyebrow tipográfica */}
            <div className="hero-badge mb-4 sm:mb-5">
              <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-gripz-primary">+20 AÑOS DE EXPERIENCIA</span>
            </div>

            {/* Title */}
            <h1 className="hero-title font-montserrat font-extrabold text-[32px] sm:text-[44px] xl:text-[64px] leading-[1] sm:leading-[0.95] tracking-[-0.03em] text-gripz-black mb-4 sm:mb-5">
              Infraestructuras<br />
              tecnológicas<br />
              para empresas.
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle text-[16px] leading-[1.65] text-gripz-gray-600 max-w-md mb-8">
              <strong className="text-gripz-black">"Tu satisfacción es mi prioridad laboral"</strong><br />
              Soluciones integrales en redes informáticas, instalaciones eléctricas, cámaras de seguridad, WiFi, SAI y controles de acceso en Sant Vicenç dels Horts y área metropolitana sur de Barcelona.
            </p>

            {/* CTAs — botones alineados visualmente (sólido + outline) */}
            <div className="hero-ctas flex items-stretch gap-3 flex-wrap">
              <a href="https://wa.me/34614134292" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gripz-primary text-white font-semibold text-[14px] px-5 py-3 rounded-lg hover:scale-[1.02] transition-transform shadow-[0_4px_20px_rgba(34,197,94,0.25)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="tel:+34614134292" className="inline-flex items-center justify-center gap-2 border border-gripz-primary text-gripz-primary font-semibold text-[14px] px-5 py-3 rounded-lg hover:bg-gripz-primary hover:text-white transition-colors">
                <Phone size={16} />
                614 134 292
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Image
          - Mobile/tablet vertical (<lg): oculta (texto va a 1 columna sin imagen)
          - Tablet horizontal (lg): crop más cuadrado (aspect 1:1 aprox)
          - Desktop (xl+): full-height absolute, ocupando el 45% derecho */}
      <div className="hero-image hidden lg:block absolute right-0 top-20 w-[42%] xl:w-[45%] h-[calc(100%-80px)]">
        <img
          src="/assets/hero-electrician.jpg"
          alt="Instalaciones tecnológicas Frecoin"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Consultation Form — mobile: espacio respiro arriba; xl: superpuesto sobre imagen */}
      <div className="hero-form relative z-10 container-gripz mt-2 mb-12 sm:mb-16 xl:mb-16">
        <div
          className="rounded-xl p-6 lg:p-8"
          style={{
            backgroundColor: '#1A1A1A',
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322C55E' stroke-width='0.5' stroke-opacity='0.12'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M0 40h40M40 0v40M40 40l20-20M40 40l20 20M40 40l-20 20M40 40l-20-20'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='80' cy='0' r='2'/%3E%3Ccircle cx='0' cy='80' r='2'/%3E%3Ccircle cx='80' cy='80' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <h3 className="text-white font-montserrat font-bold text-lg mb-5">SOLICITA TU PRESUPUESTO</h3>
          {status === 'success' ? (
            <div className="bg-gripz-primary/15 border border-gripz-primary/40 rounded-lg p-5 text-center">
              <p className="text-gripz-primary font-semibold text-[15px] mb-1">¡Mensaje enviado!</p>
              <p className="text-white/70 text-[13px]">Te contactaremos lo antes posible.</p>
            </div>
          ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" required placeholder="Nombre completo*" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors" />
              <input type="tel" required placeholder="Teléfono*" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors" />
              <input type="email" placeholder="Email (opcional)" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors" />
              <select required value={formData.servicio} onChange={(e) => setFormData({ ...formData, servicio: e.target.value })} className={`w-full bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-sm focus:border-gripz-primary focus:outline-none transition-colors appearance-none ${formData.servicio ? 'text-white' : 'text-white/40'}`}>
                <option value="" disabled>Selecciona un servicio*</option>
                <option value="Redes Informáticas" className="text-gripz-black">Redes Informáticas</option>
                <option value="Instalaciones Eléctricas" className="text-gripz-black">Instalaciones Eléctricas</option>
                <option value="Cámaras de Videovigilancia" className="text-gripz-black">Cámaras de Videovigilancia</option>
                <option value="Antenas WiFi" className="text-gripz-black">Antenas WiFi</option>
                <option value="SAI" className="text-gripz-black">SAI</option>
                <option value="Controles de Acceso" className="text-gripz-black">Controles de Acceso</option>
              </select>
            </div>
            <div className="flex gap-4">
              <textarea required placeholder="¿Qué necesitas?*" rows={2} value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} className="flex-1 bg-[rgba(255,255,255,0.08)] border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/40 text-sm focus:border-gripz-primary focus:outline-none transition-colors resize-none" />
              <button type="submit" disabled={status === 'sending'} className="w-14 h-14 rounded-full bg-gripz-primary flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.3)] flex-shrink-0 disabled:opacity-60 disabled:scale-100">
                <Send size={20} className={`text-white ${status === 'sending' ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            {status === 'error' && (
              <p className="text-[12px] text-red-300">{errorMsg}</p>
            )}
            {/* Cláusula informativa RGPD/LSSI — obligatoria en cualquier formulario que recoja datos */}
            <label className="flex items-start gap-2 text-[11px] text-white/60 leading-[1.5] cursor-pointer">
              <input type="checkbox" required className="mt-0.5 accent-gripz-primary flex-shrink-0" />
              <span>
                He leído y acepto la{' '}
                <Link to="/politica-privacidad" className="text-gripz-primary hover:underline">
                  Política de Privacidad
                </Link>. Tus datos serán tratados por Luis Freire Camino (FRECOIN) con la única finalidad de responder a tu consulta.
              </span>
            </label>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}
