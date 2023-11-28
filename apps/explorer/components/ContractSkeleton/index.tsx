import {
  Skeleton,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { ContentLayout } from '../ContentLayout'

export function ContractSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-6 justify-between">
            <Skeleton className="h-[40px] w-[450px]" />
            <Skeleton className="h-[40px] w-[200px]" />
          </div>
          <Skeleton className="h-[40px] w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
            {times(18, (i) => (
              <DatumSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <EntityList
            title="Missed proof outputs"
            isLoading
            skeletonCount={2}
          />
        </div>
        <div>
          <EntityList title="Valid proof outputs" isLoading skeletonCount={2} />
        </div>
      </div>
    </ContentLayout>
  )
}
