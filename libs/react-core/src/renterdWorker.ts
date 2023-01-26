import { HookArgsSwr, HookArgsCallback } from './request'
import { useGetDownload } from './useGetDownload'
import { usePut } from './usePut'

export function useObjectDownloadFunc(
  args: HookArgsSwr<{ key: string }, Blob>
) {
  return useGetDownload({ ...args, route: '/worker/objects/:key' })
}

export function useObjectUpload(
  args: HookArgsCallback<{ key: string }, File, void>
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
