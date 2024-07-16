import type { InternalHookArgsCallback } from './request'
import { useGetFunc } from './useGet'

export function useGetDownloadFunc<
  Params extends Record<string, string> | undefined,
>(args: InternalHookArgsCallback<Params, void, Blob>) {
  const { get } = useGetFunc<Params, Blob>({
    ...args,
    config: {
      ...args.config,
      axios: {
        ...args.config?.axios,
        responseType: 'blob',
      },
    },
  })
  return {
    get: async (name: string, params: Parameters<typeof get>[0]) => {
      const response = await get(params)
      if (response.data) {
        saveBlobToMachine(name, response.data)
      }
      return response
    },
  }
}

export function saveBlobToMachine(name: string, blob: Blob) {
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = name
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }, 100)
}
