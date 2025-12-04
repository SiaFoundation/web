import { useMemo } from 'react'
import { useSettings } from '@siafoundation/hostd-react'

/** Returns the current net address or the app name. */
export function useNetAddressOrAppName(appName: string): string {
  const settings = useSettings({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const netAddress = useMemo(() => {
    return settings.data?.netAddress || null
  }, [settings.data?.netAddress])

  return netAddress || appName
}
