'use client'

import { Heading } from '../core/Heading'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import React from 'react'
import { cx } from 'class-variance-authority'
import { EntityListSkeleton } from './EntityListSkeleton'
import { EntityListItem, EntityListItemProps } from './EntityListItem'

type Props = {
  title?: string
  actions?: React.ReactNode
  dataset?: EntityListItemProps[]
  children?: React.ReactNode
  isLoading?: boolean
  emptyState?: React.ReactNode
  emptyMessage?: string
  skeletonCount?: number
}

export function EntityList({
  title,
  actions,
  dataset,
  isLoading,
  emptyState,
  emptyMessage,
  skeletonCount = 10,
  children,
}: Props) {
  const showHeading = title || actions
  let show = 'emptyState'

  if (isLoading && !dataset?.length && !children) {
    show = 'skeleton'
  }

  if (dataset?.length || children) {
    show = 'currentData'
  }

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
        <div className="flex flex-col rounded overflow-hidden">
          {show === 'emptyState' &&
            (emptyState || (
              <div
                className={cx(
                  'flex items-center justify-center h-[84px]',
                  itemBorderStyles()
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
        </div>
      </div>
    </Panel>
  )
}

function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}
