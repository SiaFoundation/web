import { ScrollArea } from '../core/ScrollArea'
import { cx } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
  bleed?: boolean
}

export function DatumScrollArea({ children, bleed }: Props) {
  return (
    <div
      className={cx('', bleed ? '-mx-5 px-5' : '')}
      style={{
        width: bleed ? 'calc(100% + $3-5 * 2)' : undefined,
      }}
    >
      <ScrollArea>
        <div className={cx('flex gap-4', bleed ? 'w-fit' : '')}>{children}</div>
      </ScrollArea>
    </div>
  )
}
