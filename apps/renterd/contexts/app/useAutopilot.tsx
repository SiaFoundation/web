import { useAutopilotState } from '@siafoundation/react-renterd'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const state = useAutopilotState({
    config: {
      swr: {
        dedupingInterval: 5_000,
        revalidateOnFocus: false,
        refreshInterval: (data) => (!data ? 1_000 : 60_000),
      },
    },
  })

  const [status, setStatus] = useState<'on' | 'off' | 'init'>('init')

  useEffect(() => {
    if (state.isLoading) {
      setStatus('init')
    } else if (state.isValidating) {
      return
    } else if (state.error) {
      setStatus('off')
    } else if (state.data) {
      // This check is required because the API currently returns html when the endpoint does not exist
      const validResponse = typeof state.data === 'object'
      setStatus(validResponse ? 'on' : 'off')
    }
  }, [state])

  return {
    status,
    state,
  }
}
