import { getSiaCentralHosts, SiaCentralHost } from '@siafoundation/data-sources'
import { uniqBy } from 'lodash'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getGeoHosts() {
  return getCacheValue(
    'geoHosts',
    async () => {
      const siaCentralHosts = await getSiaCentralHosts()

      if (!siaCentralHosts.data) {
        return []
      }
      let hosts = siaCentralHosts.data.hosts

      hosts.sort((a, b) =>
        a.settings.total_storage - a.settings.remaining_storage <
        b.settings.total_storage - a.settings.remaining_storage
          ? 1
          : -1
      )

      // filter hosts to only those with a country and coordinates
      hosts = hosts.filter((h) => h.country_code)

      // filter hosts to unique locations
      const uniqueHosts = uniqBy(
        hosts,
        (h) => `${h.location[0]},${h.location[1]}`
      )

      const degrees = 5
      // to get a more even distribution, we want to select the top 64 hosts
      // where no two hosts are within n degrees of each other.
      const hostsToDisplay: SiaCentralHost[] = []
      for (const host of uniqueHosts) {
        let unique = true
        for (const hostToDisplay of hostsToDisplay) {
          if (
            Math.abs(hostToDisplay.location[0] - host.location[0]) < degrees &&
            Math.abs(hostToDisplay.location[1] - host.location[1]) < degrees
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

      return hostsToDisplay.slice(0, 64)
    },
    maxAge
  )
}
