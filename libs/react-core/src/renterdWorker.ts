import { HookArgsCallback } from './request'
import { useGetDownloadFunc } from './useGetDownload'
import { usePut } from './usePut'

export function useObjectDownloadFunc(
  args?: HookArgsCallback<{ key: string }, void, Blob>
) {
  return useGetDownloadFunc({ ...args, route: '/worker/objects/:key' })
}

export function useObjectUpload(
  args?: HookArgsCallback<{ key: string }, File, void>
) {
  return usePut(
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
    []
  )
}
