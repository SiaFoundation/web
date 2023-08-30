import { SiacoinElement, Transaction } from '@siafoundation/react-walletd'
import { stripPrefix } from '@siafoundation/design-system'
import { AddressData } from '../contexts/addresses/types'

export function addUnlockConditionsAndSignatures({
  transaction,
  toSign,
  addresses,
  siacoinOutputs,
}: {
  transaction: Transaction
  toSign: string[]
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
}): { transaction?: Transaction; error?: string } {
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  // for each toSign
  for (const idPrefixed of toSign) {
    const id = stripPrefix(idPrefixed)

    // find the parent utxo funding element for each input
    const { utxo, address, error } = getUtxoAndAddress({
      id,
      addresses,
      siacoinOutputs,
    })

    if (error) {
      return { error }
    }

    // find the siacoin input by matching the toSign ID to the siacoin input's parent ID
    const sci = transaction.siacoinInputs.find(
      (sci) => stripPrefix(sci.parentID) === stripPrefix(utxo.ID)
    )

    // build the unlock conditions with the utxo funding element's public key
    sci.unlockConditions = {
      timelock: 0,
      publicKeys: [address.publicKey],
      signaturesRequired: 1,
    }

    if (!transaction.signatures) {
      transaction.signatures = []
    }

    // push to signatures
    transaction.signatures.push({
      parentID: id,
      publicKeyIndex: 0,
      timelock: 0,
      coveredFields: {
        wholeTransaction: true,
      },
    })
  }

  return {}
}

export function getUtxoAndAddress({
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
  const utxo = siacoinOutputs.find((sco) => stripPrefix(sco.ID) === id)
  if (!utxo) {
    return { error: 'Missing utxo' }
  }

  // find the utxo's address metadata which has the index and public key saved
  // the public key was computed and saved when the address was generated
  const addressData = addresses.find(
    (a) => stripPrefix(a.address) === stripPrefix(utxo.address)
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
