import { memo, useMemo } from 'react'
import { MoreHorizontal } from 'lucide-react'

export default memo(function SurfaceCard({ surface }) {
  const { title, type, thumbnails, canvasColor, username, avatar } = surface

  const coverBg = useMemo(() =>
    type === 'room' && canvasColor
      ? canvasColor
      : thumbnails && thumbnails.length > 0
        ? thumbnails[0]
        : 'linear-gradient(135deg, #E5E2DD, #D5D2CD)',
    [type, canvasColor, thumbnails]
  )

  return (
    <div className="flex-shrink-0 w-[280px] group cursor-pointer">
      <div
        className="w-full aspect-[4/3] rounded-[8px] overflow-hidden relative"
        style={{ background: coverBg }}
      >
        {type === 'room' && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium text-white bg-black/40 px-2.5 py-1 rounded-lg">
              Room
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2.5">
        <div className="w-[28px] h-[28px] rounded-full bg-[#E5E2DD] flex-shrink-0 overflow-hidden">
          {avatar ? (
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full rounded-full"
              style={{ background: coverBg }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-[#1A1A1A] truncate leading-tight">{title}</p>
          <p className="text-[12px] text-[#8A8580] truncate leading-tight">{username || '@user'}</p>
        </div>
        <button
          className="w-6 h-6 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-[#E0DDD8] transition-all flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal size={14} className="text-[#8A8580]" />
        </button>
      </div>
    </div>
  )
})
