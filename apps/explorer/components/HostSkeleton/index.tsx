import { DatumSkeleton, Panel } from '@siafoundation/design-system'
import { times } from 'lodash-es'
import { ContentLayout } from '../ContentLayout'
import { HostHeaderSkeleton } from './HostHeaderSkeleton'

export function HostSkeleton() {
  return (
    <ContentLayout heading={<HostHeaderSkeleton />}>
      <Panel className="p-4">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
            {times(20).map((i) => (
              <DatumSkeleton key={String(i)} />
            ))}
          </div>
        </div>
      </Panel>
    </ContentLayout>
  )
}
