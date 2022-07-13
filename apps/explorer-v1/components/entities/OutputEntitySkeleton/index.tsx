import {
  AnimatedPanel,
  Container,
  Flex,
  Skeleton,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'

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
              <Flex direction="column" gapY="2-5">
                {times(4, (i) => (
                  <DatumSkeleton key={i} />
                ))}
              </Flex>
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
    </>
  )
}
