import { useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { MoreHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { mockSurfaces, mockProducts } from '../data/mockData'

export default function SurfaceDetail() {
  const { id } = useParams()
  const surface = mockSurfaces.find((s) => s.id === Number(id))
  const [following, setFollowing] = useState(false)
  const [removedIds, setRemovedIds] = useState([])

  const handleRemoveProduct = useCallback((productId) => {
    setRemovedIds((prev) => [...prev, productId])
  }, [])

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
  const allProductIds = surface.productIds || mockProducts.slice(0, 15).map((p) => p.id)
  const activeProductIds = allProductIds.filter((pid) => !removedIds.includes(pid))
  const surfaceProducts = activeProductIds
    .map((pid) => mockProducts.find((p) => p.id === pid))
    .filter(Boolean)

  // Dynamic cover: if key product is removed, show alt cover
  const keyRemoved = surface.keyProductId && removedIds.includes(surface.keyProductId)
  const currentCover = keyRemoved && surface.coverImageAlt
    ? surface.coverImageAlt
    : surface.coverImage

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
            {typeLabel} · {followerCount} Followers · {surface.username}
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
        {isRoom && currentCover && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              key={currentCover}
              src={currentCover}
              alt={surface.title}
              className="w-full object-cover"
              style={{
                maxHeight: '500px',
                transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
          </div>
        )}

        {/* Products grid */}
        <div className="flex flex-wrap justify-center gap-[16px]">
          {surfaceProducts.map((product) => (
            <div key={product.id} className="w-[calc(33.333%-12px)] max-w-[280px] min-w-[200px] relative group/card">
              <ProductCard product={product} />
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-black/70 z-10"
                title="Remove from this board"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
