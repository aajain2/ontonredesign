import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SurfaceCard from '../components/SurfaceCard'
import ProductCard from '../components/ProductCard'
import MasonrySentinel from '../components/MasonrySentinel'
import useVisibleItems from '../hooks/useVisibleItems'
import { mockSurfaces, mockProducts } from '../data/mockData'

export default function Dashboard() {
  const surfaces = useMemo(() => mockSurfaces, [])
  const { visibleItems, hasMore, sentinelRef } = useVisibleItems(mockProducts, { initialCount: 15, batchSize: 10 })

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[52px] pb-12 pt-6">
        {/* Selected by Onton — horizontal dreamboard cards */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Selected by Onton</h2>
            <Link
              to="#"
              className="text-sm text-[#1A1A1A] hover:text-[#4A4540] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E2DD] hover:bg-white"
            >
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {surfaces.map((surface) => (
              <SurfaceCard key={surface.id} surface={surface} />
            ))}
          </div>
        </section>

        {/* Elements — masonry grid */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[22px] font-semibold text-[#1A1A1A]">Products</h2>
          </div>
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-[16px]">
            {visibleItems.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 5} />
            ))}
            <MasonrySentinel sentinelRef={sentinelRef} hasMore={hasMore} />
          </div>
        </section>
      </div>
    </div>
  )
}
