import {
  AnimatedPanel,
  Container,
  Flex,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { DatumSkeleton } from '../../DatumSkeleton'
import { EntityList } from '../../EntityList'

export function AddressEntitySkeleton() {
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
              <Skeleton css={{ height: '32px', width: '70%' }} />
              <Flex direction="column" gapY="3">
                {times(4, (i) => (
                  <DatumSkeleton key={i} />
                ))}
              </Flex>
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container>
        <Tabs value="transactions">
          <TabsList aria-label="Address tabs">
            <TabsTrigger value="transactions">
              Last 100 transactions
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="utxos">Unspent outputs</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <EntityList />
          </TabsContent>
          <TabsContent value="history"></TabsContent>
          <TabsContent value="utxos"></TabsContent>
        </Tabs>
      </Container>
    </>
  )
}
