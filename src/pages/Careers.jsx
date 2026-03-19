import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Briefcase, ExternalLink } from 'lucide-react'

const jobs = [
  {
    title: 'Founding Software Engineer',
    type: 'Full-time',
    location: 'San Francisco, CA',
    desc: 'Build core product features and infrastructure as an early engineering hire. Work across the stack to ship impactful features fast.',
  },
  {
    title: 'Staff Research Engineer',
    type: 'Full-time',
    location: 'San Francisco, CA',
    desc: 'Push the boundaries of AI-powered search and visual understanding. Lead research initiatives in neurosymbolic AI and computer vision.',
  },
  {
    title: 'Create your own role',
    type: 'Full-time',
    location: 'San Francisco, CA',
    desc: 'Don\'t see a role that fits? We\'re always looking for exceptional people. Tell us how you\'d contribute to our mission.',
  },
]

const highlights = [
  { label: 'Founded', value: 'Late 2023' },
  { label: 'Users', value: 'Millions' },
  { label: 'Funding', value: '$10M+' },
  { label: 'Team', value: 'San Francisco' },
]

export default function Careers() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] animate-fade-in-up">
              Help people make decisions they love, instantly
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed animate-fade-in-up-delay-1">
              We're transforming shopping experiences, reducing typical product discovery timelines from 79 days to under 1 day.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center"
            >
              <div className="text-2xl font-semibold">{item.value}</div>
              <div className="text-sm text-muted mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About the team */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            About the team
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            We recently developed a neurosymbolic AI agent technology that dramatically improves search accuracy. Our leadership includes professionals from Google, Amazon, OpenAI, Stitch Fix, and Shopify.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            We've raised over $10M in funding from top-tier venture firms and have grown exponentially to serve millions of users since our founding in late 2023.
          </p>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-14">
            Open roles
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-gray-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted leading-relaxed">
                      {job.desc}
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all whitespace-nowrap flex-shrink-0 self-start sm:self-center">
                    Apply
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Don't see the right role?
        </h2>
        <p className="mt-4 text-muted max-w-md mx-auto">
          We're always looking for exceptional talent. Reach out and tell us how you'd contribute.
        </p>
        <a
          href="mailto:careers@onton.com"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Get in touch
          <ArrowRight size={16} />
        </a>
      </section>
    </div>
  )
}
