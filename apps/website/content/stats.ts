import {
  getBenchmarks,
  getCounts,
  getGithub,
  getSiaStatsHostsStats,
} from '@siafoundation/data-sources'
import { humanBytes, humanSpeed } from '@siafoundation/sia-js'
import { AsyncReturnType } from '../lib/types'

export async function getStats() {
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
    totalStorage: humanBytes(hostsStats.data?.totalstorage),
    usedStorage: humanBytes(hostsStats.data?.usedstorage),
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
