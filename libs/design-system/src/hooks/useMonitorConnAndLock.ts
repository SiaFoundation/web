import { useAppSettings } from '@siafoundation/react-core'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConnectivity } from './useConnectivity'

type Routes = {
  home: string
  lockscreen: string
  syncscreen: string
}

export function getRouteToSaveAsPrev(router: NextRouter, routes: Routes) {
  if ([routes.syncscreen, routes.lockscreen].includes(router.pathname)) {
    return routes.home
  }
  return router.pathname
}

export function getRedirectRouteFromQuery(router: NextRouter, routes: Routes) {
  return router.query['prev']
    ? decodeURIComponent(router.query['prev'] as string)
    : routes.home
}

export function useMonitorConnAndLock({
  route,
  routes,
}: {
  route: string
  routes: Routes
}) {
  const { isConnected, isSynced } = useConnectivity({
    route,
  })
  const { lock, settings } = useAppSettings()
  const router = useRouter()

  useEffect(() => {
    const isProtectedPath = !router.pathname.startsWith(routes.lockscreen)
    const isOnSyncscreen = router.pathname.startsWith(routes.syncscreen)
    const noPasswordOrDisconnected = !settings.password || !isConnected
    if (isProtectedPath && noPasswordOrDisconnected) {
      lock()
      router.push({
        pathname: routes.lockscreen,
        query: {
          prev: getRouteToSaveAsPrev(router, routes),
        },
      })
      return
    }
    if (!isOnSyncscreen && isProtectedPath && !isSynced) {
      router.push({
        pathname: routes.syncscreen,
        query: {
          prev: getRouteToSaveAsPrev(router, routes),
        },
      })
    }
    if (isOnSyncscreen && isSynced) {
      router.push(getRedirectRouteFromQuery(router, routes))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isConnected, isSynced])
}
