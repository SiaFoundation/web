import {
  type ClientFilterItem,
  useDatasetEmptyState,
} from '@siafoundation/design-system'
import type { useWalletAddresses } from '@siafoundation/walletd-react'
import type {
  WalletAddressMetadata,
  WalletAddressesResponse,
} from '@siafoundation/walletd-types'
import { useMemo } from 'react'
import { type OpenDialog, useDialog } from '../dialog'
import type { AddressData } from './types'

export function transformAddressesResponse(
  response: WalletAddressesResponse,
  walletId: string,
  openDialog: OpenDialog,
) {
  const data: AddressData[] = response.map((addressObject) => {
    const { address, description, metadata, spendPolicy } = addressObject
    const datum: AddressData = {
      id: address,
      address,
      description: description,
      spendPolicy: spendPolicy,
      metadata: (metadata || {}) as WalletAddressMetadata,
      walletId,
      onClick: () =>
        openDialog('addressUpdate', {
          walletId: walletId,
          address,
        }),
      raw: addressObject,
    }
    return datum
  })
  return data
}

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
    return transformAddressesResponse(response.data, walletId, openDialog)
  }, [response.data, openDialog, walletId])

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters,
  )

  const lastIndex = (dataset || []).reduce(
    (highest, { metadata }) =>
      metadata.index > highest ? metadata.index : highest,
    -1,
  )

  return {
    dataset,
    dataState,
    error: response.error,
    lastIndex,
    filters,
  }
}
