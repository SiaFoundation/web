import { readCacheJsonFile } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

type Versions = {
  sia: {
    latest: string
  }
  embarcadero: {
    latest: string
  }
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheVersions(): Promise<Versions> {
  return readCacheJsonFile(
    'versions.json',
    {
      sia: {
        latest: '1.5.9',
      },
      embarcadero: {
        latest: '1.0.0',
      },
    },
    maxAge
  )
}
