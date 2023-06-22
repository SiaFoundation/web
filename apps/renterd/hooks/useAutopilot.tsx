import { useAutopilotConfig } from '@siafoundation/react-renterd'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const apc = useAutopilotConfig({
    config: {
      swr: {
        dedupingInterval: 5_000,
        revalidateOnFocus: false,
        refreshInterval: (data) => (!data ? 1_000 : 60_000),
      },
    },
  })

  const [mode, setMode] = useState<'on' | 'off' | 'init'>('init')

  useEffect(() => {
    if (apc.isLoading) {
      setMode('init')
    } else if (apc.isValidating) {
      return
    } else if (apc.error) {
      setMode('off')
    } else if (apc.data) {
      // This check is required because the API currently returns html when the endpoint does not exist
      const validResponse = typeof apc.data === 'object'
      setMode(validResponse ? 'on' : 'off')
    }
  }, [apc])

  return mode
}
