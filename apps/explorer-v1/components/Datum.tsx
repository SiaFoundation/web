import { Box, Flex, Text } from '@siafoundation/design-system'
import { isNumber, upperFirst } from 'lodash'
import { EntityType } from '../config/types'
import { ValueSc } from './ValueSc'
import { ValueSf } from './ValueSf'
import { ValueCopyable } from './ValueCopyable'

// entityType&entityValue | value | values | sc | sf
export type ValueItemProps = {
  label: string
  value?: React.ReactNode
  hash?: string
  entityType?: EntityType
  entityValue?: string
  sc?: bigint
  sf?: number
  comment?: React.ReactNode
}

const size: React.ComponentProps<typeof Text>['size'] = {
  '@initial': '16',
  '@bp1': '18',
}

export function Datum({
  label,
  entityType,
  entityValue,
  value,
  hash,
  sc,
  sf,
  comment,
}: ValueItemProps) {
  return (
    <Flex gap="6" wrap="wrap" align="center" css={{ overflow: 'hidden' }}>
      <Box css={{ flex: 1 }}>
        <Text
          color="subtle"
          size={{
            '@initial': '12',
            '@bp1': '14',
          }}
        >
          {upperFirst(label)}
        </Text>
      </Box>
      <Flex
        direction="column"
        align={{
          '@initial': 'end',
          '@bp2': 'start',
        }}
        gap="1"
        css={{
          '@bp2': {
            flex: 2,
          },
        }}
      >
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
          <Text font="mono" weight="semibold" size={size} ellipsis>
            {value}
          </Text>
        )}
        {comment && (
          <Text color="subtle" size="12">
            {comment}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}
