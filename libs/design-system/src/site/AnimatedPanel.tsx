import { LocalBackdrop } from './LocalBackdrop'
import { Panel } from '../core/Panel'
import { useTheme } from '../hooks/useTheme'
import { cx } from 'class-variance-authority'

type Props = {
  variant?: 'default' | 'subtle' | 'verySubtle'
  children: React.ReactNode
  startTime?: number
  className?: string
}

export function AnimatedPanel({
  variant = 'default',
  children,
  startTime,
  className,
}: Props) {
  const { activeTheme } = useTheme()

  return (
    <Panel
      className={cx(
        'rounded-none relative border border-black dark:border-graydark-1100',
        className
      )}
      style={{
        borderWidth: '3px',
      }}
    >
      <div className="z-0 overflow-hidden absolute rounded-sm top-0 left-0 w-full h-full">
        <div
          className={cx(
            'absolute w-full h-full',
            activeTheme === 'light' ? 'mix-blend-darken' : 'mix-blend-lighten'
          )}
          style={{
            backgroundColor: 'rgba(30, 169, 76, 0.05)',
          }}
        />
        <div
          style={{
            opacity:
              variant === 'default' ? 1 : variant === 'subtle' ? 0.75 : 0.65,
          }}
        >
          <LocalBackdrop startTime={startTime} />
        </div>
      </div>
      <div className="relative">{children}</div>
    </Panel>
  )
}
