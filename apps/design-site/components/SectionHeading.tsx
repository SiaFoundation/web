import { Box, Heading, NLink, Separator } from '@siafoundation/design-system'

type Props = {
  children: string
  hideSeparator?: boolean
}

export function SectionHeading({ children, hideSeparator }: Props) {
  const id = children.toLowerCase()
  return (
    <Box
      css={{
        pb: '$3',
      }}
    >
      {!hideSeparator && <Separator size="3" />}
      <NLink href={`#${id}`} id={id}>
        <Heading size="3">{children}</Heading>
      </NLink>
    </Box>
  )
}
