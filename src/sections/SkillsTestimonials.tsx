import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { percent: 66, label: 'Technical Knowledge' },
  { percent: 62, label: 'Problem-Solving Skills' },
  { percent: 63, label: 'Attention to Detail' },
];

const testimonials = [
  {
    name: 'DARRELL STEWARD',
    role: 'Nursing Head',
    quote: 'I couldn\'t be more pleased with Gripz. They installed lighting throughout my house and upgraded my electrical systems. Whether it\'s a quick fix installation',
    avatar: '/assets/about-electrician-1.jpg',
    rating: 4.5,
  },
  {
    name: 'ELEANOR PENA',
    role: 'Medical Pro',
    quote: 'We\'ve been using Gripz for electrical repairs and maintenance across multiple properties for years. They\'ve always been responsive more efficient.',
    avatar: '/assets/about-electrician-2.jpg',
    rating: 4.5,
  },
  {
    name: 'BROOKLN SIMONS',
    role: 'Marketing Co.',
    quote: 'As a small business owner, it\'s essential to have reliable electrical systems. Gripz did a complete overhaul of our office\'s wiring and installed energy-efficient lighting.',
    avatar: '/assets/hero-electrician.jpg',
    rating: 4.5,
  },
];

function CircularProgress({ percent, label }: { percent: number; label: string }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!circleRef.current || !percentRef.current || !containerRef.current) return;
    const circumference = 2 * Math.PI * 50;
    const targetOffset = circumference - (percent / 100) * circumference;

    gsap.set(circleRef.current, { strokeDashoffset: circumference });

    const counterObj = { value: 0 };

    gsap.to(circleRef.current, {
      strokeDashoffset: targetOffset,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    gsap.to(counterObj, {
      value: percent,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(counterObj.value)}%`;
        }
      },
    });
  }, [percent]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <svg className="w-[140px] h-[140px]" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#E8E8E8" strokeWidth="6" />
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r="50"
          fill="none"
          stroke="#22C55E"
          strokeWidth="6"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          strokeDasharray={2 * Math.PI * 50}
        />
      </svg>
      <div className="flex flex-col items-center gap-1">
        <span ref={percentRef} className="font-montserrat text-[28px] font-bold text-gripz-black">0%</span>
        <span className="text-[12px] font-medium text-gripz-gray-600 uppercase tracking-[0.05em] text-center">{label}</span>
      </div>
    </div>
  );
}

export default function SkillsTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-text > *', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: '.skills-text', start: 'top 75%', once: true },
      });
      gsap.fromTo('.testimonial-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: '.testimonial-header', start: 'top 85%', once: true },
      });
      gsap.fromTo('.testimonial-card', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 85%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[120px] bg-white overflow-hidden">

      <div className="container-gripz relative z-[1]">
        {/* Skills Section */}
        <div className="grid lg:grid-cols-[40%_60%] gap-10 lg:gap-16 items-center mb-20">
          <div className="skills-text">
            <div className="section-tag mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
              </svg>
              YOU CAN TRUST
            </div>
            <h2 className="section-title font-montserrat font-bold text-[32px] sm:text-[42px] leading-[1.1] tracking-[-0.01em] text-gripz-black mb-4">
              KEY SKILLS THAT POWER OUR ELECTRICIANS
            </h2>
            <p className="text-[15px] leading-[1.65] text-gripz-gray-600 mb-6">
              Discover the Difference with Electric Services. Your Trusted Local Experts in Electricals Contracting.
            </p>
            <a href="#services" className="btn-primary text-[13px] py-3 px-6">
              LEARN MORE <ArrowRight size={14} />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {skills.map((skill, i) => (
              <CircularProgress key={i} percent={skill.percent} label={skill.label} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gripz-gray-200 my-20" />

        {/* Testimonials Section */}
        <div className="testimonial-header text-center mb-12">
          <div className="section-tag justify-center mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
            </svg>
            CLIENT TESTIMONIALS
          </div>
          <h2 className="font-montserrat font-extrabold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1] tracking-[-0.02em] text-gripz-black">
            SEE WHY OUR CLIENTS <span className="text-gripz-primary">SUCCESS</span> FEEDBACK
          </h2>
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card bg-white border border-gripz-gray-200 rounded-xl p-7 transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
              {/* Google Rating */}
              <div className="flex items-center gap-2 mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className={j < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400 fill-amber-400/50'} />
                  ))}
                </div>
                <span className="text-[12px] text-gripz-gray-400">4.5 out of 5.00</span>
              </div>

              {/* Quote */}
              <p className="text-[14px] leading-[1.65] text-gripz-gray-600 mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gripz-black">{t.name}</p>
                  <p className="text-[12px] text-gripz-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
