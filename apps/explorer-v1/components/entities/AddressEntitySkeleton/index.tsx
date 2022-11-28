import {
  AnimatedPanel,
  Container,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'

export function AddressEntitySkeleton() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-12">
          <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
            <div className="flex flex-col gap-10">
              <Skeleton className="h-[32px] w-[70%]" />
              <div className="flex flex-col gap-y-6">
                {times(4, (i) => (
                  <DatumSkeleton key={i} />
                ))}
              </div>
            </div>
          </AnimatedPanel>
        </div>
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
