import React from 'react'
import pattern from '../assets/background-pattern.jpg'
import image from '../assets/background-image.gif'
import { Box } from '../primitives/Box'
import { Image } from '../primitives/Image'
import { getImageProps } from '../lib/image'

type Props = {
  children?: React.ReactNode
  type?: 'default' | 'next'
  level?: '1' | '2'
}

const imageProps = getImageProps(image)
const patternSrc = getImageProps(pattern).src

export function LocalBackdrop({ children }: Props) {
  return (
    <Box
      css={{
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1,
        pointerEvents: 'none',
      }}
    >
      <Box
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: '$loContrast',
        }}
      />
      <Image
        {...imageProps}
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          width: '100%',
          height: '100%',
          opacity: 0.75,
          '@motion': {
            display: 'none',
          },
        }}
      />
      <Box
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
          zIndex: 3,
          backgroundImage: `url(${patternSrc})`,
          backgroundSize: 'auto',
        }}
      />
      <Box
        css={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.95,
          zIndex: 4,
          backgroundColor: '$loContrast',
        }}
      />
      {children}
    </Box>
  )
}
