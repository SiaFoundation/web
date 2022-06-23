import {
  AnimatedPanel,
  Box,
  Container,
  Flex,
  Grid,
  Panel,
  Skeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { DatumSkeleton } from '../../DatumSkeleton'
import { EntityList } from '../../EntityList'

export function TxEntitySkeleton() {
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
                <Skeleton css={{ height: '40px', width: '450px' }} />
                <Skeleton css={{ height: '40px', width: '200px' }} />
              </Flex>
              <Flex direction="column" gapY="3">
                {times(3, (i) => (
                  <DatumSkeleton key={i} />
                ))}
              </Flex>
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container>
        <Grid columns="2" gap="2">
          <Box>
            <Panel>
              <EntityList title={`Inputs`} entities={undefined} />
            </Panel>
          </Box>
          <Box>
            <Panel>
              <EntityList title={`Outputs`} entities={undefined} />
            </Panel>
          </Box>
        </Grid>
      </Container>
    </>
  )
}
