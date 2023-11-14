'use client'

import { Link } from '../core/Link'
import { Text } from '../core/Text'
import { ValueSf } from './ValueSf'
import { ValueCopyable } from './ValueCopyable'
import {
  EntityType,
  getEntityTypeLabel,
  getTxTypeLabel,
  TxType,
} from '../lib/entityTypes'
import { humanNumber } from '@siafoundation/sia-js'
import { formatDistance } from 'date-fns'
import { upperFirst } from 'lodash'
import BigNumber from 'bignumber.js'
import { DotMark16 } from '@siafoundation/react-icons'
import { EntityListItemLayout } from './EntityListItemLayout'
import { ValueScFiat } from './ValueScFiat'

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

export function EntityListItem(entity: EntityListItemProps) {
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
    <EntityListItemLayout {...entity}>
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
          {!!sc && <ValueScFiat variant={entity.scVariant} value={sc} />}
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
                {formatDistance(new Date(entity.timestamp), new Date(), {
                  addSuffix: true,
                })}
              </Text>
            )}
          </div>
        </div>
      </div>
    </EntityListItemLayout>
  )
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
