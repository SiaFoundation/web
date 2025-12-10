'use client'

import { useEffect, useState } from 'react'

/**
 * A wrapping component that forces its children to render on the client side.
 */
export function ClientSideOnly({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldRender(true)
  }, [])

  if (!shouldRender) return fallback || null

  return children
}
