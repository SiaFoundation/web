import { getGitHub } from '@siafoundation/data-sources'
import { humanBytes, humanNumber } from '@siafoundation/units'
import { AsyncReturnType } from '../lib/types'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import {
  getSiaCentralBlockLatest,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central-js'

const maxAge = getMinutesInSeconds(5)

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
      activeHosts: '20,531',
      onlineHosts: '20,634',
      totalStorage: '207.38 PB',
      usedStorage: '202.44 PB',
      totalRegistry: '1,000 M',
      usedRegistry: '100 M',
      blockHeight: '200,000',
      commits: '2,020,909',
      contributors: '2,069',
      forks: '20,472',
      releases: '2,041',
    }
  }

  const [{ data: latestBlock }, { data: hostsStats }, github] =
    await Promise.all([
      getSiaCentralBlockLatest(),
      getSiaCentralHostsNetworkMetrics(),
      getGitHub(),
    ])

  const stats = {
    // network
    blockHeight: humanNumber(latestBlock?.block.height),
    activeHosts: humanNumber(hostsStats?.totals.active_hosts),
    onlineHosts: humanNumber(hostsStats?.totals.total_hosts),
    // storage
    totalStorage: humanBytes(hostsStats?.totals.total_storage),
    usedStorage: humanBytes(
      hostsStats?.totals.total_storage - hostsStats?.totals.remaining_storage
    ),
    totalRegistry: humanNumber(
      (hostsStats?.totals.total_registry_entries || 0) / 1_000_000,
      { units: 'M' }
    ),
    usedRegistry: humanNumber(
      ((hostsStats?.totals.total_registry_entries || 0) -
        (hostsStats?.totals.remaining_registry_entries || 0)) /
        1_000_000,
      { units: 'M' }
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
