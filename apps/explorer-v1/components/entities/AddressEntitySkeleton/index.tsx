import {
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { ContentLayout } from '../../ContentLayout'

export function AddressEntitySkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <Skeleton className="h-[32px] w-[70%]" />
          <div className="flex flex-col gap-y-4">
            {times(4, (i) => (
              <DatumSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <Tabs value="transactions">
        <TabsList aria-label="Address tabs">
          <TabsTrigger value="transactions">Last 100 transactions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="utxos">Unspent outputs</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <EntityList />
        </TabsContent>
        <TabsContent value="history"></TabsContent>
        <TabsContent value="utxos"></TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
