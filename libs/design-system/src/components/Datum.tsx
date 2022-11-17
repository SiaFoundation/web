import { Text } from '../core/Text'
import { ValueSf } from '../components/ValueSf'
import { ValueSc } from '../components/ValueSc'
import { ValueCopyable } from '../components/ValueCopyable'
import BigNumber from 'bignumber.js'
import { upperFirst } from 'lodash'
import { EntityType, getEntityTypeLabel } from '../lib/entityTypes'

// entityType&entityValue | value | values | sc | sf
export type DatumProps = {
  label: string
  value?: React.ReactNode
  hash?: string
  href?: string
  entityType?: EntityType
  entityValue?: string
  sc?: BigNumber
  sf?: number
  comment?: React.ReactNode
}

export function Datum({
  label,
  entityType,
  entityValue,
  href,
  value,
  hash,
  sc,
  sf,
  comment,
}: DatumProps) {
  return (
    <div className="flex gap-x-12 gap-y-4 flex-wrap items-center overflow-hidden">
      <div className="flex relative top-px flex-1">
        <Text color="subtle" ellipsis scaleSize="14">
          {upperFirst(label)}
        </Text>
      </div>
      <div className="flex flex-col items-end md:items-start gap-2 md:flex-2">
        {sc !== undefined && (
          <ValueSc scaleSize="18" variant="value" value={sc} />
        )}
        {sf !== undefined && (
          <ValueSf scaleSize="18" variant="value" value={sf} />
        )}
        {entityType &&
          (entityValue ? (
            <ValueCopyable
              className="relative top-0.5"
              scaleSize="18"
              label={getEntityTypeLabel(entityType)}
              href={href}
              value={entityValue}
              displayValue={
                entityType === 'block' && entityValue
                  ? Number(entityValue).toLocaleString()
                  : entityValue
              }
            />
          ) : (
            <Text font="mono" weight="semibold" scaleSize="18">
              -
            </Text>
          ))}
        {hash && <ValueCopyable scaleSize="18" label="hash" value={hash} />}
        {value !== undefined && (
          <Text font="mono" weight="semibold" scaleSize="18" ellipsis>
            {value}
          </Text>
        )}
        {comment && (
          <Text color="subtle" size="12">
            {comment}
          </Text>
        )}
      </div>
    </div>
  )
}
