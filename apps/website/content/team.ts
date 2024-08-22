import { fetchTeam } from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { minutesInSeconds } from '@siafoundation/units'

const maxAge = minutesInSeconds(5)

export async function getTeam() {
  return getCacheValue('team', fetchTeam, maxAge)
}
