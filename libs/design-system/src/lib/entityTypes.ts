import { Transaction } from '@siafoundation/react-renterd'

export enum EntityTypes {
  transaction = 'transaction',
  block = 'block',
  output = 'output',
  address = 'address',
}

export enum TxTypes {
  siacoin = 'siacoin',
  siafund = 'siafund',
  contract = 'contract',
  proof = 'proof',
  revision = 'revision',
  block = 'block',
  defrag = 'defrag',
  setup = 'setup',
}

export const transactionTypesList = (Object.keys(TxTypes) as TxTypes[]).map(
  (x) => TxTypes[x]
)

export function getTransactionTypes(txn: Transaction) {
  const totalSiacoinInput = (txn.SiacoinInputs || [])
    .filter((i) => i.Parent.Address && i.Parent.Value)
    .reduce((acc, i) => acc + BigInt(i.Parent.Value), BigInt(0))
  const totalSiafundInput = (txn.SiafundInputs || [])
    .filter((i) => i.Parent.Address && i.Parent.Value)
    .reduce((acc, i) => acc + BigInt(i.Parent.Value), BigInt(0))

  const totalSiacoinOuput = (txn.SiacoinOutputs || []).reduce(
    (acc, i) => acc + BigInt(i.Value),
    BigInt(0)
  )
  const totalSiafundOutput = (txn.SiafundOutputs || []).reduce(
    (acc, i) => acc + BigInt(i.Value),
    BigInt(0)
  )

  // Calculation totals
  const totalSiacoin = totalSiacoinOuput - totalSiacoinInput
  const totalSiafund = totalSiafundOutput - totalSiafundInput

  const txTypes: TxTypes[] = []

  // add labels
  if (totalSiacoin !== BigInt(0)) {
    txTypes.push(TxTypes.siacoin)
  }
  if (totalSiafund !== BigInt(0)) {
    txTypes.push(TxTypes.siafund)
  }
  if (txn.FileContracts && txn.FileContracts.length > 0) {
    txTypes.push(TxTypes.contract)
  }
  if (txn.FileContractRevisions && txn.FileContractRevisions.length > 0) {
    txTypes.push(TxTypes.revision)
  }
  if (txn.FileContractResolutions?.find((i) => i.StorageProof)) {
    txTypes.push(TxTypes.proof)
  }
  // if (isSetupTransaction(txn)) {
  //   txTypes.push(TransactionTypes.setup)
  // }

  if (
    txn.SiacoinOutputs &&
    txn.SiacoinInputs?.length === 0 &&
    txn.SiafundInputs?.length === 0
  ) {
    txTypes.push(TxTypes.block)
  }
  if (
    (txn.SiacoinInputs?.length || 0) >= 20 &&
    txn.SiacoinOutputs?.length === 1
  ) {
    txTypes.push(TxTypes.defrag)
  }

  return txTypes
}

const entityTypeMap: Record<EntityTypes, string> = {
  transaction: 'transaction',
  block: 'block',
  output: 'output',
  address: 'address',
}

const txTypeMap: Record<TxTypes, string> = {
  siacoin: 'siacoin',
  siafund: 'siafund',
  contract: 'contract',
  proof: 'proof',
  revision: 'revision',
  block: 'block',
  defrag: 'defrag',
  setup: 'setup',
}

const entityTypeInitialsMap: Record<EntityTypes, string> = {
  block: 'Bk',
  transaction: 'Tx',
  output: 'O',
  address: 'A',
}

export function getEntityTypeLabel(type: EntityTypes): string {
  return entityTypeMap[type]
}

export function getTxTypeLabel(type: TxTypes): string {
  return txTypeMap[type]
}

export function getEntityTypeInitials(type: EntityTypes): string {
  return entityTypeInitialsMap[type]
}
