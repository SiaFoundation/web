import { secondsInMilliseconds } from '@siafoundation/design-system'
import { useAutopilotState } from '@siafoundation/renterd-react'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const state = useAutopilotState({
    config: {
      swr: {
        dedupingInterval: secondsInMilliseconds(5),
        revalidateOnFocus: false,
        refreshInterval: (data) =>
          !data ? secondsInMilliseconds(1) : secondsInMilliseconds(60),
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
