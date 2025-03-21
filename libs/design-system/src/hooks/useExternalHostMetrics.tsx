import { minutesInMilliseconds } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import { RequestConfig } from '@siafoundation/react-core'
import { HostMetricsResponse } from '@siafoundation/explored-types'
import { useHostMetrics } from '@siafoundation/explored-react'
const swrConfigDefaults = {
  revalidateOnFocus: false,
  refreshInterval: minutesInMilliseconds(5),
  dedupingInterval: minutesInMilliseconds(5),
}

export function useSiascanHostMetrics({
  config,
  disabled,
  api = 'https://api.siascan.com',
}: {
  api?: string
  config?: RequestConfig<void, HostMetricsResponse>
  disabled?: boolean
}) {
  const { settings } = useAppSettings()
  return useHostMetrics({
    api,
    config: {
      ...config,
      swr: {
        ...swrConfigDefaults,
        ...config?.swr,
      },
    },
    disabled: !settings.siascan || disabled,
  })
}

export function useDaemonExplorerHostMetrics({
  config,
  disabled,
}: {
  config?: RequestConfig<void, HostMetricsResponse>
  disabled?: boolean
}) {
  const {
    daemonExplorer: { enabled, api },
  } = useAppSettings()
  return useHostMetrics({
    disabled: !enabled || disabled,
    api,
    config: {
      ...config,
      swr: {
        ...swrConfigDefaults,
        ...config?.swr,
      },
    },
  })
}
