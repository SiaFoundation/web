type Currency = string
type Signature = string
type Address = string
type Hash256 = string // 32 bytes
type AccountID = string // 16 bytes

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
  version: Uint8Array // 3 bytes
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
  accountId: AccountID // 16 bytes
  root: Hash256 // 32 bytes - types.Hash256
  offset: number // uint64
  length: number // uint64
}

export type RPCReadSectorResponse = {
  proof: Hash256[] // 32 bytes each - types.Hash256
  sector: Uint8Array // []byte
}

export type RPCReadSector = {
  request: RPCReadSectorRequest
  response: RPCReadSectorResponse
}

export type RPCWriteSectorRequest = {
  prices: HostPrices
  accountId: AccountID // 16 bytes
  sector: Uint8Array // []byte - extended to SectorSize by host
}

export type RPCWriteSectorResponse = {
  root: Hash256 // 32 bytes - types.Hash256
}

export type RPCWriteSector = {
  request: RPCWriteSectorRequest
  response: RPCWriteSectorResponse
}

export type RPC = RPCSettings | RPCReadSector | RPCWriteSector
