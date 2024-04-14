import { useWalletAddresses as useWalletAddressData } from '@siafoundation/walletd-react'
import { defaultDatasetRefreshInterval } from '../config/swr'
import { useDataset } from '../contexts/addresses/dataset'

const filters = []

// This hook is used by ID paramater so unlike the full address context which
// is based on the active wallet, this hook can be used in wallet specific
// dialogs regardless of the active wallet.
export function useWalletAddresses({ id }: { id: string }) {
  const response = useWalletAddressData({
    disabled: !id,
    params: {
      id,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const { dataset, dataState, lastIndex } = useDataset({
    walletId: id,
    response,
    filters,
  })

  return {
    dataState,
    error: response.error,
    datasetCount: dataset?.length || 0,
    dataset: dataset,
    lastIndex,
  }
}
