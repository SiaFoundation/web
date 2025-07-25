'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useResetPagination() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useCallback(() => {
    // These can be undefined when the page is still initializing
    if (!router || !pathname) {
      return
    }
    // remove any limit, offset, or marker
    const query = new URLSearchParams(searchParams)
    const currParams = query.toString()
    query.delete('limit')
    query.delete('offset')
    query.delete('marker')
    const nextParams = query.toString()
    const currPath = currParams ? `${pathname}?${currParams}` : pathname
    const nextPath = nextParams ? `${pathname}?${nextParams}` : pathname
    if (nextPath !== currPath) {
      router.replace(nextPath)
    }
  }, [router, searchParams, pathname])
}
