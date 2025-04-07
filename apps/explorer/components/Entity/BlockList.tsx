import {
  ClientSideOnly,
  Heading,
  Link,
  Panel,
  Skeleton,
  Text,
} from '@siafoundation/design-system'
import { humanNumber, getEntityTypeLabel } from '@siafoundation/units'
import { formatDistance } from 'date-fns'
import { EntityAvatar } from './EntityAvatar'
import { cx } from 'class-variance-authority'
import { EntityListSkeleton } from './EntityListSkeleton'
type BlockListItemProps = {
  miningPool?: string
  timestamp: string | number
  height: number
  href: string
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
                  <div className="flex flex-col gap-1 justify-center">
                    <Text color="subtle">
                      <Text weight="bold">
                        <Link href={block.href} underline="none">
                          {humanNumber(block.height)}
                        </Link>
                      </Text>
                      {block.miningPool
                        ? ' mined by '
                        : i < dataset.length - 1
                        ? ' mined '
                        : ''}
                      <Text weight="bold">{block.miningPool}</Text>
                      {block.miningPool ? ' ' : ''}
                      {i < dataset.length - 1
                        ? `in ${formatDistance(
                            new Date(block.timestamp),
                            new Date(dataset[i + 1].timestamp)
                          )}`
                        : ''}
                    </Text>
                    <Text color="subtle">
                      <ClientSideOnly
                        fallback={<Skeleton className="w-[100px] h-[24px]" />}
                      >
                        {formatDistance(new Date(block.timestamp), new Date(), {
                          addSuffix: true,
                        })}
                      </ClientSideOnly>
                    </Text>
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
