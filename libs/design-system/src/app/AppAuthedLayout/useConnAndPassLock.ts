'use client'

import { useAppSettings } from '@siafoundation/react-core'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useConnectivity } from '../../hooks/useConnectivity'

type Routes = {
  home: string
  login: string
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
  const pathname = usePathname()

  useEffect(() => {
    if (isValidating) {
      return
    }
    const isProtectedPath = !pathname?.startsWith(routes.login)
    const noPasswordOrDisconnected = !settings.password || !isConnected
    if (isProtectedPath && noPasswordOrDisconnected) {
      lock()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, settings.password, isConnected, isValidating])
}
