import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, MessageCircle, Home, Send, Bell, ChevronUp } from 'lucide-react';
import Navbar from '@/sections/Navbar';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: 'ZONA DE COBERTURA',
    lines: ['Sant Vicenc dels Horts', 'Area metropolitana sur de Barcelona'],
  },
  {
    icon: Mail,
    title: 'EMAIL',
    lines: ['info@frecoin.es'],
  },
  {
    icon: Phone,
    title: 'TELEFONO',
    lines: ['+34 614 134 292'],
  },
  {
    icon: MessageCircle,
    title: 'WHATSAPP',
    lines: ['+34 614 134 292'],
    link: true,
  },
];

const serviceOptions = [
  'SELECCIONA UN SERVICIO',
  'Redes Informaticas',
  'Instalaciones Electricas',
  'Camaras de Videovigilancia',
  'Antenas WiFi',
  'SAI',
  'Controles de Acceso',
];

const companyLinks = ['Inicio', 'Servicios', 'Sobre Nosotros', 'Trabajos', 'Contacto'];

const hours = [
  { days: 'Lun - Vie', time: '8:00 - 18:00' },
  { days: 'Sabado', time: '9:00 - 14:00' },
  { days: 'Domingo', time: 'Cerrado', isClose: true },
];

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 w-12 h-12 rounded bg-gripz-primary flex items-center justify-center z-50 hover:bg-gripz-primary-dark transition-colors">
      <ChevronUp size={20} className="text-white" />
    </button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('SELECCIONA UN SERVICIO');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero', { opacity: 0 }, { opacity: 1, duration: 0.6 });
      gsap.fromTo('.info-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.info-cards', start: 'top 80%', once: true },
      });
      gsap.fromTo('.contact-form-section', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.contact-form-section', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Navbar />
      {/* Hero Banner */}
      <section className="contact-hero relative h-[300px] lg:h-[350px] w-full overflow-hidden pt-20">
        <img src="/assets/about-electrician-2.jpg" alt="Instalaciones Frecoin" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="font-montserrat font-extrabold text-[36px] lg:text-[48px] text-white tracking-tight">CONTACTO</h1>
          <div className="flex items-center gap-2 mt-3">
            <Home size={14} className="text-gripz-gray-400" />
            <Link to="/" className="text-gripz-gray-400 text-sm hover:text-gripz-primary transition-colors">Inicio</Link>
            <span className="text-gripz-gray-400 text-sm">/</span>
            <span className="text-gripz-primary text-sm font-medium">Contacto</span>
          </div>
        </div>
      </section>

      {/* REACH OUT */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-gripz">
          <div className="text-center mb-10">
            <div className="section-tag justify-center mb-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
              INFORMACION DE CONTACTO
            </div>
            <h2 className="font-montserrat font-extrabold text-[28px] lg:text-[40px] text-gripz-black">
              <span className="text-gripz-primary">CONTACTA</span> CON NOSOTROS
            </h2>
          </div>

          <div className="info-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((info, i) => (
              <div key={i} className="info-card text-center border border-gripz-gray-200 rounded-lg p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="w-14 h-14 rounded-full bg-gripz-cream flex items-center justify-center mx-auto mb-4">
                  <info.icon size={26} className="text-gripz-primary" />
                </div>
                <h3 className="font-inter font-bold text-[14px] text-gripz-black mb-2">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className={`text-[13px] ${info.link ? 'text-gripz-primary font-semibold cursor-pointer hover:underline' : 'text-gripz-gray-600'}`}>
                    {info.link ? <a href={`https://wa.me/34614134292`} target="_blank" rel="noopener noreferrer">{line}</a> : line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="contact-form-section py-6 lg:py-10 bg-white">
        <div className="container-gripz">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gripz-cream p-6 lg:p-8 rounded-xl">
              <h2 className="font-montserrat font-bold text-[20px] lg:text-[24px] text-gripz-black mb-6 leading-tight">
                SOLICITA TU PRESUPUESTO SIN COMPROMISO
              </h2>
              {formSubmitted ? (
                <div className="bg-gripz-primary/10 border border-gripz-primary/30 rounded-lg p-6 text-center">
                  <p className="text-gripz-primary font-semibold text-[16px]">¡Mensaje enviado!</p>
                  <p className="text-gripz-gray-600 text-[14px] mt-1">Te contactaremos lo antes posible.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre completo*" required className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[13px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                    <input type="email" placeholder="Email*" required className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[13px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" placeholder="Telefono*" required className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[13px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors" />
                    <div className="relative">
                      <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[13px] text-gripz-black text-left focus:border-gripz-primary focus:outline-none transition-colors flex items-center justify-between">
                        <span>{selectedService}</span>
                        <ChevronUp size={14} className={`text-gripz-black transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gripz-gray-200 z-20 mt-1 shadow-md rounded-lg overflow-hidden">
                          {serviceOptions.map((opt, i) => (
                            <button key={i} type="button" onClick={() => { setSelectedService(opt); setDropdownOpen(false); }} className={`w-full text-left px-4 py-2.5 text-[12px] font-medium hover:bg-gripz-primary hover:text-white transition-colors ${opt === selectedService ? 'bg-gripz-primary text-white' : 'text-gripz-black'}`}>
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <textarea placeholder="¿Que necesitas?*" rows={3} required className="w-full bg-white border border-gripz-gray-200 rounded-lg px-4 py-3 text-[13px] text-gripz-black placeholder:text-gripz-gray-400 focus:border-gripz-primary focus:outline-none transition-colors resize-none" />
                  {/* Cláusula informativa RGPD — formulario de Presupuesto (texto oficial validado por asesoría jurídica del cliente) */}
                  <div className="text-[11px] text-gripz-gray-600 leading-[1.5] space-y-2">
                    <p>
                      De conformidad con lo dispuesto en la normativa vigente de Protección de datos, le informamos que los datos que nos facilite serán tratados por el responsable del tratamiento, con la finalidad de atender su petición y enviar el presupuesto solicitado. La base jurídica del tratamiento es su consentimiento y/o la aplicación de medidas precontractuales a petición del interesado. Sus datos no se comunicarán a terceros salvo obligación legal. Puede ejercitar los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad mediante petición escrita dirigida al email info@frecoin.es. Más información sobre protección de datos en nuestra <Link to="/politica-privacidad" className="text-gripz-primary hover:underline font-semibold">Política de Privacidad</Link>.
                    </p>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" required className="mt-0.5 accent-gripz-primary flex-shrink-0" />
                      <span>
                        He leído y acepto la <Link to="/politica-privacidad" className="text-gripz-primary hover:underline font-semibold">Política de Privacidad</Link>
                      </span>
                    </label>
                  </div>
                  <button type="submit" className="btn-primary text-[13px] py-3 px-7">
                    ENVIAR <Send size={14} />
                  </button>
                </form>
              )}
            </div>

            {/* Info adicional */}
            <div className="flex flex-col gap-6">
              <div className="bg-gripz-dark rounded-xl p-6 lg:p-8 text-white">
                <h3 className="font-montserrat font-bold text-[18px] mb-4">FRECOIN COMUNICACIONES</h3>
                <p className="text-[14px] text-gripz-gray-400 leading-relaxed mb-4">
                  Mas de 20 anos ofreciendo soluciones integrales en infraestructuras tecnologicas para empresas en Sant Vicenc dels Horts y alrededores.
                </p>
                <div className="space-y-2 text-[14px]">
                  <p><span className="text-gripz-gray-400">Responsable:</span> <span className="text-white">Luis Freire Camino</span></p>
                  <p><span className="text-gripz-gray-400">NIF:</span> <span className="text-white">48142086G</span></p>
                  <p><span className="text-gripz-gray-400">Zona:</span> <span className="text-white">Sant Vicenc dels Horts, Barcelona</span></p>
                </div>
              </div>
              <div className="bg-gripz-cream rounded-xl p-6">
                <h4 className="font-inter font-bold text-[14px] text-gripz-black mb-3 uppercase">Horario</h4>
                <ul className="space-y-2">
                  {hours.map((h, i) => (
                    <li key={i} className="flex justify-between text-[14px]">
                      <span className="text-gripz-gray-600">{h.days}</span>
                      <span className={h.isClose ? 'text-gripz-primary font-semibold' : 'text-gripz-black'}>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gripz-cream py-12">
        <div className="container-gripz">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img src="/assets/logo-frecoin-dark.png" alt="frecoin comunicaciones" className="h-[45px] w-auto object-contain mb-3" />
              <p className="text-[13px] leading-[1.7] text-gripz-gray-600">Soluciones integrales en infraestructuras tecnologicas para empresas.</p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gripz-black mb-3 uppercase">Enlaces</h4>
              <ul className="space-y-2">
                {companyLinks.map((l) => (
                  <li key={l}><span className="text-[13px] text-gripz-gray-600 hover:text-gripz-primary cursor-pointer transition-colors">{l}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gripz-black mb-3 uppercase">Legal</h4>
              <ul className="space-y-2">
                {['Aviso Legal', 'Politica de Privacidad', 'Politica de Cookies'].map((l) => (
                  <li key={l}><span className="text-[13px] text-gripz-gray-600 hover:text-gripz-primary cursor-pointer transition-colors">{l}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gripz-black mb-3 uppercase">Suscripcion</h4>
              <div className="flex mb-2">
                <input type="email" placeholder="Tu email" className="flex-1 border border-gripz-gray-200 bg-white px-3 py-2 text-[13px] text-gripz-black placeholder:text-gripz-gray-400 focus:outline-none focus:border-gripz-primary transition-colors" />
                <button className="w-10 bg-gripz-primary flex items-center justify-center hover:bg-gripz-primary-dark transition-colors">
                  <Bell size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center pt-6 mt-8 border-t border-gripz-gray-200">
            <p className="text-[12px] text-gripz-gray-400">&copy; 2026 FRECOIN. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
