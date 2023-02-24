import { useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConnectivity } from './useConnectivity'

type Routes = {
  lockscreen: string
}

export function useMonitorConnAndLock(routes: Routes) {
  const isConnected = useConnectivity()
  const { settings, setSettings } = useAppSettings()
  const router = useRouter()

  useEffect(() => {
    if (
      router.pathname !== routes.lockscreen &&
      (!settings.password || !isConnected)
    ) {
      setSettings({ password: '' })
      router.push(routes.lockscreen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isConnected])
}
