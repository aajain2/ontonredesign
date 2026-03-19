import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowRight, Sparkles, Camera, ShoppingBag, Star, ChevronDown, ChevronUp } from 'lucide-react'

const steps = [
  {
    icon: <Sparkles size={24} />,
    title: 'Set your preferences',
    desc: 'Choose your room type, dimensions, and design style. Optionally upload a photo of your existing room.',
  },
  {
    icon: <Camera size={24} />,
    title: 'Generate designs',
    desc: 'Our AI creates magazine-worthy room designs with superior resolution and photorealistic quality.',
  },
  {
    icon: <ShoppingBag size={24} />,
    title: 'Shop the look',
    desc: 'Find and purchase every product in your design. No more endless browsing across multiple sites.',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Homeowner',
    text: 'Onton completely changed how I approach decorating. I found my perfect living room setup in minutes instead of months.',
    rating: 5,
  },
  {
    name: 'James K.',
    role: 'Interior Designer',
    text: 'As a professional designer, this tool is invaluable for quickly creating mood boards and finding products for clients.',
    rating: 5,
  },
  {
    name: 'Lisa R.',
    role: 'Realtor',
    text: 'I use Onton to stage virtual rooms for listings. It\'s incredibly fast and the results look amazing.',
    rating: 5,
  },
]

const faqs = [
  { q: 'What is AI interior design?', a: 'AI interior design uses artificial intelligence to generate photorealistic room designs based on your preferences. You choose the room type, style, and dimensions, and our AI creates stunning visualizations.' },
  { q: 'How accurate are the designs?', a: 'Our AI generates highly realistic designs with accurate proportions, lighting, and style consistency. The output quality rivals professional interior design renderings.' },
  { q: 'Can I use my own room photos?', a: 'Yes! You can upload photos of your existing rooms and our AI will restyle them in your chosen design style while maintaining the room\'s structure.' },
  { q: 'Is it free to use?', a: 'Onton offers a free plan with 10 AI-generated images per month. Paid plans offer more images, higher quality, and additional features like AI Furnish, Restyle, and Edit.' },
  { q: 'Can I buy the products shown?', a: 'Yes! Every AI-generated design is linked to real, purchasable products. You can shop the exact items or find similar alternatives directly through Onton.' },
  { q: 'Who is this for?', a: 'Onton is designed for anyone — whether you\'re a homeowner redecorating, a professional interior designer, or a realtor staging properties. No design experience needed.' },
  { q: 'How is this different from other tools?', a: 'Onton combines the highest quality AI image generation with integrated product search. Unlike other tools, you can go from inspiration to purchase in one seamless experience.' },
  { q: 'Is my data secure?', a: 'Yes. We take data privacy seriously. Your uploaded images and designs are encrypted and never shared with third parties.' },
  { q: 'Can I save and share my designs?', a: 'Paid plans include design history, so you can save, revisit, and share your AI-generated rooms anytime.' },
  { q: 'What styles are available?', a: 'We offer over 15 design styles including Minimalist, Scandinavian, Mid-century Modern, Industrial, Bohemian, Art Deco, and many more.' },
  { q: 'How many images can I generate?', a: 'Free users get 10 images per month. Paid plans range from 75 to 750 images per month, with the option to purchase additional credits.' },
  { q: 'Can I edit generated images?', a: 'Yes! Our Plus and Studio plans include AI Edit and Remove features, letting you modify specific elements of your generated designs.' },
  { q: 'What room types are supported?', a: 'We support all major room types including living rooms, bedrooms, kitchens, bathrooms, dining rooms, home offices, patios, and more.' },
  { q: 'Do I need design experience?', a: 'Not at all. Onton is built to be intuitive for everyone. Just select your preferences and let the AI handle the rest.' },
]

export default function AIInteriorDesign() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] animate-fade-in-up">
            Stop Scrolling.<br />Start Designing.
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto animate-fade-in-up-delay-1">
            The best AI interior design tool. Create stunning, photorealistic room designs and shop the products instantly.
          </p>
          <Link
            to="/imagine"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98] animate-fade-in-up-delay-2"
          >
            Try Imagine — it's free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* USPs */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { title: 'High-Quality Output', desc: 'Superior resolution and realism compared to any other tool on the market.' },
            { title: 'Free AI Interior Design', desc: 'Generate multiple designs per week at no cost. No credit card required.' },
            { title: 'Shopping Made Simple', desc: 'Integrated product discovery eliminates hunting across multiple sites.' },
          ].map((usp, i) => (
            <div key={i} className="p-7 rounded-2xl bg-gray-50 border border-gray-100 text-center">
              <h3 className="font-semibold mb-2">{usp.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{usp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-14">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                  {step.icon}
                </div>
                <div className="text-xs font-medium text-muted uppercase tracking-wider mb-2">
                  Step {i + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/imagine"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Try Imagine — it's free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Demo visuals */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-14">
          See it in action
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Settings', gradient: 'from-violet-50 to-purple-50', desc: 'Choose your room preferences' },
            { title: 'Generation', gradient: 'from-amber-50 to-orange-50', desc: 'AI creates your design' },
            { title: 'Shopping', gradient: 'from-emerald-50 to-teal-50', desc: 'Find & buy every product' },
          ].map((demo, i) => (
            <div key={i} className="group">
              <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${demo.gradient} border border-gray-100 flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow`}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mx-auto mb-3 shadow-sm">
                    <Sparkles size={20} className="text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400">{demo.title}</p>
                </div>
              </div>
              <h3 className="font-semibold text-sm">{demo.title}</h3>
              <p className="text-sm text-muted mt-1">{demo.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-14">
            What our users say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-7 bg-white rounded-2xl border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-5">"{t.text}"</p>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            For everyone
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Whether you have design experience or not, Onton empowers anyone to create professional-looking interiors. Homeowners, professional decorators, and realtors all use Onton to bring spaces to life.
          </p>
          <Link
            to="/imagine"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
          <h2 className="text-3xl font-semibold tracking-tight text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp size={18} className="text-muted flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-muted flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
