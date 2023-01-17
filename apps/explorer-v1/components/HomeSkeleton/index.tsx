import { Skeleton, EntityList, BlockList } from '@siafoundation/design-system'
import { ContentLayout } from '../ContentLayout'

export function HomeSkeleton() {
  return (
    <ContentLayout
      className="!max-w-[2000px]"
      panel={
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
          <Skeleton className="w-full h-[85px] sm:w-[180px] sm:h-[62px]" />
        </div>
      }
    >
      {/* <Container size="4"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <BlockList title="Latest blocks" />
        <EntityList title="Latest siacoin transactions" />
        <EntityList title="Latest contract transactions" />
        <EntityList title="Latest other transactions" />
      </div>
      {/* </Container> */}
    </ContentLayout>
  )
}
