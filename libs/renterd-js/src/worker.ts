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
  WorkerStateParams,
  WorkerStatePayload,
  WorkerStateResponse,
  workerAccountIdResetdriftRoute,
  workerMultipartKeyRoute,
  workerObjectKeyRoute,
  workerStateRoute,
} from '@siafoundation/renterd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Worker({
  api,
  password,
  timeout,
}: {
  api: string
  password?: string
  timeout?: number
}) {
  const axios = initAxios(api, password, timeout)
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
    accountResetDrift: buildRequestHandler<
      AccountResetDriftParams,
      AccountResetDriftPayload,
      AccountResetDriftResponse
    >(axios, 'post', workerAccountIdResetdriftRoute),
  }
}
