import { Box } from '../core/Box'
import { useTheme } from '../hooks/useTheme'

type Props = {
  startTime?: number
}

export function LocalBackdrop({ startTime = 0 }: Props) {
  const { activeTheme } = useTheme()

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
        backgroundColor: '$panel',
      }}
    >
      <Box
        as="video"
        preload="true"
        autoPlay
        loop
        muted
        css={{
          filter: activeTheme === 'dark' ? 'invert(0.9)' : 'none',
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
      >
        <Box
          as="source"
          src={`/texture.webm#t=${startTime}`}
          type="video/webm"
        />
        <Box as="source" src={`/texture.mp4#t=${startTime}`} type="video/mp4" />
      </Box>
    </Box>
  )
}
