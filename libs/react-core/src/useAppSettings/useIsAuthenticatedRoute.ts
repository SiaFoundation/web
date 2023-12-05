'use client'

import { usePathname } from 'next/navigation'

type UnauthenticatedRoutes = {
  login: string
}

export function useIsAuthenticatedRoute(routes: UnauthenticatedRoutes) {
  const pathname = usePathname()
  return ![routes.login].includes(pathname)
}
