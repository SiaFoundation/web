import {
  Box,
  Flex,
  Heading,
  NextLink,
  Panel,
  Text,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { upperFirst } from 'lodash'
import { EntityType, getEntityTypeLabel } from '../config/types'
import { routes } from '../config/routes'
import { EntityAvatar } from './EntityAvatar'
import { ValueCopyable } from './ValueCopyable'
import { ValueSc } from './ValueSc'
import { ValueSf } from './ValueSf'
import { EntityListSkeleton } from './EntityListSkeleton'

export type EntityListItem = {
  label?: string
  hash?: string
  type?: EntityType
  sc?: bigint
  sf?: number
  height?: number
  timestamp?: number
  unconfirmed?: boolean
}

type Props = {
  title?: string
  entities?: EntityListItem[]
}

export function EntityList({ title, entities }: Props) {
  return (
    <Panel>
      <Flex
        direction="column"
        css={{
          borderRadius: '$1',
          overflow: 'hidden',
        }}
      >
        {title && (
          <Heading
            size="20"
            font="mono"
            css={{
              padding: '$2 $2',
            }}
          >
            {title}
          </Heading>
        )}
        <Flex
          direction="column"
          css={{ borderRadius: '$1', overflow: 'hidden' }}
        >
          {entities?.length === 0 && (
            <Flex
              align="center"
              justify="center"
              css={{ height: '100px', borderTop: '1px solid $brandGray3' }}
            >
              <Text size="18" color="subtle">
                No results
              </Text>
            </Flex>
          )}
          {entities?.map((change) => {
            const sc = change.sc
            const sf = change.sf
            const truncHashEl = change.unconfirmed ? (
              <Text color="accent" weight="semibold">
                Unconfirmed
              </Text>
            ) : (
              change.type &&
              change.hash && (
                <ValueCopyable
                  value={change.hash}
                  type={change.type}
                  color="subtle"
                />
              )
            )
            const label = upperFirst(
              change.label || getEntityTypeLabel(change.type)
            )
            return (
              <Flex
                gap="2"
                key={change.hash || change.label}
                css={{
                  padding: '$2 $2',
                  borderTop: '1px solid $brandGray3',
                }}
              >
                <EntityAvatar type={change.type} value={change.hash} />
                <Flex
                  direction="column"
                  gap="1"
                  justify="center"
                  css={{ width: '100%' }}
                >
                  <Flex gap="1" align="center">
                    <Flex gap="1" align="center">
                      {change.height && (
                        <Text weight="bold">
                          <NextLink
                            href={routes.block.view.replace(
                              '[id]',
                              String(change.height)
                            )}
                            css={{ textDecoration: 'none' }}
                          >
                            {humanNumber(change.height)}
                          </NextLink>
                        </Text>
                      )}
                      <Text weight="bold">{label || truncHashEl}</Text>
                    </Flex>
                    <Box css={{ flex: 1 }} />
                    {!!sc && <ValueSc value={sc} />}
                    {!!sf && <ValueSf value={sf} />}
                  </Flex>
                  <Flex justify="between">
                    {!!label && truncHashEl}
                    {change.timestamp && (
                      <Text color="subtle">
                        {formatDistance(
                          new Date(change.timestamp * 1000),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            )
          }) || <EntityListSkeleton />}
        </Flex>
      </Flex>
    </Panel>
  )
}
