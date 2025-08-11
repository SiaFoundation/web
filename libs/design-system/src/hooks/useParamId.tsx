'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useParamStr(key: string) {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const selectedId = params.get(key) as string | undefined

  const setSelectedId = useCallback(
    (id: string | undefined) => {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      if (id) {
        paramsObj.set(key, id)
      } else {
        paramsObj.delete(key)
      }
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, pathname, key],
  )

  return [selectedId, setSelectedId] as [
    string | undefined,
    (id: string | undefined) => void,
  ]
}
