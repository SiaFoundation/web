import { fetchGrantCommittee } from '@siafoundation/data-sources'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

const maxAge = getMinutesInSeconds(5)

export async function getGrantCommittee() {
  return getCacheValue('grantCommittee', fetchGrantCommittee, maxAge)
}
