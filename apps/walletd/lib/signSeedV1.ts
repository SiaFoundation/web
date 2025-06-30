import {
  SiacoinElement,
  Transaction,
  SiafundElement,
  ConsensusState,
  ConsensusNetwork,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import {
  addUnlockConditionsAndSignaturesV1,
  getToSignMetadataV1,
} from './signV1'
import { getSDK } from '@siafoundation/sdk'

export function signTransactionSeedV1({
  mnemonic,
  transaction,
  toSign,
  consensusState,
  consensusNetwork,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  mnemonic: string
  consensusState: ConsensusState
  consensusNetwork: ConsensusNetwork
  transaction: Transaction
  toSign: string[]
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}): { signedTransaction?: Transaction; error?: string } {
  if (!consensusState) {
    return { error: 'No consensus state' }
  }
  if (!consensusNetwork) {
    return { error: 'No consensus network' }
  }
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  const { error } = addUnlockConditionsAndSignaturesV1({
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
    const { address, error: utxoAddressError } = getToSignMetadataV1({
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
      consensusState,
      consensusNetwork,
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
