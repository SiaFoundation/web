import { Skeleton, EntityList } from '@siafoundation/design-system'
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
            <EntityList title="Inputs" entities={undefined} skeletonCount={4} />
          </div>
          <div>
            <EntityList
              title="Outputs"
              entities={undefined}
              skeletonCount={4}
            />
          </div>
        </div>
        {/* <EntityList
          title="Related operations"
          entities={undefined}
          skeletonCount={4}
        /> */}
      </div>
    </ContentLayout>
  )
}
