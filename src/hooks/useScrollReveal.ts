import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animate section titles
      const titles = ref.current!.querySelectorAll('.section-title');
      if (titles.length > 0) {
        gsap.fromTo(
          titles,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // Animate section cards/items
      const cards = ref.current!.querySelectorAll('.section-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
