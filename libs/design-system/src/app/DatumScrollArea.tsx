import { ScrollArea } from '../core/ScrollArea'
import { cx } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
  bleed?: boolean
}

export function DatumScrollArea({ children, bleed }: Props) {
  return (
    <div
      className={cx('overflow-hidden', bleed ? '-mx-8' : '')}
      style={{
        width: bleed ? 'calc(100% + $3-5 * 2)' : undefined,
      }}
    >
      <ScrollArea>
        <div className={cx('flex gap-4', bleed ? 'px-8 w-fit' : '')}>
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}
