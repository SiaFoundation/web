import { readContentDirCachedJsonFile } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

type Member = {
  name: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheGrantCommittee(): Promise<Member[]> {
  return readContentDirCachedJsonFile('grantCommittee.json', [], maxAge)
}
