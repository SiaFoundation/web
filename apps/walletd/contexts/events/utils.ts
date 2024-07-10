import BigNumber from 'bignumber.js'
import { WalletEvent } from '@siafoundation/walletd-types'

export function getFee(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return new BigNumber(e.data.minerFee)
  }
  return 'transaction' in e.data && e.data.transaction.minerFees?.length
    ? new BigNumber(e.data.transaction.minerFees[0])
    : undefined
}

export function getContractId(e: WalletEvent) {
  if (e.type === 'v1ContractResolution') {
    return e.data.parent.id
  }
  if (e.type === 'v2ContractResolution') {
    return e.data.parent.id
  }
  return undefined
}

export function eventTypeToLabel(type: WalletEvent['type']) {
  if (type === 'v1Transaction') {
    return 'v1 transaction'
  }
  if (type === 'v2Transaction') {
    return 'v2 transaction'
  }
  if (type === 'v1ContractResolution') {
    return 'v1 contract resolution'
  }
  if (type === 'v2ContractResolution') {
    return 'v2 contract resolution'
  }
  if (type === 'miner') {
    return 'miner payout'
  }
  if (type === 'siafundClaim') {
    return 'siafund claim'
  }
  if (type === 'foundation') {
    return 'foundation subsidy'
  }
  return 'unknown'
}
