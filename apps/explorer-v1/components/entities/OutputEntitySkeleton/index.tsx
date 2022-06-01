import {
  AnimatedPanel,
  Container,
  Flex,
  Skeleton,
} from '@siafoundation/design-system'

export function OutputEntitySkeleton() {
  return (
    <>
      <Container>
        <Flex direction="column" gap="6">
          <AnimatedPanel
            variant="subtle"
            startTime={0}
            css={{
              padding: '$3',
              borderRadius: '$2',
            }}
          >
            <Flex direction="column" gap="5">
              <Flex gap="1" justify="between" wrap="wrap">
                <Skeleton css={{ height: '30px', width: '450px' }} />
                <Skeleton css={{ height: '30px', width: '100px' }} />
              </Flex>
              <Flex gap="6" wrap="wrap">
                <Skeleton css={{ width: '350px', height: '65px' }} />
                <Skeleton css={{ width: '120px', height: '65px' }} />
                <Skeleton css={{ width: '120px', height: '65px' }} />
                <Skeleton css={{ width: '120px', height: '65px' }} />
              </Flex>
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
    </>
  )
}
