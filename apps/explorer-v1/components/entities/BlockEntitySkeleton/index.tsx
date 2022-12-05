import {
  Skeleton,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { ContentLayout } from '../../ContentLayout'

export function BlockEntitySkeleton() {
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
              {times(5, (i) => (
                <DatumSkeleton key={i} />
              ))}
            </div>
            <Skeleton className="w-[100px] h-6" />
            <Skeleton className="w-[80px] h-6" />
          </div>
        </div>
      }
    >
      <EntityList title="Transactions" entities={undefined} />
    </ContentLayout>
  )
}
