import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LogoFull } from './Logo'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Imagine', path: '/imagine' },
  { name: 'About', path: '/about-us' },
  { name: 'Careers', path: '/careers' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Research', path: '/blog' },
  { name: 'Community', path: '/community' },
  { name: 'AI Interior Design', path: '/ai-interior-design' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <LogoFull />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-100 ${
                  location.pathname === link.path
                    ? 'text-primary font-medium'
                    : 'text-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-5 py-2 text-sm font-medium bg-primary text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in-up">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-sm rounded-lg transition-colors hover:bg-gray-50 ${
                    location.pathname === link.path
                      ? 'text-primary font-medium bg-gray-50'
                      : 'text-muted'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 text-sm font-medium text-center bg-primary text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
