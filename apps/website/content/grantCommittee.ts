import { fetchGrantCommittee } from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { minutesInSeconds } from '@siafoundation/units'

const maxAge = minutesInSeconds(5)

export async function getGrantCommittee() {
  return getCacheValue('grantCommittee', fetchGrantCommittee, maxAge)
}
