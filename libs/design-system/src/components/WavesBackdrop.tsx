import { Box } from '../core/Box'
import waves from '../assets/wave.svg'
import { getImageProps } from '../lib/image'
import { useTheme } from '../hooks/useTheme'

const wavesProps = getImageProps(waves)

export function WavesBackdrop() {
  const { activeTheme } = useTheme()
  return (
    <Box
      css={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: -1,
        top: 0,
        left: 0,
        backgroundColor: '$waves',
        opacity: 0.983,
      }}
    >
      <Box
        css={{
          filter: `invert(${activeTheme === 'dark' ? 1 : 0})`,
          width: '100%',
          height: '100%',
          background: `url(${wavesProps.src})`,
          backgroundRepeat: 'repeat',
          opacity: 0.3,
        }}
      />
    </Box>
  )
}
