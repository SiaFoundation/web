import { Heading, Link, Link20 } from '@siafoundation/design-system'
import { cx } from 'class-variance-authority'

type Props = {
  id?: string
  children: string
  className?: string
}

export function SubsectionHeading({ id, className, children }: Props) {
  const cId = id || encodeURI(children.toLowerCase())
  return (
    <div className={cx('pt-4 pb-8', className)}>
      <Link href={`#${cId}`} id={cId} className="relative">
        <Link20 className="absolute top-1 -left-7 hidden md:block" />
        <Heading size="24">{children}</Heading>
      </Link>
    </div>
  )
}
