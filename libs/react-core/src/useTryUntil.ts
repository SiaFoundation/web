'use client'

import { useState, useEffect } from 'react'

export function useTryUntil(fn: () => boolean, interval = 1000) {
  const [isTruthy, setIsTruthy] = useState(false)

  useEffect(() => {
    if (isTruthy) return // If already truthy, don't set up the interval

    const intervalId = setInterval(() => {
      if (fn()) {
        setIsTruthy(true)
        clearInterval(intervalId)
      }
    }, interval)

    // Clean up interval on unmount
    return () => clearInterval(intervalId)
  }, [fn, isTruthy, interval])

  return isTruthy
}
