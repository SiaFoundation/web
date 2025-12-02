import BigNumber from 'bignumber.js'
import { WalletEvent } from '@siafoundation/types'
import {
  TxType,
  getV1TransactionType,
  getV2TransactionType,
} from './transactionTypes'
import { EntityType } from './entityTypes'

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
    return e.data.resolution.parent.id
  }
  return undefined
}

export function getEventTxType(e: WalletEvent): TxType {
  const eventType = e.type
  if (eventType === 'v1Transaction') {
    return getV1TransactionType(e.data.transaction)
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
  if (eventType === 'siafundClaim') {
    return 'siafundClaim'
  }
  return eventType
}

/**
 * Returns whether the event ID refers to a transaction or an output.
 */
export function getEventIdEntityType(e: WalletEvent): EntityType {
  if (e.type === 'v1Transaction' || e.type === 'v2Transaction') {
    return 'transaction'
  }
  return 'output'
}
