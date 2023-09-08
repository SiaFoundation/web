import { ImageResponse } from 'next/server'
import React from 'react'
import { Preview } from './Preview'

export async function getOGImage(
  props: React.ComponentProps<typeof Preview>,
  size: { width: number; height: number }
) {
  const titleFont = await fetch(
    new URL('https://sia.tech/assets/fonts/plex-sans-medium.ttf')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(<Preview {...props} />, {
    ...size,
    fonts: [
      {
        name: 'IBM Plex Sans',
        data: titleFont,
        style: 'normal',
        weight: 500,
      },
    ],
  })
}
