import { minutesInMilliseconds } from '@siafoundation/units'
import { useAppSettings, usePostSwr } from '@siafoundation/react-core'
import { RequestConfig } from '@siafoundation/react-core'
import {
  HostsListParams,
  HostsListPayload,
  HostsListResponse,
} from '@siafoundation/explored-types'

const swrConfigDefaults = {
  revalidateOnFocus: false,
  refreshInterval: minutesInMilliseconds(5),
  dedupingInterval: minutesInMilliseconds(5),
}

export function useSiascanHostsList({
  params,
  payload,
  config,
  disabled,
}: {
  params: HostsListParams
  payload: HostsListPayload
  config?: RequestConfig<void, HostsListResponse>
  disabled?: boolean
}) {
  const { settings } = useAppSettings()
  return usePostSwr<HostsListParams, HostsListPayload, HostsListResponse>({
    params,
    payload,
    api: 'https://api.siascan.com',
    route: '/hosts',
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

export function useDaemonExplorerHostsList({
  params,
  payload,
  config,
  disabled,
}: {
  params: HostsListParams
  payload: HostsListPayload
  config?: RequestConfig<void, HostsListResponse>
  disabled?: boolean
}) {
  const {
    daemonExplorer: { enabled, api },
  } = useAppSettings()
  return usePostSwr<HostsListParams, HostsListPayload, HostsListResponse>({
    params,
    payload,
    disabled: !enabled || disabled,
    api,
    route: '/hosts',
    config: {
      ...config,
      swr: {
        ...swrConfigDefaults,
        ...config?.swr,
      },
    },
  })
}

// useExternalHostsList is a generic hook for getting the hosts list.
// This hook checks for whether the daemon has an explorer configuration
// endpoint and if so uses that to check whether the feature is enabled or not.
// Otherwise it falls back to the siascan api and uses the appSettings siascan
// flag to check whether the feature is enabled.
export function useExternalHostsList({
  params,
  payload,
  config,
  disabled,
}: {
  params: HostsListParams
  payload: HostsListPayload
  config?: RequestConfig<void, HostsListResponse>
  disabled?: boolean
}) {
  const { daemonExplorer } = useAppSettings()
  const daemonHostsList = useDaemonExplorerHostsList({
    params,
    payload,
    config,
    disabled: !daemonExplorer.enabled || disabled,
  })

  const siascanHostsList = useSiascanHostsList({
    params,
    payload,
    config,
    disabled: daemonExplorer.enabled || disabled,
  })

  return daemonExplorer.isSupported ? daemonHostsList : siascanHostsList
}
