import type { BusStateResponse } from './bus'
import type { HostSettings } from './types'

export const workerStateRoute = '/worker/state'
export const workerObjectsKeyRoute = '/worker/objects/:key'
export const workerMultipartKeyRoute = '/worker/multipart/:key'
export const workerRhpScanRoute = '/worker/rhp/scan'

// state

export type WorkerStateParams = void
export type WorkerStatePayload = void
export type WorkerStateResponse = BusStateResponse & {
  id: string
}

export type ObjectDownloadParams = { key: string; bucket: string }
export type ObjectDownloadPayload = void
export type ObjectDownloadResponse = Blob

export type ObjectUploadParams = { key: string; bucket: string }
export type ObjectUploadPayload = File
// TODO: figure out how to handle this
// | Blob
// | Buffer
// | ArrayBuffer
// | string
// | Record<string, unknown>
export type ObjectUploadResponse = void

export type MultipartUploadPartParams = {
  key: string
  uploadid: string
  partnumber: number
  offset: number
  bucket?: string
  contractset?: string
  minshards?: number
  totalshards?: number
}
export type MultipartUploadPartPayload = Blob
// TODO: figure out how to handle this
// | Buffer | ArrayBuffer | string
export type MultipartUploadPartResponse = void

export type RhpScanParams = void
export type RhpScanPayload = {
  hostKey: string
  hostIP: string
  timeout: number
}
export type RhpScanResponse = {
  ping: string
  scanError?: string
  settings?: HostSettings
}
