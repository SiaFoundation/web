import { fetchAllPages } from './notion'

const databaseId = '305b60291e9340d18ecb5571887d1313'

type Member = {
  name: string
}

export async function fetchGrantCommittee(): Promise<Member[]> {
  const results = await fetchAllPages('name', {
    database_id: databaseId,
    sorts: [
      {
        property: 'order',
        direction: 'ascending',
      },
    ],
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return results.map((member: any) => ({
    name: member.properties.name.title?.[0]?.plain_text,
  }))
}
