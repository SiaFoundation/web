import {
  ConsensusState,
  ConsensusNetwork,
  SiacoinElement,
  Transaction,
} from '@siafoundation/react-walletd'
import { getWalletWasm } from './wasm'
import { stripPrefix } from '@siafoundation/design-system'
import { AddressData } from '../contexts/addresses/types'
import { addUnlockConditionsAndSignatures, getUtxoAndAddress } from './sign'

export function signTransactionSeed({
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
}): { transaction?: Transaction; error?: string } {
  if (!cs) {
    return { error: 'No consensus state' }
  }
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  const { error } = addUnlockConditionsAndSignatures({
    transaction,
    toSign,
    addresses,
    siacoinOutputs,
  })

  if (error) {
    return { error }
  }

  // for each toSign
  for (const [i, idPrefixed] of toSign.entries()) {
    const id = stripPrefix(idPrefixed)

    // find the utxo and corresponding address
    const { address, error: utxoAddressError } = getUtxoAndAddress({
      id,
      addresses,
      siacoinOutputs,
    })
    if (utxoAddressError) {
      return { error: utxoAddressError }
    }

    const pkResponse = getWalletWasm().privateKeyFromSeed(seed, address.index)

    if (pkResponse.error) {
      return {
        error: pkResponse.error,
      }
    }

    // signTransaction generates a new transaction object with the signature
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
