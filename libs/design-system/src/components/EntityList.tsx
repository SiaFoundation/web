import { Heading } from '../core/Heading'
import { Link } from '../core/Link'
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
import { cx } from 'class-variance-authority'

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
  const showHeading = title || actions
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
          {entities?.length === 0 && (
            <div
              className={cx(
                'flex items-center justify-center h-[100px]',
                itemBorderStyles()
              )}
            >
              <Text size="18" color="subtle">
                {emptyMessage || 'No results'}
              </Text>
            </div>
          )}
          {entities?.map((entity, i) => {
            const sc = entity.sc
            const sf = entity.sf
            const truncHashEl = entity.unconfirmed ? (
              <Text color="accent" weight="medium">
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
              <div
                className={cx('flex gap-4 p-4', itemBorderStyles())}
                key={entity.hash || entity.label || i}
                onClick={entity.onClick}
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
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="flex gap-2 items-center w-full">
                    <div className="flex gap-2 items-center">
                      {entity.height && entity.blockHref && (
                        <Text color="subtle" weight="semibold">
                          <Link href={entity.blockHref} underline="none">
                            {humanNumber(entity.height)}
                          </Link>
                        </Text>
                      )}
                      <Text weight="medium">{title || truncHashEl}</Text>
                    </div>
                    <div className="flex-1" />
                    {!!sc && <ValueSc value={sc} />}
                    {!!sf && <ValueSf value={sf} />}
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex gap-1">{!!title && truncHashEl}</div>
                    <div className="flex gap-1">
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
                    </div>
                  </div>
                </div>
              </div>
            )
          }) || <EntityListSkeleton />}
        </div>
      </div>
    </Panel>
  )
}

export function EntityListSkeleton() {
  return (
    <>
      {times(10, (i) => (
        <div
          key={i}
          className={cx('relative flex gap-4 p-3.5', itemBorderStyles())}
        >
          <Skeleton className="w-[60px] h-[50px]" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-[90%] h-[20px]" />
            <Skeleton className="w-[140px] h-[14px]" />
          </div>
        </div>
      ))}
    </>
  )
}

export function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}
