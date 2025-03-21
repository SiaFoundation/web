import { getGitHub } from '@siafoundation/data-sources'
import { humanBytes, humanNumber } from '@siafoundation/units'
import { AsyncReturnType } from '../lib/types'
import { getCacheValue } from '../lib/cache'
import { minutesInSeconds } from '@siafoundation/units'
import { siascan } from '../config/siascan'
import { to } from '@siafoundation/request'

const maxAge = minutesInSeconds(5)

export async function getStats() {
  return getCacheValue('stats', () => readStats(), maxAge)
}

// This function is used to SSG pages and in the /api/stats API route.
// the SSG values are not configured to revalidate because this would affect
// all the other props which ideally are not revalidated nearly as often.
// The stats components revalidate against the API endpoint which has a low SWR
// cache value, which avoids needing to change the SSG revalidate value.
async function readStats() {
  if (process.env.NODE_ENV === 'development') {
    return {
      blockHeight: '200,000',
      activeHosts: '20,531',
      totalStorage: '207.38 PB',
      usedStorage: '202.44 PB',
      commits: '2,020,909',
      contributors: '2,069',
      forks: '20,472',
      releases: '2,041',
    }
  }

  const [[latestBlock], [hostMetrics], github] = await Promise.all([
    to(siascan.consensusTip()),
    to(siascan.hostMetrics()),
    getGitHub(),
  ])

  const stats = {
    // network
    blockHeight: humanNumber(latestBlock?.height),
    activeHosts: humanNumber(hostMetrics?.activeHosts),
    // storage
    totalStorage: humanBytes(hostMetrics?.totalStorage),
    usedStorage: humanBytes(
      hostMetrics?.totalStorage - hostMetrics?.remainingStorage
    ),
    // software
    commits: humanNumber(github.data?.commits),
    contributors: humanNumber(github.data?.contributors),
    forks: humanNumber(github.data?.forks),
    releases: humanNumber(github.data?.releases),
  }

  return stats
}

export type Stats = AsyncReturnType<typeof readStats>
