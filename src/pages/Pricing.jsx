import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    cta: 'Get started for free',
    highlight: false,
    features: [
      '10 images per month',
      '10 canvases',
      'Create 1 image at a time',
      'Access to community',
    ],
  },
  {
    name: 'Basic',
    price: { monthly: 12, yearly: 8 },
    cta: 'Get started',
    highlight: false,
    features: [
      '75 images per month',
      '100 canvases',
      'Multiple image variations',
      'AI Furnish & Restyle',
      'Community access',
    ],
  },
  {
    name: 'Plus',
    price: { monthly: 28, yearly: 20 },
    cta: 'Get started',
    highlight: true,
    badge: 'Popular',
    features: [
      '250 images per month',
      'Unlimited canvases',
      'Multiple image variations',
      'AI Furnish, Restyle, Edit, & Remove',
      'Community access',
      'Early feature access',
      'Priority support',
    ],
  },
  {
    name: 'Studio',
    price: { monthly: 48, yearly: 35 },
    cta: 'Get started',
    highlight: false,
    features: [
      '750 images per month',
      'Unlimited canvases',
      'Multiple image variations',
      'AI Furnish, Restyle, Edit, & Remove',
      'Community access',
      'Early feature access',
      'Priority support',
      'CEO call included',
    ],
  },
]

const faqs = [
  {
    q: 'What are image credits?',
    a: 'Image credits are used each time you generate an AI interior design image. Different plans come with different monthly credit allocations.',
  },
  {
    q: 'Do unused credits roll over?',
    a: 'Monthly credits do not roll over to the next month. However, Boost credits never expire and can be used anytime.',
  },
  {
    q: 'Can I change my plan?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    q: 'Can I shop products through Onton?',
    a: 'Yes! Onton integrates with millions of products from top retailers. You can find and purchase products directly from your AI-generated designs.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Our Free plan gives you 10 images per month at no cost, no credit card required. You can upgrade anytime to unlock more features.',
  },
  {
    q: 'What is the Boost option?',
    a: 'Boost lets you purchase 250 additional image credits for $24. These credits never expire and can be used with any plan.',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight animate-fade-in-up">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-muted animate-fade-in-up-delay-1">
          Start for free. Upgrade when you need more.
        </p>

        {/* Billing toggle */}
        <div className="mt-10 inline-flex items-center gap-3 bg-gray-100 rounded-full p-1 animate-fade-in-up-delay-2">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
              !annual ? 'bg-white shadow-sm text-primary' : 'text-muted'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
              annual ? 'bg-white shadow-sm text-primary' : 'text-muted'
            }`}
          >
            Yearly
            <span className="ml-1.5 text-xs text-emerald-600 font-medium">Save 30%</span>
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-7 rounded-2xl border transition-all ${
                plan.highlight
                  ? 'border-primary bg-white shadow-lg scale-[1.02]'
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">
                  ${annual ? plan.price.yearly : plan.price.monthly}
                </span>
                {plan.price.yearly > 0 && (
                  <span className="text-sm text-muted">/mo</span>
                )}
              </div>
              {annual && plan.price.yearly > 0 && (
                <p className="text-xs text-muted mt-1">billed annually</p>
              )}
              {plan.price.yearly === 0 && (
                <p className="text-xs text-muted mt-1">No credit card required</p>
              )}

              <Link
                to="/login"
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                  plan.highlight
                    ? 'bg-primary text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="mt-7 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Boost */}
        <div className="mt-10 p-7 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold">Need more credits?</h3>
            <p className="text-sm text-muted mt-1">
              Get 250 image credits for <strong className="text-primary">$24</strong>. Credits never expire.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all whitespace-nowrap"
          >
            Buy Boost
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
