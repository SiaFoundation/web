import {
  getSiaStatsHostsCoordinates,
  SiaStatsHostCoordinate,
} from '@siafoundation/data-sources'
import { uniqBy } from 'lodash'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

export async function getGeoHosts() {
  const siaStatsHosts = await getSiaStatsHostsCoordinates()

  if (!siaStatsHosts.data) {
    return []
  }
  let hosts = siaStatsHosts.data

  hosts.sort((a, b) => (a.usedstorage < b.usedstorage ? 1 : -1))

  // filter hosts to only those with a country and coordinates
  hosts = hosts.filter((h) => h.country)

  // filter hosts to unique locations
  const uniqueHosts = uniqBy(hosts, (h) => `${h.lat},${h.lon}`)

  const degrees = 5
  // to get a more even distribution, we want to select the top 64 hosts
  // where no two hosts are within n degrees of each other.
  const hostsToDisplay: SiaStatsHostCoordinate[] = []
  for (const host of uniqueHosts) {
    let unique = true
    for (const hostToDisplay of hostsToDisplay) {
      if (
        Math.abs(hostToDisplay.lat - host.lat) < degrees &&
        Math.abs(hostToDisplay.lon - host.lon) < degrees
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
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheGeoHosts() {
  return getCacheValue('geoHosts', getGeoHosts, maxAge)
}
