import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

export default function NewClusterModal({ onClose, onCreate }) {
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState('Public')
  const [showDropdown, setShowDropdown] = useState(false)

  function handleCreate() {
    if (onCreate) onCreate({ name: name.trim() || 'Untitled', visibility })
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="bg-[#F5F3F0] rounded-2xl shadow-2xl w-full max-w-[420px] p-7">
          {/* Title */}
          <h2
            className="text-[22px] text-center text-[#1A1A1A] mb-1"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            New Dreamboard
          </h2>
          <p className="text-[13px] text-[#8A8580] text-center mb-6">
            A curated collection of inspiration
          </p>

          {/* Input row */}
          <div className="flex items-center gap-2 bg-[#EDEBE8] rounded-full px-5 py-3 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex. \u2018Editorial\u2019"
              className="flex-1 bg-transparent text-[14px] outline-none text-[#1A1A1A] placeholder:text-[#A8A29E]"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />

            {/* Visibility toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1.5 bg-[#E0DDD8] rounded-full px-3 py-1.5 text-[12px] font-medium text-[#1A1A1A] hover:bg-[#D5D2CD] transition-colors"
              >
                <Globe size={13} />
                {visibility}
                <ChevronDown size={12} />
              </button>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-lg py-1 w-[130px] z-10">
                  {['Public', 'Private'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setVisibility(opt)
                        setShowDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#F5F3F0] transition-colors ${
                        visibility === opt ? 'font-semibold text-[#1A1A1A]' : 'text-[#8A8580]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            className="w-full py-3.5 bg-[#1A1A1A] text-white text-[14px] font-medium rounded-full hover:bg-[#333] transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </>
  )
}
