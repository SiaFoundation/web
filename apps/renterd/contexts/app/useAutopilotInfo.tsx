import { secondsInMilliseconds } from '@siafoundation/units'
import { useAutopilotState } from '@siafoundation/renterd-react'
import { useMemo } from 'react'

export type AutopilotInfo = ReturnType<typeof useAutopilotInfo>['data']

export function useAutopilotInfo() {
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

  const status = useMemo(() => {
    if (state.error) {
      return 'off'
    } else if (state.data) {
      // This check is required because the API currently returns html when the
      // endpoint does not exist.
      const validResponse = typeof state.data === 'object'
      return validResponse ? 'on' : 'off'
    }
    return 'loading'
  }, [state])

  return {
    ...state,
    data: state.data
      ? {
          state: state.data,
          status,
          isAutopilotEnabled: status === 'on',
        }
      : undefined,
  }
}
