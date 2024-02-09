import { ImageResponse } from 'next/og'
import React from 'react'
import { Preview } from './Preview'

export async function getOGImage(
  props: React.ComponentProps<typeof Preview>,
  size: { width: number; height: number }
) {
  const medium = await fetch(
    new URL('https://sia.tech/assets/fonts/plex-sans-medium.ttf')
  ).then((res) => res.arrayBuffer())
  const semibold = await fetch(
    new URL('https://sia.tech/assets/fonts/plex-sans-bold.ttf')
  ).then((res) => res.arrayBuffer())
  const bold = await fetch(
    new URL('https://sia.tech/assets/fonts/plex-sans-bold.ttf')
  ).then((res) => res.arrayBuffer())

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
