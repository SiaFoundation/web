import BigNumber from 'bignumber.js'
import { formatDistance } from 'date-fns'
import { upperFirst } from '@technically/lodash'

import {
  Badge,
  Link,
  Text,
  Tooltip,
  ValueCopyable,
  ValueScFiat,
  ValueSf,
} from '@siafoundation/design-system'
import { DotMark16 } from '@siafoundation/react-icons'
import {
  EntityType,
  getEntityTypeLabel,
  getTransactionType,
  getTxTypeLabel,
  getV2TransactionType,
  humanNumber,
  TxType,
} from '@siafoundation/units'

import LoadingTimestamp from '../LoadingTimestamp'

import { EntityListItemLayout } from './EntityListItemLayout'
import {
  ExplorerTransaction,
  ExplorerV2Transaction,
  Transaction,
  V2Transaction,
} from '@siafoundation/explored-types'

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
  txPreviewBadge?: React.ReactNode
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
              entity.href ? (
                <Tooltip content={title}>
                  <Link
                    ellipsis
                    weight="medium"
                    underline="none"
                    href={entity.href}
                  >
                    {title}
                  </Link>
                </Tooltip>
              ) : (
                <Tooltip content={title}>
                  <Text ellipsis weight="medium">
                    {title}
                  </Text>
                </Tooltip>
              )
            ) : (
              <Text ellipsis weight="medium">
                {truncHashEl}
              </Text>
            )}
          </div>
          <div className="flex-1" />
          <div className="flex gap-1">{entity.txPreviewBadge}</div>
          {(sc || sf) && (
            <div className="flex items-center">
              {!!sc && <ValueScFiat variant={entity.scVariant} value={sc} />}
              {!!sf && <ValueSf variant={entity.sfVariant} value={sf} />}
            </div>
          )}
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

export function getExplorerV2TxPreviewBadge(
  tx: ExplorerV2Transaction
): React.ReactNode {
  // This won't work for resolution types, returning undefined.
  let txType = getV2TransactionType(tx as V2Transaction)

  // Handle the above comment.
  if (!txType) {
    if (tx.fileContractResolutions?.[0]) {
      txType =
        tx.fileContractResolutions?.[0].type === 'expiration'
          ? 'contractExpiration'
          : tx.fileContractResolutions?.[0].type === 'renewal'
          ? 'contractRenewal'
          : 'storageProof'
    }
  }

  if (txType === 'unknown') {
    if (tx.arbitraryData?.length)
      return <Badge variant="simple">arbitrary data</Badge>
  }

  if (txType === 'siacoin' || txType === 'siafund')
    return (
      <Badge variant="gray">
        <Text color="none">{getTxTypeLabel(txType)}</Text>
      </Badge>
    )

  return <Badge variant="accent">{getTxTypeLabel(txType)}</Badge>
}

export function getExplorerV1TxPreviewBadge(
  tx: ExplorerTransaction
): React.ReactNode {
  const txType = getTransactionType(tx as Transaction)

  if (txType === 'unknown') {
    if (tx.arbitraryData?.length)
      return <Badge variant="simple">arbitrary data</Badge>
  }

  if (txType === 'siacoin' || txType === 'siafund')
    return (
      <Badge variant="gray">
        <Text color="subtle">{getTxTypeLabel(txType)}</Text>
      </Badge>
    )

  return <Badge variant="accent">{getTxTypeLabel(txType)}</Badge>
}
