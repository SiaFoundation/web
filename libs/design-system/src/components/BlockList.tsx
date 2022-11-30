import { Panel } from '../core/Panel'
import { Heading } from '../core/Heading'
import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { getEntityTypeInitials, getEntityTypeLabel } from '../lib/entityTypes'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { EntityAvatar } from './EntityAvatar'
import { EntityListSkeleton, itemBorderStyles } from './EntityList'
import { cx } from 'class-variance-authority'

type BlockListItemProps = {
  miningPool: string
  timestamp: number
  height: number
  href: string
}

type Props = {
  title: string
  blocks?: BlockListItemProps[]
}

export function BlockList({ title, blocks }: Props) {
  return (
    <Panel>
      <div className="flex flex-col rounded overflow-hidden">
        <Heading size="20" font="mono" className="p-4">
          {title}
        </Heading>
        <div className="flex flex-col border-t border-gray-200 dark:border-graydark-300">
          {blocks?.map((block, i) => (
            <div
              className={cx('flex gap-4 p-4', itemBorderStyles())}
              key={block.height}
            >
              <EntityAvatar
                label={getEntityTypeLabel('block')}
                initials={getEntityTypeInitials('block')}
                href={block.href}
                shape="square"
              />
              <div className="flex flex-col gap-1 justify-center">
                <Text color="subtle">
                  <Text weight="bold">
                    <Link href={block.href} underline="none">
                      {humanNumber(block.height)}
                    </Link>
                  </Text>{' '}
                  mined by <Text weight="bold">{block.miningPool}</Text>{' '}
                  {i < blocks.length - 1
                    ? `in ${formatDistance(
                        new Date(block.timestamp),
                        new Date(blocks[i + 1].timestamp)
                      )}`
                    : ''}
                </Text>
                <Text color="subtle">
                  {formatDistance(new Date(block.timestamp), new Date(), {
                    addSuffix: true,
                  })}
                </Text>
              </div>
            </div>
          )) || <EntityListSkeleton />}
        </div>
      </div>
    </Panel>
  )
}
