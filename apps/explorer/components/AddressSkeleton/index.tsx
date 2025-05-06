import {
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { ContentLayout } from '../ContentLayout'

export function AddressSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-y-2 justify-between items-start">
            <Skeleton className="h-[32px] w-[30%]" />
            <Skeleton className="h-[32px] w-[10%]" />
          </div>
        </div>
      }
    >
      <Tabs value="events">
        <TabsList aria-label="Address tabs">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="utxos">Unspent outputs</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <EntityList isLoading />
        </TabsContent>
        <TabsContent value="utxos">
          <EntityList isLoading />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
