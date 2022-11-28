import { Text } from '../core/Text'
import { ValueSf } from '../components/ValueSf'
import { ValueSc } from '../components/ValueSc'
import { ValueCopyable } from '../components/ValueCopyable'
import { Tooltip } from '../core/Tooltip'
import BigNumber from 'bignumber.js'
import { upperFirst } from 'lodash'
import { Panel } from '../core/Panel'
import { EntityType, getEntityTypeLabel } from '../lib/entityTypes'
import { cx } from 'class-variance-authority'

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
  onClick?: () => void
}

export function DatumCard({
  label,
  entityType,
  entityValue,
  actions,
  href,
  value,
  hash,
  sc,
  sf,
  comment,
  commentTip,
  scaleSize = '40',
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
          'flex items-center py-4 px-6 h-full min-w-[200px]',
          onClick ? 'cursor-pointer' : ''
        )}
        onClick={onClick}
      >
        <div className="flex flex-col gap-4 flex-wrap items-start">
          <div className="flex relative top-px flex-1 w-full gap-6 items-center justify-between">
            <Text color="subtle" ellipsis scaleSize="14">
              {typeof label === 'string' ? upperFirst(label) : label}
            </Text>
            {actions}
          </div>
          <div className="flex flex-col items-end md:items-start gap-2 md:flex-2">
            {sc !== undefined && (
              <ValueSc
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
              <ValueCopyable scaleSize={scaleSize} label="hash" value={hash} />
            )}
            {value !== undefined && (
              <Text font="mono" weight="medium" scaleSize={scaleSize} ellipsis>
                {value}
              </Text>
            )}
            {commentEl && commentTip ? (
              <Tooltip content={commentTip}>{commentEl}</Tooltip>
            ) : (
              commentEl
            )}
          </div>
        </div>
      </div>
    </Panel>
  )
}
