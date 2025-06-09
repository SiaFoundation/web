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
import {
  ExplorerTransaction,
  ExplorerV2Transaction,
} from '@siafoundation/explored-types'
import {
  ArrowLeft16,
  ArrowRight16,
  DotMark16,
} from '@siafoundation/react-icons'
import {
  EntityType,
  getEntityTypeLabel,
  getTxTypeLabel,
  humanNumber,
  TxType,
} from '@siafoundation/units'

import { getTransactionSummary } from '../../lib/tx'

import LoadingTimestamp from '../LoadingTimestamp'

import { EntityListItemLayout } from './EntityListItemLayout'

export type TxPreviewBadgeConfig = {
  arbitraryData: boolean
  contractFormation: boolean
  contractResolution: boolean
  contractRevision: boolean
  hostAnnouncement: boolean
  spend: boolean
}

export function generateTxPreviewBadgeConfig(
  tx: ExplorerV2Transaction | ExplorerTransaction
): TxPreviewBadgeConfig {
  const summary = getTransactionSummary(tx)
  return {
    arbitraryData: !!tx.arbitraryData?.length,
    contractFormation: !!tx.fileContracts?.length,
    contractResolution:
      ('fileContractResolutions' in tx &&
        !!tx.fileContractResolutions?.length) ||
      ('storageProofs' in tx && !!tx.storageProofs?.length),
    contractRevision: !!tx.fileContractRevisions?.length,
    hostAnnouncement: !!tx.hostAnnouncements?.length,
    spend:
      (!!summary.sc.length || !!summary.sf.length) &&
      !tx.fileContracts?.length &&
      !tx.fileContractRevisions?.length &&
      !tx.hostAnnouncements?.length &&
      (!('fileContractResolutions' in tx) ||
        !tx.fileContractResolutions?.length) &&
      (!('storageProofs' in tx) || !tx.storageProofs?.length),
  }
}

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
  txPreviewBadgeConfig?: TxPreviewBadgeConfig
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
          <div className="flex gap-1">
            {entity.txPreviewBadgeConfig?.contractRevision && (
              <Badge variant="accent">Contract Revision</Badge>
            )}
            {entity.txPreviewBadgeConfig?.contractFormation && (
              <Badge variant="accent">Contract Formation</Badge>
            )}
            {entity.txPreviewBadgeConfig?.contractResolution && (
              <Badge variant="accent">Contract Resolution</Badge>
            )}
            {entity.txPreviewBadgeConfig?.hostAnnouncement && (
              <Badge variant="accent">Host Announcement</Badge>
            )}
            {entity.txPreviewBadgeConfig?.spend && (
              <Badge variant="gray" className="flex gap-1">
                <ArrowLeft16 /> Spend <ArrowRight16 />
              </Badge>
            )}
            {entity.txPreviewBadgeConfig?.arbitraryData && (
              <Badge variant="inactive">Arbitrary Data</Badge>
            )}
          </div>
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
