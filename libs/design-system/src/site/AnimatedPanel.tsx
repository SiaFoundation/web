import { LocalBackdrop } from './LocalBackdrop'
import { Panel } from '../core/Panel'
import { Box } from '../core/Box'
import { CSS } from '../config/theme'
import { useTheme } from '../hooks'

type Props = {
  variant?: 'default' | 'subtle'
  children: React.ReactNode
  startTime?: number
  css?: CSS
}

export function AnimatedPanel({
  variant = 'default',
  children,
  startTime,
  css,
}: Props) {
  const { activeTheme } = useTheme()

  return (
    <Panel
      radius="0"
      css={{
        position: 'relative',
        border: '3px solid $frame',
        ...css,
      }}
    >
      <Box
        css={{
          zIndex: 0,
          overflow: 'hidden',
          position: 'absolute',
          borderRadius: '$2',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            mixBlendMode: activeTheme === 'light' ? 'darken' : 'lighten',
            backgroundColor: 'rgba(30, 169, 76, 0.05)',
          }}
        />
        <Box
          css={{
            opacity: variant === 'default' ? 1 : 0.75,
          }}
        >
          <LocalBackdrop startTime={startTime} />
        </Box>
      </Box>
      <Box css={{ position: 'relative' }}>{children}</Box>
    </Panel>
  )
}
