import React from 'react'
import pattern from '../assets/background-pattern.jpg'
import image from '../assets/background-image.gif'
import { Box } from '../core/Box'
import { Image } from '../core/Image'
import { getImageProps } from '../lib/image'

type Props = {
  motion?: boolean
  children?: React.ReactNode
}

const imageProps = getImageProps(image)
const patternSrc = getImageProps(pattern).src

export function AppBackdrop({ motion = false, children }: Props) {
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
      {motion && (
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
      )}
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
