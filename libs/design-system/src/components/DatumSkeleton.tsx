import { Skeleton } from '../core/Skeleton'

export function DatumSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-12 overflow-hidden">
      <div className="flex-1">
        <Skeleton className="w-[100px] h-6" />
      </div>
      <div className="flex flex-col items-end md:items-start gap-2 md:flex-2">
        <Skeleton className="w-[200px] h-6" />
      </div>
    </div>
  )
}
