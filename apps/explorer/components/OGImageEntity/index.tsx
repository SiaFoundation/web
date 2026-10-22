import { ImageResponse } from 'next/og'
import { Preview } from './Preview'
import { ogAssets } from '../OGImage/asset'

export async function getOGImage(
  props: Omit<React.ComponentProps<typeof Preview>, 'pictures'>,
  size: { width: number; height: number },
) {
  const { fonts, pictures } = await ogAssets()
  return new ImageResponse(<Preview {...props} pictures={pictures} />, {
    ...size,
    fonts,
  })
}
