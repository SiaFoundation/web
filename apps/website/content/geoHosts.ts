import { getCacheValue } from '../lib/cache'
import { siascan } from '../config/siascan'
import { to } from '@siafoundation/request'
import { minutesInSeconds } from '@siafoundation/units'
import { ExplorerHost } from '@siafoundation/explored-types'

const maxAge = minutesInSeconds(5)

const maxHosts = 1000
const minDegreesApart = 1

export async function getGeoHosts(): Promise<ExplorerPartialHost[]> {
  return getCacheValue(
    'geoHosts',
    async () => {
      const [hosts, error] = await to(
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

      hosts.sort((a, b) =>
        a.settings.totalstorage - a.settings.remainingstorage <
        b.settings.totalstorage - b.settings.remainingstorage
          ? 1
          : -1
      )

      // Filter out hosts without location data
      const uniqueHosts = hosts.filter((h) => h.location)

      // to get a more even distribution, we want to select the top 64 hosts
      // where no two hosts are within n degrees of each other.
      const hostsToDisplay: ExplorerHost[] = []
      for (const host of uniqueHosts) {
        let unique = true
        for (const hostToDisplay of hostsToDisplay) {
          if (
            Math.abs(hostToDisplay.location[0] - host.location[0]) <
              minDegreesApart &&
            Math.abs(hostToDisplay.location[1] - host.location[1]) <
              minDegreesApart
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
  countryCode: string
  location: [number, number]
  settings: {
    storageprice: string
    downloadbandwidthprice: string
    uploadbandwidthprice: string
    totalstorage: number
    remainingstorage: number
  }
}

// transform to only necessary data to limit transfer size
export function transformHost(h: ExplorerHost): ExplorerPartialHost {
  return {
    publicKey: h.publicKey,
    countryCode: h.countryCode,
    location: h.location,
    settings: {
      storageprice: h.settings.storageprice,
      downloadbandwidthprice: h.settings.downloadbandwidthprice,
      uploadbandwidthprice: h.settings.uploadbandwidthprice,
      totalstorage: h.settings.totalstorage,
      remainingstorage: h.settings.remainingstorage,
    },
  }
}
