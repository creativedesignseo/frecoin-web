import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  Search,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
} from 'lucide-react'
import {
  blogPosts,
  categories,
  categoryCounts,
  recentPosts,
  tags,
} from '../sections/blog/data'
import BlogCard from '../sections/blog/BlogCard'

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const socialIcons = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Mail, label: 'Email' },
]

// Related posts: pick 3 posts excluding current
function getRelatedPosts(currentSlug: string) {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3)
}

export default function BlogSingle() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const post = blogPosts.find((p) => p.slug === slug)

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-beige pt-[72px]">
        <div className="text-center px-5">
          <h1 className="font-heading text-display-xl text-text-dark mb-4">
            Article Not Found
          </h1>
          <p className="text-text-gray text-lg max-w-md mx-auto mb-8">
            The article you are looking for does not exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center bg-primary text-white font-sans font-medium rounded-full px-6 py-3 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const relatedPosts = getRelatedPosts(post.slug)

  return (
    <>
      {/* ─── Section 1: Article Hero ─── */}
      <section className="bg-darker-green pt-32 pb-16">
        <div className="px-5 md:px-8 lg:px-16 xl:px-20 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-primary text-sm font-sans mb-6"
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>{' '}
            /{' '}
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>{' '}
            / {post.category}
          </motion.p>

          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block bg-primary text-white text-xs font-sans font-semibold uppercase rounded-full px-3 py-1 mb-4"
          >
            {post.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-display text-white"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-6 mt-6 flex-wrap"
          >
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
            <span className="text-white text-sm font-sans">
              By {post.author}
            </span>
            <span className="text-white/50 text-sm font-sans">
              {post.date}
            </span>
            <span className="text-white/50 text-sm font-sans">
              {post.readTime}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── Section 2: Article Content ─── */}
      <section className="bg-white py-16">
        <div className="px-5 md:px-8 lg:px-16 xl:px-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Article Column (65%) */}
            <div className="lg:w-[65%]">
              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-10"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full rounded-xl aspect-[16/9] object-cover"
                />
              </motion.div>

              {/* Article Body */}
              <div className="max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-text-dark text-lg leading-relaxed"
                >
                  The solar industry is on the cusp of a revolution. As we approach
                  2025, breakthrough technologies are poised to dramatically increase
                  efficiency, reduce costs, and make solar power accessible to billions
                  more people worldwide. In this comprehensive guide, we&apos;ll explore
                  the innovations that will define the next era of renewable energy.
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-3xl text-text-dark mt-10 mb-4"
                >
                  Perovskite Tandem Cells: The Efficiency Game-Changer
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-text-gray text-base leading-relaxed"
                >
                  Traditional silicon solar cells have plateaued at around 22-26%
                  efficiency in commercial applications. Enter perovskite tandem cells
                  &#8212; a revolutionary technology that layers perovskite material atop
                  silicon to capture a broader spectrum of sunlight. These next-generation
                  cells have already achieved laboratory efficiencies exceeding 33%, and
                  commercial production is expected to ramp up significantly in 2025.
                </motion.p>

                {/* Pull Quote */}
                <motion.blockquote
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-beige border-l-4 border-primary rounded-r-xl p-6 my-8"
                >
                  <p className="text-text-dark text-base leading-relaxed italic">
                    &ldquo;By 2026, perovskite tandem cells could achieve commercial
                    efficiencies of 30% or higher, potentially reducing the cost of solar
                    electricity by 40%.&rdquo;
                  </p>
                  <p className="text-text-gray text-sm mt-2">
                    &mdash; National Renewable Energy Laboratory
                  </p>
                </motion.blockquote>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-3xl text-text-dark mt-10 mb-4"
                >
                  AI-Driven Solar Optimization
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-text-gray text-base leading-relaxed"
                >
                  Artificial intelligence is transforming how solar systems operate.
                  Machine learning algorithms can now predict weather patterns, optimize
                  panel angles in real-time, and detect performance issues before they
                  impact energy production. Smart inverters equipped with AI can increase
                  system output by 15-20% without any additional hardware.
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-3xl text-text-dark mt-10 mb-4"
                >
                  Bifacial Panels and Tracking Systems
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-text-gray text-base leading-relaxed"
                >
                  Bifacial solar panels, which capture sunlight from both sides, are
                  gaining traction in utility-scale installations. When combined with
                  single-axis tracking systems that follow the sun&apos;s path throughout the
                  day, these configurations can increase energy yield by 30-40% compared
                  to traditional fixed panels.
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-heading text-3xl text-text-dark mt-10 mb-4"
                >
                  Agrivoltaics: Farming Meets Solar
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-text-gray text-base leading-relaxed"
                >
                  One of the most exciting emerging trends is agrivoltaics &#8212; the
                  practice of installing solar panels above agricultural crops. This
                  dual-use approach not only generates clean energy but also provides
                  shade that can improve crop yields in hot climates, creating a
                  symbiotic relationship between food and energy production.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-text-dark text-base leading-relaxed mt-10"
                >
                  The future of solar technology is brighter than ever. With innovations
                  like perovskite tandems, AI optimization, and agrivoltaics entering the
                  mainstream, 2025 promises to be a landmark year for renewable energy.
                  For homeowners and businesses considering solar, there&apos;s never been a
                  better time to make the switch.
                </motion.p>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap gap-2 mt-10"
                >
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-beige text-text-gray text-xs font-sans font-medium rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Share Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 mt-8 pt-8 border-t border-[#e5e7eb]"
                >
                  <span className="text-text-gray text-sm font-sans">
                    Share this article:
                  </span>
                  {socialIcons.map(({ Icon, label }) => (
                    <button
                      key={label}
                      aria-label={`Share on ${label}`}
                      className="w-8 h-8 flex items-center justify-center border border-[#e5e7eb] rounded-full text-text-gray hover:bg-primary hover:border-primary hover:text-white transition-all duration-300"
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Sidebar Column (35%) */}
            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="lg:w-[35%] lg:pl-12"
            >
              {/* Search */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full bg-light-gray border border-[#e5e7eb] rounded-full px-5 py-3 pr-10 font-sans text-sm outline-none focus:border-primary transition-colors placeholder:text-text-gray"
                  />
                  <Search
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-gray"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-sans text-lg font-medium text-text-dark mb-4">
                  Categories
                </h4>
                <ul className="space-y-3">
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => navigate(`/blog?category=${cat}`)}
                          className="flex items-center justify-between w-full group"
                        >
                          <span className="text-text-gray text-base font-sans group-hover:text-primary transition-colors">
                            {cat}
                          </span>
                          <span className="text-[#9ca3af] text-sm font-sans">
                            {categoryCounts[cat] ?? 0}
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="mb-8">
                <h4 className="font-sans text-lg font-medium text-text-dark mb-4">
                  Recent Posts
                </h4>
                <div className="space-y-4">
                  {recentPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      to={`/blog/${rp.slug}`}
                      className="flex gap-4 group"
                    >
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-20 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div>
                        <h5 className="text-text-dark text-sm font-sans font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {rp.title}
                        </h5>
                        <p className="text-text-gray text-xs font-sans mt-1">
                          {rp.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Mini */}
              <div className="bg-light-gray rounded-xl p-6">
                <h4 className="font-sans text-lg font-medium text-text-dark mb-1">
                  Stay Updated
                </h4>
                <p className="text-text-gray text-sm font-sans mb-4">
                  Get weekly renewable energy tips
                </p>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full border border-[#e5e7eb] rounded-full px-4 py-2 font-sans text-sm outline-none focus:border-primary transition-colors placeholder:text-text-gray mb-2"
                />
                <button className="w-full bg-primary text-white font-sans font-medium text-sm rounded-full px-4 py-2.5 transition-all hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
                  Subscribe
                </button>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Related Posts ─── */}
      <section className="bg-light-gray py-20">
        <div className="px-5 md:px-8 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl lg:text-4xl text-text-dark">
              You Might Also <span className="italic text-primary">Like</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
          >
            {relatedPosts.map((rp) => (
              <motion.div key={rp.slug} variants={staggerItem}>
                <BlogCard post={rp} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
