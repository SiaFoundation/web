import { HostSettings } from '@siafoundation/types'
import { BusStateResponse } from './bus'

export const workerStateRoute = '/worker/state'
export const workerObjectKeyRoute = '/worker/object/:key'
export const workerMultipartKeyRoute = '/worker/multipart/:key'
export const workerRhpScanRoute = '/worker/rhp/scan'
export const workerAccountIdResetdriftRoute = '/worker/account/:id/resetdrift'

// state

export type WorkerStateParams = void
export type WorkerStatePayload = void
export type WorkerStateResponse = BusStateResponse & {
  id: string
}

// objects

export type ObjectDownloadParams = { key: string; bucket: string }
export type ObjectDownloadPayload = void
export type ObjectDownloadResponse = Blob

export type ObjectUploadParams = { key: string; bucket: string }
export type ObjectUploadPayload =
  | File
  | Blob
  | Buffer
  | ArrayBuffer
  | string
  | Record<string, unknown>
export type ObjectUploadResponse = void

// multipart

export type MultipartUploadPartParams = {
  key: string
  uploadid: string
  partnumber: number
  encryptionoffset: number
  bucket?: string
  contractset?: string
  minshards?: number
  totalshards?: number
}
export type MultipartUploadPartPayload = Blob | Buffer | ArrayBuffer | string
export type MultipartUploadPartResponse = void

// rhp

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

// accounts

export type AccountResetDriftParams = { id: string }
export type AccountResetDriftPayload = void
export type AccountResetDriftResponse = void
