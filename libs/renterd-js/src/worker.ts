import {
  AccountResetDriftParams,
  AccountResetDriftPayload,
  AccountResetDriftResponse,
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
  workerAccountIdResetdriftRoute,
  workerMultipartKeyRoute,
  workerObjectKeyRoute,
  workerRhpScanRoute,
  workerStateRoute,
} from '@siafoundation/renterd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Worker({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    workerState: buildRequestHandler<
      WorkerStateParams,
      WorkerStatePayload,
      WorkerStateResponse
    >(axios, 'get', workerStateRoute),
    objectDownload: buildRequestHandler<
      ObjectDownloadParams,
      ObjectDownloadPayload,
      ObjectDownloadResponse
    >(axios, 'get', workerObjectKeyRoute, {
      config: {
        responseType: 'blob',
      },
    }),
    objectUpload: buildRequestHandler<
      ObjectUploadParams,
      ObjectUploadPayload,
      ObjectUploadResponse
    >(axios, 'put', workerObjectKeyRoute, {
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    }),
    multipartUploadPart: buildRequestHandler<
      MultipartUploadPartParams,
      MultipartUploadPartPayload,
      MultipartUploadPartResponse
    >(axios, 'put', workerMultipartKeyRoute, {
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    }),
    rhpScan: buildRequestHandler<
      RhpScanParams,
      RhpScanPayload,
      RhpScanResponse
    >(axios, 'post', workerRhpScanRoute),
    accountResetDrift: buildRequestHandler<
      AccountResetDriftParams,
      AccountResetDriftPayload,
      AccountResetDriftResponse
    >(axios, 'post', workerAccountIdResetdriftRoute),
  }
}
