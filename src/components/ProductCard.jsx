import { useState, useRef, useEffect, memo, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Plus, ChevronDown, Check } from 'lucide-react'
import { mockSurfaces } from '../data/mockData'
import NewClusterModal from './NewClusterModal'

const allCollections = mockSurfaces.map((s) => ({
  ...s,
  collectionType: s.type === 'room' ? 'Room' : 'Dreamboard',
  privacy: s.type === 'room' ? null : (s.id % 2 === 0 ? null : 'Private'),
}))

// ── Floating collection picker (portaled to body) ──
function CollectionPicker({ anchorRect, onClose }) {
  const ref = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [addedToIds, setAddedToIds] = useState(new Set())
  const [profileAdded, setProfileAdded] = useState(false)
  const [showNewChoice, setShowNewChoice] = useState(false)
  const [showNewModal, setShowNewModal] = useState(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, openAbove: false })

  // Calculate position
  useEffect(() => {
    if (!anchorRect) return
    const panelHeight = 440
    const spaceBelow = window.innerHeight - anchorRect.bottom
    const openAbove = spaceBelow < panelHeight && anchorRect.top > panelHeight
    setPosition({
      left: anchorRect.left,
      width: Math.max(anchorRect.width, 300),
      top: openAbove ? anchorRect.top : anchorRect.bottom,
      openAbove,
    })
  }, [anchorRect])

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const toggleCollection = useCallback((sid) => {
    setAddedToIds((prev) => {
      const next = new Set(prev)
      if (next.has(sid)) next.delete(sid)
      else next.add(sid)
      return next
    })
  }, [])

  const filtered = searchQuery
    ? allCollections.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : allCollections

  if (showNewModal) {
    return createPortal(
      <NewClusterModal onClose={() => { setShowNewModal(null); onClose() }} type={showNewModal} />,
      document.body
    )
  }

  return createPortal(
    <div
      ref={ref}
      className="fixed z-[100]"
      style={{
        left: position.left,
        width: position.width,
        ...(position.openAbove
          ? { bottom: window.innerHeight - position.top + 4 }
          : { top: position.top + 4 }),
      }}
    >
      <div className="bg-[#F5F3F0] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Panel body */}
        <div className="max-h-[400px] overflow-y-auto">
          {/* Profile row */}
          <div className="flex items-center gap-3.5 px-5 py-4">
            <div className="w-14 h-14 rounded-full bg-[#EEEDEB] flex items-center justify-center flex-shrink-0">
              <img src="/avatar.png" alt="" className="w-8 h-8 rounded-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-semibold text-[#1A1A1A]">Profile</p>
              <p className="text-[14px] text-[#B0ADA8]">Public</p>
            </div>
            <button
              onClick={() => setProfileAdded(!profileAdded)}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                profileAdded ? 'bg-[#1A1A1A]' : 'border border-[#C5C2BD] hover:border-[#999]'
              }`}
            >
              {profileAdded ? <Check size={18} className="text-white" /> : <Plus size={18} strokeWidth={1.5} className="text-[#B0ADA8]" />}
            </button>
          </div>

          {/* Search */}
          <div className="px-5 pb-4">
            <div className="flex items-center bg-[#EEEDEB] rounded-2xl px-4 py-3.5">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[15px] text-[#1A1A1A] placeholder:text-[#B0ADA8] outline-none w-full"
                autoFocus
              />
            </div>
          </div>

          {/* Collections header */}
          <div className="flex items-center justify-between px-5 pt-1 pb-3">
            <span className="text-[15px] text-[#B0ADA8]">Collections</span>
            <button
              className="flex items-center gap-1 text-[15px] font-bold text-[#1A1A1A] hover:text-[#555] transition-colors"
              onClick={() => setShowNewChoice(!showNewChoice)}
            >
              <Plus size={16} strokeWidth={2.5} />
              New
            </button>
          </div>

          {/* Collection list */}
          <div className="pb-1">
            {filtered.map((col) => {
              const thumb = col.thumbnails && col.thumbnails.length > 0
                ? col.thumbnails[0]
                : col.canvasColor || 'linear-gradient(135deg, #E5E2DD, #D5D2CD)'
              const isAdded = addedToIds.has(col.id)
              return (
                <button
                  key={col.id}
                  className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-[#EEEDEB] transition-colors"
                  onClick={() => toggleCollection(col.id)}
                >
                  <div className="w-14 h-14 rounded-2xl flex-shrink-0 overflow-hidden" style={{ background: thumb }}>
                    {col.coverImage && <img src={col.coverImage} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[16px] font-semibold text-[#1A1A1A] truncate">{col.title}</p>
                    <p className="text-[14px] text-[#B0ADA8]">
                      {col.collectionType}
                      {col.privacy && <span> · {col.privacy}</span>}
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isAdded ? 'bg-[#1A1A1A]' : 'border border-[#C5C2BD] hover:border-[#999]'
                    }`}
                  >
                    {isAdded ? <Check size={18} className="text-white" /> : <Plus size={18} strokeWidth={1.5} className="text-[#B0ADA8]" />}
                  </div>
                </button>
              )
            })}

            {/* New Collection */}
            <button
              className="w-full flex items-center gap-3.5 px-5 py-3 hover:bg-[#EEEDEB] transition-colors"
              onClick={() => setShowNewChoice(!showNewChoice)}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                <Plus size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-[16px] font-semibold text-[#1A1A1A]">New Collection</p>
            </button>

            {showNewChoice && (
              <div className="mx-5 mb-3 bg-[#E5E2DD] rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#DAD7D2] transition-colors"
                  onClick={() => { setShowNewChoice(false); setShowNewModal('dreamboard') }}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#D5D2CD] flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                      <rect x="3" y="3" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M3 14L7.5 10L11 13L14.5 9.5L19 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">Dreamboard</p>
                    <p className="text-[11px] text-[#8A8580]">A curated collection of inspiration</p>
                  </div>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#DAD7D2] transition-colors"
                  onClick={() => { setShowNewChoice(false); setShowNewModal('room') }}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#D5D2CD] flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
                      <path d="M3 18V8L11 3L19 8V18H3Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="8" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">Room</p>
                    <p className="text-[11px] text-[#8A8580]">Design a room with products</p>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between bg-[#6B6B6B] px-5 py-3.5 rounded-b-2xl">
          <button className="flex items-center gap-1.5 text-white text-[14px] font-semibold">
            Profile (Public)
            <ChevronDown size={14} className="text-white/60" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-[#555] flex items-center justify-center hover:bg-[#4A4A4A] transition-colors"
            onClick={onClose}
          >
            <Check size={18} strokeWidth={2.5} className="text-white" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ── Product Card ──
export default memo(function ProductCard({ product, showInfo }) {
  const { id, title, gradient, image, aspectRatio, retailer, price } = product
  const [saved, setSaved] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const cardRef = useRef(null)
  const [anchorRect, setAnchorRect] = useState(null)

  const domain = retailer.toLowerCase().replace(/\s+/g, '').replace(/'/g, '') + '.com'

  const imageStyle = useMemo(() => ({ aspectRatio: aspectRatio || '1/1' }), [aspectRatio])
  const gradientStyle = useMemo(() => ({ background: gradient, aspectRatio: aspectRatio || '1/1' }), [gradient, aspectRatio])

  function openPanel(e) {
    e.preventDefault()
    e.stopPropagation()
    if (cardRef.current) {
      setAnchorRect(cardRef.current.getBoundingClientRect())
    }
    setShowPanel(true)
  }

  return (
    <>
      <Link to={`/product/${id}`} className="group block mb-[16px] break-inside-avoid">
        <div ref={cardRef} className="relative rounded-[4px] overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full object-cover" style={imageStyle} loading="lazy" decoding="async" />
          ) : (
            <div className="w-full" style={gradientStyle} />
          )}

          {/* Hover overlay */}
          <>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Top-left: board name → opens picker */}
            <button
              className="absolute top-3 left-3 flex items-center gap-1 text-white text-[13px] font-semibold drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              onClick={openPanel}
            >
              Profile (Public)
              <ChevronDown size={14} />
            </button>

            {/* Top-right: + / ✓ */}
            <button
              className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 ${
                saved ? 'bg-[#555]' : 'bg-white hover:scale-105'
              }`}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved) }}
            >
              {saved
                ? <Check size={18} strokeWidth={2.5} className="text-white" />
                : <Plus size={18} strokeWidth={2.2} className="text-[#1A1A1A]" />
              }
            </button>

            {/* Bottom-right: source domain */}
            <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 max-w-[calc(100%-60px)]">
              <div className="bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center">
                <span className="text-white text-[12px] font-medium leading-none truncate">{domain}</span>
              </div>
            </div>
          </>

          {/* Price bubble */}
          {price && (
            <div className="absolute bottom-2.5 left-2.5 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center z-[5]">
              <span className="text-white text-[12px] font-medium leading-none">${price.toLocaleString()}</span>
            </div>
          )}
        </div>

        {showInfo && (
          <div className="mt-1.5 px-0.5">
            <p className="text-[13px] text-[#6B6B6B] truncate flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 opacity-60">
                <path d="M6.5 3.5H4.5C3.95 3.5 3.5 3.95 3.5 4.5V11.5C3.5 12.05 3.95 12.5 4.5 12.5H11.5C12.05 12.5 12.5 12.05 12.5 11.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M7.5 8.5L12.5 3.5M12.5 3.5H9.5M12.5 3.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {title} – {retailer}
            </p>
          </div>
        )}
      </Link>

      {/* Collection picker — portaled to body, floats outside the card */}
      {showPanel && anchorRect && (
        <CollectionPicker
          anchorRect={anchorRect}
          onClose={() => setShowPanel(false)}
        />
      )}
    </>
  )
})
