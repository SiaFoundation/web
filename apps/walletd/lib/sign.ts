import {
  SiacoinElement,
  SiacoinInput,
  SiafundElement,
  SiafundInput,
  Transaction,
} from '@siafoundation/react-core'
import { stripPrefix } from '@siafoundation/design-system'
import { AddressData } from '../contexts/addresses/types'

export function addUnlockConditionsAndSignatures({
  transaction,
  toSign,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  transaction: Transaction
  toSign: string[]
  addresses: AddressData[]
  siafundOutputs: SiafundElement[]
  siacoinOutputs: SiacoinElement[]
}): { transaction?: Transaction; error?: string } {
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  // for each toSign
  for (const toSignIdPrefixed of toSign) {
    const toSignId = stripPrefix(toSignIdPrefixed)

    // find the parent utxo funding element for each input
    const {
      address,
      siacoinUtxo,
      siafundUtxo,
      siacoinInput,
      siafundInput,
      error,
    } = getToSignMetadata({
      toSignId,
      addresses,
      siacoinOutputs,
      siafundOutputs,
      transaction,
    })

    if (error) {
      return { error }
    }

    if (siacoinUtxo) {
      // build the unlock conditions with the utxo funding element's public key
      siacoinInput.unlockConditions = {
        timelock: 0,
        publicKeys: [address.publicKey],
        signaturesRequired: 1,
      }
    }

    if (siafundUtxo) {
      // build the unlock conditions with the utxo funding element's public key
      siafundInput.unlockConditions = {
        timelock: 0,
        publicKeys: [address.publicKey],
        signaturesRequired: 1,
      }
    }

    if (!transaction.signatures) {
      transaction.signatures = []
    }

    // push to signatures
    transaction.signatures.push({
      parentID: toSignId,
      publicKeyIndex: 0,
      timelock: 0,
      coveredFields: {
        wholeTransaction: true,
      },
    })
  }

  return {}
}

export function getSiacoinUtxoAndAddress({
  id: idPrefixed,
  addresses,
  siacoinOutputs,
}: {
  id: string
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
}): { utxo?: SiacoinElement; address?: AddressData; error?: string } {
  const id = stripPrefix(idPrefixed)

  // find the utxo by toSign ID
  const utxo = siacoinOutputs?.find((sco) => stripPrefix(sco.id) === id)
  if (!utxo) {
    return { error: 'Missing utxo' }
  }

  // find the utxo's address metadata which has the index and public key saved
  // the public key was computed and saved when the address was generated
  const addressData = addresses?.find(
    (a) => stripPrefix(a.address) === stripPrefix(utxo.siacoinOutput.address)
  )

  if (!addressData) {
    return { error: 'Missing address' }
  }
  if (addressData.index === undefined) {
    return { error: 'Missing address index' }
  }
  if (!addressData.publicKey) {
    return { error: 'Missing address public key' }
  }

  return {
    utxo,
    address: addressData,
  }
}

export function getSiafundUtxoAndAddress({
  id: idPrefixed,
  addresses,
  siafundOutputs,
}: {
  id: string
  addresses: AddressData[]
  siafundOutputs: SiafundElement[]
}): { utxo?: SiafundElement; address?: AddressData; error?: string } {
  const id = stripPrefix(idPrefixed)

  // find the utxo by toSign ID
  const utxo = siafundOutputs?.find((sfo) => stripPrefix(sfo.id) === id)
  if (!utxo) {
    return { error: 'Missing utxo' }
  }

  // find the utxo's address metadata which has the index and public key saved
  // the public key was computed and saved when the address was generated
  const addressData = addresses?.find(
    (a) => stripPrefix(a.address) === stripPrefix(utxo.siafundOutput.address)
  )

  if (!addressData) {
    return { error: 'Missing address' }
  }
  if (addressData.index === undefined) {
    return { error: 'Missing address index' }
  }
  if (!addressData.publicKey) {
    return { error: 'Missing address public key' }
  }

  return {
    utxo,
    address: addressData,
  }
}

export function getToSignMetadata({
  toSignId: idPrefixed,
  transaction,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  toSignId: string
  transaction: Transaction
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}): {
  address?: AddressData
  siacoinUtxo?: SiacoinElement
  siafundUtxo?: SiafundElement
  siacoinInput?: SiacoinInput
  siafundInput?: SiafundInput
  error?: string
} {
  const id = stripPrefix(idPrefixed)
  // find the parent utxo funding element for each input
  const scUtxoAddr = getSiacoinUtxoAndAddress({
    id,
    addresses,
    siacoinOutputs,
  })

  if (!scUtxoAddr.error) {
    // find the siacoin input by matching the toSign ID to the siacoin input's parent ID
    const sci = transaction.siacoinInputs?.find(
      (sci) => stripPrefix(sci.parentID) === stripPrefix(scUtxoAddr.utxo.id)
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

  // find the parent utxo funding element for each input
  const sfUtxoAddr = getSiafundUtxoAndAddress({
    id,
    addresses,
    siafundOutputs,
  })

  if (!sfUtxoAddr.error) {
    // find the siacoin input by matching the toSign ID to the saifund input's parent ID
    const sfi = transaction.siafundInputs?.find(
      (sfi) => stripPrefix(sfi.parentID) === stripPrefix(sfUtxoAddr.utxo.id)
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

  // if it found a siafund utxo then its a siafund error
  if (sfUtxoAddr.error && sfUtxoAddr.error !== 'Missing utxo') {
    return {
      error: sfUtxoAddr.error,
    }
  }

  return { error: scUtxoAddr.error }
}
