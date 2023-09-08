'use client'

import { Heading } from '../core/Heading'
import { Link } from '../core/Link'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { ValueSf } from '../components/ValueSf'
import { ValueSc } from '../components/ValueSc'
import { ValueCopyable } from '../components/ValueCopyable'
import {
  EntityType,
  getEntityTypeLabel,
  getTxTypeLabel,
  TxType,
} from '../lib/entityTypes'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { upperFirst } from 'lodash'
import { EntityAvatar } from './EntityAvatar'
import React from 'react'
import BigNumber from 'bignumber.js'
import { cx } from 'class-variance-authority'
import { DotMark16 } from '@carbon/icons-react'
import { EntityListSkeleton } from './EntityListSkeleton'

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
  scVariant?: 'value' | 'change'
  sfVariant?: 'value' | 'change'
  height?: number
  timestamp?: number
  unconfirmed?: boolean
  avatarShape?: 'square' | 'circle'
  avatar?: string
}

type Props = {
  title?: string
  actions?: React.ReactNode
  entities?: EntityListItemProps[]
  emptyMessage?: string
  skeletonCount?: number
}

export function EntityList({
  title,
  actions,
  entities,
  emptyMessage,
  skeletonCount = 10,
}: Props) {
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
                'flex items-center justify-center h-[84px]',
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
            const truncHashEl = entity.hash && (
              <ValueCopyable
                value={entity.hash}
                type={entity.type}
                label={entity.label}
                href={entity.href}
                color="subtle"
              />
            )
            const label =
              entity.label ||
              (entity.type === 'transaction' &&
                entity.txType &&
                getTxTypeLabel(entity.txType)) ||
              getEntityTypeLabel(entity.type)

            const title = isValidUrl(label) ? label : upperFirst(label)
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
                  src={entity.avatar}
                  initials={
                    entity.initials ||
                    initializeWords(entity?.type || label || '')
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
                    {!!sc && <ValueSc variant={entity.scVariant} value={sc} />}
                    {!!sf && <ValueSf variant={entity.sfVariant} value={sf} />}
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex gap-1">{!!title && truncHashEl}</div>
                    <div className="flex gap-1 items-center">
                      {entity.unconfirmed ? (
                        <>
                          <Text color="verySubtle">unconfirmed</Text>
                          {entity.timestamp ? (
                            <Text color="verySubtle">
                              <DotMark16 className="scale-50" />
                            </Text>
                          ) : null}
                        </>
                      ) : null}
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
          }) || <EntityListSkeleton skeletonCount={skeletonCount} />}
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

function initializeWords(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}

function isValidUrl(url?: string) {
  if (!url) {
    return false
  }
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
