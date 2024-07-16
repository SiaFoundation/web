import { isFullBlock } from '@notionhq/client'
import type {
  RichTextItemResponse,
  TableBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { Notion, fetchAllChildrenBlocks } from './notion'
import { retry } from './retry'

// Function to convert Notion rich text to markdown
export function richTextToMarkdown(richText: RichTextItemResponse[]) {
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

export async function notionToMarkdown(pageId: string, indent = '') {
  const blocks = await fetchAllChildrenBlocks({
    block_id: pageId,
  })

  let markdown = ''
  for (const block of blocks) {
    if (!isFullBlock(block)) {
      continue
    }

    let childMarkdown = ''
    if (block.has_children) {
      childMarkdown = await notionToMarkdown(block.id, indent + '     ')
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
          '\n' +
          childMarkdown
        break
      case 'numbered_list_item':
        markdown +=
          indent +
          '1. ' +
          richTextToMarkdown(block.numbered_list_item.rich_text) +
          '\n' +
          childMarkdown
        break
      case 'table':
        markdown = await tableToMarkdown(block, markdown)
        break
      case 'code':
        markdown +=
          indent +
          '```' +
          block.code.language +
          '\n' +
          richTextToMarkdown(block.code.rich_text) +
          '\n' +
          '```\n\n'
        break
    }
  }

  return markdown
}

async function tableToMarkdown(
  block: TableBlockObjectResponse,
  markdown: string,
): Promise<string> {
  const tableData = await retry(() =>
    Notion.blocks.children.list({
      block_id: block.id,
      page_size: 100,
    }),
  )

  const rows = []
  for (const rowBlock of tableData.results) {
    const row = []
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
