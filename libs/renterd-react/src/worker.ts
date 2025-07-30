import {
  useGetDownloadFunc,
  usePutFunc,
  usePostFunc,
  HookArgsCallback,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
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
  WorkerStateResponse,
  busObjectsRoute,
  workerAccountIdResetdriftRoute,
  workerMultipartKeyRoute,
  workerObjectKeyRoute,
  workerStateRoute,
} from '@siafoundation/renterd-types'

// state

export function useWorkerState(
  args?: HookArgsSwr<WorkerStateParams, WorkerStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: workerStateRoute,
  })
}

export function useObjectDownloadFunc(
  args?: HookArgsCallback<
    ObjectDownloadParams,
    ObjectDownloadPayload,
    ObjectDownloadResponse
  >,
) {
  return useGetDownloadFunc({ ...args, route: workerObjectKeyRoute })
}

export function useObjectUpload(
  args?: HookArgsCallback<
    ObjectUploadParams,
    ObjectUploadPayload,
    ObjectUploadResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      config: {
        ...args?.config,
        axios: {
          ...args?.config?.axios,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      },
      route: workerObjectKeyRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(busObjectsRoute))
    },
  )
}

export function useMultipartUploadPart(
  args?: HookArgsCallback<
    MultipartUploadPartParams,
    MultipartUploadPartPayload,
    MultipartUploadPartResponse
  >,
) {
  return usePutFunc({
    ...args,
    config: {
      ...args?.config,
      axios: {
        ...args?.config?.axios,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    },
    route: workerMultipartKeyRoute,
  })
}

// accounts

export function useAccountResetDrift(
  args?: HookArgsCallback<
    AccountResetDriftParams,
    AccountResetDriftPayload,
    AccountResetDriftResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: workerAccountIdResetdriftRoute,
  })
}
