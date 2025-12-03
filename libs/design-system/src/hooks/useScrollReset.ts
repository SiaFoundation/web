'use client'

import { useCallback } from 'react'

export function useScrollReset(scrollId = 'app-scroll-area') {
  const resetScroll = useCallback(() => {
    const viewport = document.getElementById(scrollId)
    if (viewport) {
      viewport.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [scrollId])

  return resetScroll
}
