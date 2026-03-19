import { useState } from 'react'
import { Sparkles, Upload, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const roomTypes = [
  'Default', 'Attic', 'Basement', 'Bathroom', 'Bedroom',
  'Dining room', 'Garage', 'Home office', 'Kitchen',
  'Living room', 'Nursery', 'Patio', 'Hallway',
]

const styles = [
  'Art Deco', 'Bohemian', 'Contemporary', 'Coastal',
  'Farmhouse', 'Industrial', 'Japanese', 'Mediterranean',
  'Mid-century Modern', 'Minimalist', 'Rustic', 'Scandinavian',
  'Traditional', 'Transitional', 'Tropical',
]

const dimensions = [
  { label: '1x', value: '1152 × 896' },
  { label: '2x', value: '896 × 1152' },
  { label: '3x', value: '1024 × 1024' },
  { label: '4x', value: '1344 × 768' },
]

export default function Imagine() {
  const [roomType, setRoomType] = useState('Living room')
  const [style, setStyle] = useState('Minimalist')
  const [dimension, setDimension] = useState(0)
  const [prompt, setPrompt] = useState('')
  const [uploadMode, setUploadMode] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerated(true)
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-20">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight animate-fade-in-up">
            Create your dream space with AI
          </h1>
          <p className="mt-3 text-muted animate-fade-in-up-delay-1">
            Choose your preferences and let AI design your perfect room
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Form */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Upload toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Upload existing room?</span>
              <button
                onClick={() => setUploadMode(!uploadMode)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  uploadMode ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    uploadMode ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {uploadMode && (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-gray-300 transition-colors cursor-pointer">
                <Upload size={28} className="mx-auto text-muted mb-3" />
                <p className="text-sm text-muted">
                  Click or drag to upload your room photo
                </p>
              </div>
            )}

            {/* Room type */}
            <div>
              <label className="block text-sm font-medium mb-2">Room type</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              >
                {roomTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Style */}
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all ${
                      style === s
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-muted border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium mb-2">Dimensions</label>
              <div className="flex gap-2">
                {dimensions.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setDimension(i)}
                    className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all ${
                      dimension === i
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-muted border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {d.label}
                    <span className="block text-[10px] mt-0.5 opacity-70">{d.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Custom prompt <span className="text-muted font-normal">(optional)</span>
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe additional details for your room..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Sparkles size={16} />
              Generate
            </button>
          </div>

          {/* Generated result area */}
          {generated && (
            <div className="border-t border-gray-100 p-6 md:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="aspect-[4/3] rounded-xl overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ['#f0f4f8, #d9e2ec', '#fef3c7, #fde68a', '#d1fae5, #a7f3d0', '#ede9fe, #c4b5fd'][n - 1]
                      })`,
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles size={24} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-xs text-gray-400">
                          {style} {roomType} — Variation {n}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upsell */}
        <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
          <Lock size={20} className="mx-auto text-muted mb-3" />
          <h3 className="text-base font-semibold">Unlock more features</h3>
          <p className="text-sm text-muted mt-1">
            Upgrade to any paid plan to unlock Imagine history, more variations, and higher quality outputs.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 mt-4 px-7 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
          >
            Upgrade now
          </Link>
        </div>
      </section>
    </div>
  )
}
