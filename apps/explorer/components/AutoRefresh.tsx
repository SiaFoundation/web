'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type AutoRefreshProps = {
  children: React.ReactNode
  interval: number
}

export function AutoRefresh({ children, interval }: AutoRefreshProps) {
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      router.refresh()
    }, interval)

    return () => clearInterval(timer)
  }, [router, interval])

  return children
}
