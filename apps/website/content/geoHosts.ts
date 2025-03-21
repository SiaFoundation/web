import { getCacheValue } from '../lib/cache'
import { siascan } from '../config/siascan'
import { to } from '@siafoundation/request'
import { minutesInSeconds, sectorsToBytes } from '@siafoundation/units'
import { ExplorerHost, Location } from '@siafoundation/explored-types'

const maxAge = minutesInSeconds(5)

const maxHosts = 1000
const minDegreesApart = 1

export async function getGeoHosts(): Promise<ExplorerPartialHost[]> {
  return getCacheValue(
    'geoHosts',
    async () => {
      const [results, error] = await to(
        siascan.hostsList({
          params: {
            sortBy: 'uptime',
            dir: 'desc',
          },
          data: {
            online: true,
          },
        })
      )
      if (error) {
        return []
      }

      const hosts = results.map(transformHost)

      hosts.sort((a, b) =>
        a.totalStorage - a.remainingStorage <
        b.totalStorage - b.remainingStorage
          ? 1
          : -1
      )

      // Filter out hosts without location data
      const uniqueHosts = results.filter((h) => h.location)

      // to get a more even distribution, we want to select the top 64 hosts
      // where no two hosts are within n degrees of each other.
      const hostsToDisplay: ExplorerHost[] = []
      for (const host of uniqueHosts) {
        let unique = true
        for (const hostToDisplay of hostsToDisplay) {
          if (
            Math.abs(hostToDisplay.location.latitude - host.location.latitude) <
              minDegreesApart &&
            Math.abs(
              hostToDisplay.location.longitude - host.location.longitude
            ) < minDegreesApart
          ) {
            unique = false
            break
          }
        }
        if (unique) {
          hostsToDisplay.push(host)
        }
      }

      // randomize the order of the hosts
      hostsToDisplay.sort(() => Math.random() - 0.5)

      return hostsToDisplay.slice(0, maxHosts).map(transformHost)
    },
    maxAge
  )
}

export type ExplorerPartialHost = {
  publicKey: string
  location: Location
  v2: boolean
  storagePrice: string
  downloadPrice: string
  uploadPrice: string
  remainingStorage: number
  totalStorage: number
}

// transform to only necessary data to limit transfer size
export function transformHost(h: ExplorerHost): ExplorerPartialHost {
  if (h.v2 === true) {
    return {
      v2: h.v2,
      publicKey: h.publicKey,
      location: h.location,
      storagePrice: h.v2Settings.prices.storagePrice,
      downloadPrice: h.v2Settings.prices.egressPrice,
      uploadPrice: h.v2Settings.prices.ingressPrice,
      remainingStorage: sectorsToBytes(
        h.v2Settings.remainingStorage
      ).toNumber(),
      totalStorage: sectorsToBytes(h.v2Settings.totalStorage).toNumber(),
    }
  }

  return {
    v2: h.v2,
    publicKey: h.publicKey,
    location: h.location,
    storagePrice: h.settings.storageprice,
    downloadPrice: h.settings.downloadbandwidthprice,
    uploadPrice: h.settings.uploadbandwidthprice,
    remainingStorage: h.settings.remainingstorage,
    totalStorage: h.settings.totalstorage,
  }
}
