import { useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConnectivity } from './useConnectivity'

type Routes = {
  lockscreen: string
  syncscreen: string
}

export function useMonitorConnAndLock(routes: Routes) {
  const { isConnected, isSynced } = useConnectivity()
  const { settings, setSettings } = useAppSettings()
  const router = useRouter()

  useEffect(() => {
    const isProtectedPath = router.pathname !== routes.lockscreen
    const noPasswordOrDisconnected = !settings.password || !isConnected
    if (isProtectedPath && noPasswordOrDisconnected) {
      setSettings({ password: '' })
      router.push(routes.lockscreen)
      return
    }
    if (isProtectedPath && !isSynced) {
      router.push(routes.syncscreen)
    }
    const isOnSyncscreen = router.pathname === routes.syncscreen
    if (isOnSyncscreen && isSynced) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isConnected, isSynced])
}
