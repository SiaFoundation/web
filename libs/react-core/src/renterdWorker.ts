import { HookArgsCallback } from './request'
import { useGetDownloadFunc } from './useGetDownload'
import { usePutFunc } from './usePut'

export function useObjectDownloadFunc(
  args?: HookArgsCallback<{ key: string }, void, Blob>
) {
  return useGetDownloadFunc({ ...args, route: '/worker/objects/:key' })
}

export function useObjectUpload(
  args?: HookArgsCallback<{ key: string }, File, void>
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
    [
      (key) => {
        return key.startsWith('/bus/objects')
      },
    ]
  )
}
