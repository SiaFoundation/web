import {
  AnimatedPanel,
  Container,
  Skeleton,
  EntityList,
  BlockList,
} from '@siafoundation/design-system'

export function HomeSkeleton() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-16">
          <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
            <div className="grid grid-cols-3 gap-12">
              <Skeleton className="w-[180px] h-[62px]" />
              <Skeleton className="w-[180px] h-[62px]" />
              <Skeleton className="w-[180px] h-[62px]" />
              <Skeleton className="w-[180px] h-[62px]" />
              <Skeleton className="w-[180px] h-[62px]" />
              <Skeleton className="w-[180px] h-[62px]" />
            </div>
          </AnimatedPanel>
        </div>
      </Container>
      <Container size="4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BlockList title="Latest blocks" />
          <EntityList title="Latest siacoin transactions" />
          <EntityList title="Latest contract transactions" />
          <EntityList title="Latest other transactions" />
        </div>
      </Container>
    </>
  )
}
