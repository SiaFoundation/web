import { Skeleton } from '../core/Skeleton'

export function DatumSkeleton() {
  return (
    <div className="flex gap-x-12 gap-y-4 flex-wrap items-center overflow-hidden">
      <div className="flex-1">
        <Skeleton className="w-[100px] h-10" />
      </div>
      <div className="flex flex-col items-end md:items-start gap-2 md:flex-2">
        <Skeleton className="w-[200px] h-10" />
      </div>
    </div>
  )
}
