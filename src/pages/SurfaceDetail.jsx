import { useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { MoreHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { mockSurfaces, mockProducts } from '../data/mockData'
import { useCollections } from '../context/CollectionContext'

export default function SurfaceDetail() {
  const { id } = useParams()
  const surface = mockSurfaces.find((s) => s.id === Number(id))
  const [following, setFollowing] = useState(false)
  const [removedIds, setRemovedIds] = useState([])

  // Dynamic cover: swap when key product is removed OR added via collection picker
  const { isInCollection, removeFromCollection } = useCollections()

  if (!surface) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <p className="text-[#8A8580] text-[16px]">Surface not found</p>
      </div>
    )
  }

  const isRoom = surface.type === 'room'
  const typeLabel = isRoom ? 'Room' : 'Dreamboard'

  const keyAdded = surface.keyProductId && isInCollection(surface.id, surface.keyProductId)
  const keyOriginallyInSurface = surface.keyProductId && surface.productIds?.includes(surface.keyProductId)
  const keyRemoved = keyOriginallyInSurface && removedIds.includes(surface.keyProductId)

  // Use specific product IDs if available, otherwise fallback
  const baseProductIds = surface.productIds || mockProducts.slice(0, 15).map((p) => p.id)
  // Include key product when added via collection picker
  const allProductIds = keyAdded && surface.keyProductId && !baseProductIds.includes(surface.keyProductId)
    ? [surface.keyProductId, ...baseProductIds]
    : baseProductIds
  const activeProductIds = allProductIds.filter((pid) => !removedIds.includes(pid))
  const surfaceProducts = activeProductIds
    .map((pid) => mockProducts.find((p) => p.id === pid))
    .filter(Boolean)

  const handleRemoveProduct = useCallback((productId) => {
    setRemovedIds((prev) => [...prev, productId])
    if (surface.keyProductId === productId) {
      removeFromCollection(surface.id, productId)
    }
  }, [surface, removeFromCollection])
  const currentCover = (keyRemoved || keyAdded) && surface.coverImageAlt
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
        <div className="text-center">
          <div className="inline-block text-left columns-2 sm:columns-3 gap-[16px]">
            {surfaceProducts.map((product) => (
              <ProductCard key={product.id} product={product} onRemove={handleRemoveProduct} collectionName={surface.title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
