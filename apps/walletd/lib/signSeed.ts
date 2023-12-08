import { ConsensusState, ConsensusNetwork } from '@siafoundation/react-walletd'
import {
  SiacoinElement,
  Transaction,
  SiafundElement,
} from '@siafoundation/types'
import { getWalletWasm } from './wasm'
import { AddressData } from '../contexts/addresses/types'
import { addUnlockConditionsAndSignatures, getToSignMetadata } from './sign'

export function signTransactionSeed({
  seed,
  transaction,
  toSign,
  cs,
  cn,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  seed: string
  cs: ConsensusState
  cn: ConsensusNetwork
  transaction: Transaction
  toSign: string[]
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}): { signedTransaction?: Transaction; error?: string } {
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
    toSign,
    transaction,
    addresses,
    siacoinOutputs,
    siafundOutputs,
  })

  if (error) {
    return { error }
  }

  // for each toSign
  for (const [i, toSignId] of toSign.entries()) {
    // find the utxo and corresponding address
    const { address, error: utxoAddressError } = getToSignMetadata({
      toSignId,
      transaction,
      addresses,
      siacoinOutputs,
      siafundOutputs,
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
    signedTransaction: transaction,
  }
}
