import {
  Box,
  Heading,
  NextLink,
  Separator,
  Link20,
  Flex,
} from '@siafoundation/design-system'

type Props = {
  id?: string
  children: string
  hideSeparator?: boolean
}

export function SectionHeading({ id, children, hideSeparator }: Props) {
  const cId = id || children.toLowerCase()
  return (
    <Flex
      direction="column"
      gap="3"
      align="start"
      css={{
        pt: '$3',
        pb: '$2',
      }}
    >
      <NextLink
        href={`#${cId}`}
        id={cId}
        css={{
          color: '$slate11',
          position: 'relative',
          display: 'inline-block',
          '&:hover, &:hover > *': {
            color: '$slate12',
          },
        }}
      >
        <Box
          css={{
            transition: 'color 0.1s linear',
            position: 'absolute',
            top: '$1',
            left: '-22px',
            color: '$slate7',
            display: 'none',
            '@bp2': {
              display: 'block',
            },
          }}
        >
          <Link20 />
        </Box>
        <Heading size="3">{children}</Heading>
      </NextLink>
    </Flex>
  )
}
