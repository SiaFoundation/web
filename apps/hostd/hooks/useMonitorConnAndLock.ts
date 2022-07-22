// import { useSettings } from '@siafoundation/react-core'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { routes } from '../config/routes'
import { useConnectivity } from './useConnectivity'

export function useMonitorConnAndLock() {
  const { daemon, wallet } = useConnectivity()
  // const { setSettings } = useSettings()
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
