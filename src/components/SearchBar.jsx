import { useState, useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, ArrowUpRight, Link as LinkIcon } from 'lucide-react'

const placeholders = [
  "Try \u2018mid-century modern sofa\u2019",
  "Try \u2018japandi living room\u2019",
  "Try \u2018brass pendant lighting\u2019",
  "Try \u2018cozy reading nook ideas\u2019",
  "Try \u2018terracotta kitchen tiles\u2019",
  "Try \u2018scandinavian bedroom\u2019",
  "Try \u2018luxury product packaging\u2019",
  "Try \u2018marble bathroom vanity\u2019",
  "Try \u2018bohemian patio design\u2019",
  "Try \u2018minimalist dining table\u2019",
  "Try \u2018velvet accent chair\u2019",
  "Try \u2018coastal home decor\u2019",
  "Try \u2018women in history\u2019",
  "Try \u2018celestial maps\u2019",
]

const recentSearches = [
  'interior design',
  'living room',
  'bedroom',
  'room design',
  'modern kitchen',
]

const trendingTopics = [
  'packaging',
  'typography',
  'wabi sabi',
  'branding',
  'interior design',
  'issey miyake',
  'brutalism',
  'portals',
  'golden hour',
  'eerie forests',
]

const colorSuggestions = [
  { hex: '#601515' },
  { hex: '#57612C' },
  { hex: '#949494' },
  { hex: '#325788' },
  { hex: '#2A9D8F' },
  { hex: '#BEB5AB' },
  { hex: '#A67A19' },
  { hex: '#CB1E1E' },
  { hex: '#333333' },
]

// ── Icons ──

function SparkleIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M9 1.5L10.3 6.7L15.5 9L10.3 11.3L9 16.5L7.7 11.3L2.5 9L7.7 6.7L9 1.5Z" fill="currentColor" />
      <path d="M14.5 2L15.1 4L17 4.5L15.1 5L14.5 7L13.9 5L12 4.5L13.9 4L14.5 2Z" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function ViewfinderIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M3 7V4.5C3 3.67 3.67 3 4.5 3H7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 3H17.5C18.33 3 19 3.67 19 4.5V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 15V17.5C19 18.33 18.33 19 17.5 19H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 19H4.5C3.67 19 3 18.33 3 17.5V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 3.5L16.2 5.5L18 6L16.2 6.5L15.5 8.5L14.8 6.5L13 6L14.8 5.5L15.5 3.5Z" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

function PaletteIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" className={className}>
      <circle cx="11" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.5" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.5" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14.5" cy="14" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

// ── Panels ──

function VisualSearchPanel() {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-[#EEEDEB] rounded-[16px] z-50 p-5">
      <div className="border-2 border-dashed border-[#D5D2CD] rounded-2xl p-8 flex flex-col items-center justify-center min-h-[220px]">
        <div className="bg-[#E8E7E5] rounded-full px-5 py-2.5 flex items-center gap-2.5 mb-5">
          <ViewfinderIcon size={20} className="text-[#1A1A1A]" />
          <span className="text-[14px] font-medium text-[#1A1A1A]">Visual Search</span>
        </div>
        <p className="text-[14px] text-[#727170]">
          Drag an image here or{' '}
          <button className="text-[#1A1A1A] underline underline-offset-2 font-medium">upload a file</button>
        </p>
      </div>
      <div className="flex items-center gap-4 my-5">
        <div className="flex-1 border-t border-[#D5D2CD]" />
        <span className="text-xs text-[#727170] uppercase tracking-wider">OR</span>
        <div className="flex-1 border-t border-[#D5D2CD]" />
      </div>
      <div className="bg-[#E8E7E5] rounded-full px-5 py-3.5 flex items-center gap-3">
        <LinkIcon size={18} className="text-[#727170] flex-shrink-0" />
        <input type="text" placeholder="Paste image URL" className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#727170] text-[#1A1A1A]" />
      </div>
    </div>
  )
}

function ColorPickerPanel({ onSearch }) {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height
    const base = ctx.createLinearGradient(0, 0, w, 0)
    base.addColorStop(0, '#ffffff')
    base.addColorStop(1, '#ff0000')
    ctx.fillStyle = base
    ctx.fillRect(0, 0, w, h)
    const dark = ctx.createLinearGradient(0, 0, 0, h)
    dark.addColorStop(0, 'rgba(0,0,0,0)')
    dark.addColorStop(1, '#000000')
    ctx.fillStyle = dark
    ctx.fillRect(0, 0, w, h)
  }, [])

  function handleCanvasClick(e) {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const pixel = ctx.getImageData(
      (e.clientX - rect.left) * (canvas.width / rect.width),
      (e.clientY - rect.top) * (canvas.height / rect.height), 1, 1
    ).data
    setSelectedColor('#' + [pixel[0], pixel[1], pixel[2]].map(c => c.toString(16).padStart(2, '0')).join(''))
  }

  return (
    <div className="absolute top-full right-0 mt-1 w-[280px] bg-[#EEEDEB] rounded-[16px] z-50 p-4">
      <canvas ref={canvasRef} width={252} height={180} className="w-full h-[180px] cursor-crosshair rounded-xl" onClick={handleCanvasClick} />
      <div className="flex justify-center my-3">
        <span className="text-[13px] text-[#727170] bg-[#E8E7E5] rounded-lg px-3 py-1">{selectedColor}</span>
      </div>
      <div className="w-full h-3 rounded-full mb-4" style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }} />
      <button onClick={() => onSearch(selectedColor)} className="w-full py-2.5 text-[13px] font-medium text-[#1A1A1A] bg-[#E8E7E5] hover:bg-[#DAD7D2] rounded-xl transition-colors">
        Search
      </button>
    </div>
  )
}

// ── Main SearchBar ──

export default function SearchBar() {
  const [searchParams] = useSearchParams()
  const existingQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(existingQuery)
  const [isExpanded, setIsExpanded] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [showVisualSearch, setShowVisualSearch] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [recentItems, setRecentItems] = useState(recentSearches)
  const containerRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => { setQuery(existingQuery) }, [existingQuery])

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Click outside
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsExpanded(false)
        setShowVisualSearch(false)
        setShowColorPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      closeAll()
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  function handleSearchClick(term) {
    closeAll()
    navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  function closeAll() {
    setIsExpanded(false)
    setShowVisualSearch(false)
    setShowColorPicker(false)
  }

  const anyOpen = isExpanded || showVisualSearch || showColorPicker

  return (
    <div
      ref={containerRef}
      className="relative flex-1 min-w-[280px]"
      style={{
        maxWidth: anyOpen ? '600px' : '480px',
        transition: 'max-width 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Search pill */}
      <div
        className="flex items-center gap-2.5 rounded-[16px] px-4 py-3 cursor-text"
        style={{
          backgroundColor: 'var(--bg-surface-secondary)',
          transition: 'background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <SparkleIcon size={16} className="text-[#727170] flex-shrink-0" />

        {anyOpen ? (
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Onton..."
              className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-[#727170] text-[#1A1A1A]"
              autoFocus
            />
          </form>
        ) : (
          <div
            className="flex-1 min-w-0"
            onClick={() => setIsExpanded(true)}
          >
            <span className="text-[14px] text-[#727170] truncate block select-none">
              {existingQuery || placeholders[placeholderIndex]}
            </span>
          </div>
        )}

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Viewfinder */}
          <button
            type="button"
            className="relative group p-0.5"
            onClick={(e) => {
              e.stopPropagation()
              setShowColorPicker(false)
              setIsExpanded(false)
              setShowVisualSearch(!showVisualSearch)
            }}
          >
            <ViewfinderIcon size={20} className="text-[#727170] group-hover:text-[#1A1A1A] transition-colors" />
            {/* Tooltip */}
            <div className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-[#E8E7E5] rounded-xl px-3.5 py-2 text-[12px] font-medium text-[#1A1A1A] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              Visual Search
            </div>
          </button>

          {/* Palette */}
          <button
            type="button"
            className="p-0.5 group"
            onClick={(e) => {
              e.stopPropagation()
              setShowVisualSearch(false)
              setIsExpanded(false)
              setShowColorPicker(!showColorPicker)
            }}
          >
            <PaletteIcon size={20} className="text-[#727170] group-hover:text-[#1A1A1A] transition-colors" />
          </button>
        </div>
      </div>

      {/* Visual Search Panel */}
      {showVisualSearch && <VisualSearchPanel />}

      {/* Color Picker Panel */}
      {showColorPicker && <ColorPickerPanel onSearch={handleSearchClick} />}

      {/* Search dropdown */}
      {isExpanded && !showVisualSearch && !showColorPicker && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#EEEDEB] rounded-[16px] overflow-hidden z-50 border border-[#E5E2DD]">
          <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Recent */}
            {recentItems.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[16px]" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>Recent</h3>
                  <button
                    className="text-[13px] text-[#727170] hover:text-[#1A1A1A] transition-colors"
                    onClick={() => setRecentItems([])}
                  >
                    Clear
                  </button>
                </div>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
                  {recentItems.map((term, i) => (
                    <button
                      key={term + i}
                      onClick={() => handleSearchClick(term)}
                      className="flex items-center gap-2 px-3.5 py-2 bg-[#E8E7E5] rounded-[12px] text-[13px] text-[#1A1A1A] whitespace-nowrap hover:bg-[#DAD7D2] transition-colors flex-shrink-0"
                    >
                      <Search size={15} className="text-[#727170]" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <h3 className="text-[16px] mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>Trending</h3>
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleSearchClick(topic)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#E8E7E5] rounded-[12px] text-[13px] text-[#1A1A1A] whitespace-nowrap hover:bg-[#DAD7D2] transition-colors flex-shrink-0"
                  >
                    <ArrowUpRight size={15} className="text-[#727170]" />
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-[16px] mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>Colors</h3>
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
                {colorSuggestions.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handleSearchClick(color.hex)}
                    className="flex items-center gap-2 px-3.5 py-2 bg-[#E8E7E5] rounded-[12px] text-[13px] text-[#1A1A1A] whitespace-nowrap hover:bg-[#DAD7D2] transition-colors flex-shrink-0"
                  >
                    <span className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: color.hex }} />
                    {color.hex}
                  </button>
                ))}
              </div>
            </div>

            {/* Recently Viewed */}
            <div>
              <h3 className="text-[16px] mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>Recently Viewed</h3>
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
                {[
                  { grad: 'linear-gradient(160deg, #3D2B1F 0%, #8B6914 40%, #2A1A0E 100%)' },
                  { grad: 'linear-gradient(145deg, #1A3A2A 0%, #2D5A3D 50%, #0F2218 100%)' },
                  { grad: 'linear-gradient(135deg, #1A2332 0%, #2A4A5A 50%, #0E1A24 100%)' },
                  { grad: 'linear-gradient(150deg, #C4A87C 0%, #8B7355 40%, #6B5335 100%)' },
                  { grad: 'linear-gradient(140deg, #3A5944 0%, #2A4A34 50%, #1A2F26 100%)' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="w-[120px] h-[150px] rounded-xl flex-shrink-0 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ background: item.grad }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
