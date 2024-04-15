import { HostSettings } from './types'
import { BusStateResponse } from './bus'

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
