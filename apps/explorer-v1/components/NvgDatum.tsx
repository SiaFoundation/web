import {
  Text,
  ValueSf,
  ValueSc,
  ValueCopyable,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { upperFirst } from 'lodash'
import { NvgEntityType, getNvgEntityTypeLabel } from '../config/navigatorTypes'
import { getHrefForType } from '../lib/utils'

// entityType&entityValue | value | values | sc | sf
export type DatumProps = {
  label: string
  value?: React.ReactNode
  hash?: string
  entityType?: NvgEntityType
  entityValue?: string
  sc?: BigNumber
  sf?: number
  comment?: React.ReactNode
}

export function NvgDatum({
  label,
  entityType,
  entityValue,
  value,
  hash,
  sc,
  sf,
  comment,
}: DatumProps) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-4 items-baseline py-1.5 overflow-hidden">
      <div className="flex-1">
        <Text color="subtle" scaleSize="14">
          {upperFirst(label)}
        </Text>
      </div>
      <div className="flex flex-col gap-2 items-end md:items-start md:flex-[2]">
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
              label={getNvgEntityTypeLabel(entityType)}
              href={getHrefForType(entityType, entityValue)}
              value={entityValue}
              displayValue={
                entityType === 'block' && entityValue
                  ? Number(entityValue).toLocaleString()
                  : entityValue
              }
              // className="relative top-0.5"
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
