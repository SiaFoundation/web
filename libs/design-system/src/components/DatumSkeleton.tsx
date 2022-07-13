import { Box, Flex, Skeleton } from '../'

export function DatumSkeleton() {
  return (
    <Flex gap="6" wrap="wrap" align="center" css={{ overflow: 'hidden' }}>
      <Box css={{ flex: 1 }}>
        <Skeleton css={{ width: '100px', height: '24px' }} />
      </Box>
      <Flex
        direction="column"
        align={{
          '@initial': 'end',
          '@bp2': 'start',
        }}
        gap="1"
        css={{
          '@bp2': {
            flex: 2,
          },
        }}
      >
        <Skeleton css={{ width: '200px', height: '24px' }} />
      </Flex>
    </Flex>
  )
}
