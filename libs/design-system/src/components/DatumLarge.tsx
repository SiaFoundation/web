import { Flex, Text, ValueSf, ValueSc, ValueCopyable } from '../'
import BigNumber from 'bignumber.js'
import { upperFirst } from 'lodash'
import { Panel } from '../core/Panel'
import { EntityType, getEntityTypeLabel } from '../lib/entityTypes'

// entityType&entityValue | value | values | sc | sf
type Props = {
  label: string
  value?: React.ReactNode
  hash?: string
  href?: string
  entityType?: EntityType
  entityValue?: string
  sc?: BigNumber
  sf?: number
  comment?: React.ReactNode
  onClick?: () => void
}

const size: React.ComponentProps<typeof Text>['size'] = {
  '@initial': '32',
  '@bp1': '40',
}

export function DatumCard({
  label,
  entityType,
  entityValue,
  href,
  value,
  hash,
  sc,
  sf,
  comment,
  onClick,
}: Props) {
  return (
    <Panel>
      <Flex
        align="center"
        onClick={onClick}
        css={{
          p: '$2 $3',
          height: '100%',
          minWidth: '200px',
          cursor: onClick ? 'pointer' : undefined,
        }}
      >
        <Flex
          direction="column"
          gap="2"
          wrap="wrap"
          align="start"
          css={{ overflow: 'hidden' }}
        >
          <Flex css={{ position: 'relative', top: '1px', flex: 1 }}>
            <Text
              color="subtle"
              ellipsis
              size={{
                '@initial': '12',
                '@bp1': '14',
              }}
            >
              {upperFirst(label)}
            </Text>
          </Flex>
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
            {sc !== undefined && (
              <ValueSc size={size} variant="value" value={sc} />
            )}
            {sf !== undefined && (
              <ValueSf size={size} variant="value" value={sf} />
            )}
            {entityType &&
              (entityValue ? (
                <ValueCopyable
                  size={size}
                  label={getEntityTypeLabel(entityType)}
                  href={href}
                  value={entityValue}
                  displayValue={
                    entityType === 'block' && entityValue
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
            {hash && <ValueCopyable size={size} label="hash" value={hash} />}
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
      </Flex>
    </Panel>
  )
}
