import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plus, ClipboardList, Sparkles, Menu, PanelLeftClose, Zap, Image, ArrowUpFromLine } from 'lucide-react'
import { LogoIcon } from './Logo'

// Cluster icon (clipboard with +)
function ClusterIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" className={className}>
      <rect x="4" y="3" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// Element icon (image with sparkle)
function ElementIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" className={className}>
      <rect x="3" y="3" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 15L7.5 11L11 14L14 11.5L19 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Import icon (arrow up from bracket)
function ImportIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M11 3V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 7L11 3L15 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13V17C4 18.1 4.9 19 6 19H16C17.1 19 18 18.1 18 17V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const navItems = [
  { icon: ClipboardList, label: 'Gather', path: '/gather' },
  { icon: Sparkles, label: 'Imagine', path: '/imagine-app' },
]

const textLinks = [
  { label: 'About', path: '/about-us' },
  { label: 'Careers', path: '/careers' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Research', path: '/blog' },
  { label: 'Community', path: '/community' },
  { label: 'AI Interior Design', path: '/ai-interior-design' },
]

const createMenuItems = [
  {
    icon: ClusterIcon,
    title: 'New Cluster',
    desc: 'A collection of elements',
  },
  {
    icon: ElementIcon,
    title: 'New Element',
    desc: 'Image, link, or note',
  },
  {
    icon: ImportIcon,
    title: 'Import',
    desc: 'From Pinterest or Arena',
  },
]

function CreateMenu({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute left-full top-0 ml-2 w-[280px] bg-[#F0EEEA] rounded-2xl shadow-xl border border-[#E5E2DD] py-3 z-50"
    >
      {createMenuItems.map((item, i) => {
        const Icon = item.icon
        return (
          <button
            key={i}
            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#E5E2DD] transition-colors text-left"
            onClick={onClose}
          >
            <div className="w-11 h-11 rounded-full bg-[#E0DDD8] flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-[#6B6560]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]">{item.title}</p>
              <p className="text-xs text-[#8A8580] mt-0.5">{item.desc}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const location = useLocation()

  if (!expanded) {
    return (
      <aside className="flex-shrink-0 w-[72px] h-screen sticky top-0 flex flex-col items-center py-4 z-40">
        {/* Logo */}
        <Link to="/" className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity">
          <LogoIcon size={48} />
        </Link>

        <div className="h-2" />

        {/* Create new */}
        <div className="relative">
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="w-12 h-12 rounded-xl bg-[#E0DDD8] flex items-center justify-center hover:bg-[#D5D2CD] transition-colors"
            title="Create new"
          >
            <Plus size={20} strokeWidth={1.8} />
          </button>
          {showCreate && <CreateMenu onClose={() => setShowCreate(false)} />}
        </div>

        <div className="h-2" />

        {/* Gather */}
        <Link
          to="/gather"
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            location.pathname === '/gather' ? 'bg-[#D5D2CD]' : 'bg-[#E0DDD8] hover:bg-[#D5D2CD]'
          }`}
          title="Gather"
        >
          <ClipboardList size={20} strokeWidth={1.8} />
        </Link>

        <div className="h-2" />

        {/* Menu / expand */}
        <button
          onClick={() => setExpanded(true)}
          className="w-12 h-12 rounded-xl bg-[#E0DDD8] flex items-center justify-center hover:bg-[#D5D2CD] transition-colors"
          title="Menu"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>

        <div className="flex-1" />

        {/* User avatar */}
        <div className="w-10 h-10 rounded-full bg-[#D5D2CD] flex items-center justify-center text-sm font-semibold text-[#6B6560] cursor-pointer hover:bg-[#CAC7C2] transition-colors" title="aayush">
          A
        </div>
      </aside>
    )
  }

  return (
    <aside className="flex-shrink-0 w-60 h-screen sticky top-0 flex flex-col py-4 px-3 z-40 bg-[#F5F4F2]">
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-4">
        <Link to="/" className="flex items-center gap-2">
          <LogoIcon size={24} />
          <span className="text-base font-semibold tracking-wide uppercase">NTON</span>
        </Link>
        <button
          onClick={() => setExpanded(false)}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#D5D2CD] transition-colors"
        >
          <PanelLeftClose size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* Create new button */}
      <div className="relative px-1 mb-1">
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-[#E0DDD8] transition-colors w-full"
        >
          <Plus size={18} strokeWidth={1.8} />
          Create new
        </button>
        {showCreate && <CreateMenu onClose={() => setShowCreate(false)} />}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-[#D5D2CD]' : 'hover:bg-[#E0DDD8]'
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Separator */}
      <div className="my-4 border-t border-[#D5D2CD]" />

      {/* Text links */}
      <nav className="flex flex-col gap-0.5">
        {textLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 text-sm transition-colors rounded-lg ${
              location.pathname === link.path
                ? 'text-[#1A1A1A] font-medium'
                : 'text-[#8A8580] hover:text-[#1A1A1A]'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom user */}
      <div className="mt-auto flex items-center gap-3 px-3 py-3">
        <div className="w-9 h-9 rounded-full bg-[#D5D2CD] flex items-center justify-center text-sm font-semibold text-[#6B6560]">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#1A1A1A]">aayush</span>
          <span className="text-xs text-[#8A8580] flex items-center gap-1">
            <Zap size={12} /> Free Plan
          </span>
        </div>
      </div>
    </aside>
  )
}
