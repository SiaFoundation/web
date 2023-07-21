import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { Notion } from './notion'

type Member = {
  name: string
  title: string
  twitter?: string
  github?: string
  linkedin?: string
}

const maxAge = getMinutesInSeconds(5)

const teamDatabaseId = '0d1ae57c90eb4fedb69dc509d1926ef2'

export async function getTeam(): Promise<Member[]> {
  return getCacheValue(
    'team',
    async () => {
      const response = await Notion.databases.query({
        database_id: teamDatabaseId,
        sorts: [
          {
            property: 'order',
            direction: 'ascending',
          },
        ],
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return response.results.map((member: any) => ({
        name: member.properties.name.title[0].plain_text,
        title: member.properties.title.rich_text[0]?.plain_text || null,
        github: member.properties.github.rich_text[0]?.plain_text || null,
        twitter: member.properties.twitter.rich_text[0]?.plain_text || null,
        linkedin: member.properties.linkedin.rich_text[0]?.plain_text || null,
      }))
    },
    maxAge
  )
}
