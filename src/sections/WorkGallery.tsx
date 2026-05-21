import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { title: 'RED CORPORATIVA COMPLETA', image: '/assets/work-redes-corporativas.webp', tag: 'REDES' },
  { title: 'INSTALACIÓN ELÉCTRICA INDUSTRIAL', image: '/assets/work-office.jpg', tag: 'ELÉCTRICAS' },
  { title: 'CIRCUITO CERRADO DE CÁMARAS', image: '/assets/work-industrial.jpg', tag: 'SEGURIDAD' },
  { title: 'COBERTURA WIFI EMPRESARIAL', image: '/assets/work-outdoor.jpg', tag: 'WIFI' },
];

export default function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.fromTo('.work-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="trabajos" className="relative py-[60px] sm:py-[80px] lg:py-[120px] bg-gripz-cream overflow-hidden">
      <div className="container-gripz relative z-[1]">
        <div className="work-header flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <div className="section-tag mb-4">
              TRABAJOS REALIZADOS
            </div>
            <h2 className="font-montserrat font-extrabold text-[32px] sm:text-[42px] lg:text-[52px] leading-[1] tracking-[-0.02em] text-gripz-black">
              CALIDAD EN CADA INSTALACIÓN
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => swiperRef.current?.slidePrev()} className="w-10 h-10 rounded-full border border-gripz-gray-200 flex items-center justify-center hover:bg-gripz-primary hover:border-gripz-primary hover:text-white transition-colors">
              <ArrowLeft size={16} />
            </button>
            <button onClick={() => swiperRef.current?.slideNext()} className="w-10 h-10 rounded-full border border-gripz-gray-200 flex items-center justify-center hover:bg-gripz-primary hover:border-gripz-primary hover:text-white transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <Swiper modules={[Navigation, Pagination]} spaceBetween={20} slidesPerView={1} pagination={{ clickable: true, el: '.work-pagination' }} onSwiper={(swiper) => { swiperRef.current = swiper; }} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}>
          {works.map((work, i) => (
            <SwiperSlide key={i}>
              <div className="work-card group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer">
                <img src={work.image} alt={work.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[11px] font-semibold text-white bg-white/15 rounded px-2.5 py-1 mb-2">{work.tag}</span>
                  <h3 className="font-inter font-semibold text-[16px] text-white leading-tight mb-3">{work.title}</h3>
                </div>
                <div className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-gripz-black" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="work-pagination flex justify-center gap-2 mt-6" />
      </div>
    </section>
  );
}
