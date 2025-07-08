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
      min: Math.min(...hosts.map((h) => new Date(h.knownSince).getTime())),
      max: Math.max(...hosts.map((h) => new Date(h.knownSince).getTime())),
    },
    uptime: { min: 0, max: 100 },
    downloadPrice: {
      min: Math.min(
        ...hosts.map((h) =>
          h.v2
            ? Number(h.v2Settings.prices.egressPrice)
            : Number(h.settings.downloadbandwidthprice)
        )
      ),
      max: Math.max(
        ...hosts.map((h) =>
          h.v2
            ? Number(h.v2Settings.prices.egressPrice)
            : Number(h.settings.downloadbandwidthprice)
        )
      ),
    },
    uploadPrice: {
      min: Math.min(
        ...hosts.map((h) =>
          h.v2
            ? Number(h.v2Settings.prices.ingressPrice)
            : Number(h.settings.uploadbandwidthprice)
        )
      ),
      max: Math.max(
        ...hosts.map((h) =>
          h.v2
            ? Number(h.v2Settings.prices.ingressPrice)
            : Number(h.settings.uploadbandwidthprice)
        )
      ),
    },
    storagePrice: {
      min: Math.min(
        ...hosts.map((h) =>
          h.v2
            ? Number(h.v2Settings.prices.storagePrice)
            : Number(h.settings.storageprice)
        )
      ),
      max: Math.max(
        ...hosts.map((h) =>
          h.v2
            ? Number(h.v2Settings.prices.storagePrice)
            : Number(h.settings.storageprice)
        )
      ),
    },
    usedStorage: {
      min: Math.min(
        ...hosts.map((h) => {
          return h.v2
            ? sectorsToBytes(h.v2Settings.totalStorage)
                .minus(sectorsToBytes(h.v2Settings.remainingStorage))
                .toNumber()
            : sectorsToBytes(h.settings.totalstorage)
                .minus(sectorsToBytes(h.settings.remainingstorage))
                .toNumber()
        })
      ),
      max: Math.max(
        ...hosts.map((h) => {
          return h.v2
            ? sectorsToBytes(h.v2Settings.totalStorage)
                .minus(sectorsToBytes(h.v2Settings.remainingStorage))
                .toNumber()
            : sectorsToBytes(h.settings.totalstorage)
                .minus(sectorsToBytes(h.settings.remainingstorage))
                .toNumber()
        })
      ),
    },
  }

  return hosts
    .map((host) => {
      const ageScore = normalize(
        new Date(host.knownSince).getTime(),
        ranges.age.min,
        ranges.age.max,
        true
      )

      const uptimePct =
        host.totalScans === 0
          ? 0
          : (host.successfulInteractions / host.totalScans) * 100
      const uptimeConfidence = Math.min(1, host.totalScans / 10)

      const downloadPrice = host.v2
        ? Number(host.v2Settings.prices.egressPrice)
        : Number(host.settings.downloadbandwidthprice)

      const uploadPrice = host.v2
        ? Number(host.v2Settings.prices.ingressPrice)
        : Number(host.settings.uploadbandwidthprice)

      const storagePrice = host.v2
        ? Number(host.v2Settings.prices.storagePrice)
        : Number(host.settings.storageprice)

      const usedStorage = host.v2
        ? sectorsToBytes(host.v2Settings.totalStorage)
            .minus(sectorsToBytes(host.v2Settings.remainingStorage))
            .toNumber()
        : sectorsToBytes(host.settings.totalstorage)
            .minus(sectorsToBytes(host.settings.remainingstorage))
            .toNumber()

      const score =
        weights.age * ageScore +
        weights.uptime *
          uptimeConfidence *
          normalize(uptimePct, ranges.uptime.min, ranges.uptime.max) +
        weights.downloadPrice *
          normalize(
            downloadPrice,
            ranges.downloadPrice.min,
            ranges.downloadPrice.max,
            true
          ) +
        weights.uploadPrice *
          normalize(
            uploadPrice,
            ranges.uploadPrice.min,
            ranges.uploadPrice.max,
            true
          ) +
        weights.storagePrice *
          normalize(
            storagePrice,
            ranges.storagePrice.min,
            ranges.storagePrice.max,
            true
          ) +
        weights.usedStorage *
          normalize(usedStorage, ranges.usedStorage.min, ranges.usedStorage.max)

      return { host, score }
    })
    .sort((a, b) => b.score - a.score)
}

export async function getTopHosts(exploredAddress: string) {
  const explored = await getExplored(exploredAddress)
  const [hosts, hostsError] = await to(
    explored.hostsList({
      params: { sortBy: 'date_created', dir: 'asc', limit: 500 },
      data: { online: true, acceptContracts: true },
    })
  )
  if (hostsError)
    throw new Error(
      'Error from getTopHosts /hosts request: ' + hostsError.message
    )
  if (!hosts) throw new Error('No hosts found from getTopHosts /hosts request')

  const rankedHosts = rankHosts(hosts)
    .slice(0, 5) // Top 5
    .map((r) => r.host)

  if (!rankedHosts.length)
    throw new Error('No ranked hosts returned from rankHosts')

  return rankedHosts
}
