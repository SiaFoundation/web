import {
  RPCReadSectorResponse,
  RPCSettingsResponse,
  RPCWriteSectorResponse,
  RPCReadSectorRequest,
  RPCWriteSectorRequest,
  RPC,
  RPCReadSector,
  RPCWriteSector,
  RPCSettings,
} from './types'
import { WASM } from './types'

export class WebTransportClient {
  #url: string
  #cert: string
  #wasm: WASM

  #transport!: WebTransport

  constructor(url: string, cert: string, wasm: WASM) {
    this.#url = url
    this.#cert = cert
    this.#wasm = wasm
  }

  async connect() {
    if (!('WebTransport' in window)) {
      throw new Error('WebTransport is not supported in your browser.')
    }

    try {
      this.#transport = new WebTransport(this.#url, {
        serverCertificateHashes: this.#cert
          ? [
              {
                algorithm: 'sha-256',
                value: base64ToArrayBuffer(this.#cert),
              },
            ]
          : undefined,
      })
      await this.#transport.ready
    } catch (e) {
      console.error('connect', e)
      throw e
    }
  }

  private async sendRequest<T extends RPC>(
    rpcRequest: T['request'],
    encodeFn: (data: T['request']) => { rpc?: Uint8Array; error?: string },
    decodeFn: (rpc: Uint8Array) => { data?: T['response']; error?: string }
  ): Promise<T['response']> {
    let stream: WebTransportBidirectionalStream | undefined
    try {
      stream = await this.#transport.createBidirectionalStream()
      if (!stream) {
        throw new Error('Bidirectional stream not opened')
      }

      const writer = stream.writable.getWriter()
      const { rpc, error } = encodeFn(rpcRequest)
      if (!rpc || error) {
        throw new Error(error)
      }
      await writer.write(rpc)
      await writer.close()

      return this.handleIncomingData(stream, decodeFn)
    } catch (e) {
      console.error('sendRequest', e)
      throw e
    }
  }

  private async handleIncomingData<T extends RPC>(
    stream: WebTransportBidirectionalStream,
    decodeFn: (rpc: Uint8Array) => { data?: T['response']; error?: string }
  ): Promise<T['response']> {
    try {
      const reader = stream.readable.getReader()
      const { value, done } = await reader.read()
      if (done) {
        throw new Error('Stream closed by the server.')
      }
      await reader.cancel()
      const { data, error } = decodeFn(value)
      if (!data || error) {
        throw new Error(error)
      }
      return data
    } catch (e) {
      console.error('handleIncomingData', e)
      throw e
    }
  }

  async sendReadSectorRequest(
    readSector: RPCReadSectorRequest
  ): Promise<RPCReadSectorResponse> {
    return this.sendRequest<RPCReadSector>(
      readSector,
      this.#wasm.rhp.encodeReadSectorRequest,
      this.#wasm.rhp.decodeReadSectorResponse
    )
  }

  async sendWriteSectorRequest(
    writeSector: RPCWriteSectorRequest
  ): Promise<RPCWriteSectorResponse> {
    return this.sendRequest<RPCWriteSector>(
      writeSector,
      this.#wasm.rhp.encodeWriteSectorRequest,
      this.#wasm.rhp.decodeWriteSectorResponse
    )
  }

  async sendRPCSettingsRequest(): Promise<RPCSettingsResponse> {
    return this.sendRequest<RPCSettings>(
      undefined,
      this.#wasm.rhp.encodeSettingsRequest,
      this.#wasm.rhp.decodeSettingsResponse
    )
  }
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const buffer = Buffer.from(base64, 'base64')
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  )
}
