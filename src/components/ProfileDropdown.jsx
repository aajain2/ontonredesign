import { useState, useRef, useEffect } from 'react'
import { Sun, Moon, Monitor, Check } from 'lucide-react'
import PremiumModal from './PremiumModal'
import { setTheme as applyTheme, getTheme } from '../theme.js'

const menuItems = [
  'Settings',
  'Watch tutorial',
  'Customize feed',
  'Get iOS app',
  'Contact us',
]

export default function ProfileDropdown({ onClose, onOpenSettings }) {
  const ref = useRef(null)
  const [showPremium, setShowPremium] = useState(false)
  const [theme, setTheme] = useState(getTheme)
  const [gridSize, setGridSize] = useState('medium')

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  if (showPremium) {
    return <PremiumModal onClose={() => { setShowPremium(false); onClose() }} />
  }

  return (
    <div
      ref={ref}
      className="absolute top-full right-0 mt-2 w-[280px] z-50"
    >
      {/* Main card */}
      <div className="bg-[#EEEDEB] rounded-2xl shadow-xl border border-[#E5E2DD] overflow-hidden">
        {/* Avatar + name + upgrade */}
        <div className="flex flex-col items-center pt-7 pb-5 px-5">
          <img src="/avatar.png" alt="Profile" className="w-[72px] h-[72px] rounded-full object-cover mb-3" />
          <h3
            className="text-[18px] text-[#1A1A1A] mb-2.5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Aayush
          </h3>
          {/* Upgrade button with purple glow */}
          <button
            onClick={() => setShowPremium(true)}
            className="relative px-5 py-1.5 bg-white text-[13px] font-semibold text-[#1A1A1A] rounded-full shadow-sm hover:shadow-md transition-shadow"
            style={{
              boxShadow: '0 0 16px 4px rgba(147, 112, 219, 0.35), 0 1px 3px rgba(0,0,0,0.08)',
            }}
          >
            Upgrade
          </button>
        </div>

        {/* Menu items */}
        <div className="px-3 pb-2">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'Settings') {
                  onClose()
                  onOpenSettings()
                } else {
                  onClose()
                }
              }}
              className="w-full text-left px-4 py-3 text-[15px] text-[#1A1A1A] rounded-xl hover:bg-[#E5E2DD] transition-colors"
            >
              {item}
            </button>
          ))}
          <button
            onClick={onClose}
            className="w-full text-left px-4 py-3 text-[15px] text-[#1A1A1A] rounded-xl hover:bg-[#E5E2DD] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="mt-2 bg-[#EEEDEB] rounded-2xl shadow-xl border border-[#E5E2DD] overflow-hidden">
        {/* Theme row */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E2DD]">
          <span className="text-[14px] font-medium text-[#1A1A1A]">Theme</span>
          <div className="flex items-center bg-[#E5E2DD] rounded-full p-0.5">
            {[
              { id: 'light', icon: <Sun size={15} /> },
              { id: 'dark', icon: <Moon size={15} /> },
              { id: 'system', icon: <Monitor size={15} /> },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setTheme(opt.id); applyTheme(opt.id) }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  theme === opt.id
                    ? 'bg-white shadow-sm text-[#1A1A1A]'
                    : 'text-[#8A8580] hover:text-[#1A1A1A]'
                }`}
              >
                {opt.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Size row */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-[14px] font-medium text-[#1A1A1A]">Grid Size</span>
          <div className="flex items-center bg-[#E5E2DD] rounded-full p-0.5">
            {[
              { id: 'small', bars: 1 },
              { id: 'medium', bars: 2 },
              { id: 'large', bars: 3 },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setGridSize(opt.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center gap-[2px] transition-all ${
                  gridSize === opt.id
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-[#DAD7D2]'
                }`}
              >
                {Array.from({ length: opt.bars }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[3px] h-[14px] rounded-full ${
                      gridSize === opt.id ? 'bg-[#1A1A1A]' : 'bg-[#8A8580]'
                    }`}
                  />
                ))}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
