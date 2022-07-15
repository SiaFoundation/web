import { Transaction } from '@siafoundation/react-core'
import BigNumber from 'bignumber.js'

export type EntityType = 'transaction' | 'block' | 'output' | 'address' | 'ip'

export type TxType =
  | 'siacoin'
  | 'siafund'
  | 'contract'
  | 'proof'
  | 'revision'
  | 'block'
  | 'defrag'
  | 'setup'

export function getTransactionTotals(txn: Transaction) {
  const totalSiacoinInput = (txn.SiacoinInputs || [])
    .filter((i) => i.Parent.Address && i.Parent.Value)
    .reduce((acc, i) => acc.plus(String(i.Parent.Value)), new BigNumber(0))
  const totalSiafundInput = (txn.SiafundInputs || [])
    .filter((i) => i.Parent.Address && i.Parent.Value)
    .reduce((acc, i) => acc + i.Parent.Value, 0)

  const totalSiacoinOuput = (txn.SiacoinOutputs || []).reduce(
    (acc, i) => acc.plus(String(i.Value)),
    new BigNumber(0)
  )
  const totalSiafundOutput = (txn.SiafundOutputs || []).reduce(
    (acc, i) => acc + i.Value,
    0
  )

  // Calculation totals
  const sc = totalSiacoinOuput.minus(totalSiacoinInput)
  const sf = totalSiafundOutput - totalSiafundInput

  return {
    sc,
    sf,
  }
}

export function getTransactionTypes(txn: Transaction) {
  const { sc: totalSiacoin, sf: totalSiafund } = getTransactionTotals(txn)

  const txTypes: TxType[] = []

  // add labels
  if (!totalSiacoin.isZero()) {
    txTypes.push('siacoin')
  }
  if (totalSiafund !== 0) {
    txTypes.push('siafund')
  }
  if (txn.FileContracts && txn.FileContracts.length > 0) {
    txTypes.push('contract')
  }
  if (txn.FileContractRevisions && txn.FileContractRevisions.length > 0) {
    txTypes.push('revision')
  }
  if (txn.FileContractResolutions?.find((i) => i.StorageProof)) {
    txTypes.push('proof')
  }
  // if (isSetupTransaction(txn)) {
  //   txTypes.push(TransactionTypes.setup)
  // }

  if (
    txn.SiacoinOutputs &&
    txn.SiacoinInputs?.length === 0 &&
    txn.SiafundInputs?.length === 0
  ) {
    txTypes.push('block')
  }
  if (
    (txn.SiacoinInputs?.length || 0) >= 20 &&
    txn.SiacoinOutputs?.length === 1
  ) {
    txTypes.push('defrag')
  }

  return txTypes
}

const entityTypeMap: Record<EntityType, string> = {
  transaction: 'transaction',
  block: 'block',
  output: 'output',
  address: 'address',
  ip: 'IP',
}

const txTypeMap: Record<TxType, string> = {
  siacoin: 'siacoin',
  siafund: 'siafund',
  contract: 'contract',
  proof: 'proof',
  revision: 'revision',
  block: 'block',
  defrag: 'defrag',
  setup: 'setup',
}

const entityTypeInitialsMap: Record<EntityType, string> = {
  block: 'Bk',
  transaction: 'Tx',
  output: 'O',
  address: 'A',
  ip: 'I',
}

export function getEntityTypeLabel(type?: EntityType): string | undefined {
  return type ? entityTypeMap[type] : undefined
}

export function getTxTypeLabel(type?: TxType): string | undefined {
  return type ? txTypeMap[type] : undefined
}

export function getEntityTypeInitials(type?: EntityType): string | undefined {
  return type ? entityTypeInitialsMap[type] : undefined
}
