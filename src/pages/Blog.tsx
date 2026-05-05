import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { blogPosts, categories } from '../sections/blog/data'
import BlogCard from '../sections/blog/BlogCard'

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
}

const POSTS_PER_PAGE = 9

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  // Featured post is the first post of the current page
  const featuredPost = paginatedPosts[0]
  const remainingPosts = paginatedPosts.slice(1)

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ─── Section 1: Hero ─── */}
      <section className="bg-dark-green pt-32 pb-16 min-h-[45vh] flex items-center justify-center">
        <div className="px-5 md:px-8 lg:px-16 xl:px-20 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-primary uppercase text-xs font-sans font-medium tracking-widest mb-4"
          >
            Insights &amp; News
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-display text-white"
          >
            Our <span className="italic text-primary">Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/70 text-base font-sans leading-relaxed max-w-lg mx-auto mt-4"
          >
            Stay informed with the latest trends, tips, and insights from the world
            of renewable energy
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white/40 text-sm font-sans mt-6"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>{' '}
            / Blog
          </motion.p>
        </div>
      </section>

      {/* ─── Section 2: Blog Grid ─── */}
      <section className="bg-light-gray py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-16 xl:px-20">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-sans text-sm font-medium rounded-full px-5 py-2 transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-gray border border-[#e5e7eb] hover:text-text-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-xl overflow-hidden mb-12"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 aspect-[16/9] lg:aspect-auto overflow-hidden">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  </Link>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary text-white text-xs font-sans font-semibold rounded-full px-3 py-1">
                      {featuredPost.category}
                    </span>
                    <span className="text-text-gray text-xs font-sans">
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl lg:text-3xl text-text-dark mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-text-gray text-base leading-relaxed mb-5">
                    {featuredPost.excerpt}
                  </p>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-sans font-medium group"
                  >
                    Read Article
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {remainingPosts.map((post) => (
              <motion.div key={post.slug} variants={staggerItem}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mt-16"
            >
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-[#e5e7eb] rounded-full text-text-gray hover:text-text-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-sans text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'text-text-gray hover:text-text-dark'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-[#e5e7eb] rounded-full text-text-gray hover:text-text-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── Section 3: Newsletter CTA ─── */}
      <section className="bg-dark-green py-20">
        <div className="px-5 md:px-8 lg:px-16 xl:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <h2 className="font-heading text-3xl lg:text-4xl text-white">
                Get the Latest{' '}
                <span className="italic text-primary">Updates</span>
              </h2>
              <p className="text-white/60 text-base font-sans leading-relaxed mt-4">
                Subscribe to our newsletter for weekly insights on renewable energy,
                exclusive tips, and early access to our latest offers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="lg:w-1/2 w-full"
            >
              <div className="relative max-w-md lg:ml-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-[#162B4D] border border-[#162B4D] text-white rounded-full px-6 py-4 pr-32 font-sans text-sm outline-none focus:border-primary transition-colors placeholder:text-white/40"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white font-sans font-medium text-sm rounded-full px-5 py-2.5 transition-all hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
                  Subscribe
                </button>
              </div>
              <p className="text-white/30 text-xs font-sans mt-3">
                No spam, unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
