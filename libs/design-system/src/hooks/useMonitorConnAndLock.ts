import { useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConnectivity } from './useConnectivity'

type Routes = {
  lockscreen: string
}

export function useMonitorConnAndLock(routes: Routes) {
  const { daemon, wallet } = useConnectivity()
  const { setSettings } = useAppSettings()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname !== routes.lockscreen && (!daemon || !wallet)) {
      setSettings({ password: '' })
      router.push(routes.lockscreen)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, daemon, wallet])
}
