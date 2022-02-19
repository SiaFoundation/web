import React from 'react'
import pattern from '../assets/background-pattern.jpg'
import image from '../assets/background-image.gif'
import { Box } from '../primitives/Box'
import { Image } from '../primitives/Image'

type Props = {
  children?: React.ReactNode
  type?: 'default' | 'next'
  level?: '1' | '2'
}

// The image imports have different behaviour when the consuming is app is CRA vs Next
// CRA returns a URL string whereas Next returns an object with multiple image attributes.
const imageProps = typeof image === 'string' ? { src: image } : image
// eslint-disable-next-line
const patternSrc = typeof pattern === 'string' ? pattern : (pattern as any).src

export function Background({ children }: Props) {
  return (
    <Box
      css={{
        position: 'relative',
        zIndex: -1,
        opacity: 1,
        pointerEvents: 'none',
      }}
    >
      <Box
        css={{
          position: 'fixed',
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
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          '@motion': {
            display: 'none',
          },
        }}
      />
      <Box
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '200vw',
          height: '200vh',
          opacity: 0.3,
          zIndex: 3,
          backgroundImage: `url(${patternSrc})`,
          backgroundPositionY: 'bottom',
          backgroundSize: 'auto',
          transform: 'translate(-50vw,-100vh)',
        }}
      />
      <Box
        css={{
          position: 'fixed',
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
