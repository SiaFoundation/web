import { ExplorerHost } from '@siafoundation/explored-types'
import { to } from '@siafoundation/request'
import { getExplored } from './explored'
import { sectorsToBytes } from '@siafoundation/units'

const weights = {
  age: 0.3,
  uptime: 0.3,
  downloadPrice: 0.1,
  uploadPrice: 0.1,
  storagePrice: 0.1,
  usedStorage: 0.1,
}

function normalize(value: number, min: number, max: number, invert = false) {
  if (max === min) return 0
  const normalized = (value - min) / (max - min)
  return invert ? 1 - normalized : normalized
}

function rankHosts(hosts: ExplorerHost[] | undefined) {
  if (!hosts) return []

  const ranges = {
    age: {
      min: Math.min(
        ...hosts.map((host) => new Date(host.knownSince).getTime())
      ),
      max: Math.max(
        ...hosts.map((host) => new Date(host.knownSince).getTime())
      ),
    },
    uptime: { min: 0, max: 100 }, // Assuming uptime is in percentage
    downloadPrice: {
      min: Math.min(
        ...hosts.map((host) =>
          host.v2
            ? Number(host.v2Settings.prices.egressPrice)
            : Number(host.settings.downloadbandwidthprice)
        )
      ),
      max: Math.max(
        ...hosts.map((host) =>
          host.v2
            ? Number(host.v2Settings.prices.egressPrice)
            : Number(host.settings.downloadbandwidthprice)
        )
      ),
    },
    uploadPrice: {
      min: Math.min(
        ...hosts.map((host) =>
          host.v2
            ? Number(host.v2Settings.prices.ingressPrice)
            : Number(host.settings.uploadbandwidthprice)
        )
      ),
      max: Math.max(
        ...hosts.map((host) =>
          host.v2
            ? Number(host.v2Settings.prices.ingressPrice)
            : Number(host.settings.uploadbandwidthprice)
        )
      ),
    },
    storagePrice: {
      min: Math.min(
        ...hosts.map((host) =>
          host.v2
            ? Number(host.v2Settings.prices.storagePrice)
            : Number(host.settings.storageprice)
        )
      ),
      max: Math.max(
        ...hosts.map((host) =>
          host.v2
            ? Number(host.v2Settings.prices.storagePrice)
            : Number(host.settings.storageprice)
        )
      ),
    },
    usedStorage: {
      min: Math.min(
        ...hosts.map((host) =>
          host.v2
            ? sectorsToBytes(host.v2Settings.totalStorage).toNumber() -
              sectorsToBytes(host.v2Settings.remainingStorage).toNumber()
            : host.settings.totalstorage - host.settings.remainingstorage
        )
      ),
      max: Math.max(
        ...hosts.map((host) =>
          host.v2
            ? sectorsToBytes(host.v2Settings.totalStorage).toNumber() -
              sectorsToBytes(host.v2Settings.remainingStorage).toNumber()
            : host.settings.totalstorage - host.settings.remainingstorage
        )
      ),
    },
  }

  return hosts
    .map((host) => ({
      host,
      score:
        weights.age *
          normalize(
            new Date(host.knownSince).getTime(),
            ranges.age.min,
            ranges.age.max
          ) +
        weights.uptime *
          normalize(
            host.totalScans === 0
              ? 0
              : (host.successfulInteractions / host.totalScans) * 100,
            ranges.uptime.min,
            ranges.uptime.max
          ) +
        weights.downloadPrice *
          normalize(
            host.v2
              ? Number(host.v2Settings.prices.egressPrice)
              : Number(host.settings.downloadbandwidthprice),
            ranges.downloadPrice.min,
            ranges.downloadPrice.max,
            true
          ) +
        weights.uploadPrice *
          normalize(
            host.v2
              ? Number(host.v2Settings.prices.ingressPrice)
              : Number(host.settings.uploadbandwidthprice),
            ranges.uploadPrice.min,
            ranges.uploadPrice.max,
            true
          ) +
        weights.storagePrice *
          normalize(
            host.v2
              ? Number(host.v2Settings.prices.storagePrice)
              : Number(host.settings.storageprice),
            ranges.storagePrice.min,
            ranges.storagePrice.max,
            true
          ) +
        weights.usedStorage *
          normalize(
            host.v2
              ? sectorsToBytes(host.v2Settings.totalStorage).toNumber() -
                  sectorsToBytes(host.v2Settings.remainingStorage).toNumber()
              : host.settings.totalstorage - host.settings.remainingstorage,
            ranges.usedStorage.min,
            ranges.usedStorage.max
          ),
    }))
    .sort((a, b) => b.score - a.score) // Sort descending
}

export async function getTopHosts(exploredAddress: string) {
  const [hosts, hostsError] = await to(
    getExplored(exploredAddress).hostsList({
      params: { sortBy: 'date_created', dir: 'asc', limit: 500 },
      data: { online: true, acceptContracts: true },
    })
  )
  if (hostsError)
    throw new Error(
      'Error from getCachedTopHostsFunc /hosts request:' + hostsError.message
    )
  if (!hosts)
    throw new Error('No hosts found from getCachedTopHostsFunc /hosts request')

  const rankedHosts = rankHosts(hosts)
    .slice(0, 5) // Select the top 5.
    .map((result) => result.host) // Strip score key.

  if (!rankedHosts || rankedHosts.length === 0)
    throw new Error('No hosts from getCachedTopHostsFunc rankHosts call')

  return rankedHosts
}
