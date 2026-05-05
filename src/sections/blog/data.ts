export interface BlogPost {
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  slug: string
  author: string
  authorAvatar: string
  readTime: string
}

export const blogPosts: BlogPost[] = [
  {
    title: 'The Future of Solar Technology in 2025: Breakthroughs You Need to Know',
    category: 'Technology',
    date: 'December 15, 2024',
    excerpt:
      'From perovskite tandem cells achieving 33% efficiency to AI-driven solar optimization, 2025 is shaping up to be a transformative year for solar technology.',
    image: '/blog-1.jpg',
    slug: 'future-of-solar-technology-2025',
    author: 'Marcus Webb',
    authorAvatar: '/testimonial-avatar-1.jpg',
    readTime: '8 min read',
  },
  {
    title: 'How to Maximize Your Solar Investment',
    category: 'Guides',
    date: 'December 10, 2024',
    excerpt:
      'Learn expert strategies to get the most out of your solar panel system, from optimal placement to smart energy storage solutions.',
    image: '/blog-2.jpg',
    slug: 'maximize-solar-investment',
    author: 'Sarah Chen',
    authorAvatar: '/testimonial-avatar-2.jpg',
    readTime: '6 min read',
  },
  {
    title: 'Wind vs. Solar: Choosing the Right Renewable Energy',
    category: 'Insights',
    date: 'December 5, 2024',
    excerpt:
      'A comprehensive comparison of wind and solar energy to help you determine which renewable solution fits your property and budget.',
    image: '/blog-3.jpg',
    slug: 'wind-vs-solar',
    author: 'David Park',
    authorAvatar: '/testimonial-avatar-3.jpg',
    readTime: '7 min read',
  },
  {
    title: 'Understanding Solar Panel Warranties',
    category: 'Guides',
    date: 'November 28, 2024',
    excerpt:
      'Navigate the complex world of solar panel warranties with our comprehensive guide. Learn what to look for and how to protect your investment.',
    image: '/blog-4.jpg',
    slug: 'understanding-solar-panel-warranties',
    author: 'Marcus Webb',
    authorAvatar: '/testimonial-avatar-1.jpg',
    readTime: '5 min read',
  },
  {
    title: 'The Rise of Community Solar Gardens',
    category: 'News',
    date: 'November 22, 2024',
    excerpt:
      'Community solar gardens are making renewable energy accessible to renters and apartment dwellers across the country.',
    image: '/blog-5.jpg',
    slug: 'community-solar-gardens',
    author: 'Sarah Chen',
    authorAvatar: '/testimonial-avatar-2.jpg',
    readTime: '4 min read',
  },
  {
    title: 'Solar Power for Small Businesses: A Complete Guide',
    category: 'Guides',
    date: 'November 15, 2024',
    excerpt:
      'Everything small business owners need to know about transitioning to solar power, from financing options to ROI calculations.',
    image: '/blog-6.jpg',
    slug: 'solar-power-small-businesses',
    author: 'David Park',
    authorAvatar: '/testimonial-avatar-3.jpg',
    readTime: '9 min read',
  },
  {
    title: '2024 Renewable Energy Tax Credits Explained',
    category: 'Insights',
    date: 'November 8, 2024',
    excerpt:
      'A detailed breakdown of federal and state tax incentives for renewable energy installations in 2024 and beyond.',
    image: '/blog-1.jpg',
    slug: 'renewable-energy-tax-credits-2024',
    author: 'Marcus Webb',
    authorAvatar: '/testimonial-avatar-1.jpg',
    readTime: '6 min read',
  },
  {
    title: 'Battery Storage: The Key to Energy Independence',
    category: 'Technology',
    date: 'November 1, 2024',
    excerpt:
      'Home battery systems are becoming more affordable and efficient. Discover how they can help you achieve true energy independence.',
    image: '/blog-2.jpg',
    slug: 'battery-storage-energy-independence',
    author: 'Sarah Chen',
    authorAvatar: '/testimonial-avatar-2.jpg',
    readTime: '7 min read',
  },
  {
    title: '5 Signs Your Solar Panels Need Maintenance',
    category: 'Guides',
    date: 'October 25, 2024',
    excerpt:
      'Keep your solar system running at peak efficiency. Learn the warning signs that indicate it is time for professional maintenance.',
    image: '/blog-3.jpg',
    slug: 'signs-solar-panels-need-maintenance',
    author: 'David Park',
    authorAvatar: '/testimonial-avatar-3.jpg',
    readTime: '5 min read',
  },
]

export const categories = ['All', 'Technology', 'Guides', 'Insights', 'News']

export const categoryCounts: Record<string, number> = {
  Technology: 12,
  Guides: 8,
  Insights: 6,
  News: 4,
}

export const relatedPosts = [
  blogPosts[1],
  blogPosts[4],
  blogPosts[8],
]

export const recentPosts = [
  blogPosts[1],
  blogPosts[2],
  blogPosts[3],
]

export const tags = [
  'Solar Technology',
  'Renewable Energy',
  '2025 Trends',
  'Perovskite',
  'AI',
]
