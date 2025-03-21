import { minutesInMilliseconds } from '@siafoundation/units'
import { useAppSettings, useGetSwr } from '@siafoundation/react-core'
import { RequestConfig } from '@siafoundation/react-core'
import { HostMetricsResponse } from '@siafoundation/explored-types'

const swrConfigDefaults = {
  revalidateOnFocus: false,
  refreshInterval: minutesInMilliseconds(5),
  dedupingInterval: minutesInMilliseconds(5),
}

export function useSiascanHostMetrics({
  config,
  disabled,
}: {
  config?: RequestConfig<void, HostMetricsResponse>
  disabled?: boolean
}) {
  const { settings } = useAppSettings()
  return useGetSwr<void, HostMetricsResponse>({
    api: 'https://api.siascan.com',
    route: '/metrics/host',
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
  return useGetSwr<void, HostMetricsResponse>({
    disabled: !enabled || disabled,
    api,
    route: '/metrics/host',
    config: {
      ...config,
      swr: {
        ...swrConfigDefaults,
        ...config?.swr,
      },
    },
  })
}

// useExternalHostMetrics is a generic hook for getting the host metrics.
// This hook checks for whether the daemon has an explorer configuration
// endpoint and if so uses that to check whether the feature is enabled or not.
// Otherwise it falls back to the siascan api and uses the appSettings siascan
// flag to check whether the feature is enabled.
export function useExternalHostMetrics({
  config,
  disabled,
}: {
  config?: RequestConfig<void, HostMetricsResponse>
  disabled?: boolean
}) {
  const { daemonExplorer } = useAppSettings()
  const daemonMetrics = useDaemonExplorerHostMetrics({
    config,
    disabled: !daemonExplorer.enabled || disabled,
  })

  const siascanMetrics = useSiascanHostMetrics({
    config,
    disabled: daemonExplorer.enabled || disabled,
  })

  return daemonExplorer.isSupported ? daemonMetrics : siascanMetrics
}
