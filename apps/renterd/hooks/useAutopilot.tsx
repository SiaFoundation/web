import { useAutopilotHostsSearch } from '@siafoundation/react-core'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const autopilotResponse = useAutopilotHostsSearch({
    payload: {
      limit: 1,
      offset: 0,
      filterMode: 'all',
    },
    config: {
      swr: {
        revalidateOnFocus: false,
        refreshInterval: 60_000,
      },
    },
  })

  const [isAutopilotEnabled, setIsAutopilotEnabled] = useState<
    'on' | 'off' | 'init'
  >('init')

  useEffect(() => {
    if (isAutopilotEnabled === 'init' && autopilotResponse.data) {
      // This check is required because the API currently returns html when the endpoint does not exist
      const validResponse = typeof autopilotResponse.data === 'object'
      setIsAutopilotEnabled(validResponse ? 'on' : 'off')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autopilotResponse])

  return {
    isAutopilotEnabled,
  }
}
