import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    title: 'How Neurosymbolic AI is Changing Product Search',
    excerpt: 'Our latest research on combining neural networks with symbolic reasoning to dramatically improve search accuracy for home products.',
    date: 'Mar 12, 2026',
    readTime: '8 min read',
    category: 'Research',
    gradient: 'from-violet-50 to-purple-50',
  },
  {
    title: 'The Future of Visual Search in Home Design',
    excerpt: 'Exploring how computer vision and AI are transforming the way people discover and shop for furniture and decor.',
    date: 'Mar 5, 2026',
    readTime: '6 min read',
    category: 'AI',
    gradient: 'from-blue-50 to-indigo-50',
  },
  {
    title: 'Behind the Scenes: Building Onton Imagine',
    excerpt: 'A deep dive into the technology behind our AI interior design tool and how we achieve photorealistic quality.',
    date: 'Feb 20, 2026',
    readTime: '10 min read',
    category: 'Engineering',
    gradient: 'from-amber-50 to-orange-50',
  },
  {
    title: 'Design Trends 2026: AI-Powered Homes',
    excerpt: 'How AI tools are influencing interior design trends and making professional design accessible to everyone.',
    date: 'Feb 10, 2026',
    readTime: '5 min read',
    category: 'Trends',
    gradient: 'from-emerald-50 to-teal-50',
  },
  {
    title: 'Scaling Visual Search to Millions of Products',
    excerpt: 'The engineering challenges and solutions behind indexing and searching millions of home products in real-time.',
    date: 'Jan 28, 2026',
    readTime: '12 min read',
    category: 'Engineering',
    gradient: 'from-rose-50 to-pink-50',
  },
  {
    title: 'User Research: How People Make Home Decisions',
    excerpt: 'Insights from our research into the 79-day shopping journey and how technology can compress it.',
    date: 'Jan 15, 2026',
    readTime: '7 min read',
    category: 'Research',
    gradient: 'from-cyan-50 to-sky-50',
  },
]

export default function Blog() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight animate-fade-in-up">
            Research
          </h1>
          <p className="mt-4 text-lg text-muted animate-fade-in-up-delay-1">
            Insights, research, and engineering updates from the Onton team.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article
              key={i}
              className="group rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className={`aspect-[16/9] bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <span className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-muted">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-semibold leading-snug mb-2 group-hover:text-gray-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Read more
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
