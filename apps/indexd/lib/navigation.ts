import { ReadonlyURLSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function routeWithParams(
  route: string,
  params: ReadonlyURLSearchParams,
) {
  return `${route}?${new URLSearchParams(params).toString()}`
}

export function useNavigateWithParams() {
  const router = useRouter()
  const navigate = useCallback(
    (route: string, params: ReadonlyURLSearchParams) => {
      router.push(routeWithParams(route, params))
    },
    [router],
  )
  return navigate
}
