import {
  getBenchmarks,
  getCounts,
  getExploreNavigatorStatus,
  getGitHub,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/data-sources'
import { isDev } from '@siafoundation/env'
import { humanBytes, humanSpeed } from '@siafoundation/sia-js'
import { AsyncReturnType } from '../lib/types'

export async function getStats() {
  if (isDev()) {
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
      downloads: '201,059,994',
      downloadSpeed: '201.44 Gbps',
      uploadSpeed: '2071.08 Mbps',
      cpuUsage: '20.147%',
      memoryUsage: '201.69 MB',
    }
  }

  const [hostsStats, explore, downloadCounts, github, benchmarks] =
    await Promise.all([
      getSiaCentralHostsNetworkMetrics(),
      getExploreNavigatorStatus(),
      getCounts(),
      getGitHub(),
      getBenchmarks(),
    ])
  const latestBenchmark = benchmarks.data[0]

  const stats = {
    // network
    blockHeight: formatNumber(explore.data?.consensusblock),
    activeHosts: formatNumber(hostsStats.data?.totals.active_hosts),
    onlineHosts: formatNumber(hostsStats.data?.totals.total_hosts),
    // storage
    totalStorage: humanBytes(hostsStats.data?.totals.total_storage),
    usedStorage: humanBytes(
      hostsStats.data?.totals.total_storage -
        hostsStats.data?.totals.remaining_storage
    ),
    totalRegistry: formatNumber(
      (hostsStats.data?.totals.total_registry_entries || 0) / 1_000_000,
      'M'
    ),
    usedRegistry: formatNumber(
      ((hostsStats.data?.totals.total_registry_entries || 0) -
        (hostsStats.data?.totals.remaining_registry_entries || 0)) /
        1_000_000,
      'M'
    ),
    // software
    commits: formatNumber(github.data?.commits),
    contributors: formatNumber(github.data?.contributors),
    forks: formatNumber(github.data?.forks),
    releases: formatNumber(github.data?.releases),
    downloads: formatNumber(downloadCounts.data?.total),
    // benchmarks
    downloadSpeed: humanSpeed(latestBenchmark?.downloadThroughput),
    uploadSpeed: humanSpeed(latestBenchmark?.uploadThroughput),
    cpuUsage: `${formatNumber(latestBenchmark?.maxCPUPct)}%`,
    memoryUsage: humanBytes(latestBenchmark?.maxMemBytes),
  }

  return stats
}

export type Stats = AsyncReturnType<typeof getStats>

function formatNumber(num: number | undefined, units?: string) {
  return `${Number((num || 0).toFixed(0)).toLocaleString()}${
    units ? ` ${units}` : ''
  }`
}
