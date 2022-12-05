import { readContentDirCachedJsonFile } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

type Tweet = {
  link: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheTweets() {
  return readContentDirCachedJsonFile<Tweet[]>('tweets.json', [], maxAge)
}
