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
  AutopilotHost,
  Host,
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
} from '@siafoundation/renterd-types'

// state

const workerStateKey = '/worker/state'

export function useWorkerState(
  args?: HookArgsSwr<WorkerStateParams, WorkerStateResponse>
) {
  return useGetSwr({
    ...args,
    route: workerStateKey,
  })
}

export function useObjectDownloadFunc(
  args?: HookArgsCallback<
    ObjectDownloadParams,
    ObjectDownloadPayload,
    ObjectDownloadResponse
  >
) {
  return useGetDownloadFunc({ ...args, route: '/worker/objects/:key' })
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
      route: '/worker/objects/:key',
    },
    async (mutate) => {
      mutate((key) => key.startsWith('/bus/objects'))
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
    route: '/worker/multipart/:key',
  })
}

const debouncedListRevalidate = debounce((func: () => void) => func(), 5_000)

export const workerRhpScanRoute = '/worker/rhp/scan'
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
      mutate<AutopilotHost[]>(
        (key) => key.startsWith('/autopilot/hosts'),
        (data) =>
          data?.map((aph) => {
            if (aph.host.publicKey === hostKey) {
              return {
                ...aph,
                host: {
                  ...aph.host,
                  interactions: {
                    ...aph.host.interactions,
                    LastScan: new Date().toISOString(),
                    LastScanSuccess: !response.data.scanError,
                  },
                  settings: response.data.settings,
                },
              }
            }
            return aph
          }),
        false
      )
      mutate<Host[]>(
        (key) => key.startsWith('/bus/search/hosts'),
        (data) =>
          data?.map((host) => {
            if (host.publicKey === hostKey) {
              return {
                ...host,
                interactions: {
                  ...host.interactions,
                  LastScan: new Date().toISOString(),
                  LastScanSuccess: !response.data.scanError,
                },
                settings: response.data.settings,
              }
            }
            return host
          }),
        false
      )
      debouncedListRevalidate(() => {
        mutate(
          (key) =>
            key.startsWith('/autopilot/hosts') ||
            key.startsWith('/bus/search/hosts'),
          (d) => d,
          true
        )
      })
    }
  )
}
