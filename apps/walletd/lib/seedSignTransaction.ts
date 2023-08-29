import {
  ConsensusState,
  ConsensusNetwork,
  SiacoinElement,
  Transaction,
} from '@siafoundation/react-walletd'
import { getWalletWasm } from './wasm'
import { stripPrefix } from '@siafoundation/design-system'
import { AddressData } from '../contexts/addresses/types'

export function seedSignTransaction({
  seed,
  transaction,
  toSign,
  cs,
  cn,
  addresses,
  siacoinOutputs,
}: {
  seed: string
  cs: ConsensusState
  cn: ConsensusNetwork
  transaction: Transaction
  toSign: string[]
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
}) {
  if (!cs) {
    return { error: 'No consensus state' }
  }
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  for (const idPrefixed of toSign) {
    const id = stripPrefix(idPrefixed)

    // for each toSign match parent id to element ID
    const utxo = siacoinOutputs.find((sco) => stripPrefix(sco.ID) === id)
    if (!utxo) {
      return { error: 'Missing utxo' }
    }

    // for each compute public key using address and index
    const addressData = addresses.find(
      (a) => stripPrefix(a.address) === stripPrefix(utxo.address)
    )
    if (!addressData) {
      return { error: 'Missing address' }
    }
    if (!addressData.index) {
      return { error: 'Missing address index' }
    }

    const { unlockConditions } = getWalletWasm().unlockConditionsFromSeed(
      seed,
      addressData.index
    )

    // for each siacoin input add public key / unlock conditions
    const sci = transaction.siacoinInputs.find(
      (sci) => stripPrefix(sci.parentID) === stripPrefix(utxo.ID)
    )
    sci.unlockConditions = unlockConditions

    if (!transaction.signatures) {
      transaction.signatures = []
    }
    // for each push to signatures
    transaction.signatures.push({
      parentID: id,
      publicKeyIndex: 0,
      timelock: 0,
      coveredFields: {
        wholeTransaction: true,
      },
    })
  }

  for (const [i, idPrefixed] of toSign.entries()) {
    const id = stripPrefix(idPrefixed)

    // for each toSign match parent id to element ID
    const utxo = siacoinOutputs.find((sco) => stripPrefix(sco.ID) === id)
    if (!utxo) {
      return { error: 'Missing utxo' }
    }

    // for each compute public key using address and index
    const addressData = addresses.find(
      (a) => stripPrefix(a.address) === stripPrefix(utxo.address)
    )
    if (!addressData) {
      return { error: 'Missing address' }
    }
    const pkResponse = getWalletWasm().privateKeyFromSeed(
      seed,
      addressData.index
    )

    if (pkResponse.error) {
      return {
        error: pkResponse.error,
      }
    }

    const { transaction: signedTxn, error } = getWalletWasm().signTransaction(
      JSON.stringify(cs),
      JSON.stringify(cn),
      JSON.stringify(transaction),
      i,
      pkResponse.privateKey
    )
    if (error) {
      return {
        error,
      }
    }
    transaction = signedTxn
  }

  return {
    transaction,
  }
}
