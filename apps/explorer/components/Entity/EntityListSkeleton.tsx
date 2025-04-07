import { Skeleton } from '@siafoundation/design-system'
import { times } from '@technically/lodash'
import { cx } from 'class-variance-authority'

export function EntityListSkeleton({ skeletonCount = 10 }) {
  return (
    <>
      {times(skeletonCount, (i) => (
        <div
          key={i}
          className={cx('relative flex gap-4 p-3.5', itemBorderStyles())}
        >
          <Skeleton className="w-[60px] h-[50px]" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-[90%] h-[20px]" />
            <Skeleton className="w-[140px] h-[14px]" />
          </div>
        </div>
      ))}
    </>
  )
}

function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}
