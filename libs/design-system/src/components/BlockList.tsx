import { Flex } from '../core/Flex'
import { Panel } from '../core/Panel'
import { Heading } from '../core/Heading'
import { NextLink } from '../core/Link'
import { Text } from '../core/Text'
import { getEntityTypeInitials, getEntityTypeLabel } from '../lib/entityTypes'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { EntityAvatar } from './EntityAvatar'
import { EntityListSkeleton } from './EntityList'

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
      <Flex
        direction="column"
        css={{
          borderRadius: '$1',
          overflow: 'hidden',
        }}
      >
        <Heading
          size="20"
          css={{
            padding: '$2 $2',
            fontFamily: '$mono',
          }}
        >
          {title}
        </Heading>
        <Flex direction="column">
          {blocks?.map((block, i) => (
            <Flex
              gap="2"
              key={block.height}
              css={{
                padding: '$2 $2',
                borderTop: '1px solid $brandGray3',
              }}
            >
              <EntityAvatar
                label={getEntityTypeLabel('block')}
                initials={getEntityTypeInitials('block')}
                href={block.href}
                shape="square"
              />
              <Flex direction="column" gap="1" justify="center">
                <Text color="subtle">
                  <Text weight="bold">
                    <NextLink
                      href={block.href}
                      css={{ textDecoration: 'none' }}
                    >
                      {humanNumber(block.height)}
                    </NextLink>
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
              </Flex>
            </Flex>
          )) || <EntityListSkeleton />}
        </Flex>
      </Flex>
    </Panel>
  )
}
