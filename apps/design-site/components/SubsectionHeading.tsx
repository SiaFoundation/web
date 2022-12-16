import { SectionHeading } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = {
  id?: string
  children: string
  className?: string
}

export function SubsectionHeading({ id, className, children }: Props) {
  return (
    <SectionHeading id={id} size="24" className={cx('pt-16 pb-8', className)}>
      {children}
    </SectionHeading>
  )
}
