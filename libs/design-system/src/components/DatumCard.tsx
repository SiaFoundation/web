import { Text } from '../core/Text'
import { ValueSf } from '../components/ValueSf'
import { ValueCopyable } from '../components/ValueCopyable'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'
import upperFirst from 'lodash-es/upperFirst'
import { Panel } from '../core/Panel'
import { EntityType, getEntityTypeLabel } from '../lib/entityTypes'
import { cx } from 'class-variance-authority'
import { Skeleton } from '../core/Skeleton'
import { ValueScFiat } from './ValueScFiat'

// entityType&entityValue | value | values | sc | sf
type Props = {
  scaleSize?: React.ComponentProps<typeof Text>['scaleSize']
  label: React.ReactNode
  value?: React.ReactNode
  hash?: string
  href?: string
  entityType?: EntityType
  entityValue?: string
  sc?: BigNumber
  sf?: number
  comment?: React.ReactNode
  commentTip?: React.ReactNode
  actions?: React.ReactNode
  isLoading?: boolean
  onClick?: () => void
  extendedSuffix?: string
}

export function DatumCard({
  label,
  entityType,
  entityValue,
  actions,
  href,
  value,
  extendedSuffix,
  hash,
  sc,
  sf,
  comment,
  commentTip,
  scaleSize = '40',
  isLoading,
  onClick,
}: Props) {
  const commentEl = (
    <Text color="subtle" size="12" className="h-6">
      {comment}
    </Text>
  )

  return (
    <Panel>
      <div
        className={cx(
          'flex items-center py-2 px-4 h-full min-w-[250px]',
          onClick ? 'cursor-pointer' : ''
        )}
        onClick={onClick}
      >
        <div className="flex flex-col gap-4 flex-wrap items-start w-full">
          <div className="flex relative top-px flex-1 w-full gap-6 items-center justify-between">
            <Text color="subtle" ellipsis scaleSize="14">
              {typeof label === 'string' ? upperFirst(label) : label}
            </Text>
            {actions}
          </div>
          <div className="flex flex-col items-end md:items-start gap-2 md:flex-2">
            {!isLoading ? (
              <>
                {sc !== undefined && (
                  <ValueScFiat
                    extendedSuffix={extendedSuffix}
                    scaleSize={scaleSize}
                    variant="value"
                    value={sc}
                    fixed={0}
                  />
                )}
                {sf !== undefined && (
                  <ValueSf scaleSize={scaleSize} variant="value" value={sf} />
                )}
                {entityType &&
                  (entityValue ? (
                    <ValueCopyable
                      scaleSize={scaleSize}
                      label={getEntityTypeLabel(entityType)}
                      href={href}
                      value={entityValue}
                      displayValue={
                        entityType === 'block' && entityValue
                          ? Number(entityValue).toLocaleString()
                          : entityValue
                      }
                      className="relative top-0.5"
                    />
                  ) : (
                    <Text font="mono" weight="medium" scaleSize={scaleSize}>
                      -
                    </Text>
                  ))}
                {hash && (
                  <ValueCopyable
                    scaleSize={scaleSize}
                    label="hash"
                    value={hash}
                  />
                )}
                {value !== undefined && (
                  <Text
                    font="mono"
                    weight="medium"
                    scaleSize={scaleSize}
                    ellipsis
                  >
                    {value}
                  </Text>
                )}
              </>
            ) : (
              <Skeleton className="h-12 w-[150px]" />
            )}
            {commentEl ? (
              <div className="mt-1">
                {!isLoading ? (
                  commentTip ? (
                    <Tooltip content={commentTip}>{commentEl}</Tooltip>
                  ) : (
                    commentEl
                  )
                ) : (
                  <div className="mt-1 h-6 justify-center">
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Panel>
  )
}
