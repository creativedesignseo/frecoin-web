import { Lightbulb } from 'lucide-react';

const line1 = ['RELIABLE', 'AFFORDABLE', 'ELECTRICAL'];
const line2 = ['TRUSTED', 'EXPERT', 'HOME & BUSINESS'];

function MarqueeLine({ words, direction }: { words: string[]; direction: 'left' | 'right' }) {
  const content = (
    <>
      {words.map((word, i) => (
        <span key={i} className="flex items-center gap-6">
          <span className="font-montserrat font-black text-[60px] sm:text-[80px] text-gripz-black/8 whitespace-nowrap uppercase select-none">
            {word}
          </span>
          <Lightbulb size={48} className="text-gripz-primary/20 flex-shrink-0" />
        </span>
      ))}
    </>
  );

  return (
    <div className="flex w-max overflow-hidden">
      <div className={`flex items-center gap-6 flex-shrink-0 pr-6 ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
        {content}
        {content}
      </div>
    </div>
  );
}

export default function TextMarquee() {
  return (
    <section className="py-10 bg-gripz-cream border-t border-b border-gripz-gray-200 overflow-hidden">
      <MarqueeLine words={line1} direction="left" />
      <div className="mt-4" />
      <MarqueeLine words={line2} direction="right" />
    </section>
  );
}
