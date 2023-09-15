import { Skeleton, BlockList, EntityList } from '@siafoundation/design-system'
import { ContentLayout } from '../ContentLayout'

export function HomeSkeleton() {
  return (
    <ContentLayout
      panel={
        <div className="grid grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        <BlockList title="Latest blocks" skeletonCount={5} />
        <EntityList title="Top hosts" skeletonCount={5} />
      </div>
    </ContentLayout>
  )
}
