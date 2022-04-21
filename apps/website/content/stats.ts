import {
  getBenchmarks,
  getCounts,
  getGithub,
  getSiaStatsHostsStats,
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

  const [hostsStats, downloadCounts, github, benchmarks] = await Promise.all([
    getSiaStatsHostsStats(),
    getCounts(),
    getGithub(),
    getBenchmarks(),
  ])
  const latestBenchmark = benchmarks.data[0]

  const stats = {
    activeHosts: formatNumber(hostsStats.data?.activehosts),
    onlineHosts: formatNumber(hostsStats.data?.onlinehosts),
    totalStorage: humanBytes(
      hostsStats.data?.totalstorage * 1000 * 1000 * 1000 * 1000
    ),
    usedStorage: humanBytes(
      hostsStats.data?.usedstorage * 1000 * 1000 * 1000 * 1000
    ),
    commits: formatNumber(github.data?.commits),
    contributors: formatNumber(github.data?.contributors),
    forks: formatNumber(github.data?.forks),
    releases: formatNumber(github.data?.releases),
    downloads: formatNumber(downloadCounts.data?.total),
    downloadSpeed: humanSpeed(latestBenchmark?.downloadThroughput),
    uploadSpeed: humanSpeed(latestBenchmark?.uploadThroughput),
    cpuUsage: `${formatNumber(latestBenchmark?.maxCPUPct)}%`,
    memoryUsage: humanBytes(latestBenchmark?.maxMemBytes),
  }

  return stats
}

export type Stats = AsyncReturnType<typeof getStats>

function formatNumber(num?: number) {
  return (num || 0).toLocaleString()
}
