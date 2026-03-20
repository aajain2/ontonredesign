import { useState, useRef, useEffect, useMemo, useCallback, startTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import RoomCard from '../components/RoomCard'
import MasonrySentinel from '../components/MasonrySentinel'
import useVisibleItems from '../hooks/useVisibleItems'
import { mockProducts, productCategories, mockRoomImages } from '../data/mockData'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [activeTab, setActiveTab] = useState('products')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Show All')
  const [sortBy, setSortBy] = useState('Relevant')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showProductsCategoryDropdown, setShowProductsCategoryDropdown] = useState(false)
  const [showPriceFilter, setShowPriceFilter] = useState(false)
  const [priceRange, setPriceRange] = useState(null)

  const categoryRef = useRef(null)
  const sortRef = useRef(null)
  const productsCatRef = useRef(null)
  const priceRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) setShowCategoryDropdown(false)
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSortDropdown(false)
      if (productsCatRef.current && !productsCatRef.current.contains(e.target)) setShowProductsCategoryDropdown(false)
      if (priceRef.current && !priceRef.current.contains(e.target)) setShowPriceFilter(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Memoize entire filter + sort pipeline
  const preFiltered = useMemo(() => {
    let result = query
      ? mockProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.retailer.toLowerCase().includes(query.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
        )
      : mockProducts

    if (result.length === 0) result = mockProducts

    if (selectedCategory !== 'Show All') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    return result
  }, [query, selectedCategory])

  // Dynamic price bounds from the current filtered set
  const { minPrice, maxPrice } = useMemo(() => ({
    minPrice: Math.min(...preFiltered.map((p) => p.price)),
    maxPrice: Math.max(...preFiltered.map((p) => p.price)),
  }), [preFiltered])

  // Effective price range
  const effectiveMin = priceRange ? priceRange[0] : minPrice
  const effectiveMax = priceRange ? priceRange[1] : maxPrice

  // Memoize final sorted results
  const results = useMemo(() => {
    let filtered = preFiltered.filter(
      (p) => p.price >= effectiveMin && p.price <= effectiveMax
    )

    if (sortBy === 'Price: Low to High') {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'Price: High to Low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'Newest') {
      filtered = [...filtered].sort((a, b) => b.id - a.id)
    }

    return filtered
  }, [preFiltered, effectiveMin, effectiveMax, sortBy])

  // Incremental rendering for results
  const { visibleItems: visibleResults, hasMore, sentinelRef } = useVisibleItems(results, { initialCount: 15, batchSize: 10 })

  // Reset price range when category changes
  useEffect(() => {
    setPriceRange(null)
  }, [selectedCategory, query])

  const handleCategorySelect = useCallback((cat) => {
    setShowCategoryDropdown(false)
    startTransition(() => setSelectedCategory(cat))
  }, [])

  const handleProductsCategorySelect = useCallback((cat) => {
    setShowProductsCategoryDropdown(false)
    startTransition(() => setSelectedCategory(cat))
  }, [])

  const handleSortSelect = useCallback((option) => {
    setShowSortDropdown(false)
    startTransition(() => setSortBy(option))
  }, [])

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Filter bar */}
      <div className="sticky top-0 z-10 bg-[#F5F4F2] border-b border-[#E5E2DD]">
        <div className="px-[52px] py-3 flex items-center justify-between">
          {/* Left: "All" dropdown */}
          <div ref={categoryRef} className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center gap-1.5 text-[14px] text-[#1A1A1A] hover:text-[#6B6B6B] transition-colors"
            >
              {selectedCategory === 'Show All' ? 'All' : selectedCategory}
              <ChevronDown size={14} />
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg py-2 w-[220px] z-20 border border-[#E5E2DD]">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5F4F2] transition-colors flex items-center justify-between"
                  >
                    <span className={selectedCategory === cat ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6B6B]'}>
                      {cat}
                    </span>
                    {selectedCategory === cat && (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center: Products / Rooms / Dreamboards tabs */}
          <div className="flex items-center gap-1">
            {['Products', 'Rooms', 'Dreamboards'].map((tab) => {
              const tabKey = tab.toLowerCase()
              const isActive = activeTab === tabKey
              if (tab === 'Products') {
                return (
                  <div key={tab} ref={productsCatRef} className="relative">
                    <button
                      onClick={() => {
                        setActiveTab(tabKey)
                        setShowProductsCategoryDropdown(!showProductsCategoryDropdown)
                      }}
                      className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                        isActive
                          ? 'bg-[#E5E2DD] text-[#1A1A1A]'
                          : 'text-[#8A8580] hover:text-[#1A1A1A]'
                      }`}
                    >
                      {selectedCategory !== 'Show All' ? selectedCategory : tab}
                      <ChevronDown size={12} className="inline ml-1" />
                    </button>
                    {showProductsCategoryDropdown && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-lg py-2 w-[220px] z-20 border border-[#E5E2DD]">
                        {productCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleProductsCategorySelect(cat)}
                            className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5F4F2] transition-colors flex items-center justify-between"
                          >
                            <span className={selectedCategory === cat ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6B6B]'}>
                              {cat}
                            </span>
                            {selectedCategory === cat && (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8.5L6.5 12L13 4" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E5E2DD] text-[#1A1A1A]'
                      : 'text-[#8A8580] hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>

          {/* Right: Price filter + Sort */}
          <div className="flex items-center gap-3">
            {/* Price filter */}
            <div ref={priceRef} className="relative">
              <button
                onClick={() => setShowPriceFilter(!showPriceFilter)}
                className={`flex items-center gap-1.5 text-[14px] transition-colors ${
                  showPriceFilter || priceRange
                    ? 'text-[#1A1A1A] font-medium'
                    : 'text-[#8A8580] hover:text-[#1A1A1A]'
                }`}
              >
                <SlidersHorizontal size={14} />
                Price
              </button>

              {showPriceFilter && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg p-5 w-[280px] z-20 border border-[#E5E2DD]">
                  <div className="space-y-4">
                    <div className="relative h-6 flex items-center">
                      <div className="absolute w-full h-[3px] bg-[#E5E2DD] rounded-full" />
                      <div
                        className="absolute h-[3px] bg-[#1A1A1A] rounded-full"
                        style={{
                          left: `${((effectiveMin - minPrice) / (maxPrice - minPrice)) * 100}%`,
                          right: `${100 - ((effectiveMax - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        }}
                      />
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={effectiveMin}
                        onChange={(e) => {
                          const v = Number(e.target.value)
                          if (v <= effectiveMax) setPriceRange([v, effectiveMax])
                        }}
                        className="absolute w-full appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#1A1A1A] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={effectiveMax}
                        onChange={(e) => {
                          const v = Number(e.target.value)
                          if (v >= effectiveMin) setPriceRange([effectiveMin, v])
                        }}
                        className="absolute w-full appearance-none bg-transparent pointer-events-none z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[2.5px] [&::-webkit-slider-thumb]:border-[#1A1A1A] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[13px] text-[#1A1A1A]">
                      <span>${effectiveMin.toLocaleString()}</span>
                      <span>${effectiveMax.toLocaleString()}{effectiveMax >= maxPrice ? '+' : ''}</span>
                    </div>
                    {priceRange && (
                      <button
                        onClick={() => setPriceRange(null)}
                        className="text-[12px] text-[#8A8580] hover:text-[#1A1A1A] transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sort */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-1.5 text-[14px] text-[#1A1A1A] hover:text-[#6B6B6B] transition-colors"
              >
                {sortBy}
                <ChevronDown size={14} />
              </button>

              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg py-2 w-[200px] z-20 border border-[#E5E2DD]">
                  {['Relevant', 'Newest', 'Price: Low to High', 'Price: High to Low'].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => handleSortSelect(option)}
                        className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5F4F2] transition-colors"
                      >
                        <span className={sortBy === option ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6B6B]'}>
                          {option}
                        </span>
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Masonry grid — 5 columns */}
      <div className="px-[52px] pb-12 pt-6">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-[16px]">
          {activeTab === 'rooms' ? (
            mockRoomImages.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))
          ) : (
            <>
              {visibleResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              <MasonrySentinel sentinelRef={sentinelRef} hasMore={hasMore} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
