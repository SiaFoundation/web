import { Skeleton, BlockList, EntityList } from '@siafoundation/design-system'
import { ContentLayout } from '../ContentLayout'

export function HomeSkeleton() {
  return (
    <>
      <ContentLayout
        panel={
          <div className="flex flex-col gap-10">
            <div className="flex justify-between">
              <Skeleton className="w-[175px] h-[24px] md:w-[216px] md:h-[28px]" />
              <Skeleton className="w-[88px] h-[28px]" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-6">
                  <Skeleton className="w-[120px] h-[16px] md:h-[20px]" />
                  <Skeleton className="w-[140px] h-[28px] md:w-[250px] md:h-[36px]" />
                </div>
              ))}
            </div>
          </div>
        }
      />
      <ContentLayout
        panel={
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
            <Skeleton className="w-full h-[105px] sm:w-[180px] sm:h-[62px]" />
            <Skeleton className="w-full h-[105px] sm:w-[180px] sm:h-[62px]" />
            <Skeleton className="w-full h-[105px] sm:w-[180px] sm:h-[62px]" />
            <Skeleton className="w-full h-[150px] sm:w-[180px] sm:h-[80px]" />
            <Skeleton className="w-full h-[150px] sm:w-[180px] sm:h-[80px]" />
            <Skeleton className="w-full h-[150px] sm:w-[180px] sm:h-[80px]" />
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
          <BlockList title="Latest blocks" isLoading skeletonCount={5} />
          <EntityList title="Top hosts" isLoading skeletonCount={5} />
        </div>
      </ContentLayout>
    </>
  )
}
