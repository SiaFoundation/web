import { ExplorerHost } from '@siafoundation/explored-types'
import { to } from '@siafoundation/request'
import { getExplored } from './explored'

const weights = {
  age: 0.3,
  uptime: 0.3,
  downloadPrice: 0.1,
  uploadPrice: 0.1,
  storagePrice: 0.1,
  usedStorage: 0.1,
}

function normalize(value, min, max, invert = false) {
  if (max === min) return 0
  const normalized = (value - min) / (max - min)
  return invert ? 1 - normalized : normalized
}

function rankHosts(hosts: ExplorerHost[] | undefined) {
  if (!hosts) return []
  const minMax = (key) => ({
    min: Math.min(...hosts.map((h) => h[key])),
    max: Math.max(...hosts.map((h) => h[key])),
  })

  const ranges = {
    age: minMax('age'),
    uptime: { min: 0, max: 100 }, // Assuming uptime is in percentage
    downloadPrice: minMax('downloadPrice'),
    uploadPrice: minMax('uploadPrice'),
    storagePrice: minMax('storagePrice'),
    usedStorage: minMax('usedStorage'),
  }

  return hosts
    .map((host) => ({
      host,
      score:
        weights.age *
          normalize(host.knownSince, ranges.age.min, ranges.age.max) +
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
              ? host.rhpV4Settings.prices.egressPrice
              : host.settings.downloadbandwidthprice,
            ranges.downloadPrice.min,
            ranges.downloadPrice.max,
            true
          ) +
        weights.uploadPrice *
          normalize(
            host.v2
              ? host.rhpV4Settings.prices.ingressPrice
              : host.settings.uploadbandwidthprice,
            ranges.uploadPrice.min,
            ranges.uploadPrice.max,
            true
          ) +
        weights.storagePrice *
          normalize(
            host.v2
              ? host.rhpV4Settings.prices.storagePrice
              : host.settings.storageprice,
            ranges.storagePrice.min,
            ranges.storagePrice.max,
            true
          ) +
        weights.usedStorage *
          normalize(
            (host.v2
              ? host.rhpV4Settings.totalStorage
              : host.settings.totalstorage) -
              (host.v2
                ? host.rhpV4Settings.remainingStorage
                : host.settings.remainingstorage),
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
      'Error from getcachedTopHostsFunc /hosts request:' + hostsError.message
    )
  if (!hosts)
    throw new Error('No hosts found from getcachedTopHostsFunc /hosts request')

  const rankedHosts = rankHosts(hosts)
    .slice(0, 5) // Select the top 5.
    .map((result) => result.host) // Strip score key.

  if (!rankedHosts || rankedHosts.length === 0)
    throw new Error('No hosts from getcachedTopHostsFunc rankHosts call')

  return rankedHosts
}
