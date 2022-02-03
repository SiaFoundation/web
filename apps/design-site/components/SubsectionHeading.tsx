import { Box, Heading, NLink } from '@siafoundation/design-system'

type Props = {
  children: string
}

export function SubsectionHeading({ children }: Props) {
  const id = encodeURI(children.toLowerCase())
  return (
    <Box
      css={{
        pb: '$3',
      }}
    >
      <NLink href={`#${id}`} id={id}>
        <Heading size={'2'} css={{ color: '$slate11' }}>
          {children}
        </Heading>
      </NLink>
    </Box>
  )
}
