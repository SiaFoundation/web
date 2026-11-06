import { useWorkflows } from '@siafoundation/react-core'
import { adminHostScanRoute } from '@siafoundation/indexd-types'
import { useCallback } from 'react'

export function getHostScanRoute(publicKey: string) {
  return adminHostScanRoute.replace(':hostkey', publicKey)
}

// Workflows are app-wide, so a scan stays visible as scanning after its
// button unmounts. Pending scan requests are workflows on the host's scan
// route, and hosts queued for a bulk scan are marked the same way.
export function useIsHostScanning() {
  const { workflows } = useWorkflows()
  return useCallback(
    (publicKey: string) => {
      const route = getHostScanRoute(publicKey)
      return workflows.some((w) =>
        (w as { route?: string }).route?.startsWith(route),
      )
    },
    [workflows],
  )
}
