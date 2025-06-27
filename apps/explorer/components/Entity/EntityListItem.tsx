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
import { DotMark16, Locked16, Unlocked16 } from '@siafoundation/react-icons'
import {
  EntityType,
  getEntityTypeLabel,
  getTxTypeLabel,
  humanNumber,
  TxType,
} from '@siafoundation/units'
import LoadingTimestamp from '../LoadingTimestamp'
import { EntityListItemLayout } from './EntityListItemLayout'

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
  entityHeight?: number
  timestamp?: number
  unconfirmed?: boolean
  siascanUrl?: string
  avatarShape?: 'square' | 'circle'
  avatar?: string
  maturityHeight?: number
  networkHeight?: number
}

export function EntityListItem(entity: EntityListItemProps) {
  const sc = entity.sc
  const sf = entity.sf
  const maturityHeight = entity.maturityHeight ?? 0
  const entityHeight = entity.entityHeight ?? 0
  const networkHeight = entity.networkHeight ?? 0
  const isMature = maturityHeight <= networkHeight

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
      <div className="flex justify-between w-full items-start gap-4 flex-1 min-w-0">
        <div className="flex flex-col gap-2 min-w-0">
          {entity.entityHeight && entity.blockHref && (
            <Text color="subtle" weight="semibold">
              <Link href={entity.blockHref} underline="none">
                {humanNumber(entity.entityHeight)}
              </Link>
            </Text>
          )}
          {title &&
            (entity.href ? (
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
            ))}
          {truncHashEl}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-col gap-2 items-end">
            {(sc || sf || entity.txType) && (
              <div className="flex items-center gap-2">
                {entity.txType && (
                  <Badge variant={getExplorerTxTypeBadgeVariant(entity.txType)}>
                    {getTxTypeLabel(entity.txType)}
                  </Badge>
                )}
                {!!sc && <ValueScFiat variant={entity.scVariant} value={sc} />}
                {!!sf && <ValueSf variant={entity.sfVariant} value={sf} />}
              </div>
            )}
            <div className="flex gap-1 items-center">
              {entity.unconfirmed && (
                <>
                  <Text color="verySubtle">unconfirmed</Text>
                  {entity.timestamp && (
                    <Text color="verySubtle">
                      <DotMark16 className="scale-50" />
                    </Text>
                  )}
                </>
              )}
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
          {maturityHeight && entityHeight && networkHeight ? (
            <Tooltip
              content={
                isMature
                  ? 'The maturity height has been reached.'
                  : 'The maturity height has not been reached, therefore the output is still locked.'
              }
            >
              <div className="hidden sm:flex flex-col gap-[5px] pl-2 border-l border-gray-600 dark:border-graydark-600 cursor-pointer">
                <div className="flex justify-end">
                  <Text
                    size="12"
                    font="mono"
                    ellipsis
                    color={isMature ? 'green' : 'red'}
                    className="flex gap-1 items-center"
                  >
                    {isMature ? <Unlocked16 /> : <Locked16 />}
                    {maturityHeight.toLocaleString()}
                  </Text>
                </div>
                <div className="flex justify-between items-end gap-1">
                  <div className="pl-[8px] pb-[6px]">
                    <div className="border-l border-b border-gray-800 dark:border-graydark-800 h-[20px] w-[7px]" />
                  </div>
                  <Text size="12" font="mono" color="subtle" ellipsis>
                    {entityHeight.toLocaleString()}
                  </Text>
                </div>
              </div>
            </Tooltip>
          ) : null}
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

export function getExplorerTxTypeBadgeVariant(txType: TxType) {
  if (txType === 'arbitraryData') {
    return 'simple'
  }

  if (txType === 'siacoin' || txType === 'siafund') {
    return 'gray'
  }

  return 'accent'
}
