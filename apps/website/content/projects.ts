import { ContentItemProps } from '@siafoundation/design-system'
import { addNewTab } from '../lib/utils'
import { getMinutesInSeconds } from '../lib/time'
import { getCacheValue } from '../lib/cache'
import { Notion } from './notion'

const maxAge = getMinutesInSeconds(5)

export async function getProjects(
  tag: string | null,
  limit?: number
): Promise<ContentItemProps[]> {
  const software = await getCacheValue<ContentItemProps[]>(
    'projects.json',
    async () => {
      const response = await Notion.databases.query({
        database_id: '9e6e776b394642d8b7edfafe43f74867',
        sorts: [
          {
            property: 'order',
            direction: 'ascending',
          },
        ],
      })
      const projects = response.results.map((page) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { properties } = page as any
        return {
          title: properties.title?.title[0]?.plain_text,
          subtitle: properties.subtitle?.rich_text[0]?.plain_text || null,
          link: properties.link?.url || null,
          logo: properties.logo?.rich_text[0]?.plain_text || null,
          image: properties.image?.rich_text[0]?.plain_text || null,
          background: properties.background?.rich_text[0]?.plain_text || null,
          tags: properties.tags?.multi_select.map((tag) => tag.name),
          idea: properties.idea?.checkbox,
        }
      })
      return projects
    },
    maxAge
  )
  return software
    .filter((a) => !tag || a.tags?.includes(tag))
    .slice(0, limit)
    .map(addNewTab) as ContentItemProps[]
}
