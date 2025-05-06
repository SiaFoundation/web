'use client'

import {
  Link,
  Text,
  Tooltip,
  ValueCopyable,
  ValueScFiat,
  ValueSf,
} from '@siafoundation/design-system'
import {
  EntityType,
  getEntityTypeLabel,
  getTxTypeLabel,
  TxType,
} from '@siafoundation/units'
import { humanNumber } from '@siafoundation/units'
import { formatDistance } from 'date-fns'
import { upperFirst } from '@technically/lodash'
import BigNumber from 'bignumber.js'
import { DotMark16 } from '@siafoundation/react-icons'
import { EntityListItemLayout } from './EntityListItemLayout'
import LoadingTimestamp from '../LoadingTimestamp'

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
  siascanUrl?: string
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
      siascanUrl={entity.siascanUrl}
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
      <div className="flex flex-col items-center gap-1 w-full min-w-0">
        <div className="flex gap-2 items-center w-full">
          <div className="flex gap-2 items-center min-w-0">
            {entity.height && entity.blockHref && (
              <Text color="subtle" weight="semibold">
                <Link href={entity.blockHref} underline="none">
                  {humanNumber(entity.height)}
                </Link>
              </Text>
            )}
            {title ? (
              <Tooltip content={title}>
                <Text ellipsis weight="medium">
                  {title}
                </Text>
              </Tooltip>
            ) : (
              <Text ellipsis weight="medium">
                {truncHashEl}
              </Text>
            )}
          </div>
          <div className="flex-1" />
          <div className="flex items-center">
            {!!sc && <ValueScFiat variant={entity.scVariant} value={sc} />}
            {!!sf && <ValueSf variant={entity.sfVariant} value={sf} />}
          </div>
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
              <LoadingTimestamp className="w-[130px]">
                <Text color="subtle">
                  {formatDistance(new Date(entity.timestamp), new Date(), {
                    addSuffix: true,
                  })}
                </Text>
              </LoadingTimestamp>
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
