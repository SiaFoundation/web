import { useAutopilotStatus } from '@siafoundation/react-core'
import useSWR from 'swr'

export function useAutopilot() {
  const aps = useAutopilotStatus({
    config: {
      swr: {
        dedupingInterval: 5_000,
        revalidateOnFocus: false,
        refreshInterval: (data) => (!data ? 1_000 : 60_000),
        keepPreviousData: true,
      },
    },
  })

  const apm = useSWR<'on' | 'off' | 'init'>(
    [aps.data, aps.error],
    () => {
      if (aps.data || aps.error) {
        if (aps.error) {
          return 'off'
        }
        // This check is required because the API currently returns html when the endpoint does not exist
        const validResponse = typeof aps.data === 'object'
        return validResponse ? 'on' : 'off'
      }
      return 'init'
    },
    {
      keepPreviousData: true,
      fallbackData: 'init',
    }
  )
  console.log(aps.data, aps.error, apm.data)

  return {
    autopilotMode: apm.data,
  }
}
