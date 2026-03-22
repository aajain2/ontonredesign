import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, X, ArrowRight } from 'lucide-react'

const roomModes = [
  { id: 'empty', label: 'Empty room', desc: 'Generate a room from scratch' },
  { id: 'furnish', label: 'Furnish my room', desc: 'Upload a photo and redesign it' },
]

const interiorStyles = [
  { name: 'Minimalist', image: '/images/rooms/living-room/living-room-01.jpg' },
  { name: 'Scandinavian', image: '/images/rooms/living-room/living-room-02.jpg' },
  { name: 'Japandi', image: '/images/rooms/living-room/living-room-03.jpg' },
  { name: 'Bohemian', image: '/images/rooms/living-room/living-room-04.jpg' },
  { name: 'Mid-Century Modern', image: '/images/rooms/living-room/living-room-05.jpg' },
  { name: 'Industrial', image: '/images/rooms/living-room/living-room-06.jpg' },
  { name: 'Art Deco', image: '/images/rooms/living-room/living-room-07.jpg' },
  { name: 'Coastal', image: '/images/rooms/living-room/living-room-08.jpg' },
  { name: 'Farmhouse', image: '/images/rooms/living-room/living-room-09.jpg' },
  { name: 'Mediterranean', image: '/images/rooms/living-room/living-room-10.jpg' },
  { name: 'Traditional', image: '/images/rooms/living-room/living-room-11.jpg' },
  { name: 'Contemporary', image: '/images/rooms/living-room/living-room-12.jpg' },
  { name: 'Rustic', image: '/images/rooms/living-room/living-room-13.jpg' },
  { name: 'Wabi-Sabi', image: '/images/rooms/living-room/living-room-14.jpg' },
  { name: 'Tropical', image: '/images/rooms/living-room/living-room-15.jpg' },
  { name: 'French Country', image: '/images/rooms/living-room/living-room-16.jpg' },
  { name: 'Hollywood Regency', image: '/images/rooms/living-room/living-room-17.jpg' },
  { name: 'Biophilic', image: '/images/rooms/living-room/living-room-18.jpg' },
  { name: 'Transitional', image: '/images/rooms/living-room/living-room-19.jpg' },
  { name: 'Modern Farmhouse', image: '/images/rooms/living-room/living-room-20.jpg' },
]

export default function ImagineRoom() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [roomMode, setRoomMode] = useState('empty')
  const [showModeDropdown, setShowModeDropdown] = useState(false)
  const modeLabel = roomModes.find((m) => m.id === roomMode)?.label || 'Empty room'
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  function handleUpload(e) {
    const file = e.target.files?.[0]
    if (file) setUploadedImage(URL.createObjectURL(file))
  }

  function handleGenerate() {
    setIsGenerating(true)
    setTimeout(() => { setIsGenerating(false); setGenerated(true) }, 2500)
  }

  // ── Result view ──
  if (generated) {
    const img = selectedStyle?.image || '/images/rooms/living-room/living-room-05.jpg'
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="px-[52px] pt-6 pb-16 max-w-[960px] mx-auto">
          <button
            onClick={() => setGenerated(false)}
            className="text-[14px] text-[#8A8580] hover:text-[#1A1A1A] transition-colors mb-8 flex items-center gap-1"
          >
            <ArrowRight size={14} className="rotate-180" /> Back
          </button>

          <div className="rounded-xl overflow-hidden mb-8">
            <img src={img} alt="Generated room" className="w-full aspect-[16/10] object-cover" />
          </div>

          <div className="flex items-start justify-between mb-10">
            <div>
              <h2
                className="text-[28px] text-[#1A1A1A] leading-tight"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                {selectedStyle?.name || 'Custom'} Room
              </h2>
              <p className="text-[14px] text-[#8A8580] mt-1">{prompt || 'AI-generated room design'}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setGenerated(false); handleGenerate() }}
                className="px-5 py-2.5 text-[13px] font-medium text-[#1A1A1A] border border-[#D5D2CD] rounded-full hover:bg-[#EEEDEB] transition-colors"
              >
                Regenerate
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="px-5 py-2.5 text-[13px] font-medium text-white bg-[#1A1A1A] rounded-full hover:bg-[#333] transition-colors"
              >
                Save to My Rooms
              </button>
            </div>
          </div>

          <div className="border-t border-[#E5E2DD] pt-8">
            <h3
              className="text-[18px] text-[#1A1A1A] mb-5"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              Products in this room
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { name: 'Bouclé Club Chair', price: 2950, img: '/images/products/product-46.jpg' },
                { name: 'Serpentine Floor Lamp', price: 895, img: '/images/products/product-39.jpg' },
                { name: 'Resin Side Table', price: 495, img: '/images/products/product-47.jpg' },
                { name: 'Wool Fringed Rug', price: 695, img: '/images/products/product-26.jpg' },
                { name: 'Wave Throw Pillow', price: 95, img: '/images/products/product-49.jpg' },
                { name: 'Ceramic Table Lamp', price: 520, img: '/images/products/product-18.jpg' },
              ].map((p, i) => (
                <div key={i} className="flex-shrink-0 w-[130px] cursor-pointer group">
                  <div className="w-full aspect-[4/5] rounded-lg overflow-hidden mb-2">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                  </div>
                  <p className="text-[12px] font-medium text-[#1A1A1A] truncate">{p.name}</p>
                  <p className="text-[12px] text-[#8A8580]">${p.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Editor view ──
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[52px] pt-16 pb-16">
        <div className="max-w-[680px] mx-auto">
          {/* Title */}
          <h1
            className="text-center text-[42px] text-[#1A1A1A] leading-[1.1] mb-3"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
          >
            Reimagine your space
          </h1>
          <p className="text-center text-[15px] text-[#8A8580] mb-16">
            Generate a room from scratch or furnish your own
          </p>

          {/* Three input slots */}
          <div className="flex items-start gap-6 mb-4">
            {/* 1. Room mode / Upload */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-full aspect-square rounded-2xl border border-dashed flex items-center justify-center overflow-hidden relative group transition-colors ${
                  roomMode === 'furnish'
                    ? 'border-[#999] cursor-pointer hover:border-[#666]'
                    : 'border-[#D0CDC8]'
                }`}
                onClick={() => roomMode === 'furnish' && fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <>
                    <img src={uploadedImage} alt="" className="w-full h-full object-cover" />
                    <button
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => { e.stopPropagation(); setUploadedImage(null) }}
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#B0ADA8]">
                      <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="12" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M4 22L10 16.5L14 20L20 13L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      {roomMode === 'furnish' && (
                        <>
                          <circle cx="24" cy="10" r="3" fill="currentColor" opacity="0.15"/>
                          <path d="M23 10H25M24 9V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </>
                      )}
                    </svg>
                    {roomMode === 'furnish' && (
                      <span className="text-[11px] text-[#B0ADA8]">Upload photo</span>
                    )}
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </div>
              <div className="relative mt-3">
                <button
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="flex items-center gap-1 text-[13px] text-[#1A1A1A]"
                >
                  {modeLabel} <ChevronDown size={12} />
                </button>
                {showModeDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-[#F5F3F0] rounded-xl shadow-lg py-1.5 w-[200px] z-20 border border-[#E5E2DD]">
                    {roomModes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setRoomMode(mode.id)
                          setShowModeDropdown(false)
                          if (mode.id === 'empty') setUploadedImage(null)
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-[#EEEDEB] transition-colors ${
                          roomMode === mode.id ? 'text-[#1A1A1A]' : 'text-[#8A8580]'
                        }`}
                      >
                        <p className={`text-[13px] ${roomMode === mode.id ? 'font-medium' : ''}`}>{mode.label}</p>
                        <p className="text-[11px] text-[#B0ADA8]">{mode.desc}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Style */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-full aspect-square rounded-2xl border border-dashed border-[#D0CDC8] flex items-center justify-center overflow-hidden">
                {selectedStyle ? (
                  <img src={selectedStyle.image} alt={selectedStyle.name} className="w-full h-full object-cover" />
                ) : (
                  <ArrowRight size={28} className="text-[#B0ADA8] rotate-90" />
                )}
              </div>
              <span className="text-[13px] text-[#8A8580] mt-3">Style</span>
            </div>

            {/* 3. Prompt */}
            <div className="flex flex-col flex-[1.8]">
              <div className="relative w-full">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want..."
                  className="w-full aspect-square rounded-2xl bg-[#EEEDEB] px-5 py-4 text-[14px] text-[#1A1A1A] placeholder:text-[#B0ADA8] outline-none resize-none"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="absolute bottom-4 right-4 px-5 py-2 bg-[#1A1A1A] text-white text-[13px] font-medium rounded-full hover:bg-[#333] transition-colors disabled:opacity-40"
                >
                  {isGenerating ? 'Dreaming...' : 'Dream'}
                </button>
              </div>
              <span className="text-[13px] text-[#8A8580] mt-3 text-center">Prompt</span>
            </div>
          </div>
        </div>

        {/* Style picker — full width */}
        <div className="max-w-[960px] mx-auto mt-12">
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-[14px] text-[#8A8580]">Pick your style</span>
            {selectedStyle && (
              <span className="text-[13px] text-[#1A1A1A] font-medium">{selectedStyle.name}</span>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {interiorStyles.map((style) => {
              const active = selectedStyle?.name === style.name
              return (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(active ? null : style)}
                  className="flex-shrink-0"
                >
                  <div className={`w-[160px] h-[120px] rounded-xl overflow-hidden transition-all duration-300 ${
                    active ? 'ring-[2px] ring-[#1A1A1A] ring-offset-2 ring-offset-[#F5F4F2]' : 'hover:opacity-90'
                  }`}>
                    <img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <p className={`text-[12px] mt-2 text-center transition-colors ${
                    active ? 'text-[#1A1A1A] font-medium' : 'text-[#8A8580]'
                  }`}>
                    {style.name}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Generate */}
        <div className="max-w-[680px] mx-auto mt-8">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-[#1A1A1A] text-white text-[14px] font-medium rounded-full hover:bg-[#333] transition-colors flex items-center justify-center gap-2.5 disabled:opacity-40"
          >
            {isGenerating ? 'Generating your space...' : (
              <>Reimagine <ArrowRight size={15} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
