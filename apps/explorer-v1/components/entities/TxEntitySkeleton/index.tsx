import {
  AnimatedPanel,
  Container,
  Skeleton,
  EntityList,
  DatumSkeleton,
} from '@siafoundation/design-system'
import { times } from 'lodash'

export function TxEntitySkeleton() {
  return (
    <>
      <Container>
        <div className="flex flex-col gap-12">
          <AnimatedPanel variant="subtle" startTime={0} className="p-6 rounded">
            <div className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-6 justify-between">
                <Skeleton className="h-[40px] w-[450px]" />
                <Skeleton className="h-[40px] w-[200px]" />
              </div>
              <div className="flex flex-col gap-y-6">
                {times(3, (i) => (
                  <DatumSkeleton key={i} />
                ))}
              </div>
            </div>
          </AnimatedPanel>
        </div>
      </Container>
      <Container>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <EntityList title={`Inputs`} entities={undefined} />
          </div>
          <div>
            <EntityList title={`Outputs`} entities={undefined} />
          </div>
        </div>
      </Container>
    </>
  )
}
