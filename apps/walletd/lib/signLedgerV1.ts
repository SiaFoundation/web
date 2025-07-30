import {
  SiacoinElement,
  SiafundElement,
  Transaction,
} from '@siafoundation/types'
import { AddressData } from '../contexts/addresses/types'
import { LedgerDevice } from '../contexts/ledger/types'
import {
  addUnlockConditionsAndSignaturesV1,
  getToSignMetadataV1,
} from './signV1'
import { getSDK } from '@siafoundation/sdk'

export async function signTransactionLedgerV1({
  device,
  transaction,
  toSign,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  device: LedgerDevice
  transaction: Transaction
  toSign: string[]
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}): Promise<{ transaction?: Transaction; error?: string }> {
  if (!addresses) {
    return { error: 'No addresses' }
  }
  if (!siacoinOutputs) {
    return { error: 'No outputs' }
  }

  const { error } = addUnlockConditionsAndSignaturesV1({
    transaction,
    toSign,
    addresses,
    siacoinOutputs,
    siafundOutputs,
  })

  if (error) {
    return { error }
  }

  // for each toSign
  for (const [i, toSignId] of toSign.entries()) {
    const addressInfo = getToSignMetadataV1({
      toSignId,
      addresses,
      siacoinOutputs,
      siafundOutputs,
      transaction,
    })
    if (addressInfo.error) {
      return { error: addressInfo.error }
    }

    // This function generates the signature and adds it to the existing transaction
    const signTxnResponse = await signTransactionIndex({
      device,
      transaction,
      signatureIndex: i,
      keyIndex: addressInfo.address.metadata.index,
    })

    if (signTxnResponse.error) {
      return {
        error: signTxnResponse.error,
      }
    }
  }

  return {
    transaction,
  }
}

async function signTransactionIndex({
  device,
  transaction,
  signatureIndex,
  keyIndex,
}: {
  device: LedgerDevice
  transaction: Transaction
  signatureIndex: number
  keyIndex: number
}): Promise<{ transaction?: Transaction; error?: string }> {
  const { encodedTransaction, error } =
    getSDK().wallet.encodeTransaction(transaction)
  if (error) {
    return { error }
  }
  const encodedTransactionBuffer = Buffer.from(encodedTransaction, 'utf-8')
  const version = await device.sia.getVersion()
  // compat: v0.4.5 introduces the change index to the sign txn ADPU
  const signCompat = versionCmp(version, '0.4.5') < 0

  let signature: string = undefined
  try {
    if (signCompat) {
      signature = await device.sia.signTransactionV044(
        encodedTransactionBuffer,
        signatureIndex,
        keyIndex,
      )
    } else {
      signature = await device.sia.signTransaction(
        encodedTransactionBuffer,
        signatureIndex,
        keyIndex,
        0,
      )
    }
  } catch (e) {
    return { error: e.message }
  }

  transaction.signatures[signatureIndex].signature = signature

  return {
    transaction,
  }
}

function versionCmp(a, b) {
  const reg = /[^0-9.]/gi,
    aPieces = a.replace(reg, '').split('.'),
    bPieces = b.replace(reg, '').split('.'),
    len = Math.max(aPieces.length, bPieces.length)

  for (let i = 0; i < len; i++) {
    let as = 0,
      bs = 0

    if (i < aPieces.length) as = parseInt(aPieces[i], 10)

    if (i < bPieces.length) bs = parseInt(bPieces[i], 10)

    if (isNaN(as)) as = 0

    if (isNaN(bs)) bs = 0

    if (as < bs) return -1
    else if (as > bs) return 1
  }

  return 0
}
