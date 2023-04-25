import { ScrollArea } from '../core/ScrollArea'
import { cx } from 'class-variance-authority'

type Props = {
  children: React.ReactNode
  bleed?: boolean
}

export function DatumScrollArea({ children, bleed }: Props) {
  return (
    <div className={cx(bleed ? '-mx-5 overflow-hidden' : '')}>
      <ScrollArea>
        <div className={cx('flex gap-4 py-4', bleed ? 'px-5 w-fit' : '')}>
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}
