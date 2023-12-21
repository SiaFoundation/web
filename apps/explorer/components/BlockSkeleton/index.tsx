import {
  Skeleton,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from '@technically/lodash'
import { ContentLayout } from '../ContentLayout'

export function BlockSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <div className="flex flex-wrap gap-6 justify-between">
            <Skeleton className="h=[40px] w-[250px]" />
            <Skeleton className="h=[40px] w-[200px]" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-y-6">
              {times(2, (i) => (
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
