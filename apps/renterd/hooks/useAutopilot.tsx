import { useAutopilotStatus } from '@siafoundation/react-renterd'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const aps = useAutopilotStatus({
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
    if (aps.isLoading) {
      setMode('init')
    } else if (aps.isValidating) {
      return
    } else if (aps.error) {
      setMode('off')
    } else if (aps.data) {
      // This check is required because the API currently returns html when the endpoint does not exist
      const validResponse = typeof aps.data === 'object'
      setMode(validResponse ? 'on' : 'off')
    }
  }, [aps])

  return mode
}
