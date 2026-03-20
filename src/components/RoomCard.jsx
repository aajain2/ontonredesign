import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

export default function RoomCard({ room }) {
  const { image, aspectRatio, designer, saves } = room

  return (
    <Link to={`/room/${room.id}`} className="group block mb-[16px] break-inside-avoid cursor-pointer">
      <div className="relative rounded-[4px] overflow-hidden">
        <img
          src={image}
          alt={room.room}
          className="w-full object-cover"
          style={{ aspectRatio: aspectRatio || '4/5' }}
          loading="lazy"
        />

        {/* Hover: connect button */}
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <Plus size={16} strokeWidth={2} className="text-[#1A1A1A]" />
        </button>

        {/* Bottom info overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent pt-10 pb-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-[13px] font-medium">{designer}</p>
          <p className="text-white/70 text-[11px]">{saves.toLocaleString()} saves</p>
        </div>
      </div>
    </Link>
  )
}
