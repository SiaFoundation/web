import { addNewTab } from '../lib/utils'
import { getMinutesInSeconds } from '../lib/time'
import { readCacheJsonFile } from '../lib/cache'

type Tutorial = {
  title: string
  icon: string
  link: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheTutorials(limit?: number) {
  const tutorials = await readCacheJsonFile<Tutorial[]>(
    'tutorials.json',
    [],
    maxAge
  )
  return tutorials.slice(0, limit).map(addNewTab) as Tutorial[]
}
