import type {
  WalletEvent,
  WalletEventTransactionV1,
  WalletEventTransactionV2,
} from '@siafoundation/walletd-types'
import BigNumber from 'bignumber.js'

export function calculateScValue(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return v2TxnCalculateScValue(e)
  }
  if (e.type === 'v1Transaction') {
    return v1TxnCalculateScValue(e)
  }
  return new BigNumber(e.data.siacoinElement.siacoinOutput.value)
}

export function calculateSfValue(e: WalletEvent) {
  if (e.type === 'v2Transaction') {
    return v2TxnCalculateSfValue(e)
  }
  if (e.type === 'v1Transaction') {
    return v1TxnCalculateSfValue(e)
  }
  return undefined
}

// v1 sc

function v1TxnCalculateScValue(e: WalletEventTransactionV1) {
  return v1TxnCalculateScInflow(e).minus(v1TxnCalculateScOutflow(e))
}

function v1TxnCalculateScOutflow(e: WalletEventTransactionV1) {
  const siacoinElements = e.data.spentSiacoinElements || []
  return siacoinElements.reduce((acc, ele) => {
    if (e.relevant.includes(ele.siacoinOutput.address)) {
      return acc.plus(ele.siacoinOutput.value)
    }
    return acc
  }, new BigNumber(0))
}

function v1TxnCalculateScInflow(e: WalletEventTransactionV1) {
  const siacoinOutputs = e.data.transaction.siacoinOutputs || []
  return siacoinOutputs.reduce((acc, o) => {
    if (e.relevant.includes(o.address)) {
      return acc.plus(o.value)
    }
    return acc
  }, new BigNumber(0))
}

// v2 sc

function v2TxnCalculateScValue(e: WalletEventTransactionV2) {
  return v2TxnCalculateScInflow(e).minus(v2TxnCalculateScOutflow(e))
}

function v2TxnCalculateScOutflow(e: WalletEventTransactionV2) {
  const siacoinInputs = e.data.siacoinInputs || []
  return siacoinInputs.reduce((acc, ele) => {
    if (e.relevant.includes(ele.parent.siacoinOutput.address)) {
      return acc.plus(ele.parent.siacoinOutput.value)
    }
    return acc
  }, new BigNumber(0))
}

function v2TxnCalculateScInflow(e: WalletEventTransactionV2) {
  const siacoinOutputs = e.data.siacoinOutputs || []
  return siacoinOutputs.reduce((acc, o) => {
    if (e.relevant.includes(o.address)) {
      return acc.plus(o.value)
    }
    return acc
  }, new BigNumber(0))
}

// v1 sf

function v1TxnCalculateSfValue(e: WalletEventTransactionV1) {
  return v1TxnCalculateSfInflow(e) - v1TxnCalculateSfOutflow(e)
}

function v1TxnCalculateSfOutflow(e: WalletEventTransactionV1) {
  const siafundElements = e.data.spentSiafundElements || []
  return siafundElements.reduce((acc, ele) => {
    if (e.relevant.includes(ele.siafundOutput.address)) {
      return acc + ele.siafundOutput.value
    }
    return acc
  }, 0)
}

function v1TxnCalculateSfInflow(e: WalletEventTransactionV1) {
  const siafundOutputs = e.data.transaction.siafundOutputs || []
  return siafundOutputs.reduce((acc, o) => {
    if (e.relevant.includes(o.address)) {
      return acc + o.value
    }
    return acc
  }, 0)
}

// v2 sf

function v2TxnCalculateSfValue(e: WalletEventTransactionV2) {
  return v2TxnCalculateSfInflow(e) - v2TxnCalculateSfOutflow(e)
}

function v2TxnCalculateSfOutflow(e: WalletEventTransactionV2) {
  const siafundInputs = e.data.siafundInputs || []
  return siafundInputs.reduce((acc, ele) => {
    if (e.relevant.includes(ele.parent.siafundOutput.address)) {
      return acc + ele.parent.siafundOutput.value
    }
    return acc
  }, 0)
}

function v2TxnCalculateSfInflow(e: WalletEventTransactionV2) {
  const siafundOutputs = e.data.siafundOutputs || []
  return siafundOutputs.reduce((acc, o) => {
    if (e.relevant.includes(o.address)) {
      return acc + o.value
    }
    return acc
  }, 0)
}
