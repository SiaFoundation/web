import {
  Box,
  Flex,
  Heading,
  NextLink,
  Panel,
  Text,
  Skeleton,
  ValueSf,
  ValueSc,
  ValueCopyable,
  EntityTypes,
  getEntityTypeInitials,
  getEntityTypeLabel,
} from '@siafoundation/design-system'
import { times } from 'lodash'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { upperFirst } from 'lodash'
import { EntityAvatar } from './EntityAvatar'

export type EntityListItem = {
  label?: string
  hash?: string
  href?: string
  blockHref?: string
  type?: EntityTypes
  initials?: string
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
          {entities?.map((entity) => {
            const sc = entity.sc
            const sf = entity.sf
            const truncHashEl = entity.unconfirmed ? (
              <Text color="accent" weight="semibold">
                Unconfirmed
              </Text>
            ) : (
              entity.hash && (
                <ValueCopyable
                  value={entity.hash}
                  label={entity.label}
                  href={entity.href}
                  color="subtle"
                />
              )
            )
            const label = upperFirst(
              entity.label || getEntityTypeLabel(entity.type)
            )
            return (
              <Flex
                gap="2"
                key={entity.hash || entity.label}
                css={{
                  padding: '$2 $2',
                  borderTop: '1px solid $brandGray3',
                }}
              >
                <EntityAvatar
                  label={entity.label || getEntityTypeLabel(entity.type)}
                  initials={
                    entity.initials || getEntityTypeInitials(entity.type)
                  }
                  href={entity.href}
                />
                <Flex
                  direction="column"
                  gap="1"
                  justify="center"
                  css={{ width: '100%' }}
                >
                  <Flex gap="1" align="center">
                    <Flex gap="1" align="center">
                      {entity.height && entity.blockHref && (
                        <Text color="subtle" weight="semibold">
                          <NextLink
                            href={entity.blockHref}
                            css={{ textDecoration: 'none' }}
                          >
                            {humanNumber(entity.height)}
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
                    <Flex gap="1">{!!label && truncHashEl}</Flex>
                    <Flex gap="1">
                      {entity.timestamp && (
                        <Text color="subtle">
                          {formatDistance(
                            new Date(entity.timestamp * 1000),
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
              </Flex>
            )
          }) || <EntityListSkeleton />}
        </Flex>
      </Flex>
    </Panel>
  )
}

export function EntityListSkeleton() {
  return (
    <>
      {times(10, (i) => (
        <Flex
          key={i}
          css={{ padding: '$2 $2', borderTop: '1px solid $gray3' }}
          gap="2"
        >
          <Skeleton css={{ width: '60px', height: '50px' }} />
          <Flex direction="column" gap="1" css={{ width: '100%' }}>
            <Skeleton css={{ width: '90%', height: '20px' }} />
            <Skeleton css={{ width: '140px', height: '14px' }} />
          </Flex>
        </Flex>
      ))}
    </>
  )
}
