import { readCacheJsonFile } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

type Tweet = {
  link: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheTweets() {
  return readCacheJsonFile<Tweet[]>('tweets.json', [], maxAge)
}
