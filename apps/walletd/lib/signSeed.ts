import {
  SiacoinElement,
  Transaction,
  SiafundElement,
  ConsensusState,
  ConsensusNetwork,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { addUnlockConditionsAndSignatures, getToSignMetadata } from './sign'
import { getSDK } from '@siafoundation/sdk'

export function signTransactionSeed({
  mnemonic,
  transaction,
  toSign,
  cs,
  cn,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  mnemonic: string
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

    const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(
      mnemonic,
      address.metadata.index
    )

    if (pkResponse.error) {
      return {
        error: pkResponse.error,
      }
    }

    const { signature, error } = getSDK().wallet.signTransactionV1(
      cs,
      cn,
      transaction,
      i,
      pkResponse.privateKey
    )
    if (error) {
      return {
        error,
      }
    }
    transaction.signatures[i].signature = signature
  }

  return {
    signedTransaction: transaction,
  }
}
