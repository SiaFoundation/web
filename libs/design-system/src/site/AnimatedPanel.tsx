import { LocalBackdrop } from './LocalBackdrop'
import { Panel } from '../core/Panel'
import { Box } from '../core/Box'
import { CSS } from '../config/theme'

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
  return (
    <Panel
      radius="0"
      css={{
        position: 'relative',
        border: '2px solid $frame',
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
          opacity: variant === 'default' ? 1 : 0.65,
        }}
      >
        <LocalBackdrop startTime={startTime} />
      </Box>
      <Box css={{ position: 'relative' }}>{children}</Box>
    </Panel>
  )
}
