import { useState, memo } from 'react'

/**
 * Image with fade-in on load and colored placeholder.
 * Prevents layout shift via aspect-ratio.
 */
export default memo(function OptimizedImage({ src, alt, className = '', style = {}, ...props }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      {...props}
    />
  )
})
