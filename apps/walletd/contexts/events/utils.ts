import BigNumber from 'bignumber.js'
import { WalletEvent } from '@siafoundation/walletd-types'

export function calculateScValue(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return txnCalculateScInflow(e).minus(v2TxnCalculateScOutflow(e))
  }
  if (e.type === 'v1Transaction') {
    return txnCalculateScInflow(e).minus(v1TxnCalculateScOutflow(e))
  }
  return new BigNumber(e.data.siacoinElement.siacoinOutput.value)
}

export function calculateSfValue(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return txnCalculateSfInflow(e) - v2TxnCalculateSfOutflow(e)
  }
  if (e.type === 'v1Transaction') {
    return txnCalculateSfInflow(e) - v1TxnCalculateSfOutflow(e)
  }
  return undefined
}

export function v1TxnCalculateScOutflow(e: WalletEvent) {
  if ('spentSiacoinElements' in e.data) {
    const siacoinElements = e.data.spentSiacoinElements
    return siacoinElements.reduce((acc, o) => {
      if (e.relevant.includes(o.siacoinOutput.address)) {
        return acc.plus(o.siacoinOutput.value)
      }
      return acc
    }, new BigNumber(0))
  }
}

export function v1TxnCalculateSfOutflow(e: WalletEvent) {
  if ('spentSiafundElements' in e.data) {
    const siafundElements = e.data.spentSiafundElements || []
    return siafundElements.reduce((acc, o) => {
      if (e.relevant.includes(o.siafundOutput.address)) {
        return acc + o.siafundOutput.value
      }
      return acc
    }, 0)
  }
  return 0
}

export function v2TxnCalculateScOutflow(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return new BigNumber(e.data.siacoinInputs[0].parent.siacoinOutput.value)
  }
  return undefined
}

export function v2TxnCalculateSfOutflow(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return e.data.siafundInputs[0].parent.siafundOutput.value
  }
  return undefined
}

export function txnCalculateScInflow(e: WalletEvent) {
  if ('transaction' in e.data) {
    const siacoinOutputs = e.data.transaction.siacoinOutputs || []
    return siacoinOutputs.reduce((acc, o) => {
      if (e.relevant.includes(o.address)) {
        return acc.plus(o.value)
      }
      return acc
    }, new BigNumber(0))
  }
  return new BigNumber(0)
}

export function txnCalculateSfInflow(e: WalletEvent) {
  if ('transaction' in e.data) {
    const siafundOutputs = e.data.transaction.siafundOutputs || []
    return siafundOutputs.reduce((acc, o) => {
      if (e.relevant.includes(o.address)) {
        return acc + o.value
      }
      return acc
    }, 0)
  }
  return 0
}

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
