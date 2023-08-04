import { useAutopilotStatus } from '@siafoundation/react-renterd'
import { useEffect, useState } from 'react'

export function useAutopilot() {
  const status = useAutopilotStatus({
    config: {
      swr: {
        dedupingInterval: 5_000,
        revalidateOnFocus: false,
        refreshInterval: (data) => (!data ? 1_000 : 60_000),
      },
    },
  })

  const [state, setState] = useState<'on' | 'off' | 'init'>('init')

  useEffect(() => {
    if (status.isLoading) {
      setState('init')
    } else if (status.isValidating) {
      return
    } else if (status.error) {
      setState('off')
    } else if (status.data) {
      // This check is required because the API currently returns html when the endpoint does not exist
      const validResponse = typeof status.data === 'object'
      setState(validResponse ? 'on' : 'off')
    }
  }, [status])

  return {
    state,
    status,
  }
}
