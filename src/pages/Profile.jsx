import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import SurfaceCard from '../components/SurfaceCard'
import { mockProducts, mockSurfaces } from '../data/mockData'

// Pre-compute static banner thumbnails once
const bannerThumbnails = mockProducts.slice(0, 6)

export default function Profile() {
  const [activeTab, setActiveTab] = useState('elements')
  const [showBanner, setShowBanner] = useState(true)

  const elementCount = mockProducts.length
  const dreamboards = useMemo(() => mockSurfaces.filter((s) => s.type === 'dreamboard'), [])
  const rooms = useMemo(() => mockSurfaces.filter((s) => s.type === 'room'), [])
  const collectionCount = dreamboards.length + rooms.length

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[52px] pt-8 pb-12">
        {/* Profile header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-5">
            <img src="/avatar.png" alt="Profile" className="w-[80px] h-[80px] rounded-full object-cover flex-shrink-0" loading="lazy" decoding="async" />
            <div>
              <h1
                className="text-[28px] text-[#1A1A1A] leading-tight"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                Aayush
              </h1>
              <p className="text-[14px] text-[#8A8580]">@aajain2</p>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <button className="text-center hover:opacity-70 transition-opacity">
              <span className="text-[14px] font-semibold text-[#1A1A1A]">01</span>
              <span className="text-[14px] text-[#8A8580] ml-1">Follower</span>
            </button>
            <button className="text-center hover:opacity-70 transition-opacity">
              <span className="text-[14px] font-semibold text-[#1A1A1A]">01</span>
              <span className="text-[14px] text-[#8A8580] ml-1">Following</span>
            </button>
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-7">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-settings'))}
            className="px-6 py-2.5 text-[14px] font-medium text-[#1A1A1A] bg-[#E5E2DD] rounded-full hover:bg-[#D5D2CD] transition-colors"
          >
            Edit Profile
          </button>

          <div className="flex items-center bg-[#E8E6E3] rounded-full p-[3px] border border-[#D8D5D0]">
            <button
              onClick={() => setActiveTab('elements')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                activeTab === 'elements'
                  ? 'bg-white text-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#D5D2CD]'
                  : 'text-[#8A8580] hover:text-[#5A5855]'
              }`}
            >
              Products
              <span className={`text-[12px] font-medium px-2 py-0.5 rounded-md ${
                activeTab === 'elements' ? 'bg-[#E8E6E3] text-[#1A1A1A]' : 'bg-[#DAD7D2] text-[#8A8580]'
              }`}>
                {String(elementCount).padStart(2, '0')}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                activeTab === 'collections'
                  ? 'bg-white text-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#D5D2CD]'
                  : 'text-[#8A8580] hover:text-[#5A5855]'
              }`}
            >
              Collections
              <span className={`text-[12px] font-medium px-2 py-0.5 rounded-md ${
                activeTab === 'collections' ? 'bg-[#E8E6E3] text-[#1A1A1A]' : 'bg-[#DAD7D2] text-[#8A8580]'
              }`}>
                {String(collectionCount).padStart(2, '0')}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-5 py-2 text-[13px] font-medium text-[#1A1A1A] border border-[#D5D2CD] rounded-full hover:bg-[#EEEDEB] transition-colors">
              Organize
            </button>
            <button className="w-9 h-9 flex items-center justify-center border border-[#D5D2CD] rounded-full hover:bg-[#EEEDEB] transition-colors">
              <MoreHorizontal size={16} className="text-[#1A1A1A]" />
            </button>
          </div>
        </div>

        {/* Elements tab */}
        {activeTab === 'elements' && (
          <>
            {showBanner && (
              <div className="mb-6 bg-white rounded-2xl p-6 flex items-center gap-5 border border-[#E5E2DD]">
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-[#1A1A1A] mb-1">
                    Your profile has a new look
                  </h3>
                  <p className="text-[13px] text-[#8A8580] leading-relaxed mb-4">
                    All of your publicly saved elements now appear on your profile. Take a moment to choose what&apos;s visible.
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[#1A1A1A] text-white text-[13px] font-medium rounded-full hover:bg-[#333] transition-colors">
                      Choose what&apos;s visible
                    </button>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="px-4 py-2 text-[13px] font-medium text-[#1A1A1A] border border-[#D5D2CD] rounded-full hover:bg-[#EEEDEB] transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
                <div className="w-[100px] h-[100px] rounded-full bg-[#F5F3F0] flex-shrink-0 flex items-center justify-center">
                  <div className="flex flex-wrap gap-1 w-[60px] justify-center">
                    {bannerThumbnails.map((p, i) => (
                      p.image
                        ? <img key={i} src={p.image} alt="" className="w-[18px] h-[18px] rounded-[4px] object-cover" />
                        : <div key={i} className="w-[18px] h-[18px] rounded-[4px]" style={{ background: p.gradient }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 2000px' }}>
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Collections tab */}
        {activeTab === 'collections' && (
          <div>
            {dreamboards.length > 0 && (
              <section className="mb-10">
                <h2
                  className="text-[18px] text-[#1A1A1A] mb-4"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                >
                  Dreamboards
                </h2>
                <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                  {dreamboards.map((surface) => (
                    <SurfaceCard key={surface.id} surface={surface} />
                  ))}
                </div>
              </section>
            )}

            {rooms.length > 0 && (
              <section>
                <h2
                  className="text-[18px] text-[#1A1A1A] mb-4"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
                >
                  Rooms
                </h2>
                <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
                  {rooms.map((surface) => (
                    <SurfaceCard key={surface.id} surface={surface} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
