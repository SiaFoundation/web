import { cx } from 'class-variance-authority'
import { Heading } from '../core/Heading'
import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { Link20 } from '../icons/carbon'

type Props = {
  id?: string
  children: string
  size?: React.ComponentProps<typeof Heading>['size']
  className?: string
}

export function SectionHeading({
  id,
  children,
  className,
  size = '32',
}: Props) {
  const cId = id || encodeURI(children.toLowerCase())
  return (
    <div className={cx('flex flex-col gap-6 items-start', className)}>
      <Link href={`#${cId}`} id={cId} className="relative group">
        <Text className="hidden group-hover:block">
          <Link20 className="absolute top-1 -left-7 hidden md:block" />
        </Text>
        <Heading size={size}>{children}</Heading>
      </Link>
    </div>
  )
}
