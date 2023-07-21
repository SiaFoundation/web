import { Notion } from '../content/notion'
import { isFullBlock } from '@notionhq/client'

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
export async function notionToMarkdown(pageId) {
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
