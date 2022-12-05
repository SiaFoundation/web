import { readContentDirCachedJsonFile } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'

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
  return readContentDirCachedJsonFile('team.json', [], maxAge)
}
