import {
  RPCReadSectorRequest,
  RPCReadSectorResponse,
  RPCSettingsRequest,
  RPCSettingsResponse,
  RPCWriteSectorRequest,
  RPCWriteSectorResponse,
} from '../types'

export type SDK = {
  rhp: {
    // settings
    encodeSettingsRequest: () => {
      rpc?: Uint8Array
      error?: string
    }
    decodeSettingsRequest: () => {
      data?: RPCSettingsRequest
      error?: string
    }
    encodeSettingsResponse: () => {
      rpc?: Uint8Array
      error?: string
    }
    decodeSettingsResponse: () => {
      data?: RPCSettingsResponse
      error?: string
    }
    // read sector
    encodeReadSectorRequest: () => {
      rpc?: Uint8Array
      error?: string
    }
    decodeReadSectorRequest: () => {
      data?: RPCReadSectorRequest
      error?: string
    }
    encodeReadSectorResponse: () => {
      rpc?: Uint8Array
      error?: string
    }
    decodeReadSectorResponse: () => {
      data?: RPCReadSectorResponse
      error?: string
    }
    // read sector
    encodeWriteSectorRequest: () => {
      rpc?: Uint8Array
      error?: string
    }
    decodeWriteSectorRequest: () => {
      data?: RPCWriteSectorRequest
      error?: string
    }
    encodeWriteSectorResponse: () => {
      rpc?: Uint8Array
      error?: string
    }
    decodeWriteSectorResponse: () => {
      data?: RPCWriteSectorResponse
      error?: string
    }
  }
  generateAccountID: () => {
    accountID?: string
    error?: string
  }
}
