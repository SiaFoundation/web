import { Flex, Text } from '@siafoundation/design-system'
import { isNumber, upperFirst } from 'lodash'
import { EntityType } from '../config/types'
import { ValueSc } from './ValueSc'
import { ValueSf } from './ValueSf'
import { ValueCopyable } from './ValueCopyable'

// entityType&entityValue | value | values | sc | sf
export type ValueItemProps = {
  label: string
  value?: React.ReactNode
  values?: ValueItemProps[]
  hash?: string
  entityType?: EntityType
  entityValue?: string
  sc?: bigint
  sf?: number
  size?: '14' | '24'
}

export function Datum({
  label,
  entityType,
  entityValue,
  value,
  values,
  hash,
  sc,
  sf,
  size = '24',
}: ValueItemProps) {
  return (
    <Flex direction="column" gap="2" align="start">
      <Text color="subtle" font="mono" size={size === '24' ? '14' : '12'}>
        {upperFirst(label)}
      </Text>
      {sc !== undefined && <ValueSc size={size} variant="value" value={sc} />}
      {sf !== undefined && <ValueSf size={size} variant="value" value={sf} />}
      {entityType &&
        (entityValue ? (
          <ValueCopyable
            size={size}
            type={entityType}
            value={entityValue}
            displayValue={
              entityType === 'block' && isNumber(entityValue)
                ? Number(entityValue).toLocaleString()
                : entityValue
            }
            css={{
              position: 'relative',
              top: '2px',
            }}
          />
        ) : (
          <Text font="mono" weight="semibold" size={size}>
            -
          </Text>
        ))}
      {hash && <ValueCopyable size={size} type="hash" value={hash} />}
      {value !== undefined && (
        <Text font="mono" weight="semibold" size={size}>
          {value}
        </Text>
      )}
      <Flex direction="column" gap="2">
        {values?.map((v) => (
          <Row key={v.label} {...v} />
        ))}
      </Flex>
    </Flex>
  )
}

function Row({ label, value }: ValueItemProps) {
  return (
    <Flex direction="row" gap="2" justify="between">
      <Text color="subtle" font="mono" size={'12'}>
        {label}
      </Text>
      <Text font="mono" weight="semibold" size={'12'}>
        {value}
      </Text>
    </Flex>
  )
}
