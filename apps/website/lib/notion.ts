import { isFullBlock, isFullPage } from '@notionhq/client'
import { Notion } from '@siafoundation/data-sources'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export async function getNotionPage(pageId: string) {
  const p = await Notion.pages.retrieve({ page_id: pageId })
  const date = isFullPage(p) ? p.last_edited_time : null
  const markdown = await notionToMarkdown(pageId)
  const source = await serialize(matter(markdown).content)

  return {
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

// Function to convert Notion blocks to markdown
async function notionToMarkdown(pageId) {
  const response = await Notion.blocks.children.list({
    block_id: pageId,
    page_size: 50,
  })

  let markdown = ''
  for (const block of response.results) {
    if (!isFullBlock(block)) {
      continue
    }
    switch (block.type) {
      case 'paragraph':
        markdown += richTextToMarkdown(block.paragraph.rich_text) + '\n\n'
        break
      case 'heading_1':
        markdown +=
          '# ' + richTextToMarkdown(block.heading_1.rich_text) + '\n\n'
        break
      case 'heading_2':
        markdown +=
          '## ' + richTextToMarkdown(block.heading_2.rich_text) + '\n\n'
        break
      case 'heading_3':
        markdown +=
          '### ' + richTextToMarkdown(block.heading_3.rich_text) + '\n\n'
        break
      case 'bulleted_list_item':
        markdown +=
          '* ' + richTextToMarkdown(block.bulleted_list_item.rich_text) + '\n'
        break
      case 'numbered_list_item':
        markdown +=
          '1. ' + richTextToMarkdown(block.numbered_list_item.rich_text) + '\n'
        break
      // Additional cases can be added here for other block types...
    }
  }

  return markdown
}
