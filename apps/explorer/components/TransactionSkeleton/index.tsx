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
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <EntityList title="Inputs" isLoading skeletonCount={4} />
          </div>
          <div>
            <EntityList title="Outputs" isLoading skeletonCount={4} />
          </div>
        </div>
        {/* <EntityList
          title="Related operations"
          isLoading
          skeletonCount={4}
        /> */}
      </div>
    </ContentLayout>
  )
}
