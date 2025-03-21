import { minutesInMilliseconds } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import { RequestConfig } from '@siafoundation/react-core'
import { ConsensusNetworkResponse } from '@siafoundation/explored-types'
import { useConsensusNetwork } from '@siafoundation/explored-react'

const swrConfigDefaults = {
  revalidateOnFocus: false,
  refreshInterval: minutesInMilliseconds(5),
  dedupingInterval: minutesInMilliseconds(5),
}

export function useSiascanConsensusNetwork({
  config,
  disabled,
  api = 'https://api.siascan.com',
}: {
  api?: string
  config?: RequestConfig<void, ConsensusNetworkResponse>
  disabled?: boolean
} = {}) {
  const { settings } = useAppSettings()
  return useConsensusNetwork({
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

export function useDaemonExplorerConsensusNetwork({
  config,
  disabled,
}: {
  config?: RequestConfig<void, ConsensusNetworkResponse>
  disabled?: boolean
} = {}) {
  const {
    daemonExplorer: { enabled, api },
  } = useAppSettings()
  return useConsensusNetwork({
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
