import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const pressLogos = [
  'TechCrunch',
  'Business Insider',
  'Bessemer',
  'Forbes',
  'ProductHunt',
]

const values = [
  {
    title: 'Move fast',
    desc: 'We ship quickly and iterate based on real feedback. Speed is a feature.',
  },
  {
    title: 'User obsessed',
    desc: 'Every decision starts and ends with what makes our users\' lives better.',
  },
  {
    title: 'Think big',
    desc: 'We\'re building the future of how people discover and shop for their homes.',
  },
  {
    title: 'Stay curious',
    desc: 'We push the boundaries of AI and design to create magical experiences.',
  },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] animate-fade-in-up">
              What if you could find the right product, instantly, every single time?
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed animate-fade-in-up-delay-1">
              Shoppers currently spend approximately 79 days across multiple sites making purchase decisions, with this time continuing to increase. We cut through the noise of browsing with clarity, confidence, and speed.
            </p>
          </div>
        </div>
      </section>

      {/* Hero image placeholder */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 aspect-[21/9] flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-sm">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="#0D0D0D" strokeWidth="2" />
                <circle cx="16" cy="16" r="5" fill="#0D0D0D" />
              </svg>
            </div>
            <p className="text-sm text-muted">Making decisions easier, every day</p>
          </div>
        </div>
      </section>

      {/* Press logos */}
      <section className="border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <p className="text-center text-xs font-medium text-muted uppercase tracking-widest mb-8">
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {pressLogos.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold text-gray-300 hover:text-gray-400 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Join us to build the next generation of product search
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              We're a scrappy, high-velocity team of researchers, engineers, and designers. Pioneer Winners, On Deck Fellows and Stanford Grads who all care deeply about changing the way people make decisions online.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              A tight-knit San Francisco-based team pushing the boundaries of AI-powered search and discovery.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              We're hiring
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl aspect-[4/3] flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 p-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-full bg-white/80 shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-14">
            Our values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-4">
                  <span className="text-lg font-semibold text-muted">{i + 1}</span>
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Ready to transform your space?
        </h2>
        <p className="mt-4 text-muted max-w-md mx-auto">
          Join thousands of users discovering their perfect home with AI.
        </p>
        <Link
          to="/imagine"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get started
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
