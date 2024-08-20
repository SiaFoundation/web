import { useMemo } from 'react'
import { useGetSwr } from '../../useGet'
import { RequestConfig } from '../../request'

type DaemonExplorerMetaResponse = {
  explorer?: { enabled?: boolean; url?: string }
}

/**
 * Returns the daemon explorer metadata from the specified route.
 * The route's response should be a JSON object with a `explorer` property
 * that contains an `enabled` and `url` property.
 */
export function useDaemonExplorerMetadata({
  route,
  config,
  disabled,
}: {
  route?: string
  config?: RequestConfig<void, DaemonExplorerMetaResponse>
  disabled?: boolean
}): {
  isSupported: boolean
  enabled: boolean
  api: string | undefined
  isValidating: boolean
  isLoading: boolean
} {
  const explorerMeta = useGetSwr<void, DaemonExplorerMetaResponse>({
    disabled: !route || disabled,
    route: route || '',
    config: {
      ...config,
      swr: {
        ...config?.swr,
        revalidateOnFocus: false,
      },
    },
  })
  const { url, enabled } = explorerMeta.data?.explorer || {}
  const api = useMemo(() => {
    if (url) {
      try {
        const { origin } = new URL(url)
        return origin
      } catch (e) {
        console.error(e)
      }
    }
    return
  }, [url])
  return useMemo(() => {
    return {
      isSupported: !!explorerMeta.data,
      enabled: !!enabled && !!api,
      api,
      isValidating: explorerMeta.isValidating,
      isLoading: explorerMeta.isLoading,
    }
  }, [
    enabled,
    api,
    explorerMeta.isValidating,
    explorerMeta.isLoading,
    explorerMeta.data,
  ])
}
