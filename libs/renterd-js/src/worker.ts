import {
  MultipartUploadPartParams,
  MultipartUploadPartPayload,
  MultipartUploadPartResponse,
  ObjectDownloadParams,
  ObjectDownloadPayload,
  ObjectDownloadResponse,
  ObjectUploadParams,
  ObjectUploadPayload,
  ObjectUploadResponse,
  RhpScanParams,
  RhpScanPayload,
  RhpScanResponse,
  WorkerStateParams,
  WorkerStatePayload,
  WorkerStateResponse,
  workerMultipartKeyRoute,
  workerObjectsKeyRoute,
  workerRhpScanRoute,
  workerStateRoute,
} from '@siafoundation/renterd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Worker({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    workerState: buildRequestHandler<
      WorkerStateParams,
      WorkerStatePayload,
      WorkerStateResponse
    >(axios, 'get', workerStateRoute),
    objectDownload: buildRequestHandler<
      ObjectDownloadParams,
      ObjectDownloadPayload,
      ObjectDownloadResponse
    >(axios, 'get', workerObjectsKeyRoute),
    objectUpload: buildRequestHandler<
      ObjectUploadParams,
      ObjectUploadPayload,
      ObjectUploadResponse
    >(axios, 'put', workerObjectsKeyRoute),
    multipartUploadPart: buildRequestHandler<
      MultipartUploadPartParams,
      MultipartUploadPartPayload,
      MultipartUploadPartResponse
    >(axios, 'put', workerMultipartKeyRoute),
    rhpScan: buildRequestHandler<
      RhpScanParams,
      RhpScanPayload,
      RhpScanResponse
    >(axios, 'post', workerRhpScanRoute),
  }
}
