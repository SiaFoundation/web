import { Skeleton, DatumSkeleton, Panel } from '@siafoundation/design-system'

import { ContentLayout } from '../ContentLayout'

export function OutputSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-5">
          <Skeleton className="h-10 w-[300px] text-base/6" />
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            {Array.from({ length: 4 }, (_, i) => (
              <DatumSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <Panel className="p-2">
        <Skeleton className="h-10 w-[100px] text-base/6" />
      </Panel>
    </ContentLayout>
  )
}
