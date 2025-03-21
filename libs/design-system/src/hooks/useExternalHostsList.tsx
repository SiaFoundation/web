import { minutesInMilliseconds } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import { useHostsList } from '@siafoundation/explored-react'

const swrConfigDefaults = {
  revalidateOnFocus: false,
  refreshInterval: minutesInMilliseconds(5),
  dedupingInterval: minutesInMilliseconds(5),
}

type UseHostsListParams = NonNullable<Parameters<typeof useHostsList>[0]>

export function useSiascanHostsList({
  params,
  payload,
  config,
  disabled,
  api = 'https://api.siascan.com',
}: UseHostsListParams) {
  const { settings } = useAppSettings()
  return useHostsList({
    params,
    payload,
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

export function useDaemonExplorerHostsList({
  params,
  payload,
  config,
  disabled,
}: UseHostsListParams) {
  const {
    daemonExplorer: { enabled, api },
  } = useAppSettings()
  return useHostsList({
    params,
    payload,
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
