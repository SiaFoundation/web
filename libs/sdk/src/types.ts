import {
  Transaction,
  UnlockConditions,
  ConsensusNetwork,
  ConsensusState,
} from '@siafoundation/types'

type Currency = string
type Signature = string
type Address = string
type Hash256 = string // 32 bytes
type PrivateKey = string
type PublicKey = string // 32 bytes

type AccountToken = {
  account: PublicKey
  validUntil: string
  signature: Signature
}

export type HostPrices = {
  contractPrice: Currency
  collateral: Currency
  storagePrice: Currency
  ingressPrice: Currency
  egressPrice: Currency
  tipHeight: number
  validUntil: string
  signature: Signature
}

export type NetAddress = {
  protocol: string
  address: string
}

export type HostSettings = {
  version: [number, number, number] // 3 bytes
  netAddresses: NetAddress[]
  walletAddress: Address // 32 bytes
  acceptingContracts: boolean
  maxCollateral: Currency
  maxDuration: number
  remainingStorage: number
  totalStorage: number
  prices: HostPrices
}

export type RPCSettingsRequest = void

export type RPCSettingsResponse = {
  settings: HostSettings
}

export type RPCSettings = {
  request: RPCSettingsRequest
  response: RPCSettingsResponse
}

export type RPCReadSectorRequest = {
  prices: HostPrices
  token: AccountToken
  root: Hash256 // 32 bytes - types.Hash256
  offset: number // uint64
  length: number // uint64
}

export type RPCReadSectorResponse = {
  proof: Hash256[] // 32 bytes each - types.Hash256
  sector: string // 4MiB sector, Go marshaling expects a base64-encoded representation of a byte array
}

export type RPCReadSector = {
  request: RPCReadSectorRequest
  response: RPCReadSectorResponse
}

export type RPCWriteSectorRequest = {
  prices: HostPrices
  token: AccountToken
  sector: string // 4MiB sector, Go marshaling expects a base64-encoded representation of a byte array
}

export type RPCWriteSectorResponse = {
  root: Hash256 // 32 bytes - types.Hash256
}

export type RPCWriteSector = {
  request: RPCWriteSectorRequest
  response: RPCWriteSectorResponse
}

export type RPC = RPCSettings | RPCReadSector | RPCWriteSector

export type WASM = {
  rhp: {
    generateAccount: () => {
      privateKey?: PrivateKey
      account?: PublicKey
      error?: string
    }
    // settings
    encodeSettingsRequest: (data: RPCSettingsRequest) => {
      rpc?: Uint8Array
      error?: string
    }
    decodeSettingsRequest: (rpc: Uint8Array) => {
      data?: Record<string, never>
      error?: string
    }
    encodeSettingsResponse: (data: RPCSettingsResponse) => {
      rpc?: Uint8Array
      error?: string
    }
    decodeSettingsResponse: (rpc: Uint8Array) => {
      data?: RPCSettingsResponse
      error?: string
    }
    // read sector
    encodeReadSectorRequest: (data: RPCReadSectorRequest) => {
      rpc?: Uint8Array
      error?: string
    }
    decodeReadSectorRequest: (rpc: Uint8Array) => {
      data?: RPCReadSectorRequest
      error?: string
    }
    encodeReadSectorResponse: (data: RPCReadSectorResponse) => {
      rpc?: Uint8Array
      error?: string
    }
    decodeReadSectorResponse: (rpc: Uint8Array) => {
      data?: RPCReadSectorResponse
      error?: string
    }
    // read sector
    encodeWriteSectorRequest: (data: RPCWriteSectorRequest) => {
      rpc?: Uint8Array
      error?: string
    }
    decodeWriteSectorRequest: (rpc: Uint8Array) => {
      data?: RPCWriteSectorRequest
      error?: string
    }
    encodeWriteSectorResponse: (data: RPCWriteSectorResponse) => {
      rpc?: Uint8Array
      error?: string
    }
    decodeWriteSectorResponse: (rpc: Uint8Array) => {
      data?: RPCWriteSectorResponse
      error?: string
    }
  }
  wallet: {
    generateSeedPhrase: () => {
      phrase?: string
      error?: string
    }
    generateKeyPair: () => {
      privateKey?: string
      publicKey?: string
      error?: string
    }
    keyPairFromSeedPhrase: (
      phrase: string,
      index: number
    ) => {
      privateKey?: string
      publicKey?: string
      error?: string
    }
    standardUnlockConditions: (publicKey: string) => {
      unlockConditions?: UnlockConditions
      error?: string
    }
    standardUnlockHash: (publicKey: string) => {
      address?: string
      error?: string
    }
    addressFromUnlockConditions: (unlockConditions: UnlockConditions) => {
      address?: string
      error?: string
    }
    addressFromSpendPolicy: (spendPolicy: string) => {
      address?: string
      error?: string
    }
    encodeTransaction: (txn: Transaction) => {
      encodedTransaction?: string
      error?: string
    }
    signTransaction: (
      cs: ConsensusState,
      cn: ConsensusNetwork,
      txn: Transaction,
      sigIndex: number,
      privateKey: string
    ) => {
      signature?: string
      error?: string
    }
    transactionId: (txn: Transaction) => {
      id?: string
      error?: string
    }
  }
}
