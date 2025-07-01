import { Result } from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'

export function getAddressKeyIndex({
  address,
  addresses,
}: {
  address: string
  addresses: AddressData[]
}): Result<{ index: number; error?: string }> {
  const addressData = addresses.find((a) => a.address === address)
  if (!addressData) {
    return { error: `Missing address ${address}` }
  } else if (!addressData.metadata) {
    return { error: 'Missing address metadata' }
  } else if (addressData.metadata.index === undefined) {
    return { error: 'Missing address index' }
  }
  return { index: addressData.metadata.index }
}
