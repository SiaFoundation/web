import { addNewTab } from '../lib/utils'
import { readCacheJsonFile } from '../lib/readJson'
import { getMinutesInSeconds } from '../lib/time'

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
