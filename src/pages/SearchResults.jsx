import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Settings } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { mockProducts, productCategories } from '../data/mockData'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [activeTab, setActiveTab] = useState('elements')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Show All')
  const [sortBy, setSortBy] = useState('Relevant')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const categoryRef = useRef(null)
  const sortRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false)
      }
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Filter products
  let results = query
    ? mockProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.retailer.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : mockProducts

  if (results.length === 0) results = mockProducts

  // Category filter
  if (selectedCategory !== 'Show All') {
    results = results.filter((p) => p.category === selectedCategory)
  }

  // Sort
  if (sortBy === 'Price: Low to High') {
    results = [...results].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'Price: High to Low') {
    results = [...results].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'Newest') {
    results = [...results].sort((a, b) => b.id - a.id)
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Filter bar — Are.na style */}
      <div className="sticky top-0 z-10 bg-[#F5F4F2] border-b border-[#E5E2DD]">
        <div className="px-8 py-3 flex items-center justify-between">
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
                    onClick={() => {
                      setSelectedCategory(cat)
                      setShowCategoryDropdown(false)
                    }}
                    className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5F4F2] transition-colors flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedCategory === cat
                          ? 'text-[#1A1A1A] font-medium'
                          : 'text-[#6B6B6B]'
                      }
                    >
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

          {/* Center: Elements / Clusters / Profiles tabs */}
          <div className="flex items-center gap-1">
            {['Elements', 'Clusters', 'Profiles'].map((tab) => {
              const tabKey = tab.toLowerCase()
              const isActive = activeTab === tabKey
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
                  {tab === 'Elements' && (
                    <ChevronDown size={12} className="inline ml-1" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: Settings gear + Relevant sort */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E5E2DD] transition-colors">
              <Settings size={16} className="text-[#8A8580]" />
            </button>

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
                        onClick={() => {
                          setSortBy(option)
                          setShowSortDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F5F4F2] transition-colors"
                      >
                        <span
                          className={
                            sortBy === option
                              ? 'text-[#1A1A1A] font-medium'
                              : 'text-[#6B6B6B]'
                          }
                        >
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

      {/* Masonry grid — 5 columns like Are.na */}
      <div className="px-[52px] pb-12 pt-6">
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-[16px]">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
