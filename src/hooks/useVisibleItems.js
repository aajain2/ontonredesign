import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Incrementally reveals items as the user scrolls.
 * Starts with `initialCount` items, then adds `batchSize` more
 * each time a sentinel near the bottom enters the viewport.
 */
export default function useVisibleItems(items, { initialCount = 15, batchSize = 10 } = {}) {
  const [visibleCount, setVisibleCount] = useState(initialCount)
  const sentinelRef = useRef(null)

  useEffect(() => {
    setVisibleCount(initialCount)
  }, [items, initialCount])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + batchSize, items.length))
        }
      },
      { rootMargin: '400px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [items.length, batchSize])

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return { visibleItems, hasMore, sentinelRef }
}
