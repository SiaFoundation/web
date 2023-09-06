import { isFullBlock, isFullPage } from '@notionhq/client'
import { TableBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Notion } from '@siafoundation/data-sources'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'

export async function getNotionPage(pageId: string) {
  const p = await Notion.pages.retrieve({ page_id: pageId })
  const title = isFullPage(p)
    ? (p.properties.title['title'][0].plain_text as string)
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

// Function to convert Notion rich text to markdown
function richTextToMarkdown(richText) {
  return richText
    .map(({ plain_text, annotations, href }) => {
      let text = plain_text

      // Apply annotations
      if (annotations.bold) text = `**${text}**`
      if (annotations.italic) text = `*${text}*`
      if (annotations.strikethrough) text = `~~${text}~~`
      if (annotations.underline) text = `_${text}_`
      if (annotations.code) text = '`' + text + '`'

      // Add link
      if (href) text = `[${text}](${href})`

      return text
    })
    .join('')
}

async function notionToMarkdown(pageId, indent = '') {
  const response = await Notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  })

  let markdown = ''
  for (const block of response.results) {
    if (!isFullBlock(block)) {
      continue
    }

    if (block.has_children) {
      const childMarkdown = await notionToMarkdown(block.id, indent + '     ')
      markdown += childMarkdown
    }

    switch (block.type) {
      case 'paragraph':
        markdown +=
          indent + richTextToMarkdown(block.paragraph.rich_text) + '\n\n'
        break
      case 'heading_1':
        markdown +=
          indent + '# ' + richTextToMarkdown(block.heading_1.rich_text) + '\n\n'
        break
      case 'heading_2':
        markdown +=
          indent +
          '## ' +
          richTextToMarkdown(block.heading_2.rich_text) +
          '\n\n'
        break
      case 'heading_3':
        markdown +=
          indent +
          '### ' +
          richTextToMarkdown(block.heading_3.rich_text) +
          '\n\n'
        break
      case 'bulleted_list_item':
        markdown +=
          indent +
          '* ' +
          richTextToMarkdown(block.bulleted_list_item.rich_text) +
          '\n'
        break
      case 'numbered_list_item':
        markdown +=
          indent +
          '1. ' +
          richTextToMarkdown(block.numbered_list_item.rich_text) +
          '\n'
        break
      case 'table':
        markdown = await tableToMarkdown(block, markdown)
        break
    }
  }

  return markdown
}

async function tableToMarkdown(
  block: TableBlockObjectResponse,
  markdown: string
): Promise<string> {
  const tableData = await Notion.blocks.children.list({
    block_id: block.id,
    page_size: 100,
  })

  const rows = []
  for (const rowBlock of tableData.results) {
    const row = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const cell of (rowBlock as any).table_row.cells) {
      const cellMarkdown = richTextToMarkdown(cell).trim()
      row.push(cellMarkdown)
    }
    rows.push(row)
  }

  rows.forEach((row, i) => {
    markdown += `| ${row.join(' | ')} |\n`
    if (i === 0) {
      markdown += `| ${row.map(() => '---').join(' | ')} |\n`
    }
  })
  markdown += '\n\n'
  return markdown
}
