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
    // TODO: change this.
    api: 'https://api.beta.siascan.com/zen/api',
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

  return daemonExplorer.enabled ? daemonMetrics : siascanMetrics
}
