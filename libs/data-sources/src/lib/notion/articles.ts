import { fetchAllPages } from './notion'

const featuredArticlesDatabaseId = '4cc7f2c2d6e94da2aacf44627efbd6be'

export async function fetchArticlesByTag(tag: string) {
  const results = await fetchAllPages('title', {
    database_id: featuredArticlesDatabaseId,
    sorts: [
      {
        property: 'order',
        direction: 'ascending',
      },
    ],
    filter: {
      property: 'tags',
      multi_select: {
        contains: tag,
      },
    },
  })
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return results.map((page: any) => {
    return {
      title: page.properties.title.title?.[0]?.plain_text,
      icon: page.properties.icon?.rich_text[0]?.plain_text || null,
      image: page.properties.image?.rich_text[0]?.plain_text || null,
      link: page.properties.link?.url || null,
      idea: page.properties.idea.checkbox,
    }
  })
}
