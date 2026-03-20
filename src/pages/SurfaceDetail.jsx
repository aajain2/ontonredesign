import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { mockSurfaces, mockProducts } from '../data/mockData'

export default function SurfaceDetail() {
  const { id } = useParams()
  const surface = mockSurfaces.find((s) => s.id === Number(id))
  const [following, setFollowing] = useState(false)

  if (!surface) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-[#8A8580] text-[16px]">Surface not found</p>
      </div>
    )
  }

  const isRoom = surface.type === 'room'
  const typeLabel = isRoom ? 'Room' : 'Dreamboard'

  // Use specific product IDs if available, otherwise fallback
  const surfaceProducts = surface.productIds
    ? surface.productIds.map((pid) => mockProducts.find((p) => p.id === pid)).filter(Boolean)
    : mockProducts.slice(0, 15)

  const followerCount = 42 + surface.id * 7

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[900px] mx-auto px-6 pt-10 pb-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-[32px] mb-2"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
          >
            {surface.title}
          </h1>
          <p className="text-[14px] text-[#8A8580]">
            {followerCount} Followers · {surface.username}
          </p>

          {/* Avatar */}
          <div className="flex justify-center mt-4 mb-5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E5E2DD]">
              {surface.avatar ? (
                <img src={surface.avatar} alt={surface.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: surface.canvasColor || '#E5E2DD' }} />
              )}
            </div>
          </div>

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
            <button className="w-10 h-10 rounded-full border border-[#E5E2DD] flex items-center justify-center hover:bg-[#E5E2DD] transition-colors">
              <MoreHorizontal size={18} className="text-[#8A8580]" />
            </button>
          </div>
        </div>

        {/* Room cover image (only for rooms) */}
        {isRoom && surface.coverImage && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={surface.coverImage}
              alt={surface.title}
              className="w-full object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
        )}

        {/* Products grid */}
        <div className="columns-2 sm:columns-3 md:columns-4 gap-[16px]">
          {surfaceProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
