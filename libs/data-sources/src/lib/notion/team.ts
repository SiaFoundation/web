import { fetchAllPages } from './notion'

const databaseId = '0d1ae57c90eb4fedb69dc509d1926ef2'

type Member = {
  name: string
  title: string
  twitter?: string
  github?: string
  linkedin?: string
}

export async function fetchTeam(): Promise<Member[]> {
  const results = await fetchAllPages('name', {
    database_id: databaseId,
    sorts: [
      {
        property: 'order',
        direction: 'ascending',
      },
    ],
  })
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return results.map((member: any) => ({
    name: member.properties.name.title?.[0]?.plain_text,
    title: member.properties.title.rich_text[0]?.plain_text || null,
    github: member.properties.github.rich_text[0]?.plain_text || null,
    twitter: member.properties.twitter.rich_text[0]?.plain_text || null,
    linkedin: member.properties.linkedin.rich_text[0]?.plain_text || null,
  }))
}
