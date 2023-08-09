import { Client } from '@notionhq/client'
import * as dotenv from 'dotenv'
dotenv.config()

export const Notion = new Client({
  auth: process.env['NOTION_TOKEN'],
})

export async function fetchAllPages(
  titleKey: string,
  params: Parameters<typeof Notion.databases.query>[0]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPages: any[] = []
  let startCursor = undefined
  let more = true
  let response = null
  while (more) {
    response = await Notion.databases.query({
      ...params,
      page_size: 100,
      start_cursor: startCursor,
    })
    allPages.push(...response.results)
    if (!response.has_more) {
      more = false
      break
    }
    startCursor = response.next_cursor || undefined
  }
  // filter out empty pages
  return allPages.filter(
    (page) => page.properties[titleKey].title?.[0]?.plain_text
  )
}
