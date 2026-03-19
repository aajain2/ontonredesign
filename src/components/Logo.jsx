export function LogoIcon({ size = 32, className = '' }) {
  return (
    <img
      src="/onton-logo.jpeg"
      alt="Onton"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  )
}

export function LogoFull({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon size={28} />
      <span className="text-base font-semibold tracking-wide uppercase">NTON</span>
    </div>
  )
}
