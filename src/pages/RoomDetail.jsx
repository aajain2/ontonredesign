import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, MoreHorizontal, Plus, Check } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { mockRoomImages, mockSurfaces, mockProducts } from '../data/mockData'

// Deterministically pick products for a room based on its ID
function getProductsForRoom(roomId) {
  const count = 5 + (roomId % 4) // 5-8 products per room
  const start = ((roomId * 7) % mockProducts.length)
  const products = []
  for (let i = 0; i < count; i++) {
    products.push(mockProducts[(start + i * 3) % mockProducts.length])
  }
  // Deduplicate
  return [...new Map(products.map(p => [p.id, p])).values()]
}

// Normalize a surface (from mockSurfaces) into the room shape
function surfaceToRoom(surface) {
  return {
    id: surface.id,
    image: surface.coverImage,
    room: surface.title,
    designer: surface.username?.replace('@', '') || 'Unknown',
    saves: 120 + (surface.id * 13) % 5000,
    aspectRatio: '4/3',
  }
}

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const numId = Number(id)

  // Look up in mockRoomImages first, then fall back to mockSurfaces (rooms only)
  let room = mockRoomImages.find((r) => r.id === numId)
  if (!room) {
    const surface = mockSurfaces.find((s) => s.id === numId && s.type === 'room')
    if (surface) room = surfaceToRoom(surface)
  }

  const [following, setFollowing] = useState(false)
  const [saved, setSaved] = useState(false)

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-[#8A8580] text-[16px]">Room not found</p>
      </div>
    )
  }

  const products = getProductsForRoom(room.id)
  const followerCount = 120 + (room.id * 13) % 5000

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-[76px] left-[60px] z-30 w-9 h-9 rounded-full bg-white border border-[#E5E2DD] flex items-center justify-center shadow-sm hover:bg-[#F5F3F0] transition-colors"
      >
        <ChevronLeft size={18} className="text-[#6B6560]" />
      </button>

      <div className="max-w-[900px] mx-auto px-6 pt-10 pb-16">
        {/* Room cover image */}
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img
            src={room.image}
            alt={room.room}
            className="w-full object-cover"
            style={{ maxHeight: '560px' }}
          />
        </div>

        {/* Room info header */}
        <div className="text-center mb-10">
          <h1
            className="text-[28px] mb-1"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
          >
            {room.room}
          </h1>
          <p className="text-[14px] text-[#8A8580] mb-1">
            by {room.designer}
          </p>
          <p className="text-[13px] text-[#8A8580] mb-5">
            {room.saves.toLocaleString()} saves · {followerCount.toLocaleString()} followers
          </p>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setFollowing(!following)}
              className={`px-6 py-2 rounded-full text-[14px] font-medium transition-colors ${
                following
                  ? 'bg-[#E5E2DD] text-[#1A1A1A]'
                  : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                saved
                  ? 'bg-[#1A1A1A] text-white'
                  : 'border border-[#E5E2DD] hover:bg-[#E5E2DD] text-[#8A8580]'
              }`}
            >
              {saved ? <Check size={18} /> : <Plus size={18} />}
            </button>
            <button className="w-10 h-10 rounded-full border border-[#E5E2DD] flex items-center justify-center hover:bg-[#E5E2DD] transition-colors">
              <MoreHorizontal size={18} className="text-[#8A8580]" />
            </button>
          </div>
        </div>

        {/* Products in this room */}
        <div className="mb-6">
          <h2
            className="text-[18px] mb-5"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
          >
            {products.length} Products in this Room
          </h2>
        </div>

        <div className="columns-2 sm:columns-3 md:columns-4 gap-[16px]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
