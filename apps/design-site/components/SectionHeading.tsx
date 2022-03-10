import {
  Box,
  Heading,
  NLink,
  Separator,
  Link20,
} from '@siafoundation/design-system'

type Props = {
  id?: string
  children: string
  hideSeparator?: boolean
}

export function SectionHeading({ id, children, hideSeparator }: Props) {
  const cId = id || children.toLowerCase()
  return (
    <Box
      css={{
        pb: '$3',
      }}
    >
      {!hideSeparator && <Separator size="3" />}
      <NLink
        href={`#${cId}`}
        id={cId}
        css={{
          color: '$slate11',
          position: 'relative',
          '&:hover, &:hover > *': {
            color: '$slate12',
          },
        }}
      >
        <Box
          css={{
            transition: 'color 0.1s linear',
            position: 'absolute',
            top: '-8px',
            left: '-22px',
            color: '$slate7',
          }}
        >
          <Link20 />
        </Box>
        <Heading size="3">{children}</Heading>
      </NLink>
    </Box>
  )
}
