import { Skeleton, Panel } from '@siafoundation/design-system'
import { ContentLayout } from '../ContentLayout'

export function TroubleshooterFormSkeleton() {
  return (
    <ContentLayout>
      <Panel className="w-full px-8 py-16 flex flex-col gap-6 min-h-[330px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-6 justify-end">
            <Skeleton className="h-10 w-[200px]" />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-[250px]" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[100%]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>
      </Panel>
    </ContentLayout>
  )
}
