import { Heading } from '@siafoundation/design-system'

type Props = {
  children: React.ReactNode
}

export function SubsectionHeading({ children }: Props) {
  return (
    <Heading
      size={'2'}
      css={{ display: 'block', paddingBottom: '$3', color: '$slate11' }}
    >
      {children}
    </Heading>
  )
}
