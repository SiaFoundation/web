import {
  Skeleton,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { ContentLayout } from '../../ContentLayout'

export function TxEntitySkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-16">
          <div className="flex flex-wrap gap-6 justify-between">
            <Skeleton className="h-[40px] w-[450px]" />
            <Skeleton className="h-[40px] w-[200px]" />
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            {times(3, (i) => (
              <DatumSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <EntityList title={`Inputs`} entities={undefined} />
        </div>
        <div>
          <EntityList title={`Outputs`} entities={undefined} />
        </div>
      </div>
    </ContentLayout>
  )
}
