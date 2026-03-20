import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { ChevronLeft, ChevronDown, Plus, MoreHorizontal, ArrowUp, Check } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import MasonrySentinel from '../components/MasonrySentinel'
import useVisibleItems from '../hooks/useVisibleItems'
import { mockProducts } from '../data/mockData'

// Mock connections data
const mockConnections = [
  { name: 'Home', elements: 657, user: '@shop', verified: true, icon: 'grid' },
  { name: 'Art', elements: 209, user: '@shop', verified: true, icon: 'grid' },
  { name: 'Moodboard image inspi', elements: 960, user: '@daeanni', verified: false, icon: 'purple' },
  { name: 'home', elements: 7, user: '@thyllakos', verified: false, icon: 'green' },
  { name: 'amorphous', elements: 41, user: '@redjapanesemaple', verified: false, icon: 'orange' },
]

// Pre-compute once at module level
const totalConnections = mockConnections.reduce((s, c) => s + c.elements, 0).toLocaleString()

// Three dots menu
function MoreMenu({ onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  return (
    <div ref={ref} className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-2xl shadow-xl border border-[#F0EEEA] py-2 z-50">
      {['Copy Link', 'Visual Search', 'Copy Image', 'Download'].map((item) => (
        <button key={item} onClick={onClose} className="w-full text-left px-5 py-3 text-[14px] text-[#6B6560] hover:bg-[#F5F3F0] transition-colors">
          {item}
        </button>
      ))}
      <button onClick={onClose} className="w-full text-left px-5 py-3 text-[14px] text-[#C43C3C] hover:bg-[#F5F3F0] transition-colors">
        Report
      </button>
    </div>
  )
}

// Mock dreamboards
const mockDreamboards = [
  { id: 1, name: 'Profile (Public)', count: 24 },
  { id: 2, name: 'My saves', count: 157 },
  { id: 3, name: 'Living Room Inspo', count: 43 },
  { id: 4, name: 'Bedroom Redesign', count: 18 },
  { id: 5, name: 'Kitchen Ideas', count: 31 },
  { id: 6, name: 'Outdoor Patio', count: 12 },
]

// Dreamboard dropdown
function DreamboardDropdown({ selected, onSelect, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    function handle(e) { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  return (
    <div ref={ref} className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-2xl shadow-xl border border-[#F0EEEA] py-2 z-50">
      {mockDreamboards.map((board) => (
        <button
          key={board.id}
          onClick={() => { onSelect(board); onClose() }}
          className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F5F3F0] transition-colors flex items-center justify-between ${
            selected.id === board.id ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6560]'
          }`}
        >
          <span className="truncate">{board.name}</span>
          <span className="text-[11px] text-[#A8A29E] ml-2 flex-shrink-0">{board.count}</span>
        </button>
      ))}
    </div>
  )
}

// View Similar animated button
function ViewSimilarButton({ onClick, products }) {
  const [hovered, setHovered] = useState(false)
  const thumbs = products.slice(0, 3)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-3 group"
    >
      {/* Stacked thumbnails */}
      <div className="relative w-14 h-14">
        {thumbs.map((p, i) => (
          <div
            key={i}
            className="absolute w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-white/50"
            style={{
              left: `${6 + i * 4}px`,
              top: `${6 - i * 4}px`,
              zIndex: 3 - i,
              transform: hovered
                ? `rotate(${(i - 1) * 12}deg) scale(1.05)`
                : `rotate(${(i - 1) * 5}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {p.image ? (
              <img src={p.image} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" style={{ background: p.gradient }} />
            )}
          </div>
        ))}
      </div>
      <span className="flex items-center gap-1 text-[14px] font-medium text-[#1A1A1A]">
        View Similar <ChevronDown size={14} />
      </span>
    </button>
  )
}

// Connection icon
function ConnectionIcon({ type }) {
  const colors = {
    grid: 'bg-[#F0EEEA]',
    purple: 'bg-[#9B8FE8]',
    green: 'bg-[#6BA661]',
    orange: 'bg-[#D4908A]',
  }
  return (
    <div className={`w-10 h-10 rounded-full ${colors[type] || colors.grid} flex items-center justify-center flex-shrink-0`}>
      {type === 'grid' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="4" cy="4" r="1.5" fill="#8A8580" />
          <circle cx="8" cy="4" r="1.5" fill="#8A8580" />
          <circle cx="12" cy="4" r="1.5" fill="#8A8580" />
          <circle cx="4" cy="8" r="1.5" fill="#8A8580" />
          <circle cx="8" cy="8" r="1.5" fill="#8A8580" />
          <circle cx="12" cy="8" r="1.5" fill="#8A8580" />
          <circle cx="4" cy="12" r="1.5" fill="#8A8580" />
          <circle cx="8" cy="12" r="1.5" fill="#8A8580" />
        </svg>
      )}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useMemo(() => mockProducts.find((p) => p.id === Number(id)), [id])
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showSimilar, setShowSimilar] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(mockDreamboards[0])
  const [showBoardDropdown, setShowBoardDropdown] = useState(false)
  const containerRef = useRef(null)
  const similarRef = useRef(null)

  // Similar products — same category first, then others (memoized)
  const similar = useMemo(
    () => product
      ? [
          ...mockProducts.filter((p) => p.id !== product.id && p.category === product.category),
          ...mockProducts.filter((p) => p.id !== product.id && p.category !== product.category),
        ]
      : [],
    [product]
  )

  // Incremental rendering for similar products grid
  const { visibleItems: visibleSimilar, hasMore: hasMoreSimilar, sentinelRef: similarSentinelRef } = useVisibleItems(similar, { initialCount: 15, batchSize: 10 })

  // Color dots from thumbnails (memoized)
  const colorDots = useMemo(
    () => product && product.thumbnails
      ? product.thumbnails.slice(0, 5).map((t) => {
          const match = t.match(/#([0-9a-fA-F]{6})/)
          return match ? `#${match[1]}` : '#888'
        })
      : [],
    [product]
  )

  // Similar products for ViewSimilarButton (memoized)
  const similarPreview = useMemo(() => similar.slice(0, 3), [similar])

  // Throttled scroll handler with rAF
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollBottom = el.scrollTop + el.clientHeight
        const threshold = el.scrollHeight - 200
        if (scrollBottom >= threshold && !showSimilar) {
          setShowSimilar(true)
        }
        setShowBackToTop(el.scrollTop > 400)
        ticking = false
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [showSimilar])

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-[#8A8580]">Product not found</p>
          <Link to="/" className="text-sm text-[#1A1A1A] underline mt-2 inline-block">Go back home</Link>
        </div>
      </div>
    )
  }

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // View Similar grid
  if (showSimilar) {
    return (
      <div ref={containerRef} className="flex-1 overflow-y-auto relative">
        {/* Back button */}
        <button
          onClick={() => setShowSimilar(false)}
          className="fixed top-[72px] left-6 z-30 w-9 h-9 rounded-full bg-white border border-[#E5E2DD] flex items-center justify-center shadow-sm hover:bg-[#F5F3F0] transition-colors"
        >
          <ChevronLeft size={18} className="text-[#6B6560]" />
        </button>

        {/* Masonry grid */}
        <div className="px-[52px] py-8 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
          {visibleSimilar.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          <MasonrySentinel sentinelRef={similarSentinelRef} hasMore={hasMoreSimilar} />
        </div>

        {/* Back to top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A]/70 text-white text-[13px] font-medium rounded-full backdrop-blur-sm hover:bg-[#1A1A1A]/90 transition-all"
          >
            Back to top <ArrowUp size={14} />
          </button>
        )}
      </div>
    )
  }

  // Product detail view
  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-[52px] z-30 w-9 h-9 rounded-full bg-white border border-[#E5E2DD] flex items-center justify-center shadow-sm hover:bg-[#F5F3F0] transition-colors"
      >
        <ChevronLeft size={18} className="text-[#6B6560]" />
      </button>

      <div className="flex px-[52px] py-4 gap-4" style={{ minHeight: 'calc(100vh - 56px + 250px)' }}>
        {/* Left: Image area */}
        <div className="flex-1 flex flex-col items-center justify-center px-12 py-8 relative min-h-[calc(100vh-56px)]">
          {/* Main image */}
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-[640px] aspect-[3/4] rounded-lg overflow-hidden object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-full max-w-[640px] aspect-[3/4] rounded-lg overflow-hidden"
              style={{ background: product.gradient }}
            />
          )}

          {/* Color dots - left edge */}
          <div className="absolute bottom-8 left-6 flex flex-col gap-2">
            {colorDots.map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* View Similar button - centered below image */}
          <div className="mt-8">
            <ViewSimilarButton
              onClick={() => setShowSimilar(true)}
              products={similarPreview}
            />
          </div>
        </div>

        {/* Right: Details panel */}
        <div className="w-[380px] flex-shrink-0 bg-white rounded-2xl p-7 overflow-y-auto shadow-sm">
          {/* Top bar: ··· + Profile + Add */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="w-10 h-10 rounded-full bg-[#F0EEEA] flex items-center justify-center hover:bg-[#E5E2DD] transition-colors"
              >
                <MoreHorizontal size={18} className="text-[#6B6560]" />
              </button>
              {showMoreMenu && <MoreMenu onClose={() => setShowMoreMenu(false)} />}
            </div>

            <div className="flex items-center gap-2">
              {/* Dreamboard selector */}
              <div className="relative">
                <button
                  onClick={() => setShowBoardDropdown(!showBoardDropdown)}
                  className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium border border-[#E5E2DD] rounded-full hover:bg-[#F5F3F0] transition-colors"
                >
                  {selectedBoard.name} <ChevronDown size={13} />
                </button>
                {showBoardDropdown && (
                  <DreamboardDropdown
                    selected={selectedBoard}
                    onSelect={setSelectedBoard}
                    onClose={() => setShowBoardDropdown(false)}
                  />
                )}
              </div>

              {/* Save / Saved button */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSaved
                    ? 'bg-[#1A1A1A] scale-95'
                    : 'bg-[#1A1A1A] hover:bg-[#333]'
                }`}
              >
                {isSaved ? (
                  <Check size={18} className="text-white" strokeWidth={2.5} />
                ) : (
                  <Plus size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-[26px] leading-[1.2] tracking-tight text-[#1A1A1A] mb-2"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
          >
            {product.title}
          </h1>

          {/* Price */}
          <p className="text-[16px] text-[#1A1A1A] mb-5">
            ${product.price.toLocaleString()}
          </p>

          {/* Description */}
          <p className="text-[14px] text-[#8A8580] leading-[1.65] mb-5">
            {product.description}
          </p>

          {/* Visit site button */}
          <button className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[14px] font-medium rounded-full hover:bg-[#333] transition-colors mb-8">
            Visit site
          </button>

          {/* Connections */}
          <div className="border-t border-[#F0EEEA] pt-6">
            <h3
              className="text-[16px] text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
            >
              {totalConnections} Connections
            </h3>

            <div className="space-y-1">
              {mockConnections.map((conn, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-3 px-2 rounded-xl hover:bg-[#FAFAF9] transition-colors cursor-pointer"
                >
                  <ConnectionIcon type={conn.icon} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#1A1A1A] truncate">{conn.name}</p>
                    <p className="text-[12px] text-[#8A8580]">
                      {conn.elements.toString().padStart(2, '0')} elements · {conn.user}
                      {conn.verified && (
                        <svg className="inline ml-1 -mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="6" fill="#1A1A1A" />
                          <path d="M4.5 7L6.2 8.7L9.5 5.3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </p>
                  </div>
                  {i === 0 && (
                    <span className="text-[11px] font-medium text-[#8A8580] border border-[#E5E2DD] rounded-full px-2 py-0.5">
                      1st
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
