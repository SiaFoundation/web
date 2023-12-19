'use client'

import { usePathname } from '@siafoundation/next'

type UnauthenticatedRoutes = {
  login: string
}

export function useIsAuthenticatedRoute(routes: UnauthenticatedRoutes) {
  const pathname = usePathname()
  return ![routes.login].includes(pathname)
}
