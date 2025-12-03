import {
  Transaction,
  UnlockConditions,
  ConsensusNetwork,
  ConsensusState,
  Currency,
  Signature,
  Address,
  Hash256,
  PublicKey,
  PrivateKey,
  V2Transaction,
  Result,
} from '@siafoundation/types'

type AccountToken = {
  hostKey: PublicKey
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
  freeSectorPrice: Currency
  tipHeight: number
  validUntil: string
  signature: Signature
}

export type NetAddress = {
  protocol: string
  address: string
}

export type HostSettings = {
  protocolVersion: string // 'v1.2.3'
  release: string
  walletAddress: Address // 32 bytes
  acceptingContracts: boolean
  maxCollateral: Currency
  maxContractDuration: number
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
  // sector: string // 4MiB sector, Go marshaling expects a base64-encoded representation of a byte array
  dataLength: number // uint64
}

export type RPCReadSector = {
  request: RPCReadSectorRequest
  response: RPCReadSectorResponse
}

export type RPCWriteSectorRequest = {
  prices: HostPrices
  token: AccountToken
  // sector: string // 4MiB sector, Go marshaling expects a base64-encoded representation of a byte array
  dataLength: number // uint64
}

export type RPCWriteSectorResponse = {
  root: Hash256 // 32 bytes - types.Hash256
}

export type RPCWriteSector = {
  request: RPCWriteSectorRequest
  response: RPCWriteSectorResponse
}

export type RPC = RPCSettings | RPCReadSector | RPCWriteSector

export type WasmApi = {
  rhp: {
    generateAccount: () => Result<{
      privateKey: PrivateKey
      account: PublicKey
    }>
    // settings
    encodeSettingsRequest: (data: RPCSettingsRequest) => Result<{
      rpc: Uint8Array
    }>
    decodeSettingsRequest: (rpc: Uint8Array) => Result<{
      data: Record<string, never>
    }>
    encodeSettingsResponse: (data: RPCSettingsResponse) => Result<{
      rpc: Uint8Array
    }>
    decodeSettingsResponse: (rpc: Uint8Array) => Result<{
      data: RPCSettingsResponse
    }>
    // read sector
    encodeReadSectorRequest: (data: RPCReadSectorRequest) => Result<{
      rpc: Uint8Array
    }>
    decodeReadSectorRequest: (rpc: Uint8Array) => Result<{
      data: RPCReadSectorRequest
    }>
    encodeReadSectorResponse: (data: RPCReadSectorResponse) => Result<{
      rpc: Uint8Array
    }>
    decodeReadSectorResponse: (rpc: Uint8Array) => Result<{
      data: RPCReadSectorResponse
    }>
    // read sector
    encodeWriteSectorRequest: (data: RPCWriteSectorRequest) => Result<{
      rpc: Uint8Array
    }>
    decodeWriteSectorRequest: (rpc: Uint8Array) => Result<{
      data: RPCWriteSectorRequest
    }>
    encodeWriteSectorResponse: (data: RPCWriteSectorResponse) => Result<{
      rpc: Uint8Array
    }>
    decodeWriteSectorResponse: (rpc: Uint8Array) => Result<{
      data: RPCWriteSectorResponse
    }>
  }
  wallet: {
    generateSeedPhrase: () => Result<{
      phrase: string
    }>
    generateKeyPair: () => Result<{
      privateKey: string
      publicKey: string
    }>
    keyPairFromSeedPhrase: (
      phrase: string,
      index: number,
    ) => Result<{
      privateKey: string
      publicKey: string
    }>
    standardUnlockConditions: (publicKey: string) => Result<{
      unlockConditions: UnlockConditions
    }>
    standardUnlockHash: (publicKey: string) => Result<{
      address: string
    }>
    addressFromUnlockConditions: (
      unlockConditions: UnlockConditions,
    ) => Result<{
      address: string
    }>
    addressFromSpendPolicy: (spendPolicy: Record<string, unknown>) => Result<{
      address: string
    }>
    encodeTransaction: (txn: Transaction) => Result<{
      encodedTransaction: string
    }>
    signTransactionV1: (
      cs: ConsensusState,
      cn: ConsensusNetwork,
      txn: Transaction,
      sigIndex: number,
      privateKey: string,
    ) => Result<{
      signature: string
    }>
    v2TransactionInputSigHash: (
      state: ConsensusState,
      network: ConsensusNetwork,
      txn: V2Transaction,
    ) => Result<{
      sigHash: string
    }>
    signHash: (
      privateKey: string,
      hash: string,
    ) => Result<{
      signature: string
    }>
    transactionId: (txn: Transaction) => Result<{
      id: string
    }>
    v2TransactionId: (txn: V2Transaction) => Result<{
      id: string
    }>
  }
}
