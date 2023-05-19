import { Panel } from '../core/Panel'
import { cx } from 'class-variance-authority'
import { BackgroundImagePattern } from './BackgroundImagePattern'
import { StaticImageData } from 'next/image'

type Props = {
  id?: string
  children: React.ReactNode
  className?: string
  background: StaticImageData
}

export function PatternedPanel({ id, children, className, background }: Props) {
  return (
    <Panel
      className={cx('relative rounded-lg border-2 overflow-hidden', className)}
    >
      {id && (
        <div className="relative">
          <div id={id} className="absolute -top-[100px]" />
        </div>
      )}
      <div className="z-0 overflow-hidden absolute rounded-sm top-0 left-0 w-full h-full opacity-70 dark:opacity-50">
        <BackgroundImagePattern background={background} />
      </div>
      <div className="relative">{children}</div>
    </Panel>
  )
}
