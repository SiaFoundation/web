import { useMemo } from 'react'
import { useSetting } from '@siafoundation/react-core'

type RedundancyData = {
  minShards: number
  totalShards: number
}

export function useRedundancySettings() {
  const redundancy = useSetting({
    params: { key: 'redundancy' },
    config: {
      swr: {
        // Do not automatically refetch
        revalidateOnFocus: false,
      },
    },
  })

  return useMemo<RedundancyData | null>(() => {
    if (!redundancy.data) {
      return null
    }
    return JSON.parse(redundancy.data)
  }, [redundancy.data])
}
