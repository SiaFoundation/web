import { Result, V2Transaction } from '@siafoundation/types'
import { LedgerDevice } from '../contexts/ledger/types'
import { AddressData } from '../contexts/addresses/types'
import { getSDK } from '@siafoundation/sdk'
import { getAddressKeyIndex } from './signV2'

export async function signTransactionLedgerV2({
  device,
  transaction,
  addresses,
}: {
  device: LedgerDevice
  transaction: V2Transaction
  addresses: AddressData[]
}): Promise<Result<{ transaction: V2Transaction }>> {
  if (!addresses) {
    return { error: 'No addresses' }
  }

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
      const signResult = await signTransactionIndex({
        device,
        transaction,
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
      const signResult = await signTransactionIndex({
        device,
        transaction,
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

async function signTransactionIndex({
  device,
  transaction,
  keyIndex,
}: {
  device: LedgerDevice
  transaction: V2Transaction
  keyIndex: number
}): Promise<Result<{ signature: string }>> {
  const { encodedTransaction, error } =
    getSDK().wallet.encodeV2Transaction(transaction)
  if (error) {
    return { error }
  }
  const encodedTransactionBuffer = Buffer.from(encodedTransaction, 'utf-8')

  try {
    const signature = await device.sia.signV2Transaction(
      encodedTransactionBuffer,
      0,
      keyIndex,
      0
    )
    return { signature }
  } catch (e) {
    return { error: e.message }
  }
}
