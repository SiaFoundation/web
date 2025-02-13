import {
  Result,
  SiacoinElement,
  SiafundElement,
  V2SiacoinInput,
  V2SiafundInput,
  V2Transaction,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'

export function addSignaturesSiacoinV2({
  mnemonic,
  transaction,
  addresses,
  siacoinOutputs,
  sigHash,
}: {
  mnemonic: string
  transaction: V2Transaction
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  sigHash: string
}): { error?: string } {
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  const scoIdsToSign =
    transaction.siacoinInputs?.map((sci) => sci.parent.id) ?? []

  // For each toSign ID, find the parent utxo funding element.
  for (const outputId of scoIdsToSign) {
    const meta = getToSignSiacoinMetadataV2({
      outputId,
      addresses,
      siacoinOutputs,
      transaction,
    })

    if ('error' in meta) {
      return { error: meta.error }
    }

    if (
      meta.siacoinUtxo &&
      meta.address.metadata.index !== undefined &&
      meta.address.spendPolicy
    ) {
      const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(
        mnemonic,
        meta.address.metadata.index
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
      meta.siacoinInput.satisfiedPolicy.signatures = [
        signHashResponse.signature,
      ]
    }
  }

  return {}
}

export function addSignaturesSiafundV2({
  mnemonic,
  transaction,
  addresses,
  siafundOutputs,
  sigHash,
}: {
  mnemonic: string
  transaction: V2Transaction
  addresses: AddressData[]
  siafundOutputs: SiafundElement[]
  sigHash: string
}): { error?: string } {
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siafundOutputs) {
    return { error: 'No outputs' }
  }

  const sfoIdsToSign =
    transaction.siafundInputs?.map((sfi) => sfi.parent.id) ?? []

  // For each toSign ID, find the parent utxo funding element.
  for (const outputId of sfoIdsToSign) {
    const meta = getToSignSiafundMetadataV2({
      outputId,
      addresses,
      siafundOutputs,
      transaction,
    })

    if ('error' in meta) {
      return { error: meta.error }
    }

    if (
      meta.siafundUtxo &&
      meta.address.metadata.index !== undefined &&
      meta.address.spendPolicy
    ) {
      const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(
        mnemonic,
        meta.address.metadata.index
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
      meta.siafundInput.satisfiedPolicy.signatures = [
        signHashResponse.signature,
      ]
    }
  }

  return {}
}

function getSiacoinUtxoAndAddressV2({
  scoId,
  addresses,
  siacoinOutputs,
}: {
  scoId: string
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
}): Result<{ utxo: SiacoinElement; address: AddressData }> {
  // find the utxo by toSign ID
  const utxo = siacoinOutputs?.find((sco) => sco.id === scoId)
  if (!utxo) {
    return { error: 'Missing utxo' }
  }

  // Find the utxo's address metadata which has the index and public key saved.
  // The public key was computed and saved when the address was generated.
  const addressData = addresses?.find(
    (a) => a.address === utxo.siacoinOutput.address
  )

  if (!addressData) {
    return { error: 'Missing address' }
  }
  if (!addressData.metadata) {
    return { error: 'Missing address metadata' }
  }
  if (addressData.metadata.index === undefined) {
    return { error: 'Missing address index' }
  }
  if (!addressData.spendPolicy) {
    return { error: 'Missing address spend policy' }
  }
  if (!addressData.spendPolicy.policy.publicKeys[0]) {
    return { error: 'Missing address public key' }
  }

  return {
    utxo,
    address: addressData,
  }
}

function getSiafundUtxoAndAddressV2({
  sfoId,
  addresses,
  siafundOutputs,
}: {
  sfoId: string
  addresses: AddressData[]
  siafundOutputs: SiafundElement[]
}): Result<{ utxo: SiafundElement; address: AddressData }> {
  // find the utxo by toSign ID
  const utxo = siafundOutputs?.find((sfo) => sfo.id === sfoId)
  if (!utxo) {
    return { error: 'Missing utxo' }
  }

  // find the utxo's address metadata which has the index and public key saved
  // the public key was computed and saved when the address was generated
  const addressData = addresses?.find(
    (a) => a.address === utxo.siafundOutput.address
  )

  if (!addressData) {
    return { error: 'Missing address' }
  }
  if (!addressData.metadata) {
    return { error: 'Missing address metadata' }
  }
  if (addressData.metadata.index === undefined) {
    return { error: 'Missing address index' }
  }
  if (!addressData.spendPolicy) {
    return { error: 'Missing address spend policy' }
  }
  if (!addressData.spendPolicy.policy.publicKeys[0]) {
    return { error: 'Missing address public key' }
  }

  return {
    utxo,
    address: addressData,
  }
}

function getToSignSiacoinMetadataV2({
  outputId,
  transaction,
  addresses,
  siacoinOutputs,
}: {
  outputId: string
  transaction: V2Transaction
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
}): Result<{
  address: AddressData
  siacoinUtxo: SiacoinElement
  siacoinInput: V2SiacoinInput
}> {
  // Find the parent utxo funding element for each input.
  const scUtxoAddr = getSiacoinUtxoAndAddressV2({
    scoId: outputId,
    addresses,
    siacoinOutputs,
  })

  if ('error' in scUtxoAddr) {
    return { error: scUtxoAddr.error }
  }

  // Find the siacoin input by matching the toSign ID to the siacoin input's parent ID.
  const sci = transaction.siacoinInputs?.find(
    (sci) => sci.parent.id === scUtxoAddr.utxo.id
  )

  if (!sci) {
    return { error: 'Missing input' }
  }

  return {
    address: scUtxoAddr.address,
    siacoinUtxo: scUtxoAddr.utxo,
    siacoinInput: sci,
  }
}

function getToSignSiafundMetadataV2({
  outputId,
  transaction,
  addresses,
  siafundOutputs,
}: {
  outputId: string
  transaction: V2Transaction
  addresses: AddressData[]
  siafundOutputs: SiafundElement[]
}): Result<{
  address: AddressData
  siafundUtxo: SiafundElement
  siafundInput: V2SiafundInput
}> {
  // Find the parent utxo funding element for each input.
  const sfUtxoAddr = getSiafundUtxoAndAddressV2({
    sfoId: outputId,
    addresses,
    siafundOutputs,
  })

  if ('error' in sfUtxoAddr) {
    return { error: sfUtxoAddr.error }
  }

  // Find the siafund input by matching the toSign ID to the siafund input's parent ID.
  const sfi = transaction.siafundInputs?.find(
    (sfi) => sfi.parent.id === sfUtxoAddr.utxo.id
  )

  if (!sfi) {
    return { error: 'Missing input' }
  }

  return {
    address: sfUtxoAddr.address,
    siafundUtxo: sfUtxoAddr.utxo,
    siafundInput: sfi,
  }
}
