import {
  useDatasetEmptyState,
  ClientFilterItem,
} from '@siafoundation/design-system'
import { useWalletAddresses } from '@siafoundation/react-walletd'
import { useMemo } from 'react'
import { AddressData } from './types'
import { useDialog } from '../dialog'

export function useDataset({
  walletId,
  response,
  filters,
}: {
  walletId: string
  response: ReturnType<typeof useWalletAddresses>
  filters: ClientFilterItem<AddressData>[]
}) {
  const { openDialog } = useDialog()
  const dataset = useMemo<AddressData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: AddressData[] = response.data.map((addressObject) => {
      const { address, description, metadata, spendPolicy } = addressObject
      return {
        id: address,
        address,
        description: description,
        spendPolicy: spendPolicy,
        metadata: {
          index: metadata?.index as number,
          publicKey: metadata?.publicKey as string,
        },
        walletId,
        onClick: () =>
          openDialog('addressUpdate', {
            walletId: walletId,
            address,
          }),
        raw: addressObject,
      }
    })
    return data
  }, [response.data, openDialog, walletId])

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  const lastIndex = (dataset || []).reduce(
    (highest, { metadata }) =>
      metadata.index > highest ? metadata.index : highest,
    -1
  )

  return {
    dataset,
    dataState,
    error: response.error,
    lastIndex,
    filters,
  }
}
