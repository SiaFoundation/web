import {
  Result,
  V2TransactionInput,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'

export function addSignaturesV2({
  mnemonic,
  input,
  sigHash,
  index
} : {
  mnemonic: string
  input: V2TransactionInput
  sigHash: string
  index: number
}): Result<{ error?: string }> {  
  const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(
    mnemonic,
    index
  )

  if ('error' in pkResponse) {
    return { error: pkResponse.error }
  }

  const signHashResponse = getSDK().wallet.signHash(
    pkResponse.privateKey,
    sigHash
  )

  if ('error' in signHashResponse) {
    return { error: signHashResponse.error }
  }
  input.satisfiedPolicy.signatures = [signHashResponse.signature]
  return {}
}

export function getAddressKeyIndex({
  address,
  addresses,
} : {
  address: string
  addresses: AddressData[]
}): Result<{ index: number, error?: string }> {
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