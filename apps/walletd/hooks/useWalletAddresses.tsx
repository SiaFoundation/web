import { useDatasetEmptyState } from '@siafoundation/design-system'
import { useWalletAddresses as useData } from '@siafoundation/react-walletd'
import { useMemo } from 'react'

type AddressData = {
  id: string
  address: string
  description?: string
  publicKey?: string
  index?: number
  walletId: string
}

const filters = []

// This hook is used by ID paramater so unlike the full address context which
// is based on the active wallet, this hook can be used in wallet specific
// dialogs regardless of the active wallet.
export function useWalletAddresses({ id }: { id: string }) {
  const response = useData({
    disabled: !id,
    params: {
      id,
    },
  })

  const dataset = useMemo<AddressData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: AddressData[] = Object.entries(response.data || {}).map(
      ([address, meta]) => ({
        id: address,
        address,
        description: meta.description as string,
        publicKey: meta.publicKey as string,
        index: meta.index as number,
        walletId: id,
      })
    )
    return data
  }, [response.data, id])

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  const lastIndex = (dataset || []).reduce(
    (highest, { index }) => (index > highest ? index : highest),
    -1
  )

  return {
    dataState,
    error: response.error,
    datasetCount: dataset?.length || 0,
    dataset: dataset,
    lastIndex,
  }
}
