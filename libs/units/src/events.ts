import BigNumber from 'bignumber.js'
import { WalletEvent } from '@siafoundation/types'
import {
  TxType,
  getTransactionType,
  getV2TransactionType,
} from './transactionTypes'

export function getEventFee(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return new BigNumber(e.data.minerFee)
  }
  return 'transaction' in e.data && e.data.transaction.minerFees?.length
    ? new BigNumber(e.data.transaction.minerFees[0])
    : undefined
}

export function getEventContractId(e: WalletEvent) {
  if (e.type === 'v1ContractResolution') {
    return e.data.parent.id
  }
  if (e.type === 'v2ContractResolution') {
    return e.data.parent.id
  }
  return undefined
}

export function getEventTxType(e: WalletEvent): TxType | undefined {
  const eventType = e.type
  if (eventType === 'v1Transaction') {
    return getTransactionType(e.data.transaction)
  }
  if (eventType === 'v2Transaction') {
    return getV2TransactionType(e.data)
  }
  if (eventType === 'v1ContractResolution') {
    return 'contractPayout'
  }
  if (eventType === 'v2ContractResolution') {
    return 'contractPayout'
  }
  if (eventType === 'miner') {
    return 'minerPayout'
  }
  if (eventType === 'foundation') {
    return 'foundationSubsidy'
  }
  return eventType
}
