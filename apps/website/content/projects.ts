import { fetchProjects } from '@siafoundation/data-sources'
import type { ContentItemProps } from '@siafoundation/design-system'
import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { addNewTab } from '../lib/utils'

const maxAge = getMinutesInSeconds(5)

export async function getProjects(
  tag: string | null,
  limit?: number,
): Promise<ContentItemProps[]> {
  const software = await getCacheValue<ContentItemProps[]>(
    'projects.json',
    () => {
      return fetchProjects()
    },
    maxAge,
  )
  return software
    .filter((a) => !tag || a.tags?.includes(tag))
    .slice(0, limit)
    .map(addNewTab) as ContentItemProps[]
}
