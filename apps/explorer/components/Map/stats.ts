'use server'

import { getGitHub } from '@siafoundation/data-sources'
import { humanBytes, humanNumber } from '@siafoundation/units'
import { minutesInSeconds } from '@siafoundation/units'
import { getExplored } from '../../lib/explored'
import { to } from '@siafoundation/request'
import { unstable_cache } from 'next/cache'

const maxAge = minutesInSeconds(5)

export type Stats = Awaited<ReturnType<typeof getStats>>

export const getStats = unstable_cache(
  async (exploredAddress: string) => {
    const explored = getExplored(exploredAddress)
    const [[latestBlock], [hostMetrics], github] = await Promise.all([
      to(explored.consensusTip()),
      to(explored.hostMetrics()),
      getGitHub(),
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
      // software
      commits: humanNumber(github.data?.commits),
      contributors: humanNumber(github.data?.contributors),
      forks: humanNumber(github.data?.forks),
      releases: humanNumber(github.data?.releases),
    }

    return stats
  },
  ['stats'],
  {
    tags: ['stats'],
    revalidate: maxAge,
  }
)
