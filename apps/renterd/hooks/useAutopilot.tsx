import { useAutopilotStatus } from '@siafoundation/react-core'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const aps = useAutopilotStatus({
    config: {
      swr: {
        dedupingInterval: 60_000,
        revalidateOnFocus: false,
        refreshInterval: 60_000,
      },
    },
  })

  const [autopilotMode, setAutopilotMode] = useState<'on' | 'off' | 'init'>(
    'init'
  )

  useEffect(() => {
    if (autopilotMode === 'init' && (aps.data || aps.error)) {
      if (aps.error) {
        setAutopilotMode('off')
      }
      // This check is required because the API currently returns html when the endpoint does not exist
      const validResponse = typeof aps.data === 'object'
      setAutopilotMode(validResponse ? 'on' : 'off')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aps])

  return {
    autopilotMode,
  }
}
