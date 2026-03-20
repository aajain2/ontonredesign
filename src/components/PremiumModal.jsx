import { CheckCircle } from 'lucide-react'

const features = [
  'Unlimited dreamboards & rooms',
  'Early access to beta features',
  'Collaborate with friends',
  'Customize your grid',
  'Bulk export elements',
]

export default function PremiumModal({ onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#0A0A0A]/90 z-[60]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="w-full max-w-[420px] rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 0 60px 10px rgba(120, 80, 220, 0.3), 0 0 120px 20px rgba(120, 80, 220, 0.15)',
            border: '1.5px solid rgba(147, 112, 219, 0.5)',
          }}
        >
          {/* Hero section */}
          <div className="bg-[#0F0F0F] pt-10 pb-6 px-8 text-center relative overflow-hidden">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(147, 112, 219, 0.4) 0%, transparent 60%)',
              }}
            />

            {/* Floating orbs (decorative) */}
            <div className="relative mb-4">
              <div className="flex justify-center gap-4 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7355] to-[#6B5A3E] opacity-80" />
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C4A265] to-[#8B7355]" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#A8A29E] to-[#6B6560] mt-2" />
              </div>
            </div>

            {/* Brand */}
            <h2
              className="text-[28px] text-white tracking-wide mb-2 relative"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
            >
              ONTON<span className="text-[12px] align-super ml-0.5">®</span>
            </h2>

            {/* Premium badge */}
            <div className="inline-block px-4 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[13px] font-medium text-white/90 mb-4">
              Premium
            </div>

            {/* More orbs */}
            <div className="flex justify-center gap-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6B8E7B] to-[#4A5944] opacity-70" />
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9B8FE8] to-[#6B5FBE]" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#555] to-[#333] opacity-60" />
            </div>
          </div>

          {/* Features section */}
          <div className="bg-[#111] px-8 pb-8 pt-6">
            {/* What's included */}
            <div className="flex items-center gap-3 mb-5">
              <h3
                className="text-[18px] text-white/90"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 400 }}
              >
                What&apos;s included
              </h3>
              <div className="flex-1 border-t border-dashed border-white/20" />
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-white/60 flex-shrink-0" />
                  <span className="text-[14px] text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full py-3.5 bg-white text-[#1A1A1A] text-[14px] font-semibold rounded-full hover:bg-white/90 transition-colors">
              Go Premium for $6/mo
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 text-[14px] text-white/50 hover:text-white/70 transition-colors mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
