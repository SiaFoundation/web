'use client'

import { cx } from 'class-variance-authority'
import { uniq } from 'lodash-es'
import { usePagesRouter } from '@siafoundation/next'
import { useCallback, useMemo } from 'react'
import { Badge } from '../core/Badge'
import { Text } from '../core/Text'
import { ContentItemProps, ContentItem } from '../site/ContentItem'

type Props = {
  items: ContentItemProps[]
  filterMode?: 'internal' | 'external'
  filterable?: string
  filters?: string[]
  eyebrow?: string
  component?: (props: ContentItemProps) => JSX.Element | null
  className?: string
  gapClassName?: string
  columnClassName?: string
}

export function ContentGallery({
  filterable,
  filterMode = 'internal',
  filters: customFilters = [],
  eyebrow,
  component,
  items,
  className,
  gapClassName,
  columnClassName,
}: Props) {
  const router = usePagesRouter()
  const activeFilter = (filterable ? router.query[filterable] : undefined) as
    | string
    | undefined
  const filters = useMemo(
    () =>
      filterMode === 'external'
        ? customFilters
        : uniq(
            items.reduce(
              (acc, item) => acc.concat(item.tags || []),
              [] as string[]
            )
          ),
    [filterMode, items, customFilters]
  )
  const filteredItems = useMemo(() => {
    if (filterMode === 'external') {
      return items
    }
    if (!activeFilter) {
      return items
    }
    return items.filter((i) => i.tags?.includes(activeFilter))
  }, [filterMode, items, activeFilter])

  const changeFilter = useCallback(
    (filter?: string) => {
      if (!filterable) {
        return
      }
      router.replace({
        query: {
          ...router.query,
          [filterable]: filter,
        },
      })
    },
    [filterable, router]
  )

  const ContentComponent = component || ContentItem

  return (
    <div className={cx('flex flex-col gap-10', className)}>
      {filterable && (
        <div className="flex flex-col gap-4">
          {eyebrow && (
            <Text size="12" font="mono" className="uppercase">
              {eyebrow}
            </Text>
          )}
          <div className="flex gap-1.5 flex-wrap">
            <Badge
              key="all"
              interactive
              variant={!activeFilter ? 'accent' : 'inactive'}
              onClick={() => changeFilter(undefined)}
            >
              All
            </Badge>
            {filters.map((filter) => (
              <Badge
                key={filter}
                interactive
                variant={activeFilter === filter ? 'accent' : 'inactive'}
                onClick={() => changeFilter(filter)}
              >
                {filter.replace(/_/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>
      )}
      <div
        className={cx(
          'grid overflow-hidden',
          gapClassName ? gapClassName : 'gap-x-6 gap-y-10 md:gap-y-14',
          columnClassName ? columnClassName : 'grid-cols-1 sm:grid-cols-2'
        )}
      >
        {filteredItems.map((item) => (
          <ContentComponent key={item.title + item.link} {...item} />
        ))}
      </div>
    </div>
  )
}
