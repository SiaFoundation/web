import { Decoder, Encoder, newDecoder, newEncoder } from './encoder'
import {
  decodeRpcResponseSettings,
  decodeRpcResponseReadSector,
  decodeRpcResponseWriteSector,
  encodeRpcRequestSettings,
  encodeRpcRequestReadSector,
  encodeRpcRequestWriteSector,
} from './rpc'
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

function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export class WebTransportClient {
  private transport!: WebTransport
  private url: string
  private cert: string

  constructor(url: string, cert: string) {
    this.url = url
    this.cert = cert
  }

  async connect() {
    if (!('WebTransport' in window)) {
      throw new Error('WebTransport is not supported in your browser.')
    }

    try {
      this.transport = new WebTransport(this.url, {
        serverCertificateHashes: this.cert
          ? [
              {
                algorithm: 'sha-256',
                value: base64ToArrayBuffer(this.cert),
              },
            ]
          : undefined,
      })
      await this.transport.ready
    } catch (e) {
      console.error('connect', e)
      throw e
    }
  }

  private async sendRequest<T extends RPC>(
    rpcRequest: T['request'],
    encodeFn: (e: Encoder, data: T['request']) => void,
    decodeFn: (d: Decoder) => T['response']
  ): Promise<T['response']> {
    let stream: WebTransportBidirectionalStream | undefined
    try {
      stream = await this.transport.createBidirectionalStream()
      if (!stream) {
        throw new Error('Bidirectional stream not opened')
      }

      const writer = stream.writable.getWriter()
      const e = newEncoder()
      encodeFn(e, rpcRequest)

      const buf = new Uint8Array(e.dataView.buffer, 0, e.offset)
      await writer.write(buf)
      await writer.close()

      return this.handleIncomingData(stream, decodeFn)
    } catch (e) {
      console.error('sendRequest', e)
      throw e
    }
  }

  private async handleIncomingData<T>(
    stream: WebTransportBidirectionalStream,
    decodeFn: (d: Decoder) => T
  ): Promise<T> {
    try {
      const reader = stream.readable.getReader()
      const { value, done } = await reader.read()
      if (done) {
        throw new Error('Stream closed by the server.')
      }
      await reader.cancel()
      return decodeFn(newDecoder(value))
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
      encodeRpcRequestReadSector,
      decodeRpcResponseReadSector
    )
  }

  async sendWriteSectorRequest(
    writeSector: RPCWriteSectorRequest
  ): Promise<RPCWriteSectorResponse> {
    return this.sendRequest<RPCWriteSector>(
      writeSector,
      encodeRpcRequestWriteSector,
      decodeRpcResponseWriteSector
    )
  }

  async sendRPCSettingsRequest(): Promise<RPCSettingsResponse> {
    return this.sendRequest<RPCSettings>(
      undefined,
      encodeRpcRequestSettings,
      decodeRpcResponseSettings
    )
  }
}
