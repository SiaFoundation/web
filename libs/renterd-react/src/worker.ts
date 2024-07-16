import {
  type HookArgsCallback,
  type HookArgsSwr,
  useGetDownloadFunc,
  useGetSwr,
  usePostFunc,
  usePutFunc,
} from '@siafoundation/react-core'
import {
  type AutopilotHost,
  type Host,
  type MultipartUploadPartParams,
  type MultipartUploadPartPayload,
  type MultipartUploadPartResponse,
  type ObjectDownloadParams,
  type ObjectDownloadPayload,
  type ObjectDownloadResponse,
  type ObjectUploadParams,
  type ObjectUploadPayload,
  type ObjectUploadResponse,
  type RhpScanParams,
  type RhpScanPayload,
  type RhpScanResponse,
  type WorkerStateParams,
  type WorkerStateResponse,
  autopilotHostsRoute,
  busObjectsRoute,
  busSearchHostsRoute,
  workerMultipartKeyRoute,
  workerObjectsKeyRoute,
  workerRhpScanRoute,
  workerStateRoute,
} from '@siafoundation/renterd-types'
import { debounce } from '@technically/lodash'

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
  return useGetDownloadFunc({ ...args, route: workerObjectsKeyRoute })
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
      route: workerObjectsKeyRoute,
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

const debouncedListRevalidate = debounce((func: () => void) => func(), 5_000)

export function useRhpScan(
  args?: HookArgsCallback<RhpScanParams, RhpScanPayload, RhpScanResponse>,
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
        (key) => key.startsWith(autopilotHostsRoute),
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
        false,
      )
      mutate<Host[]>(
        (key) => key.startsWith(busSearchHostsRoute),
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
        false,
      )
      debouncedListRevalidate(() => {
        mutate(
          (key) =>
            key.startsWith(autopilotHostsRoute) ||
            key.startsWith(busSearchHostsRoute),
          (d) => d,
          true,
        )
      })
    },
  )
}
