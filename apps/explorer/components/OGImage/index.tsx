import { ImageResponse } from 'next/og'
import { Preview } from './Preview'
import { ogFile } from './asset'

export async function getOGImage(
  props: React.ComponentProps<typeof Preview>,
  size: { width: number; height: number },
) {
  const medium = ogFile('fonts/plex-sans-medium.ttf')
  const semibold = ogFile('fonts/plex-sans-semibold.ttf')
  const bold = ogFile('fonts/plex-sans-bold.ttf')

  return new ImageResponse(<Preview {...props} />, {
    ...size,
    fonts: [
      {
        name: 'IBM Plex Sans',
        data: medium,
        style: 'normal',
        weight: 500,
      },
      {
        name: 'IBM Plex Sans',
        data: semibold,
        style: 'normal',
        weight: 600,
      },
      {
        name: 'IBM Plex Sans',
        data: bold,
        style: 'normal',
        weight: 700,
      },
    ],
  })
}
