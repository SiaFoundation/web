'use client'

import { Heading, Panel, Text } from '@siafoundation/design-system'
import { useRef, useEffect, useState } from 'react'
import { cx } from 'class-variance-authority'
import { EntityListSkeleton } from './EntityListSkeleton'
import { EntityListItem, EntityListItemProps } from './EntityListItem'
import { useInView } from 'react-intersection-observer'

type Props = {
  title?: string
  actions?: React.ReactNode
  dataset?: EntityListItemProps[]
  children?: React.ReactNode
  isLoading?: boolean
  exhausted?: boolean
  emptyState?: React.ReactNode
  emptyMessage?: string
  skeletonCount?: number
  onScrollThroughMiddle?: () => void
}

export function EntityList({
  title,
  actions,
  dataset,
  children,
  isLoading,
  exhausted = false,
  emptyState,
  emptyMessage,
  skeletonCount = 10,
  onScrollThroughMiddle,
}: Props) {
  const showHeading = title || actions
  let show = 'emptyState'

  const listRef = useRef<HTMLDivElement>(null)
  const requestLock = useRef(false)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const [initialExhausted, setInitialExhausted] = useState(false)

  const { ref: triggerRef, inView } = useInView({
    root: null,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && onScrollThroughMiddle && !exhausted && !requestLock.current) {
      requestLock.current = true
      onScrollThroughMiddle()
    }
  }, [inView, onScrollThroughMiddle, exhausted])

  useEffect(() => {
    if (!isLoading) {
      requestLock.current = false

      if (dataset?.length || children) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasLoadedOnce(true)
      }

      if (!hasLoadedOnce && exhausted) {
        setInitialExhausted(true)
      }
    }
  }, [isLoading, dataset?.length, children, exhausted, hasLoadedOnce])

  if (isLoading && !dataset?.length && !children) {
    show = 'skeleton'
  }

  if (dataset?.length || children) {
    show = 'currentData'
  }

  const hasItems = !!(dataset?.length || children)

  return (
    <Panel>
      <div className="flex flex-col rounded overflow-hidden">
        {showHeading && (
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-graydark-300">
            {title && (
              <Heading size="20" font="mono" ellipsis>
                {title}
              </Heading>
            )}
            <div className="flex-1" />
            {actions}
          </div>
        )}
        <div ref={listRef} className="flex flex-col rounded">
          {show === 'emptyState' &&
            (emptyState || (
              <div
                className={cx(
                  'flex items-center justify-center h-[84px]',
                  itemBorderStyles(),
                )}
              >
                <Text size="18" color="subtle">
                  {emptyMessage || 'No results'}
                </Text>
              </div>
            ))}

          {show === 'currentData' &&
            (children ||
              dataset?.map((entity, i) => {
                return (
                  <EntityListItem
                    key={entity.hash || entity.label || i}
                    {...entity}
                  />
                )
              }))}

          {show === 'skeleton' && (
            <EntityListSkeleton skeletonCount={skeletonCount} />
          )}

          {onScrollThroughMiddle && !exhausted && (
            <div ref={triggerRef} className="h-2" aria-hidden="true"></div>
          )}

          {hasItems && isLoading && !exhausted && (
            <div className="flex items-center justify-center py-4">
              <Text size="16" color="subtle" className="ml-2">
                Loading more...
              </Text>
            </div>
          )}

          {hasItems && exhausted && !initialExhausted && (
            <div className="flex items-center justify-center py-4 text-gray-500">
              <Text size="16" color="subtle">
                No more items to load.
              </Text>
            </div>
          )}
        </div>
      </div>
    </Panel>
  )
}

function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none',
  )
}
