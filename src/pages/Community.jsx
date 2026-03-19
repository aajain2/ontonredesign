import { Link } from 'react-router-dom'
import { ArrowRight, Users, MessageSquare, Heart, Share2 } from 'lucide-react'

const featuredDesigns = [
  { author: 'Alex T.', style: 'Minimalist Living Room', likes: 234, gradient: 'from-gray-50 to-slate-50' },
  { author: 'Maria S.', style: 'Bohemian Bedroom', likes: 189, gradient: 'from-amber-50 to-orange-50' },
  { author: 'Jordan K.', style: 'Scandinavian Kitchen', likes: 312, gradient: 'from-blue-50 to-indigo-50' },
  { author: 'Priya M.', style: 'Mid-century Office', likes: 156, gradient: 'from-emerald-50 to-teal-50' },
  { author: 'Sam W.', style: 'Industrial Loft', likes: 278, gradient: 'from-stone-50 to-zinc-50' },
  { author: 'Elena R.', style: 'Coastal Bathroom', likes: 201, gradient: 'from-cyan-50 to-sky-50' },
  { author: 'David L.', style: 'Art Deco Dining', likes: 143, gradient: 'from-violet-50 to-purple-50' },
  { author: 'Nina C.', style: 'Japanese Living Room', likes: 267, gradient: 'from-rose-50 to-pink-50' },
]

export default function Community() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight animate-fade-in-up">
            Community
          </h1>
          <p className="mt-4 text-lg text-muted max-w-lg mx-auto animate-fade-in-up-delay-1">
            Get inspired by designs from our community of creators and designers.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: <Users size={22} />, label: 'Members', value: '50K+' },
            { icon: <MessageSquare size={22} />, label: 'Designs shared', value: '200K+' },
            { icon: <Heart size={22} />, label: 'Likes given', value: '1M+' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center mx-auto mb-3 text-muted">
                {stat.icon}
              </div>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured designs */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
          Featured designs
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDesigns.map((design, i) => (
            <div key={i} className="group rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer">
              <div className={`aspect-square bg-gradient-to-br ${design.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                  <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition">
                      <Heart size={16} />
                    </button>
                    <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium">{design.style}</h3>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs text-muted">by {design.author}</span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Heart size={12} className="fill-current" />
                    {design.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            Join the community
          </h2>
          <p className="mt-3 text-gray-400 max-w-md mx-auto">
            Share your designs, get feedback, and discover inspiration from thousands of creators.
          </p>
          <Link
            to="/imagine"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-white text-primary text-sm font-medium rounded-full hover:bg-gray-100 transition-all"
          >
            Start designing
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
