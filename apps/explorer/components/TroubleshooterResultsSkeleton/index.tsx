import { DatumSkeleton, Panel, Skeleton } from '@siafoundation/design-system'
import { ContentLayout } from '../ContentLayout'

export function TroubleshooterResultsSkeleton() {
  return (
    <ContentLayout className="w-full flex flex-col justify-center items-start gap-4">
      <Panel className="w-full px-8 py-16 flex flex-col gap-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2 shrink-0">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-10 w-[250px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[112px]" />
            <Skeleton className="h-10 w-[112px]" />
          </div>
        </div>
        <Skeleton className="h-20 w-[100%]" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6">
          {[...Array(10)].map((_, i) => (
            <DatumSkeleton key={i} />
          ))}
        </div>
      </Panel>
      <Panel className="w-full p-4 flex flex-col gap-6">
        <Skeleton className="h-10 w-[100%]" />
      </Panel>
    </ContentLayout>
  )
}
