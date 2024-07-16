import * as htmlToImage from 'html-to-image'
import { copyImageToClipboard } from './clipboard'

export async function nodeToImage(
  node: HTMLDivElement,
  {
    name,
    quality,
    copy,
    download,
  }: {
    name: string
    quality?: number
    copy?: boolean
    download?: boolean
  },
) {
  if (!node) {
    throw Error('HTML node required')
  }
  const dataUrl = await htmlToImage.toPng(node, { quality: quality || 0.5 })
  if (download) {
    const link = document.createElement('a')
    link.download = `${name}.png`
    link.href = dataUrl
    link.click()
  }
  if (copy) {
    const fetchResponse = await fetch(dataUrl)
    const blob = await fetchResponse.blob()
    copyImageToClipboard(blob, 'image/png', name)
  }
}
