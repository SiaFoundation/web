import {
  SiacoinElement,
  SiafundElement,
  ConsensusState,
  ConsensusNetwork,
  V2Transaction,
  Result,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'
import { addSignaturesSiacoinV2, addSignaturesSiafundV2 } from './signV2'

export function signTransactionSeedV2({
  mnemonic,
  transaction,
  consensusState,
  consensusNetwork,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  mnemonic: string
  consensusState: ConsensusState
  consensusNetwork: ConsensusNetwork
  transaction: V2Transaction
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}): Result<{ signedTransaction: V2Transaction }> {
  if (!consensusState) {
    return { error: 'No consensus state' }
  }
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
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

  const addSigScResult = addSignaturesSiacoinV2({
    mnemonic,
    transaction,
    addresses,
    siacoinOutputs,
    sigHash,
  })

  if ('error' in addSigScResult) {
    return { error: addSigScResult.error }
  }

  const addSigSfResult = addSignaturesSiafundV2({
    mnemonic,
    transaction,
    addresses,
    siafundOutputs,
    sigHash,
  })

  if ('error' in addSigSfResult) {
    return { error: addSigSfResult.error }
  }

  return {
    signedTransaction: transaction,
  }
}
