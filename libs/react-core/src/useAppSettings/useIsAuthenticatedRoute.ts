'use client'

import { useRouter } from 'next/router'

type UnauthenticatedRoutes = {
  login: string
}

export function useIsAuthenticatedRoute(routes: UnauthenticatedRoutes) {
  const router = useRouter()
  return ![routes.login].includes(router.asPath)
}
