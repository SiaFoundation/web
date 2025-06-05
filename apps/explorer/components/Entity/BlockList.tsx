import {
  ClientSideOnly,
  Heading,
  Link,
  Panel,
  Skeleton,
  Text,
} from '@siafoundation/design-system'
import {
  humanNumber,
  getEntityTypeLabel,
  humanDate,
} from '@siafoundation/units'
import { formatDistance } from 'date-fns'
import { EntityAvatar } from './EntityAvatar'
import { cx } from 'class-variance-authority'
import { EntityListSkeleton } from './EntityListSkeleton'

type BlockListItemProps = {
  miningPool?: string
  timestamp: string | number
  height: number
  href: string
  version: 'v2' | 'v1'
}

type Props = {
  title: string
  isLoading?: boolean
  dataset?: BlockListItemProps[]
  skeletonCount?: number
}

export function BlockList({
  title,
  dataset,
  isLoading,
  skeletonCount = 10,
}: Props) {
  let show = 'emptyState'

  if (isLoading && !dataset?.length) {
    show = 'skeleton'
  }

  if (dataset?.length) {
    show = 'currentData'
  }

  return (
    <Panel>
      <div className="flex flex-col rounded overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-graydark-300">
          <Heading size="20" font="mono" ellipsis>
            {title}
          </Heading>
          <div className="flex-1" />
        </div>
        <div className="flex flex-col border-t border-gray-200 dark:border-graydark-300">
          {show === 'emptyState' && (
            <div
              className={cx(
                'flex items-center justify-center h-[100px]',
                itemBorderStyles()
              )}
            >
              <Text size="18" color="subtle">
                {'No results'}
              </Text>
            </div>
          )}
          {show === 'currentData' &&
            dataset?.map((block, i) => {
              // This dataset contains an extra block at the end, fetched to calculate
              // the 'mined in x minutes' blurb below for the last displayed block.
              if (i === dataset.length - 1) return null
              return (
                <div
                  className={cx('flex gap-4 p-4', itemBorderStyles())}
                  key={block.height}
                  data-testid="explorer-latestBlocks-item"
                >
                  <EntityAvatar
                    label={getEntityTypeLabel('block')}
                    initials="B"
                    href={block.href}
                    shape="square"
                  />
                  <div className="flex flex-col justify-between gap-1 w-full min-h-[52px]">
                    <div className="flex justify-between items-center">
                      <Link
                        href={block.href}
                        underline="none"
                        className="text-subtle font-bold text-base"
                      >
                        {humanNumber(block.height)}
                      </Link>
                      <ClientSideOnly
                        fallback={<Skeleton className="w-[128px] h-[24px]" />}
                      >
                        <Text color="subtle" ellipsis>
                          {humanDate(block.timestamp, {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </Text>
                      </ClientSideOnly>
                    </div>
                    <div className="flex justify-between items-center">
                      {i < dataset.length - 1 && (
                        <ClientSideOnly
                          fallback={<Skeleton className="w-[128px] h-[16px]" />}
                        >
                          <Text color="subtle" size="12">
                            {`mined in ${formatDistance(
                              new Date(block.timestamp),
                              new Date(dataset[i + 1].timestamp)
                            )}`}
                          </Text>
                        </ClientSideOnly>
                      )}
                      <div className="flex flex-col items-end">
                        <ClientSideOnly
                          fallback={<Skeleton className="w-[128px] h-[16px]" />}
                        >
                          <Text color="subtle" size="12">
                            {formatDistance(
                              new Date(block.timestamp),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}{' '}
                            {' • '}
                            {block.version}
                          </Text>
                        </ClientSideOnly>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
