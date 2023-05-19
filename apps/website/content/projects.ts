import { ContentItemProps } from '@siafoundation/design-system'
import { addNewTab } from '../lib/utils'
import { getMinutesInSeconds } from '../lib/time'
import { readContentDirCachedJsonFile } from '../lib/cache'

const maxAge = getMinutesInSeconds(5)

export async function getCacheProjects(
  tag: string | null,
  limit?: number
): Promise<ContentItemProps[]> {
  const software = await readContentDirCachedJsonFile<ContentItemProps[]>(
    'projects.json',
    [],
    maxAge
  )
  return software
    .filter((a) => !tag || a.tags?.includes(tag))
    .slice(0, limit)
    .map(addNewTab) as ContentItemProps[]
}
