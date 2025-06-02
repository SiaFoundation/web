import { Skeleton } from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { ContentLayout } from '../ContentLayout'

export function TransactionSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <div className="flex flex-wrap gap-6 justify-between">
            <Skeleton className="h-[40px] w-[450px]" />
            <Skeleton className="h-[40px] w-[200px]" />
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-5">
        <EntityList title="Summary" isLoading skeletonCount={2} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          <EntityList title="Inputs" isLoading skeletonCount={2} />
          <EntityList title="Outputs" isLoading skeletonCount={2} />
        </div>
        <EntityList title="Related Operations" isLoading skeletonCount={2} />
      </div>
    </ContentLayout>
  )
}
