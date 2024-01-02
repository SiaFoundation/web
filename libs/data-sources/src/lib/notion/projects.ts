import { fetchAllPages } from './notion'

const databaseId = '9e6e776b394642d8b7edfafe43f74867'

export async function fetchProjects() {
  const results = await fetchAllPages('title', {
    database_id: databaseId,
    sorts: [
      {
        property: 'order',
        direction: 'ascending',
      },
    ],
  })
  const projects = results.map((page) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { properties } = page as any
    return {
      title: properties.title?.title[0]?.plain_text,
      subtitle: properties.subtitle?.rich_text[0]?.plain_text || null,
      link: properties.link?.url || null,
      linkText: properties.link_text?.rich_text[0]?.plain_text || null,
      logo: properties.logo?.rich_text[0]?.plain_text || null,
      image: properties.image?.rich_text[0]?.plain_text || null,
      background: properties.background?.rich_text[0]?.plain_text || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: properties.tags?.multi_select.map((tag: any) => tag.name),
      idea: properties.idea?.checkbox,
    }
  })
  return projects
}
