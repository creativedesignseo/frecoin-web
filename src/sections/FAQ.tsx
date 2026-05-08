import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'DO YOU OFFER EMERGENCY SERVICES?',
    answer: 'Yes, we provide 24/7 emergency electrical services. Our team is always on standby to handle urgent electrical issues such as power outages, electrical fires, and hazardous wiring problems. Call us anytime at (555) 909-1313 for immediate assistance.',
  },
  {
    question: 'HOW LONG WILL MY PROJECT TAKE?',
    answer: 'Project timelines vary depending on scope and complexity. A simple outlet installation may take 1-2 hours, while a full home rewiring can take 3-5 days. We provide detailed timelines during our initial consultation and keep you updated throughout the process.',
  },
  {
    question: 'DO YOU HANDLE SMART HOME INSTALLATIONS?',
    answer: 'Absolutely! Our electricians are trained in the latest smart home technologies. We install smart lighting, thermostats, security systems, automated switches, and full home automation hubs. We\'ll help you choose the best solutions for your needs and budget.',
  },
  {
    question: 'HOW CAN I SCHEDULE AN APPOINTMENT?',
    answer: 'You can schedule an appointment by calling us at (555) 909-1313, filling out the consultation form on our website, or sending us an email at info@gripz.com. Our team will get back to you within 24 hours to confirm your appointment.',
  },
  {
    question: 'ARE YOUR ELECTRICIANS LICENSED AND INSURED?',
    answer: 'Yes, all our electricians are fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers\' compensation coverage. Our team undergoes regular training to stay current with the latest electrical codes and safety standards.',
  },
];

function AccordionItem({ question, answer, isOpen, onClick }: {
  question: string; answer: string; isOpen: boolean; onClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-gripz-gray-200">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-inter font-semibold text-[15px] lg:text-[16px] text-gripz-black pr-4 group-hover:text-gripz-primary transition-colors">
          {question}
        </span>
        <div
          className="w-6 h-6 flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <Plus size={20} className="text-gripz-primary" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 200}px` : '0px',
        }}
      >
        <p className="text-[14px] leading-[1.65] text-gripz-gray-600 pb-5">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-left', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
      gsap.fromTo('.faq-item', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.08,
        scrollTrigger: { trigger: '.faq-accordion', start: 'top 80%', once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-[120px] bg-gripz-cream overflow-hidden">

      <div className="container-gripz relative z-[1]">
        <div className="grid lg:grid-cols-[40%_60%] gap-10 lg:gap-20">
          {/* Left Column */}
          <div className="faq-left">
            <div className="section-tag mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gripz-primary">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
              </svg>
              READ OUR FAQ
            </div>
            <h2 className="font-montserrat font-extrabold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1] tracking-[-0.02em] text-gripz-black mb-4">
              GOT <span className="text-gripz-primary">QUESTIONS?</span> WE HAVE ANSWERS
            </h2>
            <p className="text-[15px] leading-[1.65] text-gripz-gray-600 mb-8">
              Discover the Difference with Electric Services. Your Trusted Local Experts in Electricals Contracting.
            </p>
            <div className="rounded-2xl overflow-hidden">
              <img src="/assets/faq-electrician.jpg" alt="Electrician FAQ" className="w-full h-[350px] object-cover" />
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="faq-accordion flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <AccordionItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
