import { Skeleton } from '@siafoundation/design-system'
import { SidePanel } from './SidePanel'
import { SidePanelSection } from './SidePanelSection'

export function SidePanelSkeleton({ onClose }: { onClose?: () => void }) {
  return (
    <SidePanel
      onClose={onClose}
      heading={
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-5 w-[70%]" />
          <div className="flex-1" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
      }
      actions={
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      }
    >
      <SidePanelSection
        heading={
          <div className="flex items-center gap-2 py-1">
            <Skeleton className="h-5 w-12" />
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="hidden" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-5 w-10" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="mt-2 flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-36" />
              </div>
            ))}
          </div>
        </div>
      </SidePanelSection>
    </SidePanel>
  )
}
