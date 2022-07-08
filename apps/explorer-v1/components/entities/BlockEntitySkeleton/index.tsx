import {
  AnimatedPanel,
  Container,
  Flex,
  Skeleton,
  EntityList,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { DatumSkeleton } from '../../DatumSkeleton'

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
              <Flex direction="column" gap="4">
                <Flex direction="column" gapY="3">
                  {times(5, (i) => (
                    <DatumSkeleton key={i} />
                  ))}
                </Flex>
                <Skeleton css={{ width: '100px', height: '24px' }} />
                <Skeleton css={{ width: '80px', height: '24px' }} />
              </Flex>
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
