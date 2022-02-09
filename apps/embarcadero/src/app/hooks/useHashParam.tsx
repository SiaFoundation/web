import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function usePathParams() {
  const location = useLocation()
  // const { hash: encodedHash } = useParams<{ hash?: string }>()
  const [_, route, encodedHash] = location.pathname.split('/')
  const hash = useMemo(
    () => (encodedHash ? decodeURIComponent(encodedHash) : undefined),
    [encodedHash]
  )

  return {
    route,
    hash,
  }
}
