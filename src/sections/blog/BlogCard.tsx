import { Link } from 'react-router'
import type { BlogPost } from './data'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl overflow-hidden border border-[#e5e7eb] group cursor-pointer">
      <Link to={`/blog/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="px-6 pt-5 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-primary text-white text-xs font-sans font-semibold rounded-full px-3 py-1">
            {post.category}
          </span>
          <span className="text-text-gray text-xs font-sans">{post.date}</span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-sans text-lg font-medium text-text-dark group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-text-gray text-sm leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </article>
  )
}
