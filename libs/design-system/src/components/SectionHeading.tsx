import { Heading } from '../core/Heading'

type Props = {
  id?: string
  children: string
  size?: React.ComponentProps<typeof Heading>['size']
  anchorLink?: boolean
  className?: string
}

export function SectionHeading({
  id,
  children,
  className,
  anchorLink = true,
  size = '32',
}: Props) {
  return (
    <Heading id={id} size={size} anchorLink={anchorLink} className={className}>
      {children}
    </Heading>
  )
}
