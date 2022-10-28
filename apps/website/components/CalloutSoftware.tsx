import {
  Flex,
  Text,
  Box,
  Image,
  AnimatedPanel,
  Heading,
  Paragraph,
  ImageProps,
  NextLink,
} from '@siafoundation/design-system'

type Props = {
  name: string
  description: React.ReactNode
  href?: string
  startTime: number
  imageProps?: ImageProps
  children?: React.ReactNode
}

export function CalloutSoftware({
  name,
  description,
  href,
  startTime,
  imageProps,
  children,
}: Props) {
  return (
    <AnimatedPanel
      css={{ p: '$4 $3', overflow: 'hidden' }}
      startTime={startTime}
      variant="verySubtle"
    >
      <Flex direction="column">
        <Heading size="40" font="mono" css={{ fontWeight: 500 }}>
          {name}
        </Heading>
        <Paragraph css={{ mt: '$2', mb: '$1-5' }}>{description}</Paragraph>
        {!children && (
          <Text size="16" css={{ mb: '$2' }}>
            <NextLink href={href || '#'} disabled={!href}>
              {href ? 'Learn more' : 'Coming soon'}
            </NextLink>
          </Text>
        )}
        {imageProps && (
          <Box
            css={{
              position: 'relative',
              transition: 'transform 200ms ease-in-out',
              height: '200px',
              marginLeft: '-$3-5',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Image
              src={imageProps.src}
              alt={`Screenshot of ${name}`}
              css={{
                width: '150%',
                maxWidth: 'none',
              }}
            />
          </Box>
        )}
        {children}
      </Flex>
    </AnimatedPanel>
  )
}
