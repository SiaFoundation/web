import {
  AnimatedPanel,
  Container,
  Flex,
  Skeleton,
} from '@siafoundation/design-system'
import { EntityList } from '../../EntityList'

export function BlockEntitySkeleton() {
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
              <Flex gap="3" justify="between" wrap="wrap">
                <Skeleton css={{ height: '40px', width: '250px' }} />
                <Skeleton css={{ height: '40px', width: '200px' }} />
              </Flex>
              <Flex gap="3" wrap="wrap">
                <Skeleton css={{ width: '150px', height: '75px' }} />
                <Skeleton css={{ width: '150px', height: '75px' }} />
                <Skeleton css={{ width: '150px', height: '75px' }} />
                <Skeleton css={{ width: '300px', height: '75px' }} />
                <Skeleton css={{ width: '300px', height: '75px' }} />
              </Flex>
              <Skeleton css={{ width: '100%', height: '45px' }} />
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container>
        <EntityList title="Transactions" entities={undefined} />
      </Container>
    </>
  )
}
