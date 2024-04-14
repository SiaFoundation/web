import { SiaCentralHost } from '@siafoundation/sia-central-types'
import { getSiaCentralHosts } from '@siafoundation/sia-central-js'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

const maxHosts = 1000
const minDegreesApart = 1

export async function getGeoHosts(): Promise<SiaCentralPartialHost[]> {
  return getCacheValue(
    'geoHosts',
    async () => {
      const { data: siaCentralHosts, error } = await getSiaCentralHosts({
        params: {
          limit: 300,
        },
      })
      if (error) {
        return []
      }
      const hosts = siaCentralHosts.hosts

      hosts.sort((a, b) =>
        a.settings.total_storage - a.settings.remaining_storage <
        b.settings.total_storage - a.settings.remaining_storage
          ? 1
          : -1
      )

      // Filter out hosts without location data
      const uniqueHosts = hosts.filter((h) => h.location)

      // to get a more even distribution, we want to select the top 64 hosts
      // where no two hosts are within n degrees of each other.
      const hostsToDisplay: SiaCentralHost[] = []
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

export type SiaCentralPartialHost = {
  public_key: string
  country_code: string
  location: [number, number]
  settings: {
    storage_price: string
    download_price: string
    upload_price: string
    total_storage: number
    remaining_storage: number
  }
  benchmark?: {
    data_size: number
    download_time: number
    upload_time: number
  }
}

// transform to only necessary data to limit transfer size
export function transformHost(h: SiaCentralHost): SiaCentralPartialHost {
  return {
    public_key: h.public_key,
    country_code: h.country_code,
    location: h.location,
    settings: {
      storage_price: h.settings.storage_price,
      download_price: h.settings.download_price,
      upload_price: h.settings.upload_price,
      total_storage: h.settings.total_storage,
      remaining_storage: h.settings.remaining_storage,
    },
    benchmark: {
      data_size: h.benchmark?.data_size || null,
      download_time: h.benchmark?.download_time || null,
      upload_time: h.benchmark?.upload_time || null,
    },
  }
}
