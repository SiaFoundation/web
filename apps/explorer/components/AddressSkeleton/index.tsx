import {
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { times } from '@technically/lodash'
import { ContentLayout } from '../ContentLayout'

export function AddressSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-12">
          <Skeleton className="h-[32px] w-[70%]" />
          <div className="flex flex-col gap-y-2 md:gap-y-4 max-w-sm">
            {times(1, (i) => (
              <DatumSkeleton key={i} />
            ))}
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
