import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Upload, Image, ArrowRight, X, Sparkles } from 'lucide-react'

const roomTypes = [
  'Empty room', 'Living room', 'Bedroom', 'Kitchen', 'Dining room',
  'Bathroom', 'Home office', 'Nursery', 'Patio', 'Attic',
  'Basement', 'Garage', 'Hallway', 'Sunroom', 'Mudroom',
]

const interiorStyles = [
  { name: 'Minimalist', image: '/images/rooms/living-room/living-room-01.jpg' },
  { name: 'Scandinavian', image: '/images/rooms/living-room/living-room-02.jpg' },
  { name: 'Modern Minimalist', image: '/images/rooms/living-room/living-room-03.jpg' },
  { name: 'Bohemian', image: '/images/rooms/living-room/living-room-04.jpg' },
  { name: 'Mid-Century Modern', image: '/images/rooms/living-room/living-room-05.jpg' },
  { name: 'Japandi', image: '/images/rooms/living-room/living-room-06.jpg' },
  { name: 'Industrial', image: '/images/rooms/living-room/living-room-07.jpg' },
  { name: 'Art Deco', image: '/images/rooms/living-room/living-room-08.jpg' },
  { name: 'Coastal', image: '/images/rooms/living-room/living-room-09.jpg' },
  { name: 'Farmhouse', image: '/images/rooms/living-room/living-room-10.jpg' },
  { name: 'Mediterranean', image: '/images/rooms/living-room/living-room-11.jpg' },
  { name: 'Traditional', image: '/images/rooms/living-room/living-room-12.jpg' },
  { name: 'Transitional', image: '/images/rooms/living-room/living-room-13.jpg' },
  { name: 'Contemporary', image: '/images/rooms/living-room/living-room-14.jpg' },
  { name: 'Rustic', image: '/images/rooms/living-room/living-room-15.jpg' },
  { name: 'Wabi-Sabi', image: '/images/rooms/living-room/living-room-16.jpg' },
  { name: 'Tropical', image: '/images/rooms/living-room/living-room-17.jpg' },
  { name: 'French Country', image: '/images/rooms/living-room/living-room-18.jpg' },
  { name: 'Hollywood Regency', image: '/images/rooms/living-room/living-room-19.jpg' },
  { name: 'Biophilic', image: '/images/rooms/living-room/living-room-20.jpg' },
]

export default function ImagineRoom() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [roomType, setRoomType] = useState('Empty room')
  const [showRoomDropdown, setShowRoomDropdown] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  function handleUpload(e) {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUploadedImage(url)
    }
  }

  function handleGenerate() {
    setIsGenerating(true)
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false)
      setGenerated(true)
    }, 2500)
  }

  function handleSaveToRooms() {
    navigate('/profile')
  }

  // Generated result view
  if (generated) {
    const resultImage = selectedStyle?.image || '/images/rooms/living-room/living-room-05.jpg'
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="px-[52px] py-8">
          {/* Back */}
          <button
            onClick={() => setGenerated(false)}
            className="text-[14px] text-[#8A8580] hover:text-[#1A1A1A] transition-colors mb-6"
          >
            ← Back to editor
          </button>

          <div className="max-w-[900px] mx-auto">
            {/* Result image */}
            <div className="rounded-2xl overflow-hidden mb-6">
              <img src={resultImage} alt="Generated room" className="w-full aspect-[16/10] object-cover" />
            </div>

            {/* Info */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2
                  className="text-[24px] text-[#1A1A1A] mb-1"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
                >
                  {roomType} · {selectedStyle?.name || 'Custom'}
                </h2>
                <p className="text-[14px] text-[#8A8580]">
                  {prompt || 'AI-generated room design'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleGenerate}
                  className="px-5 py-2.5 text-[14px] font-medium text-[#1A1A1A] border border-[#D5D2CD] rounded-full hover:bg-[#EEEDEB] transition-colors flex items-center gap-2"
                >
                  <Sparkles size={15} />
                  Regenerate
                </button>
                <button
                  onClick={handleSaveToRooms}
                  className="px-5 py-2.5 text-[14px] font-medium text-white bg-[#1A1A1A] rounded-full hover:bg-[#333] transition-colors"
                >
                  Save to My Rooms
                </button>
              </div>
            </div>

            {/* Products identified */}
            <div className="border-t border-[#E5E2DD] pt-6">
              <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">Products in this room</h3>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { name: 'Bouclé Sofa', price: 2950, img: '/images/products/product-46.jpg' },
                  { name: 'Floor Lamp', price: 895, img: '/images/products/product-39.jpg' },
                  { name: 'Side Table', price: 495, img: '/images/products/product-47.jpg' },
                  { name: 'Area Rug', price: 695, img: '/images/products/product-26.jpg' },
                  { name: 'Throw Pillow', price: 95, img: '/images/products/product-49.jpg' },
                ].map((p, i) => (
                  <div key={i} className="flex-shrink-0 w-[140px]">
                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-2">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[13px] font-medium text-[#1A1A1A] truncate">{p.name}</p>
                    <p className="text-[13px] text-[#8A8580]">${p.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[52px] py-8">
        <div className="max-w-[820px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-[36px] text-[#1A1A1A] mb-2"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              Reimagine your space
            </h1>
            <p className="text-[15px] text-[#8A8580]">
              Generate a room from scratch or furnish your own
            </p>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-2xl border border-[#E5E2DD] p-8 mb-8">
            {/* Input row: Room upload + Style + Prompt */}
            <div className="flex gap-4 mb-2">
              {/* Upload / Room type box */}
              <div className="flex flex-col items-center">
                <div
                  className="w-[120px] h-[100px] rounded-xl border-2 border-dashed border-[#D5D2CD] flex items-center justify-center cursor-pointer hover:border-[#8A8580] transition-colors overflow-hidden relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <>
                      <img src={uploadedImage} alt="" className="w-full h-full object-cover" />
                      <button
                        className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center"
                        onClick={(e) => { e.stopPropagation(); setUploadedImage(null) }}
                      >
                        <X size={12} className="text-white" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Image size={24} className="text-[#8A8580]" />
                      <Upload size={12} className="text-[#8A8580]" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />
                </div>
                {/* Room type dropdown */}
                <div className="relative mt-2">
                  <button
                    onClick={() => setShowRoomDropdown(!showRoomDropdown)}
                    className="flex items-center gap-1 text-[13px] text-[#1A1A1A] font-medium"
                  >
                    {roomType}
                    <ChevronDown size={13} />
                  </button>
                  {showRoomDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-xl shadow-lg border border-[#E5E2DD] py-1 w-[160px] z-20 max-h-[200px] overflow-y-auto">
                      {roomTypes.map((rt) => (
                        <button
                          key={rt}
                          onClick={() => { setRoomType(rt); setShowRoomDropdown(false) }}
                          className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F5F4F2] transition-colors ${
                            roomType === rt ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6B6B]'
                          }`}
                        >
                          {rt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Style slot */}
              <div className="flex flex-col items-center">
                <div className="w-[120px] h-[100px] rounded-xl border-2 border-dashed border-[#D5D2CD] flex items-center justify-center overflow-hidden">
                  {selectedStyle ? (
                    <img src={selectedStyle.image} alt={selectedStyle.name} className="w-full h-full object-cover" />
                  ) : (
                    <ArrowRight size={24} className="text-[#8A8580] rotate-90" />
                  )}
                </div>
                <span className="text-[13px] text-[#8A8580] mt-2">Style</span>
              </div>

              {/* Prompt area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your dream space..."
                    className="w-full h-[100px] bg-[#F5F4F2] rounded-xl px-4 py-3 text-[14px] text-[#1A1A1A] placeholder:text-[#B0ADA8] outline-none resize-none"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="absolute bottom-3 right-3 px-4 py-1.5 bg-[#1A1A1A] text-white text-[13px] font-medium rounded-full hover:bg-[#333] transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? 'Dreaming...' : 'Dream'}
                  </button>
                </div>
                <span className="text-[13px] text-[#8A8580] mt-2 text-center">Prompt</span>
              </div>
            </div>
          </div>

          {/* Pick your style */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] text-[#8A8580]">Pick your style</h3>
              {selectedStyle && (
                <span className="text-[14px] text-[#1A1A1A] font-medium">{selectedStyle.name}</span>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {interiorStyles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(selectedStyle?.name === style.name ? null : style)}
                  className="flex-shrink-0 group/style"
                >
                  <div
                    className={`w-[150px] h-[110px] rounded-xl overflow-hidden transition-all ${
                      selectedStyle?.name === style.name
                        ? 'ring-2 ring-[#1A1A1A] scale-[1.03]'
                        : 'hover:scale-[1.02]'
                    }`}
                  >
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className={`text-[12px] mt-1.5 text-center transition-colors ${
                    selectedStyle?.name === style.name ? 'text-[#1A1A1A] font-medium' : 'text-[#8A8580]'
                  }`}>
                    {style.name}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate button — full width */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-[#1A1A1A] text-white text-[15px] font-medium rounded-full hover:bg-[#333] transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isGenerating ? (
              <>Generating your space...</>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Room
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
