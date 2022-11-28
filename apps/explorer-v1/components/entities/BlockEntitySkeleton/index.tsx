import {
  AnimatedPanel,
  Container,
  Skeleton,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'

export function BlockEntitySkeleton() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-12">
          <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-6 justify-between">
                <Skeleton className="h=[40px] w-[250px]" />
                <Skeleton className="h=[40px] w-[200px]" />
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-y-6">
                  {times(5, (i) => (
                    <DatumSkeleton key={i} />
                  ))}
                </div>
                <Skeleton className="w-[100px] h-6" />
                <Skeleton className="w-[80px] h-6" />
              </div>
            </div>
          </AnimatedPanel>
        </div>
      </Container>
      <Container>
        <EntityList title="Transactions" entities={undefined} />
      </Container>
    </>
  )
}
