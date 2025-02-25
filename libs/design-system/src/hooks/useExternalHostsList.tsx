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
    // TODO: change this.
    api: 'https://api.beta.siascan.com/zen/api',
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

  return daemonExplorer.enabled ? daemonHostsList : siascanHostsList
}
