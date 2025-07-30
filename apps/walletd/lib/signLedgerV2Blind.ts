import {
  ConsensusNetwork,
  ConsensusState,
  Result,
  V2Transaction,
} from '@siafoundation/types'
import { LedgerDevice } from '../contexts/ledger/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'
import { getAddressKeyIndex } from './signV2'

export async function signTransactionLedgerV2Blind({
  device,
  transaction,
  addresses,
  consensusState,
  consensusNetwork,
}: {
  device: LedgerDevice
  transaction: V2Transaction
  consensusState: ConsensusState
  consensusNetwork: ConsensusNetwork
  addresses: AddressData[]
}): Promise<Result<{ transaction: V2Transaction }>> {
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

  const sigHash: string = sigHashResult.sigHash

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
      const signResult = await blindSignTransactionIndex({
        device,
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
      const signResult = await blindSignTransactionIndex({
        device,
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

  return { transaction }
}

async function blindSignTransactionIndex({
  device,
  sigHash,
  keyIndex,
}: {
  device: LedgerDevice
  sigHash: string
  keyIndex: number
}): Promise<Result<{ signature: string }>> {
  const sigHashBuffer = Buffer.from(sigHash, 'hex')
  try {
    const signature = await device.sia.blindSign(sigHashBuffer, keyIndex)
    return { signature }
  } catch (e) {
    return { error: e.message }
  }
}
