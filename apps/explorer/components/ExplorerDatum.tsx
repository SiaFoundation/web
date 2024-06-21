import {
  Text,
  ValueSf,
  ValueSc,
  ValueCopyable,
  EntityType,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { upperFirst } from '@technically/lodash'
import { getHref } from '../lib/utils'

// entityType&entityValue | value | values | sc | sf
export type DatumProps = {
  label: string
  value?: React.ReactNode
  displayValue?: string
  entityType?: EntityType
  entityValue?: string
  sc?: BigNumber
  sf?: number
  comment?: React.ReactNode
  copyable?: boolean
}

export function ExplorerDatum({
  label,
  entityType,
  entityValue,
  copyable = true,
  value,
  displayValue,
  sc,
  sf,
  comment,
}: DatumProps) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-4 items-baseline py-1.5">
      <Text color="subtle" scaleSize="14" ellipsis className="flex-1">
        {upperFirst(label)}
      </Text>
      <div className="flex flex-col gap-2 items-end md:items-end md:flex-[2]">
        {sc !== undefined && (
          <ValueSc scaleSize="18" variant="value" value={sc} />
        )}
        {sf !== undefined && (
          <ValueSf scaleSize="18" variant="value" value={sf} />
        )}
        {entityType &&
          (entityValue ? (
            <ValueCopyable
              scaleSize="18"
              href={getHref(entityType, entityValue)}
              value={entityValue}
              type={entityType}
              displayValue={displayValue}
              // className="relative top-0.5"
            />
          ) : (
            <Text font="mono" weight="semibold" scaleSize="18">
              -
            </Text>
          ))}
        {value !== undefined && copyable && (
          <ValueCopyable scaleSize="18" label={label} value={String(value)} />
        )}
        {value !== undefined && !copyable && (
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
