import { DatumSkeleton, Panel } from '@siafoundation/design-system'
import { times } from 'lodash'
import { ContentLayout } from '../ContentLayout'
import { HostHeaderSkeleton } from './HostHeaderSkeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@siafoundation/design-system'

export function HostSkeleton() {
  return (
    <ContentLayout heading={<HostHeaderSkeleton />}>
      <Tabs defaultValue="priceTable">
        <TabsList aria-label="Data tabs">
          <TabsTrigger value="priceTable">Price table (RHPv3)</TabsTrigger>
          <TabsTrigger value="settings">Settings (RHPv2)</TabsTrigger>
        </TabsList>
        <TabsContent value="priceTable">
          <Panel className="p-4">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
                {times(30).map((i) => (
                  <DatumSkeleton key={String(i)} />
                ))}
              </div>
            </div>
          </Panel>
        </TabsContent>
        <TabsContent value="settings">
          <Panel className="p-4">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
                {times(30).map((i) => (
                  <DatumSkeleton key={String(i)} />
                ))}
              </div>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
