import { getMinutesInSeconds } from '../lib/time'
import { readCacheJsonFile } from '../lib/readJson'

type Member = {
  name: string
  title: string
  image?: string
  twitter?: string
  github?: string
  linkedin?: string
  description: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheTeam(): Promise<Member[]> {
  return readCacheJsonFile('team.json', [], maxAge)
}
