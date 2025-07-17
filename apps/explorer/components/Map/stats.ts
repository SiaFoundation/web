'use server'

import { humanBytes, humanNumber } from '@siafoundation/units'
import { minutesInSeconds } from '@siafoundation/units'
import { getExplored } from '../../lib/explored'
import { to } from '@siafoundation/request'
import { unstable_cache } from 'next/cache'

const maxAge = minutesInSeconds(5)

export type Stats = Awaited<ReturnType<typeof getStats>>

export const getStats = unstable_cache(
  async (exploredAddress: string) => {
    const explored = await getExplored(exploredAddress)
    const [[latestBlock], [hostMetrics]] = await Promise.all([
      to(explored.consensusTip()),
      to(explored.hostMetrics()),
    ])

    const stats = {
      // network
      blockHeight: humanNumber(latestBlock?.height),
      activeHosts: humanNumber(hostMetrics?.activeHosts),
      // storage
      totalStorage: humanBytes(hostMetrics?.totalStorage || 0),
      usedStorage: humanBytes(
        (hostMetrics?.totalStorage || 0) - (hostMetrics?.remainingStorage || 0)
      ),
    }

    return stats
  },
  ['stats'],
  {
    tags: ['stats'],
    revalidate: maxAge,
  }
)
