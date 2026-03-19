import { Link } from 'react-router-dom'
import { LogoFull } from './Logo'

const quickLinks = [
  { name: 'Imagine', path: '/imagine' },
  { name: 'Create', path: '/canvas' },
  { name: 'AI interior design', path: '/ai-interior-design' },
  { name: 'Pricing', path: '/pricing' },
]

const companyLinks = [
  { name: 'About us', path: '/about-us' },
  { name: 'Research', path: '/blog' },
  { name: 'Community', path: '/community' },
]

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/onton.ai' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@onton.ai' },
]

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <LogoFull />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Next-generation search and discovery for your home.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Join us */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Join us</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Follow us</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Onton Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-xs text-muted hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
