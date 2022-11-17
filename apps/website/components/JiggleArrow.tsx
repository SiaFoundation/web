import { Text, ArrowUp16, ArrowDown16 } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = {
  title: string
  onClick: () => void
  direction: 'up' | 'down'
  className?: string
}

export function JiggleArrow({ title, direction, onClick, className }: Props) {
  return (
    <div
      className={cx(
        'flex items-center gap-1 cursor-pointer animate-jiggle',
        className
      )}
      onClick={onClick}
    >
      <Text color="subtle">
        {direction === 'up' ? <ArrowUp16 /> : <ArrowDown16 />}
      </Text>
      <Text color="subtle">{title}</Text>
    </div>
  )
}
