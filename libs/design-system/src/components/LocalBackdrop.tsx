import { useMemo } from 'react'
import { Box } from '../core/Box'
import { random } from 'lodash'
import { useTheme } from '../hooks/useTheme'

export function LocalBackdrop() {
  const { activeTheme } = useTheme()
  const videoStart = useMemo(() => random(0, 20), [])

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
        as="video"
        src={`/texture.webm#t=${videoStart}`}
        preload="true"
        autoPlay
        loop
        muted
        css={{
          filter: activeTheme === 'dark' ? 'invert(1)' : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          objectFit: 'cover',
          height: '100%',
          width: '100%',
          '@motion': {
            display: 'none',
          },
        }}
      />
    </Box>
  )
}
