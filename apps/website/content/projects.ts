import { ContentItemProps } from '@siafoundation/design-system'
import { addNewTab } from '../lib/utils'
import { getMinutesInSeconds } from '../lib/time'
import { getCacheValue } from '../lib/cache'
import { fetchProjects } from '@siafoundation/data-sources'

const maxAge = getMinutesInSeconds(5)

export async function getProjects(
  tag: string | null,
  limit?: number
): Promise<ContentItemProps[]> {
  const software = await getCacheValue<ContentItemProps[]>(
    'projects.json',
    () => {
      return fetchProjects()
    },
    maxAge
  )
  return software
    .filter((a) => !tag || a.tags?.includes(tag))
    .slice(0, limit)
    .map(addNewTab) as ContentItemProps[]
}
