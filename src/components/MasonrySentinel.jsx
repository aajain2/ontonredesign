/**
 * Invisible sentinel element placed at the bottom of a masonry grid.
 * When it enters viewport, useVisibleItems loads the next batch.
 */
export default function MasonrySentinel({ sentinelRef, hasMore }) {
  if (!hasMore) return null
  return (
    <div
      ref={sentinelRef}
      className="break-inside-avoid"
      style={{ height: 1, width: '100%' }}
      aria-hidden="true"
    />
  )
}
