import {
  ConsensusState,
  ConsensusNetwork,
  V2Transaction,
  Result,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'
import { getAddressKeyIndex } from './signV2'

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
  if (!consensusNetwork) {
    return { error: 'No consensus network' }
  }
  if (!addresses) {
    return { error: 'No addresses' }
  }

  const sigHashResult = getSDK().wallet.v2TransactionInputSigHash(
    consensusState,
    consensusNetwork,
    transaction,
  )

  if ('error' in sigHashResult) {
    return { error: sigHashResult.error }
  }

  const { sigHash } = sigHashResult

  const signatures = new Map<number, string>()

  for (const input of transaction.siacoinInputs ?? []) {
    const indexResponse = getAddressKeyIndex({
      address: input.parent.siacoinOutput.address,
      addresses,
    })
    if ('error' in indexResponse) {
      return { error: indexResponse.error }
    }
    const { index } = indexResponse
    if (!signatures.has(index)) {
      const signResult = signTransactionIndex({
        mnemonic,
        sigHash,
        keyIndex: index,
      })
      if ('error' in signResult) {
        return { error: signResult.error }
      }
      signatures.set(index, signResult.signature)
    }
    input.satisfiedPolicy.signatures = [signatures.get(index)]
  }

  for (const input of transaction.siafundInputs ?? []) {
    const indexResponse = getAddressKeyIndex({
      address: input.parent.siafundOutput.address,
      addresses,
    })
    if ('error' in indexResponse) {
      return { error: indexResponse.error }
    }
    const { index } = indexResponse
    if (!signatures.has(index)) {
      const signResult = signTransactionIndex({
        mnemonic,
        sigHash,
        keyIndex: index,
      })
      if ('error' in signResult) {
        return { error: signResult.error }
      }
      signatures.set(index, signResult.signature)
    }
    input.satisfiedPolicy.signatures = [signatures.get(index)]
  }

  return {
    signedTransaction: transaction,
  }
}

function signTransactionIndex({
  mnemonic,
  sigHash,
  keyIndex,
}: {
  mnemonic: string
  sigHash: string
  keyIndex: number
}): Result<{ signature: string }> {
  const pkResponse = getSDK().wallet.keyPairFromSeedPhrase(mnemonic, keyIndex)

  if ('error' in pkResponse) {
    return { error: pkResponse.error }
  }

  const signHashResponse = getSDK().wallet.signHash(
    pkResponse.privateKey,
    sigHash,
  )

  if ('error' in signHashResponse) {
    return { error: signHashResponse.error }
  }

  return { signature: signHashResponse.signature }
}
