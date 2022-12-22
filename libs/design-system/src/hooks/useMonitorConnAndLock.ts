// import { useAppSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConnectivity } from './useConnectivity'

type Routes = {
  unlock: string
}

export function useMonitorConnAndLock(routes: Routes) {
  const { daemon, wallet } = useConnectivity()
  // const { setSettings } = useAppSettings()
  const router = useRouter()

  useEffect(() => {
    if (router.pathname !== routes.unlock && (!daemon || !wallet)) {
      // TODO: undo
      // setSettings({ password: '' })
      router.push(routes.unlock)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, daemon, wallet])
}
