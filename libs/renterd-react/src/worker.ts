import { debounce } from '@technically/lodash'
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
  RhpScanParams,
  RhpScanPayload,
  RhpScanResponse,
  WorkerStateParams,
  WorkerStateResponse,
  busObjectsRoute,
  busHostsRoute,
  workerAccountIdResetdriftRoute,
  workerMultipartKeyRoute,
  workerObjectsKeyRoute,
  workerRhpScanRoute,
  workerStateRoute,
  busObjectsRoute,
  Host,
} from '@siafoundation/renterd-types'

// state

export function useWorkerState(
  args?: HookArgsSwr<WorkerStateParams, WorkerStateResponse>
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
  >
) {
  return useGetDownloadFunc({ ...args, route: workerObjectsKeyRoute })
}

export function useObjectUpload(
  args?: HookArgsCallback<
    ObjectUploadParams,
    ObjectUploadPayload,
    ObjectUploadResponse
  >
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
      route: workerObjectsKeyRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(busObjectsRoute))
    }
  )
}

export function useMultipartUploadPart(
  args?: HookArgsCallback<
    MultipartUploadPartParams,
    MultipartUploadPartPayload,
    MultipartUploadPartResponse
  >
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

const debouncedListRevalidate = debounce((func: () => void) => func(), 5_000)

export function useRhpScan(
  args?: HookArgsCallback<RhpScanParams, RhpScanPayload, RhpScanResponse>
) {
  return usePostFunc(
    { ...args, route: workerRhpScanRoute },
    async (mutate, { payload: { hostKey } }, response) => {
      // Fetching immediately after the response returns stale data so
      // we optimistically update without triggering revalidation,
      // and then revalidate after a 5s delay. The list revalidation
      // is debounced so if the user rescans multiple hosts in quick
      // succession the list is optimistically updated n times followed
      // by a single network revalidate.
      mutate<Host[]>(
        (key) => key.startsWith(busHostsRoute),
        (data) =>
          data?.map((h) => {
            if (h.publicKey === hostKey) {
              return {
                ...h,
                host: {
                  ...h,
                  interactions: {
                    ...h.interactions,
                    lastScan: new Date().toISOString(),
                    lastScanSuccess: !response.data.scanError,
                  },
                  settings: response.data.settings,
                },
              }
            }
            return h
          }),
        false
      )
      debouncedListRevalidate(() => {
        mutate(
          (key) => key.startsWith(busHostsRoute),
          (d) => d,
          true
        )
      })
    }
  )
}

// accounts

export function useAccountResetDrift(
  args?: HookArgsCallback<
    AccountResetDriftParams,
    AccountResetDriftPayload,
    AccountResetDriftResponse
  >
) {
  return usePostFunc({
    ...args,
    route: workerAccountIdResetdriftRoute,
  })
}
