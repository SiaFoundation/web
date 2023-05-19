import { addNewTab } from '../lib/utils'
import { getMinutesInSeconds } from '../lib/time'
import { readContentDirCachedJsonFile } from '../lib/cache'

type Tutorial = {
  title: string
  icon: string
  link: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheTutorials(limit?: number) {
  const tutorials = await readContentDirCachedJsonFile<Tutorial[]>(
    'tutorials.json',
    [],
    maxAge
  )
  return tutorials.slice(0, limit).map(addNewTab) as Tutorial[]
}

export async function getCacheRentingTutorials(limit?: number) {
  const tutorials = await readContentDirCachedJsonFile<Tutorial[]>(
    'renting.json',
    [],
    maxAge
  )
  return tutorials.slice(0, limit).map(addNewTab) as Tutorial[]
}

export async function getCacheHostingTutorials(limit?: number) {
  const tutorials = await readContentDirCachedJsonFile<Tutorial[]>(
    'hosting.json',
    [],
    maxAge
  )
  return tutorials.slice(0, limit).map(addNewTab) as Tutorial[]
}

export async function getCacheWalletTutorials(limit?: number) {
  const tutorials = await readContentDirCachedJsonFile<Tutorial[]>(
    'wallet.json',
    [],
    maxAge
  )
  return tutorials.slice(0, limit).map(addNewTab) as Tutorial[]
}
