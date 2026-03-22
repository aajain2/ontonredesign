import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronRight, Bookmark, Zap, MoreHorizontal } from 'lucide-react'
import { LogoIcon } from './Logo'
import SearchBar from './SearchBar'
import ProfileDropdown from './ProfileDropdown'
import { mockSurfaces, mockProducts } from '../data/mockData'

// Lazy-load heavy modals
const SettingsModal = lazy(() => import('./SettingsModal'))
const NewClusterModal = lazy(() => import('./NewClusterModal'))

const navLinks = [
  { name: 'For You', path: '/' },
  { name: 'Following', path: '/following' },
  { name: 'Explore', path: '/explore' },
]

// Pre-compute filtered data at module level (static data)
const libraryDreamboards = mockSurfaces.filter((s) => s.type === 'dreamboard')
const productCount = mockProducts.length

// Library dropdown (the overlapping cards icon)
function LibraryDropdown({ onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div ref={ref} className="absolute top-full right-0 mt-2 w-[300px] bg-[#F0EEEA] rounded-2xl shadow-xl border border-[#E5E2DD] py-3 z-50">
      {/* All Products */}
      <Link
        to="/profile?tab=elements"
        onClick={onClose}
        className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#E5E2DD] transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-[#E5E2DD] flex items-center justify-center flex-shrink-0">
          <Bookmark size={18} className="text-[#1A1A1A]" />
        </div>
        <span className="text-[14px] font-medium text-[#1A1A1A] flex-1">All Products</span>
        <span className="text-[13px] text-[#8A8580] bg-[#E5E2DD] rounded-lg px-2.5 py-0.5">{productCount}</span>
      </Link>

      {/* Divider */}
      <div className="border-t border-[#E5E2DD] my-2" />

      {/* Individual dreamboards */}
      {libraryDreamboards.slice(0, 4).map((board) => (
        <Link
          key={board.id}
          to={`/profile?tab=collections&surface=${board.id}`}
          onClick={onClose}
          className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#E5E2DD] transition-colors"
        >
          <div
            className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden"
            style={{
              background: board.thumbnails.length > 0
                ? `url(${board.thumbnails[0]}) center/cover no-repeat`
                : board.canvasColor || 'linear-gradient(135deg, #E5E2DD, #D5D2CD)',
            }}
          />
          <span className="text-[14px] text-[#1A1A1A]">{board.title}</span>
        </Link>
      ))}

      {/* Divider */}
      <div className="border-t border-[#E5E2DD] my-2" />

      {/* All Dreamboards */}
      <Link
        to="/profile?tab=collections"
        onClick={onClose}
        className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#E5E2DD] transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-[#E5E2DD] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="11" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="1" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
        <span className="text-[14px] text-[#1A1A1A] flex-1">All Dreamboards</span>
        <ChevronRight size={16} className="text-[#8A8580]" />
      </Link>

      {/* All Rooms */}
      <Link
        to="/profile?tab=collections"
        onClick={onClose}
        className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#E5E2DD] transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-[#E5E2DD] flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M2 16V7L10 2L18 7V16H2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="7" y="11" width="6" height="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
        <span className="text-[14px] text-[#1A1A1A] flex-1">All Rooms</span>
        <ChevronRight size={16} className="text-[#8A8580]" />
      </Link>
    </div>
  )
}

// Mock activity data
const mockActivity = [
  {
    id: 1,
    type: 'cluster',
    user: 'Kosi',
    avatar: '/images/kosi-avatar.jpg',
    text: 'made a new dreamboard called',
    target: 'Dorm Room',
    thumbnail: '/images/dorm-room.jpg',
    context: "You follow 1 of Kosi's dreamboards",
    time: '2d',
  },
  {
    id: 2,
    type: 'follow',
    user: 'onton',
    avatar: 'logo',
    text: 'followed you',
    target: null,
    thumbnail: null,
    context: null,
    time: '7mo',
  },
]

// Activity dropdown panel
function ActivityDropdown({ onClose }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[420px] bg-white rounded-2xl shadow-xl border border-[#E8E6E3] z-50 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px) scale(0.98)',
        transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'top right',
      }}
    >
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-[#EEEDEB]">
        <h2 className="text-[18px] text-center" style={{ fontFamily: '"Romie Trial", Georgia, serif', color: 'var(--text-primary)' }}>
          Activity
        </h2>
      </div>

      {/* Activity items */}
      <div className="py-2 max-h-[400px] overflow-y-auto">
        {mockActivity.map((item, i) => (
          <div
            key={item.id}
            className="px-6 py-4 hover:bg-[#F8F7F5] transition-colors cursor-pointer"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-4px)',
              transition: `opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${(i + 1) * 0.05}s, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${(i + 1) * 0.05}s`,
            }}
          >
            {item.context && (
              <p className="text-[13px] text-[#8A8580] mb-2">{item.context}</p>
            )}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {item.avatar === 'logo' ? (
                  <div className="w-11 h-11 rounded-full overflow-hidden">
                    <LogoIcon size={44} />
                  </div>
                ) : item.avatar ? (
                  <img src={item.avatar} alt={item.user} className="w-11 h-11 rounded-full object-cover" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#F0EEEA] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="5.5" cy="5.5" r="2" fill="#1A1A1A" />
                      <circle cx="14.5" cy="5.5" r="2" fill="#1A1A1A" />
                      <circle cx="5.5" cy="14.5" r="2" fill="#1A1A1A" />
                      <circle cx="14.5" cy="14.5" r="2" fill="#1A1A1A" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-[#1A1A1A] leading-snug">
                  <span className="font-semibold">{item.user}</span>
                  {' '}<span className="text-[#6B6560]">{item.text}</span>
                  {item.target && (
                    <>
                      {' '}<span className="font-semibold">{item.target}</span>
                    </>
                  )}
                </p>
                <p className="text-[13px] text-[#8A8580] mt-0.5">{item.time}</p>
              </div>

              {/* Thumbnail or action */}
              {item.thumbnail ? (
                <img src={item.thumbnail} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              ) : (
                <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#8A8580] hover:text-[#1A1A1A] transition-colors">
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Create menu items
function CreateMenu({ onClose, onNewCluster, onImport, onNewRoom }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger animation on next frame for smooth mount transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const items = [
    { title: 'New Dreamboard', desc: 'A collection of products and rooms', action: onNewCluster, icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3 14L7.5 10L11 13L14.5 9.5L19 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
    )},
    { title: 'New Room', desc: 'Design or furnish a room with products', action: onNewRoom, icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M3 18V8L11 3L19 8V18H3Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
    )},
    { title: 'Import', desc: 'From Pinterest or Arena', action: onImport, icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M7 7L11 3L15 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 13V17C4 18.1 4.9 19 6 19H16C17.1 19 18 18.1 18 17V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
    )},
  ]

  return (
    <div
      ref={ref}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] bg-[#F0EEEA] rounded-2xl shadow-xl border border-[#E5E2DD] p-2 z-50"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px) scale(0.98)',
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'top center',
        willChange: 'opacity, transform',
      }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          className="w-full flex items-center gap-4 px-4 py-4 hover:bg-[#E5E2DD] rounded-xl transition-colors text-left"
          onClick={item.action}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-6px)',
            transition: `opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`,
          }}
        >
          <div className="w-11 h-11 rounded-full bg-[#E0DDD8] flex items-center justify-center flex-shrink-0 text-[#6B6560]">
            {item.icon}
          </div>
          <div>
            <p className="text-[14px] font-medium text-[#1A1A1A]">{item.title}</p>
            <p className="text-[12px] text-[#8A8580]">{item.desc}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

export default function AppNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showCreate, setShowCreate] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showNewCluster, setShowNewCluster] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)
  const [showActivity, setShowActivity] = useState(false)

  useEffect(() => {
    const handler = () => setShowSettings(true)
    window.addEventListener('open-settings', handler)
    return () => window.removeEventListener('open-settings', handler)
  }, [])

  return (
    <header className="sticky top-0 z-50 pt-1" style={{ background: 'var(--bg-app)' }}>
      <div className="flex items-center h-[64px] px-[52px] gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden">
          <LogoIcon size={28} />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-0 flex-shrink-0">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === '/' && ['/', '/search'].includes(location.pathname))
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 text-[14px] transition-colors ${
                  isActive
                    ? 'font-semibold'
                    : 'hover:opacity-100'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Search bar (flexible center) */}
        <div className="flex-1 flex justify-center min-w-0">
          <SearchBar />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3.5 flex-shrink-0">
          {/* Create button */}
          <div className="relative">
            <button
              onClick={() => setShowCreate(!showCreate)}
              className="px-5 py-[7px] text-[13px] font-medium rounded-full transition-colors"
              style={{ background: 'var(--bg-button-dark)', color: 'var(--text-on-dark)' }}
            >
              Create
            </button>
            {showCreate && (
              <CreateMenu
                onClose={() => setShowCreate(false)}
                onNewCluster={() => {
                  setShowCreate(false)
                  setShowNewCluster(true)
                }}
                onNewRoom={() => {
                  setShowCreate(false)
                  navigate('/imagine-app')
                }}
                onImport={() => {
                  setShowCreate(false)
                  setShowSettings(true)
                }}
              />
            )}
          </div>

          {/* Activity (lightning) icon */}
          <div className="relative">
            <button
              onClick={() => setShowActivity(!showActivity)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
                showActivity
                  ? 'bg-[#1A1A1A] text-white'
                  : 'text-[#8A8580] hover:text-[#1A1A1A]'
              }`}
            >
              <Zap size={18} strokeWidth={1.8} fill={showActivity ? 'white' : 'none'} />
            </button>
            {showActivity && <ActivityDropdown onClose={() => setShowActivity(false)} />}
          </div>

          {/* Library icon */}
          <div className="relative">
            <button
              className="w-8 h-8 flex items-center justify-center text-[#8A8580] hover:text-[#1A1A1A] transition-colors"
              onClick={() => setShowLibrary(!showLibrary)}
            >
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="6" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="5" y="3" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-app)" />
                <rect x="8" y="0.5" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-app)" />
              </svg>
            </button>
            {showLibrary && <LibraryDropdown onClose={() => setShowLibrary(false)} />}
          </div>

          {/* User avatar + chevron */}
          <div className="relative flex items-center gap-1">
            <Link
              to="/profile"
              className="group flex items-center justify-center"
            >
              <div className={`rounded-full p-[3px] transition-all duration-150 ${
                location.pathname === '/profile'
                  ? 'ring-[2px] ring-[#1A1A1A]'
                  : 'group-hover:ring-[2px] group-hover:ring-[#E0DDD8]'
              }`}>
                <img src="/avatar.png" alt="Profile" className="w-8 h-8 rounded-full object-cover flex-shrink-0" width={32} height={32} fetchPriority="high" />
              </div>
            </Link>
            <button
              className="cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            >
              <ChevronDown size={15} className="text-[#8A8580] hover:text-[#1A1A1A] transition-colors" />
            </button>
            {showProfile && (
              <ProfileDropdown
                onClose={() => setShowProfile(false)}
                onOpenSettings={() => setShowSettings(true)}
              />
            )}
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        {showNewCluster && <NewClusterModal onClose={() => setShowNewCluster(false)} />}
      </Suspense>
    </header>
  )
}
