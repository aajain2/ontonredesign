import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Search, Wand2, Move, ZoomIn, ZoomOut, Trash2, Plus, Lock } from 'lucide-react'

const mockProducts = [
  { name: 'Modern Sofa', price: '$1,299', color: 'from-blue-50 to-indigo-50' },
  { name: 'Oak Coffee Table', price: '$449', color: 'from-amber-50 to-orange-50' },
  { name: 'Floor Lamp', price: '$189', color: 'from-emerald-50 to-teal-50' },
  { name: 'Area Rug', price: '$329', color: 'from-rose-50 to-pink-50' },
  { name: 'Wall Art Set', price: '$159', color: 'from-violet-50 to-purple-50' },
  { name: 'Plant Pot', price: '$49', color: 'from-lime-50 to-green-50' },
]

export default function Canvas() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-gray-100 bg-white px-4 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1 mr-4">
          <button className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition" title="Select">
            <Move size={16} className="text-muted" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition" title="Layout">
            <Layout size={16} className="text-muted" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition" title="AI Assist">
            <Wand2 size={16} className="text-muted" />
          </button>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        <div className="flex items-center gap-1 ml-2">
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition" title="Zoom in">
            <ZoomIn size={16} className="text-muted" />
          </button>
          <span className="text-xs text-muted mx-1 w-10 text-center">100%</span>
          <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition" title="Zoom out">
            <ZoomOut size={16} className="text-muted" />
          </button>
        </div>

        <div className="flex-1" />

        <button className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition text-red-400" title="Delete">
          <Trash2 size={16} />
        </button>
        <button className="px-5 py-2 bg-primary text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition">
          Save
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Product search */}
        <div className="w-72 border-r border-gray-100 bg-white flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 pt-0">
            <div className="grid grid-cols-2 gap-3">
              {mockProducts.map((product, i) => (
                <div
                  key={i}
                  className="group cursor-grab rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className={`aspect-square bg-gradient-to-br ${product.color}`} />
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas area */}
        <div className="flex-1 bg-[#f8f8f8] relative overflow-hidden">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Mock items on canvas */}
          <div className="absolute top-20 left-24 w-48 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm cursor-move flex items-center justify-center">
            <span className="text-xs text-blue-400">Modern Sofa</span>
          </div>
          <div className="absolute top-40 left-80 w-28 h-28 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 shadow-sm cursor-move flex items-center justify-center">
            <span className="text-xs text-amber-500">Coffee Table</span>
          </div>
          <div className="absolute top-16 right-40 w-20 h-40 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 shadow-sm cursor-move flex items-center justify-center">
            <span className="text-xs text-emerald-500 [writing-mode:vertical-lr]">Floor Lamp</span>
          </div>

          {/* Empty state prompt */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-sm border border-gray-100 flex items-center gap-2">
            <Plus size={14} className="text-muted" />
            <span className="text-xs text-muted">Drag products from the sidebar to your canvas</span>
          </div>
        </div>
      </div>

      {/* Login prompt overlay */}
      <div className="absolute bottom-24 right-8 bg-white rounded-2xl border border-gray-200 shadow-lg p-5 max-w-xs">
        <Lock size={18} className="text-muted mb-2" />
        <h3 className="text-sm font-semibold">Sign in to save</h3>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          Create an account to save your canvases and access them anywhere.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-1 mt-3 px-5 py-2 bg-primary text-white text-xs font-medium rounded-full hover:bg-gray-800 transition"
        >
          Login
        </Link>
      </div>
    </div>
  )
}
