import {
  ConsensusState,
  ConsensusNetwork,
  V2Transaction,
  Result,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'
import { addSignaturesV2, getAddressKeyIndex } from './signV2'

export function signTransactionSeedV2({
  mnemonic,
  transaction,
  consensusState,
  consensusNetwork,
  addresses,
}: {
  mnemonic: string
  consensusState: ConsensusState
  consensusNetwork: ConsensusNetwork
  transaction: V2Transaction
  addresses: AddressData[]
}): Result<{ signedTransaction: V2Transaction }> {
  if (!consensusState) {
    return { error: 'No consensus state' }
  }
  if (!addresses) {
    return { error: 'No addresses' }
  }

  const sigHashResult = getSDK().wallet.v2TransactionInputSigHash(
    consensusState,
    consensusNetwork,
    transaction
  )

  if ('error' in sigHashResult) {
    return { error: sigHashResult.error }
  }

  const { sigHash } = sigHashResult

  for (const input of transaction.siacoinInputs ?? []) {
    // Find the index of the address in the list of addresses.
    const indexResponse = getAddressKeyIndex({
        address: input.parent.siacoinOutput.address,
        addresses,
      }
    );
    if ('error' in indexResponse) {
      return { error: indexResponse.error }
    }
    const { index } = indexResponse

    const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(
      mnemonic,
      indexResponse.index
    )

    if ('error' in pkResponse) {
      return { error: pkResponse.error }
    }

    const signResult = addSignaturesV2({
      mnemonic,
      input,
      sigHash,
      index,
    })
    if ('error' in signResult) {
      return { error: signResult.error }
    }
  }

  for (const input of transaction.siafundInputs ?? []) {
    // Find the index of the address in the list of addresses.
    const indexResponse = getAddressKeyIndex({
      address: input.parent.siafundOutput.address,
      addresses,
    }
    );
    if ('error' in indexResponse) {
      return { error: indexResponse.error }
    }
    const { index } = indexResponse

    const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(
      mnemonic,
      indexResponse.index
    )

    if ('error' in pkResponse) {
      return { error: pkResponse.error }
    }

    const signResult = addSignaturesV2({
      mnemonic,
      input,
      sigHash,
      index,
    })
    if ('error' in signResult) {
      return { error: signResult.error }
    }
  }

  return {
    signedTransaction: transaction,
  }
}
