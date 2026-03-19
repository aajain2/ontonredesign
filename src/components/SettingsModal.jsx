import { useState } from 'react'
import { X, Pencil, ChevronDown, ChevronRight, Eye, EyeOff, AlertCircle, Check, Info } from 'lucide-react'

const sidebarItems = [
  'Profile',
  'Account',
  'Password',
  'Subscription',
  'Payment Method',
  'Import Content',
]

// Floating label input
function FloatingInput({ label, defaultValue = '', type = 'text', rightElement, className = '' }) {
  const [val, setVal] = useState(defaultValue)
  return (
    <div className={`relative border border-[#E5E2DD] rounded-xl px-4 pt-5 pb-2 ${className}`}>
      <label className="absolute top-2 left-4 text-[11px] text-[#8A8580]">{label}</label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        className="w-full text-[14px] text-[#1A1A1A] bg-transparent outline-none"
      />
      {rightElement && <div className="absolute top-1/2 -translate-y-1/2 right-4">{rightElement}</div>}
    </div>
  )
}

// Floating label textarea
function FloatingTextarea({ label, defaultValue = '', maxLen }) {
  const [val, setVal] = useState(defaultValue)
  return (
    <div className="relative border border-[#E5E2DD] rounded-xl px-4 pt-5 pb-2">
      <label className="absolute top-2 left-4 text-[11px] text-[#8A8580]">{label}</label>
      {maxLen && (
        <span className="absolute top-2 right-4 text-[11px] text-[#8A8580]">{val.length}/{maxLen}</span>
      )}
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        maxLength={maxLen}
        className="w-full text-[14px] text-[#1A1A1A] bg-transparent outline-none resize-none h-16 mt-1"
      />
    </div>
  )
}

// Password input with toggle
function PasswordInput({ label }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative border border-[#E5E2DD] rounded-xl px-4 py-3.5">
      <input
        type={show ? 'text' : 'password'}
        placeholder={label}
        className="w-full text-[14px] text-[#1A1A1A] bg-transparent outline-none placeholder:text-[#A8A29E] pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute top-1/2 -translate-y-1/2 right-4 text-[#8A8580] hover:text-[#1A1A1A] transition-colors"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  )
}

// ── Tab Panels ──

function ProfilePanel() {
  return (
    <div className="space-y-4">
      <FloatingInput
        label="Username"
        defaultValue="@aajain2"
        rightElement={<Pencil size={16} className="text-[#8A8580]" />}
      />
      <FloatingInput label="Full name" defaultValue="Aayush" />
      <FloatingInput label="Website" />
      <FloatingTextarea label="Bio" maxLen={68} />

      {/* Social */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-medium text-[#1A1A1A]">Social</span>
          <span className="text-[12px] text-[#8A8580]">Add up to 2 social links</span>
        </div>
        <div className="border border-[#E5E2DD] rounded-xl px-4 py-3.5 flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="6" stroke="#8A8580" strokeWidth="1.8"/><circle cx="12" cy="12" r="5" stroke="#8A8580" strokeWidth="1.8"/><circle cx="18" cy="6" r="1.5" fill="#8A8580"/></svg>
          <input placeholder="@username" className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-[#A8A29E] text-[#1A1A1A]" />
        </div>
      </div>
    </div>
  )
}

function AccountPanel() {
  return (
    <div className="space-y-4">
      <FloatingInput
        label="Email"
        defaultValue="jainaayushmr@gmail.com"
        rightElement={
          <button className="text-[13px] font-medium text-[#C75050] flex items-center gap-1 hover:opacity-80">
            Verify <ChevronRight size={13} />
          </button>
        }
      />
      <FloatingInput label="Birthday" defaultValue="12 / 12 / 2003" />
      <div className="relative border border-[#E5E2DD] rounded-xl px-4 pt-5 pb-2">
        <label className="absolute top-2 left-4 text-[11px] text-[#8A8580]">Country</label>
        <div className="flex items-center justify-between">
          <span className="text-[14px] text-[#A8A29E]">Select...</span>
          <ChevronDown size={16} className="text-[#8A8580]" />
        </div>
      </div>

      <div className="pt-12">
        <button className="text-[14px] text-[#C75050] font-medium hover:opacity-80">Close Account</button>
        <p className="text-[12px] text-[#8A8580] mt-1">Permanently delete everything</p>
      </div>
    </div>
  )
}

function PasswordPanel() {
  return (
    <div className="space-y-4">
      <PasswordInput label="Current Password" />
      <PasswordInput label="New Password" />
      <PasswordInput label="Confirm new password" />
    </div>
  )
}

function SubscriptionPanel() {
  return (
    <div>
      <p className="text-[14px] text-[#8A8580] leading-relaxed mb-6">
        You're currently on the Free Plan. Upgrade to Premium and gain access to advanced tools and features:
      </p>
      <div className="space-y-3 mb-8">
        {[
          'Unlock all username possibilities',
          'Early access to beta features',
          'Collaborate with friends',
          'Customize your grid',
          'Bulk export elements',
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-[#EEEDEB] rounded-[14px] px-4 py-3 w-fit">
            <Check size={16} className="text-[#8A8580]" />
            <span className="text-[14px] text-[#1A1A1A]">{feature}</span>
            {i === 0 && <Info size={14} className="text-[#A8A29E]" />}
          </div>
        ))}
      </div>
      <div className="border-t border-[#E5E2DD] pt-5 flex justify-end">
        <button className="px-6 py-2.5 bg-[#1A1A1A] text-white text-[14px] font-medium rounded-full hover:bg-[#333] transition-colors">
          Go Premium
        </button>
      </div>
    </div>
  )
}

function PaymentMethodPanel() {
  return (
    <div>
      <p className="text-[14px] text-[#8A8580] mb-5">Please add a card on file.</p>
      <div className="border border-[#E5E2DD] rounded-xl px-4 py-3.5 flex items-center gap-3">
        <div className="w-8 h-5 rounded bg-[#E5E2DD]" />
        <input placeholder="Card number" className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-[#A8A29E] text-[#1A1A1A]" />
        <span className="text-[13px] text-[#A8A29E]">MM / YY</span>
        <span className="text-[13px] text-[#A8A29E]">CVV</span>
      </div>
    </div>
  )
}

function ImportContentPanel() {
  return (
    <div className="space-y-4">
      {/* Warning */}
      <div className="flex items-center justify-between bg-[#F5D5D5]/50 rounded-xl px-5 py-3.5 cursor-pointer hover:bg-[#F5D5D5]/70 transition-colors">
        <div className="flex items-center gap-3">
          <AlertCircle size={18} className="text-[#C75050]" />
          <span className="text-[14px] text-[#C75050] font-medium">Browser extension required</span>
        </div>
        <ChevronRight size={18} className="text-[#C75050]" />
      </div>

      {/* Sources */}
      <div className="divide-y divide-[#E5E2DD]">
        <button className="w-full flex items-center gap-4 py-4 hover:bg-[#F5F3F0] transition-colors rounded-lg px-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.87 6.42 9.31-.09-.78-.17-1.99.04-2.84.18-.78 1.2-5.08 1.2-5.08s-.31-.61-.31-1.51c0-1.42.82-2.48 1.84-2.48.87 0 1.29.65 1.29 1.43 0 .87-.56 2.18-.84 3.39-.24 1.01.51 1.83 1.5 1.83 1.8 0 3.18-1.9 3.18-4.63 0-2.42-1.74-4.11-4.22-4.11-2.88 0-4.57 2.16-4.57 4.39 0 .87.33 1.8.75 2.31.08.1.09.19.07.29-.08.31-.25 1.01-.28 1.15-.05.19-.15.23-.35.14-1.31-.61-2.13-2.52-2.13-4.06 0-3.31 2.4-6.35 6.93-6.35 3.64 0 6.46 2.59 6.46 6.06 0 3.61-2.28 6.52-5.44 6.52-1.06 0-2.06-.55-2.4-1.2l-.65 2.49c-.24.91-.88 2.06-1.31 2.75.99.31 2.03.47 3.12.47 5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="#8A8580"/></svg>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-medium text-[#1A1A1A]">Pinterest</p>
            <p className="text-[12px] text-[#8A8580]">Import Pinterest boards</p>
          </div>
          <ChevronRight size={18} className="text-[#A8A29E]" />
        </button>

        <button className="w-full flex items-center gap-4 py-4 hover:bg-[#F5F3F0] transition-colors rounded-lg px-1">
          <span className="text-[18px] font-bold text-[#8A8580] w-[22px] text-center">**</span>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-medium text-[#1A1A1A]">Are.na</p>
            <p className="text-[12px] text-[#8A8580]">Import Are.na channels</p>
          </div>
          <ChevronRight size={18} className="text-[#A8A29E]" />
        </button>

        <div className="flex items-center gap-4 py-4 px-1 opacity-60">
          <span className="text-[18px] font-bold text-[#8A8580] w-[22px] text-center">t</span>
          <div className="flex-1 text-left">
            <p className="text-[14px] font-medium text-[#1A1A1A]">Tumblr</p>
            <p className="text-[12px] text-[#8A8580]">Import Tumblr blogs</p>
          </div>
          <span className="text-[11px] text-[#C75050] font-medium">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}

// Slack icon
function SlackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5.04 15.16a1.29 1.29 0 11-2.58 0 1.29 1.29 0 012.58 0zm.65 0a1.29 1.29 0 012.58 0v3.23a1.29 1.29 0 11-2.58 0v-3.23z" fill="#E01E5A"/>
      <path d="M8.84 5.04a1.29 1.29 0 110-2.58 1.29 1.29 0 010 2.58zm0 .65a1.29 1.29 0 110 2.58H5.61a1.29 1.29 0 110-2.58h3.23z" fill="#36C5F0"/>
      <path d="M18.96 8.84a1.29 1.29 0 112.58 0 1.29 1.29 0 01-2.58 0zm-.65 0a1.29 1.29 0 11-2.58 0V5.61a1.29 1.29 0 112.58 0v3.23z" fill="#2EB67D"/>
      <path d="M15.16 18.96a1.29 1.29 0 110 2.58 1.29 1.29 0 010-2.58zm0-.65a1.29 1.29 0 110-2.58h3.23a1.29 1.29 0 110 2.58h-3.23z" fill="#ECB22E"/>
    </svg>
  )
}

// Chrome icon
function ChromeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="20" fill="#fff" stroke="#E5E2DD" strokeWidth="2"/>
      <circle cx="24" cy="24" r="8" fill="#4285F4"/>
      <path d="M24 16h16.8" stroke="#DB4437" strokeWidth="6" strokeLinecap="round"/>
      <path d="M15.6 29L7.2 14.4" stroke="#0F9D58" strokeWidth="6" strokeLinecap="round"/>
      <path d="M32.4 29L24 44.8" stroke="#F4B400" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  )
}

// ── Main Modal ──

export default function SettingsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('Profile')

  function renderPanel() {
    switch (activeTab) {
      case 'Profile': return <ProfilePanel />
      case 'Account': return <AccountPanel />
      case 'Password': return <PasswordPanel />
      case 'Subscription': return <SubscriptionPanel />
      case 'Payment Method': return <PaymentMethodPanel />
      case 'Import Content': return <ImportContentPanel />
      default: return null
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]" onClick={onClose} />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="bg-[#F5F4F2] rounded-2xl shadow-2xl w-full max-w-[660px] max-h-[80vh] flex overflow-hidden">
          {/* Left sidebar */}
          <div className="w-[220px] flex-shrink-0 flex flex-col p-5 border-r border-[#EEEDEB]">
            {/* Avatar */}
            <div className="relative w-[76px] h-[76px] mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F8A4B8] to-[#E87BA0]" />
              <button className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-[#F5F3F0] transition-colors border border-[#E5E2DD]">
                <Pencil size={11} className="text-[#1A1A1A]" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-0.5 flex-1">
              {sidebarItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`text-left px-3.5 py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-between ${
                    activeTab === item
                      ? 'bg-[#EEEDEB] text-[#1A1A1A] font-medium'
                      : 'text-[#1A1A1A] hover:bg-[#EEEDEB]/60'
                  }`}
                >
                  {item}
                  {item === 'Account' && (
                    <span className="w-2 h-2 rounded-full bg-[#8B9A3A]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Bottom links */}
            <div className="mt-4 space-y-1">
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#EEEDEB] transition-colors text-left">
                <SlackIcon />
                <span className="text-[13px] text-[#1A1A1A]">Join us on Slack</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#EEEDEB] transition-colors text-left">
                <ChromeIcon />
                <span className="text-[13px] text-[#1A1A1A]">Get the extension</span>
              </button>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 p-6 overflow-y-auto relative bg-white/40">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#EEEDEB] transition-colors"
            >
              <X size={18} className="text-[#1A1A1A]" />
            </button>

            <h2
              className="text-[20px] text-[#1A1A1A] mb-6"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
            >
              {activeTab}
            </h2>

            {renderPanel()}
          </div>
        </div>
      </div>
    </>
  )
}
