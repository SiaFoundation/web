import { useDatasetState, ClientFilterItem } from '@siafoundation/design-system'
import {
  WalletAddressMetadata,
  WalletAddressesResponse,
} from '@siafoundation/walletd-types'
import { useWalletAddresses } from '@siafoundation/walletd-react'
import { useMemo } from 'react'
import { AddressData } from './types'
import { OpenDialog, useDialog } from '../dialog'
import { Maybe } from '@siafoundation/types'

export function transformAddressesResponse(
  response: WalletAddressesResponse,
  walletId: string,
  openDialog: OpenDialog
) {
  const data: AddressData[] = response.map((addressObject) => {
    const { address, description, metadata, spendPolicy } = addressObject
    const datum: AddressData = {
      id: address,
      address,
      description,
      spendPolicy,
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
  const dataset = useMemo<Maybe<AddressData[]>>(() => {
    if (!response.data) {
      return undefined
    }
    return transformAddressesResponse(response.data, walletId, openDialog)
  }, [response.data, openDialog, walletId])

  const datasetState = useDatasetState({
    datasetPage: dataset,
    isValidating: response.isValidating,
    error: response.error,
    filters,
  })

  const lastIndex = (dataset || []).reduce(
    (highest, { metadata }) =>
      metadata.index > highest ? metadata.index : highest,
    -1
  )

  return {
    dataset,
    datasetState,
    error: response.error,
    lastIndex,
    filters,
  }
}
