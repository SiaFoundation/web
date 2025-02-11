import {
  Result,
  SiafundElement,
  SiacoinElement,
  V2Transaction,
} from '@siafoundation/types'
import { LedgerDevice } from '../contexts/ledger/types'
import { AddressData } from '../contexts/addresses/types'

export async function signTransactionLedgerV2({
  device,
  transaction,
  addresses,
  siacoinOutputs,
  siafundOutputs,
}: {
  device: LedgerDevice
  transaction: V2Transaction
  addresses: AddressData[]
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}): Promise<
  Result<{
    transaction: V2Transaction
  }>
> {
  throw new Error('Not implemented')
}
