import { Link } from 'react-router-dom'
import { ArrowRight, Search, Sparkles, Layout, ShoppingBag, Eye, Wand2 } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-32 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.08] animate-fade-in-up">
            See it. Find it.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-xl mx-auto animate-fade-in-up-delay-1">
            Find perfect pieces for your home
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
            <Link
              to="/imagine"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get started
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Feature showcase 1 */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-muted mb-6">
              <Eye size={14} />
              Visual Search
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Grab inspiration from anywhere
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Create and shop AI interiors or shop your own photos. Upload any image and instantly find matching products from millions of items across top retailers.
            </p>
            <Link
              to="/imagine"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mock visual */}
          <div className="relative">
            <div className="bg-gray-50 rounded-2xl aspect-[4/3] overflow-hidden border border-gray-100">
              <div className="p-8 h-full flex flex-col justify-center items-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-float">
                    <div className="w-full aspect-square bg-gradient-to-br from-amber-100 to-orange-50 rounded-lg mb-3" />
                    <div className="h-2 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-50 rounded w-1/2 mt-2" />
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg mb-3" />
                    <div className="h-2 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-50 rounded w-1/2 mt-2" />
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-float" style={{ animationDelay: '2s' }}>
                    <div className="w-full aspect-square bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg mb-3" />
                    <div className="h-2 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-50 rounded w-1/2 mt-2" />
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-float" style={{ animationDelay: '3s' }}>
                    <div className="w-full aspect-square bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg mb-3" />
                    <div className="h-2 bg-gray-100 rounded w-3/4" />
                    <div className="h-2 bg-gray-50 rounded w-1/2 mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature showcase 2 */}
      <section className="bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Mock canvas visual */}
            <div className="relative order-2 md:order-1">
              <div className="bg-white rounded-2xl aspect-[4/3] overflow-hidden border border-gray-100 shadow-sm">
                <div className="p-6 h-full flex flex-col">
                  {/* Canvas toolbar mock */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Layout size={14} className="text-muted" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Wand2 size={14} className="text-muted" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Search size={14} className="text-muted" />
                    </div>
                    <div className="flex-1" />
                    <div className="h-8 px-4 rounded-lg bg-primary flex items-center">
                      <span className="text-white text-xs font-medium">Save</span>
                    </div>
                  </div>
                  {/* Canvas area */}
                  <div className="flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center relative">
                    <div className="absolute top-6 left-6 w-28 h-28 bg-gradient-to-br from-amber-100 to-orange-50 rounded-xl shadow-sm" />
                    <div className="absolute top-10 right-10 w-24 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm" />
                    <div className="absolute bottom-8 left-1/3 w-32 h-20 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm" />
                    <span className="text-xs text-gray-300 z-10">Drag items here</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-muted mb-6">
                <Sparkles size={14} />
                AI Canvas
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Moodboard in an open canvas
              </h2>
              <p className="mt-5 text-muted leading-relaxed">
                Drag and drop millions of products. Explore ideas with AI. Create stunning moodboards and design spaces that bring your vision to life.
              </p>
              <Link
                to="/canvas"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get started
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Everything you need to design your space
          </h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Powerful AI tools that make interior design accessible to everyone.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Sparkles size={22} />,
              title: 'AI Interior Design',
              desc: 'Generate stunning room designs with AI. Choose your style, room type, and let AI do the rest.',
            },
            {
              icon: <Search size={22} />,
              title: 'Visual Search',
              desc: 'Upload any photo and instantly find matching products from millions of items.',
            },
            {
              icon: <Layout size={22} />,
              title: 'Open Canvas',
              desc: 'Create moodboards with drag-and-drop. Mix and match products to visualize your space.',
            },
            {
              icon: <ShoppingBag size={22} />,
              title: 'Shop Directly',
              desc: 'Find and purchase products directly from your designs. No more endless browsing.',
            },
            {
              icon: <Wand2 size={22} />,
              title: 'AI Restyle',
              desc: 'Transform your existing room photos with different design styles in seconds.',
            },
            {
              icon: <Eye size={22} />,
              title: 'High-Quality Output',
              desc: 'Magazine-worthy renders with superior resolution and photorealistic quality.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-primary mb-5 group-hover:bg-gray-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Ready to design your dream space?
          </h2>
          <p className="mt-4 text-gray-400 max-w-md mx-auto">
            Join millions of users who are transforming their homes with AI.
          </p>
          <Link
            to="/imagine"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-white text-primary text-sm font-medium rounded-full hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started for free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
