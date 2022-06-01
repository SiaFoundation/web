import {
  Flex,
  Panel,
  Heading,
  NextLink,
  Text,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { routes } from '../config/routes'
import { EntityAvatar } from './EntityAvatar'
import { EntityListSkeleton } from './EntityListSkeleton'

type BlockListItem = {
  miningPool: string
  timestamp: number
  height: number
}

type Props = {
  title: string
  blocks?: BlockListItem[]
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
              <EntityAvatar type="block" value={String(block.height)} />
              <Flex direction="column" gap="1" justify="center">
                <Text color="subtle">
                  <Text weight="bold">
                    <NextLink
                      href={routes.block.view.replace(
                        '[id]',
                        String(block.height)
                      )}
                      css={{ textDecoration: 'none' }}
                    >
                      {humanNumber(block.height)}
                    </NextLink>
                  </Text>{' '}
                  mined by <Text weight="bold">{block.miningPool}</Text>{' '}
                  {i < blocks.length - 1
                    ? `in ${formatDistance(
                        new Date(block.timestamp * 1000),
                        new Date(blocks[i + 1].timestamp * 1000)
                      )}`
                    : ''}
                </Text>
                <Text color="subtle">
                  {formatDistance(
                    new Date(block.timestamp * 1000),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </Text>
              </Flex>
            </Flex>
          )) || <EntityListSkeleton />}
        </Flex>
      </Flex>
    </Panel>
  )
}
