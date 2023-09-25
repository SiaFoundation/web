import { Client, isFullPage } from '@notionhq/client'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import * as dotenv from 'dotenv'
import { retry } from './retry'
import { notionToMarkdown } from './markdown'
dotenv.config()

export const Notion = new Client({
  auth: process.env['NOTION_TOKEN'],
})

export async function getNotionPage(pageId: string) {
  const p = await retry(() => Notion.pages.retrieve({ page_id: pageId }))
  const title = isFullPage(p)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? ((p.properties as any).title['title'][0].plain_text as string)
    : null
  const date = isFullPage(p) ? p.last_edited_time : null
  const markdown = await notionToMarkdown(pageId)
  const source = await serialize(matter(markdown).content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  })

  return {
    title,
    date,
    source,
  }
}

export async function fetchAllPages(
  titleKey: string,
  params: Parameters<typeof Notion.databases.query>[0]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allPages: any[] = []
  let startCursor: string | undefined = undefined
  let more = true
  let response = null
  while (more) {
    response = await retry(() => Notion.databases.query({
      ...params,
      page_size: 100,
      start_cursor: startCursor,
    }))
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

export async function fetchAllChildrenBlocks(
  params: Parameters<typeof Notion.blocks.children.list>[0]
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allBlocks: any[] = []
  let startCursor: string | undefined = undefined
  let more = true
  let response = null
  while (more) {
    response = await retry(() => Notion.blocks.children.list({
      ...params,
      page_size: 100,
      start_cursor: startCursor,
    }))
    allBlocks.push(...response.results)
    if (!response.has_more) {
      more = false
      break
    }
    startCursor = response.next_cursor || undefined
  }
  // filter out empty pages
  return allBlocks
}
