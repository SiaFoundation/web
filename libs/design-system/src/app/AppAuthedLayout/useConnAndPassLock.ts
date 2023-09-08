'use client'

import { useAppSettings } from '@siafoundation/react-core'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConnectivity } from '../../hooks/useConnectivity'

type Routes = {
  home: string
  login: string
}

export function getRouteToSaveAsPrev(router: NextRouter, routes: Routes) {
  if ([routes.login].includes(router.asPath)) {
    return routes.home
  }
  return router.asPath
}

export function getRedirectRouteFromQuery(router: NextRouter, routes: Routes) {
  return router.query['prev']
    ? decodeURIComponent(router.query['prev'] as string)
    : routes.home
}

export function useConnAndPassLock({
  lock,
  route,
  routes,
}: {
  lock: () => void
  route: string
  routes: Routes
}) {
  const { isConnected, isValidating } = useConnectivity({
    route,
  })
  const { settings } = useAppSettings()
  const router = useRouter()

  useEffect(() => {
    if (isValidating) {
      return
    }
    const isProtectedPath = !router.asPath.startsWith(routes.login)
    const noPasswordOrDisconnected = !settings.password || !isConnected
    if (isProtectedPath && noPasswordOrDisconnected) {
      lock()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, settings.password, isConnected, isValidating])
}
