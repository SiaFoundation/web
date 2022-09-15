import { Box } from '../core/Box'
import { Flex } from '../core/Flex'
import { Heading } from '../core/Heading'
import { NextLink } from '../core/Link'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { Skeleton } from '../core/Skeleton'
import { ValueSf } from '../components/ValueSf'
import { ValueSc } from '../components/ValueSc'
import { ValueCopyable } from '../components/ValueCopyable'
import {
  EntityType,
  getEntityTypeInitials,
  getEntityTypeLabel,
  getTxTypeLabel,
  TxType,
} from '../lib/entityTypes'
import { times } from 'lodash'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { upperFirst } from 'lodash'
import { EntityAvatar } from './EntityAvatar'
import React from 'react'
import BigNumber from 'bignumber.js'

export type EntityListItemProps = {
  label?: string
  hash?: string
  onClick?: () => void
  href?: string
  blockHref?: string
  type?: EntityType
  txType?: TxType
  initials?: string
  sc?: BigNumber
  sf?: number
  height?: number
  timestamp?: number
  unconfirmed?: boolean
  avatarShape?: 'square' | 'circle'
}

type Props = {
  title?: string
  actions?: React.ReactNode
  entities?: EntityListItemProps[]
  emptyMessage?: string
}

export function EntityList({ title, actions, entities, emptyMessage }: Props) {
  return (
    <Panel>
      <Flex
        direction="column"
        css={{
          borderRadius: '$1',
          overflow: 'hidden',
        }}
      >
        {(title || actions) && (
          <Flex
            align="center"
            css={{
              padding: '$2 $2',
            }}
          >
            {title && (
              <Heading size="20" font="mono">
                {title}
              </Heading>
            )}
            <Box css={{ flex: 1 }} />
            {actions}
          </Flex>
        )}
        <Flex
          direction="column"
          css={{ borderRadius: '$1', overflow: 'hidden' }}
        >
          {entities?.length === 0 && (
            <Flex
              align="center"
              justify="center"
              css={{ height: '100px', borderTop: '1px solid $gray3' }}
            >
              <Text size="18" color="subtle">
                {emptyMessage || 'No results'}
              </Text>
            </Flex>
          )}
          {entities?.map((entity, i) => {
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
                  type={entity.type}
                  label={entity.label}
                  href={entity.href}
                  color="subtle"
                />
              )
            )
            const label =
              entity.label ||
              (entity.type === 'transaction' &&
                entity.txType &&
                getTxTypeLabel(entity.txType)) ||
              getEntityTypeLabel(entity.type)

            const title = upperFirst(label)
            return (
              <Flex
                gap="2"
                key={entity.hash || entity.label || i}
                onClick={entity.onClick}
                css={{
                  padding: '$2 $2',
                  borderTop: '1px solid $gray3',
                }}
              >
                <EntityAvatar
                  label={label}
                  type={entity.type}
                  shape={entity.avatarShape}
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
                      <Text weight="bold">{title || truncHashEl}</Text>
                    </Flex>
                    <Box css={{ flex: 1 }} />
                    {!!sc && <ValueSc value={sc} />}
                    {!!sf && <ValueSf value={sf} />}
                  </Flex>
                  <Flex justify="between">
                    <Flex gap="1">{!!title && truncHashEl}</Flex>
                    <Flex gap="1">
                      {entity.timestamp && (
                        <Text color="subtle">
                          {formatDistance(
                            new Date(entity.timestamp),
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
