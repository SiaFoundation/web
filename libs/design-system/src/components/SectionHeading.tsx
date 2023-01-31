import { Heading } from '../core/Heading'

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
  return (
    <Heading id={id} size={size} link className={className}>
      {children}
    </Heading>
  )
}
