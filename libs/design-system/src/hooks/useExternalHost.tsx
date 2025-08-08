import { useAppSettings } from '@siafoundation/react-core'
import { useHostByPubkey } from '@siafoundation/explored-react'

type UseHostParams = NonNullable<Parameters<typeof useHostByPubkey>[0]>

export function useSiascanHost({
  params,
  config,
  disabled,
  api = 'https://api.siascan.com',
}: UseHostParams) {
  const { settings } = useAppSettings()
  return useHostByPubkey({
    params,
    api,
    config,
    disabled: !settings.siascan || disabled,
  })
}

export function useDaemonExplorerHost({
  params,
  config,
  disabled,
}: UseHostParams) {
  const {
    daemonExplorer: { enabled, api },
  } = useAppSettings()
  return useHostByPubkey({
    params,
    disabled: !enabled || disabled,
    api,
    config,
  })
}
