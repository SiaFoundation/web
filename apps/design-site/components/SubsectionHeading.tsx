import { Box, Heading, NextLink, Link20 } from '@siafoundation/design-system'

type Props = {
  id?: string
  children: string
}

export function SubsectionHeading({ id, children }: Props) {
  const cId = id || encodeURI(children.toLowerCase())
  return (
    <Box
      css={{
        pt: '$2',
        pb: '$1',
      }}
    >
      <NextLink
        href={`#${cId}`}
        id={cId}
        css={{
          color: '$gray11',
          position: 'relative',
          '&:hover, &:hover > *': {
            color: '$gray12',
          },
        }}
      >
        <Box
          css={{
            transition: 'color 0.1s linear',
            position: 'absolute',
            top: '-0px',
            left: '-25px',
            color: '$gray7',
            display: 'none',
            '@bp2': {
              display: 'block',
            },
          }}
        >
          <Link20 />
        </Box>
        <Heading size="24">{children}</Heading>
      </NextLink>
    </Box>
  )
}
