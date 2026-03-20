import { memo, useMemo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Bookmark, Link as LinkIcon } from 'lucide-react'

function CardMenu({ type, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const label = type === 'room' ? 'room' : 'dreamboard'

  return (
    <div ref={ref} className="absolute right-0 bottom-full mb-2 w-[220px] bg-[#F0EEEA] rounded-xl shadow-xl border border-[#E5E2DD] py-1.5 z-50">
      <button
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#E5E2DD] transition-colors text-left"
        onClick={(e) => { e.stopPropagation(); onClose() }}
      >
        <Bookmark size={15} className="text-[#8A8580]" />
        <span className="text-[13px] text-[#1A1A1A]">Save to my profile</span>
      </button>
      <button
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#E5E2DD] transition-colors text-left"
        onClick={(e) => { e.stopPropagation(); onClose() }}
      >
        <LinkIcon size={15} className="text-[#8A8580]" />
        <span className="text-[13px] text-[#1A1A1A]">Copy link to {label}</span>
      </button>
    </div>
  )
}

export default memo(function SurfaceCard({ surface }) {
  const { title, type, thumbnails, canvasColor, username, avatar } = surface
  const [showMenu, setShowMenu] = useState(false)

  const hasImageThumbnails = thumbnails && thumbnails.length >= 3 && thumbnails[0].startsWith('/')

  const coverBg = useMemo(() =>
    type === 'room' && canvasColor
      ? canvasColor
      : thumbnails && thumbnails.length > 0 && !thumbnails[0].startsWith('/')
        ? thumbnails[0]
        : 'linear-gradient(135deg, #E5E2DD, #D5D2CD)',
    [type, canvasColor, thumbnails]
  )

  const typeLabel = type === 'room' ? 'Room' : 'Dreamboard'

  return (
    <Link to={type === 'room' ? `/room/${surface.id}` : `/surface/${surface.id}`} className="flex-shrink-0 w-[280px] group cursor-pointer block">
      <div
        className="w-full aspect-[4/3] rounded-[8px] overflow-hidden relative"
        style={{ background: hasImageThumbnails ? undefined : coverBg }}
      >
        {surface.coverImage ? (
          <img src={surface.coverImage} alt={title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
        ) : hasImageThumbnails ? (
          <div className="flex gap-[2px] w-full h-full">
            <div className="flex-[2] h-full">
              <img src={thumbnails[0]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="flex-[1] flex flex-col gap-[2px] h-full">
              <div className="flex-1 overflow-hidden">
                <img src={thumbnails[1]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="flex-1 overflow-hidden">
                <img src={thumbnails[2]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="w-[28px] h-[28px] rounded-full bg-[#E5E2DD] flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" loading="lazy" decoding="async" width={28} height={28} />
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{ background: coverBg }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-[#1A1A1A] truncate leading-tight">
            {title}
            <span className="text-[#8A8580] font-normal"> · {typeLabel}</span>
          </p>
          <p className="text-[12px] text-[#8A8580] truncate leading-tight">{username || '@user'}</p>
        </div>
        <div className="relative flex-shrink-0">
          <button
            className="w-6 h-6 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-[#E0DDD8] transition-all"
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu) }}
          >
            <MoreHorizontal size={14} className="text-[#8A8580]" />
          </button>
          {showMenu && <CardMenu type={type} onClose={() => setShowMenu(false)} />}
        </div>
      </div>
    </Link>
  )
})
