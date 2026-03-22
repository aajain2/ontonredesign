import { createContext, useContext, useState, useCallback } from 'react'

const noop = () => {}
const CollectionContext = createContext({
  addedProducts: {},
  addToCollection: noop,
  removeFromCollection: noop,
  isInCollection: () => false,
})

export function CollectionProvider({ children }) {
  // { [surfaceId]: Set<productId> }
  const [addedProducts, setAddedProducts] = useState({})

  const addToCollection = useCallback((surfaceId, productId) => {
    setAddedProducts((prev) => {
      const next = { ...prev }
      next[surfaceId] = new Set(prev[surfaceId] || [])
      next[surfaceId].add(productId)
      return next
    })
  }, [])

  const removeFromCollection = useCallback((surfaceId, productId) => {
    setAddedProducts((prev) => {
      const next = { ...prev }
      next[surfaceId] = new Set(prev[surfaceId] || [])
      next[surfaceId].delete(productId)
      return next
    })
  }, [])

  const isInCollection = useCallback((surfaceId, productId) => {
    return addedProducts[surfaceId]?.has(productId) || false
  }, [addedProducts])

  return (
    <CollectionContext.Provider value={{ addedProducts, addToCollection, removeFromCollection, isInCollection }}>
      {children}
    </CollectionContext.Provider>
  )
}

export function useCollections() {
  return useContext(CollectionContext)
}
