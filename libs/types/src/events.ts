import {
  ChainIndex,
  Transaction,
  SiacoinElement,
  SiafundElement,
  FileContractElement,
  Hash256,
  Address,
} from './core'
import { V2Transaction, V2FileContractResolution } from './v2'

export type UnconfirmedChainIndex = {
  height: number
}

export type WalletEventBase = {
  id: Hash256
  timestamp: string
  index: ChainIndex | UnconfirmedChainIndex
  maturityHeight: number
  relevant: Address[]
}

export type WalletEventTransactionV1 = WalletEventBase & {
  type: 'v1Transaction'
  data: {
    transaction: Transaction
    spentSiacoinElements?: SiacoinElement[]
    spentSiafundElements?: SiafundElement[]
  }
}

export type WalletEventTransactionV2 = WalletEventBase & {
  type: 'v2Transaction'
  data: V2Transaction
}

export type WalletEventContractResolutionV1 = WalletEventBase & {
  type: 'v1ContractResolution'
  data: {
    parent: FileContractElement
    siacoinElement: SiacoinElement
    missed: boolean
  }
}

export type WalletEventContractResolutionV2 = WalletEventBase & {
  type: 'v2ContractResolution'
  data: {
    resolution: V2FileContractResolution
    siacoinElement: SiacoinElement
    missed: boolean
  }
}

export type WalletEventMinerPayout = WalletEventBase & {
  type: 'miner'
  data: {
    siacoinElement: SiacoinElement
  }
}

export type WalletEventSiafundClaim = WalletEventBase & {
  type: 'siafundClaim'
  data: {
    siacoinElement: SiacoinElement
  }
}

export type WalletEventFoundationSubsidy = WalletEventBase & {
  type: 'foundation'
  data: {
    siacoinElement: SiacoinElement
  }
}

export type WalletEvent =
  | WalletEventTransactionV1
  | WalletEventTransactionV2
  | WalletEventContractResolutionV1
  | WalletEventContractResolutionV2
  | WalletEventMinerPayout
  | WalletEventFoundationSubsidy
  | WalletEventSiafundClaim

export type WalletEventType = WalletEvent['type']
