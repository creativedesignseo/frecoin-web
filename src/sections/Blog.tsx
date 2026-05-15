import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    image: '/assets/service-repairs.jpg',
    author: 'Emino',
    date: 'December 4, 2025',
    title: 'SAFETY FIRST: BEST PRACTICES FOR A BEST ELECTRICALS SITE',
  },
  {
    image: '/assets/service-energy.jpg',
    author: 'Daniel',
    date: 'December 4, 2025',
    title: 'THE IMPORTANCE OF REGULAR BEST ELECTRICAL MAINTENANCE',
  },
  {
    image: '/assets/service-installation.jpg',
    author: 'Clarcon',
    date: 'December 4, 2025',
    title: 'TOP TIPS FOR CHOOSING THE RIGHT ELECTRICIAN FOR YOUR PROJECT',
  },
];

export default function Blog() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} id="blog" className="relative py-[120px] bg-white overflow-hidden">

      <div className="container-gripz relative z-[1]">
        <div className="text-center mb-12">
          <div className="section-tag justify-center mb-4">
              RECENT BLOG
          </div>
          <h2 className="section-title font-montserrat font-extrabold text-[36px] sm:text-[48px] lg:text-[56px] leading-[1] tracking-[-0.02em] text-gripz-black">
            READ OUR <span className="text-gripz-primary">LATEST</span> BLOGS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <article
              key={i}
              className="section-card group bg-white border border-gripz-gray-200 rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-md cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="inline-block text-[11px] font-semibold text-gripz-primary bg-gripz-primary/8 rounded px-2.5 py-1 mb-3">
                  ELECTRICAL
                </span>
                <p className="text-[12px] text-gripz-gray-400 mb-2">
                  By {blog.author} ~ {blog.date}
                </p>
                <h3 className="font-inter font-semibold text-[16px] leading-[1.4] text-gripz-black mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-gripz-black hover:text-gripz-primary transition-colors">
                  READ MORE <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
