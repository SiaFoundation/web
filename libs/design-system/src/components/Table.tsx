import { Flex } from '../core/Flex'
import { InfoTip } from '../core/InfoTip'
import { Tooltip } from '../core/Tooltip'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { CSS } from '../config/theme'
import { useMemo } from 'react'

export type Row = {
  key: string
}

export type TableColumn<R> = {
  key: string
  label: string
  tip?: string
  size?: number
  props?: React.ComponentProps<typeof Flex>
  css?: CSS
  render: (row: R) => React.ReactNode
  summary?: () => React.ReactNode
  type?: 'fixed'
  sortable?: string
}

type Props<R extends Row> = {
  data: R[]
  columns: TableColumn<R>[]
  summary?: boolean
  rowSize?: 'dense' | 'default'
}

export function Table<R extends Row>({
  columns: _columns,
  data,
  summary,
  rowSize = 'default',
}: Props<R>) {
  const columns = useMemo(
    () =>
      _columns?.map((column) => {
        const size = column.size || 1
        return {
          ...column,
          tableCss: {
            minWidth: `${size * 50}px`,
            flex: size,
          },
        }
      }, []) || [],
    [_columns]
  )

  return (
    <Panel>
      <Flex direction="column">
        <Flex
          gap="3-5"
          css={{
            padding: '$1-5 $3',
            borderBottom: '1px solid $slate3',
          }}
        >
          {columns.map(({ key, label, tip, props, tableCss }) => (
            <Flex
              key={key}
              {...props}
              css={{ ...tableCss, overflow: 'hidden' }}
            >
              <Tooltip content={label}>
                <Text
                  weight="semibold"
                  color="subtle"
                  size="12"
                  css={{ position: 'relative', top: '1px' }}
                  ellipsis
                >
                  {label}
                </Text>
              </Tooltip>
              {tip && <InfoTip>{tip}</InfoTip>}
            </Flex>
          ))}
        </Flex>
        {summary && (
          <Flex
            gap="3-5"
            align="center"
            css={{
              padding: '$1 $3',
              background: '$slate1',
              borderLeft: '1px solid $slate3',
              borderRight: '1px solid $slate3',
              borderBottom: '1px solid $slate3',
            }}
          >
            {columns.map(({ key, summary, props, tableCss, css }) => (
              <Flex
                key={key}
                {...props}
                css={{
                  ...tableCss,
                  overflow: 'hidden',
                  ...css,
                }}
              >
                {summary && summary()}
              </Flex>
            ))}
          </Flex>
        )}
        <Flex direction="column">
          {data.map((row) => (
            <Flex
              key={row.key}
              gap="3-5"
              align="center"
              css={{
                padding: rowSize === 'dense' ? '$1 $3' : '$3 $3',
                borderBottom: '1px solid $slate3',
                '&:last-of-type': {
                  borderBottom: 'none',
                },
              }}
            >
              {columns.map(({ key, render, props, tableCss, css }, i) => (
                <Flex
                  key={row.key + key}
                  {...props}
                  css={{
                    ...tableCss,
                    overflow: 'hidden',
                    ...css,
                  }}
                >
                  {render(row)}
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Panel>
  )
}
