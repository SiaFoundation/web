import { getCacheValue } from '../lib/cache'
import { getMinutesInSeconds } from '../lib/time'
import { Notion } from './notion'

type Member = {
  name: string
}

const grantCommitteeDatabaseId = '305b60291e9340d18ecb5571887d1313'

const maxAge = getMinutesInSeconds(5)

export async function getGrantCommittee(): Promise<Member[]> {
  return getCacheValue(
    'grantCommittee',
    async () => {
      const response = await Notion.databases.query({
        database_id: grantCommitteeDatabaseId,
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
      }))
    },
    maxAge
  )
}
