import { Skeleton, DatumSkeleton } from '@siafoundation/design-system'
import { times } from 'lodash'
import { ContentLayout } from '../../ContentLayout'

export function OutputEntitySkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <div className="flex flex-wrap gap-2 justify-between">
            <Skeleton className="h-[30px] w-[450px]" />
            <Skeleton className="h-[30px] w-[100px]" />
          </div>
          <div className="flex flex-col gap-y-4">
            {times(4, (i) => (
              <DatumSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    />
  )
}
