import { SpendingEstimate } from './SpendingEstimate'
import { Recommendations } from './Recommendations'
import { ScrollArea } from '@siafoundation/design-system'

export function HangingNav() {
  return (
    <div className="relative">
      <div className="z-10 absolute top-0 w-full pointer-events-none">
        <ScrollArea>
          <div className="flex gap-2 items-start justify-center px-3">
            <div className="pointer-events-auto">
              <SpendingEstimate />
            </div>
            <div className="pointer-events-auto">
              <Recommendations />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
