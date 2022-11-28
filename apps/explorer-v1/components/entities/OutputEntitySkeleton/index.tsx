import {
  AnimatedPanel,
  Container,
  Skeleton,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'

export function OutputEntitySkeleton() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-12">
          <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-2 justify-between">
                <Skeleton className="h-[30px] w-[450px]" />
                <Skeleton className="h-[30px] w-[100px]" />
              </div>
              <div className="flex flex-col gap-y-5">
                {times(4, (i) => (
                  <DatumSkeleton key={i} />
                ))}
              </div>
            </div>
          </AnimatedPanel>
        </div>
      </Container>
    </>
  )
}
