import { useState, useRef, useEffect, memo, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ChevronDown, Check, Home } from 'lucide-react'
import { mockSurfaces } from '../data/mockData'

// Pre-compute filtered data once at module level (static data)
const dreamboards = mockSurfaces.filter((s) => s.type === 'dreamboard')
const rooms = mockSurfaces.filter((s) => s.type === 'room')

// House icon for rooms
function RoomIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <path d="M2 15V7L9 2.5L16 7V15H2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="6.5" y="10" width="5" height="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

export default memo(function ProductCard({ product, showInfo }) {
  const { id, title, gradient, image, aspectRatio, retailer, price } = product
  const [showPanel, setShowPanel] = useState(false)
  const [addedToIds, setAddedToIds] = useState(new Set())
  const [addedToRoomId, setAddedToRoomId] = useState(null)
  const [profileAdded, setProfileAdded] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!showPanel) return
    function handleClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showPanel])

  const toggleDreamboard = useCallback((sid) => {
    setAddedToIds((prev) => {
      const next = new Set(prev)
      if (next.has(sid)) next.delete(sid)
      else next.add(sid)
      return next
    })
  }, [])

  const toggleRoom = useCallback((sid) => {
    setAddedToRoomId((prev) => prev === sid ? null : sid)
  }, [])

  // Stable style object for aspect ratio
  const imageStyle = useMemo(() => ({
    aspectRatio: aspectRatio || '1/1',
  }), [aspectRatio])

  const gradientStyle = useMemo(() => ({
    background: gradient,
    aspectRatio: aspectRatio || '1/1',
  }), [gradient, aspectRatio])

  return (
    <Link to={`/product/${id}`} className="group block mb-[16px] break-inside-avoid">
      <div className="relative rounded-[4px] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full object-cover"
            style={imageStyle}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className="w-full"
            style={gradientStyle}
          />
        )}

        {/* Hover: connect button (top-right) */}
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setShowPanel(true)
          }}
        >
          <Plus size={16} strokeWidth={2} className="text-[#1A1A1A]" />
        </button>

        {/* Price bubble */}
        {price && (
          <div className="absolute bottom-2 left-2 bg-[#1A1A1A]/50 backdrop-blur-sm rounded-[8px] px-2.5 py-1 z-10">
            <span className="text-white text-[13px] font-medium">
              ${price.toLocaleString()}
            </span>
          </div>
        )}

        {/* ── Add-to picker panel ── */}
        {showPanel && (
          <div
            ref={panelRef}
            className="absolute inset-x-0 bottom-0 z-50"
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-t-2xl shadow-2xl max-h-[85%] overflow-y-auto">
              {/* Profile row */}
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F0EEEA] flex items-center justify-center flex-shrink-0">
                  <img src="/avatar.png" alt="Profile" className="w-6 h-6 rounded-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-[#1A1A1A]">Profile</p>
                  <p className="text-[12px] text-[#8A8580]">Public</p>
                </div>
                <button
                  onClick={() => setProfileAdded(!profileAdded)}
                  className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors ${
                    profileAdded ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'border-[#C5C2BD] hover:border-[#8A8580]'
                  }`}
                >
                  {profileAdded ? <Check size={14} className="text-white" /> : <Plus size={14} className="text-[#8A8580]" />}
                </button>
              </div>

              {/* ── Rooms section ── */}
              <div className="px-5 pt-1 pb-1">
                <div className="flex items-center gap-2 mb-2">
                  <Home size={13} className="text-[#8A8580]" />
                  <span className="text-[12px] text-[#8A8580] font-semibold uppercase tracking-wider">Add to Room</span>
                </div>
                <p className="text-[11px] text-[#A8A29E] mb-2">Places this product in your room design</p>
              </div>

              <div className="pb-2">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#F5F3F0] transition-colors"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleRoom(room.id) }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-end p-1.5"
                      style={{ background: room.canvasColor }}
                    >
                      <span className="text-[8px] font-medium text-white/80 bg-black/30 px-1.5 py-0.5 rounded">Room</span>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-[14px] font-bold text-[#1A1A1A] truncate">{room.title}</p>
                      <p className="text-[12px] text-[#A8A29E]">{room.timestamp}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
                        addedToRoomId === room.id
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] scale-110'
                          : 'border-[#C5C2BD] hover:border-[#8A8580]'
                      }`}
                    >
                      {addedToRoomId === room.id ? (
                        <Check size={14} className="text-white" />
                      ) : (
                        <RoomIcon size={14} />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="mx-5 border-t border-[#EEEDEB]" />

              {/* ── Dreamboards section ── */}
              <div className="px-5 pt-3 pb-1">
                <span className="text-[12px] text-[#8A8580] font-semibold uppercase tracking-wider">Dreamboards</span>
              </div>

              <div className="pb-1">
                {dreamboards.map((board) => (
                  <button
                    key={board.id}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#F5F3F0] transition-colors"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleDreamboard(board.id) }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex-shrink-0"
                      style={{
                        background: board.thumbnails.length > 0
                          ? board.thumbnails[0]
                          : 'linear-gradient(135deg, #E5E2DD, #D5D2CD)',
                      }}
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-[14px] font-bold text-[#1A1A1A] truncate">{board.title}</p>
                      <p className="text-[12px] text-[#A8A29E]">{board.timestamp}</p>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors ${
                        addedToIds.has(board.id)
                          ? 'bg-[#1A1A1A] border-[#1A1A1A]'
                          : 'border-[#C5C2BD] hover:border-[#8A8580]'
                      }`}
                    >
                      {addedToIds.has(board.id) ? (
                        <Check size={14} className="text-white" />
                      ) : (
                        <Plus size={14} className="text-[#8A8580]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between bg-[#555]/90 backdrop-blur-md px-4 py-3">
              <button className="flex items-center gap-1.5 text-white text-[13px] font-semibold">
                Profile (Public)
                <ChevronDown size={14} className="text-white/70" />
              </button>
              <button
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                onClick={() => setShowPanel(false)}
              >
                <Plus size={18} strokeWidth={2.2} className="text-[#1A1A1A]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Optional info row below card (for link-type elements) */}
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
  )
})
