import { Skeleton, DatumSkeleton } from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { ContentLayout } from '../ContentLayout'

export function BlockSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-6 justify-between">
            <Skeleton className="h-10 w-[250px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-6">
              {[...Array(3)].map((_, i) => (
                <DatumSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <EntityList title="Transactions" isLoading />
    </ContentLayout>
  )
}
