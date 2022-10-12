import { ContentItemProps } from '@siafoundation/design-system'
import { addNewTab } from '../lib/utils'
import { readCacheJsonFile } from '../lib/readJson'
import { getMinutesInSeconds } from '../lib/time'

type Software = ContentItemProps & {
  logo: string
}

const maxAge = getMinutesInSeconds(5)

export async function getCacheSoftware(
  tag: string | null,
  limit?: number
): Promise<Software[]> {
  const software = await readCacheJsonFile<Software[]>(
    'software.json',
    [],
    maxAge
  )
  return software
    .filter((a) => !tag || a.tags.includes(tag))
    .slice(0, limit)
    .map(addNewTab) as Software[]
}
