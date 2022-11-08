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
          // gap="3-5"
          css={{
            borderBottom: '1px solid $mauve5',
          }}
        >
          {columns.map(({ key, label, tip, props, tableCss, css }) => (
            <Flex
              key={key}
              {...props}
              css={{
                padding: '$1-5 $3',
                ...tableCss,
                ...css,
                overflow: 'hidden',
              }}
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
            align="center"
            css={{
              py: '$1',
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
                  px: '$3',
                  overflow: 'hidden',
                  ...tableCss,
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
              // gap="3-5"
              align="center"
              css={{
                borderBottom: '1px solid $mauve4',
                '&:last-of-type': {
                  borderBottom: 'none',
                },
                overflow: 'hidden',
              }}
            >
              {/* {toPairs(groupBy(columns, 'group')).map(
                ([name, groupColumns]) => (
                  <Flex
                    key={name}
                    gap="3-5"
                    align="center"
                    css={
                      {
                        // padding: rowSize === 'dense' ? '$1 $3' : '$3 $3',
                      }
                    }
                  > */}
              {columns.map(({ key, render, props, tableCss, css }, i) => (
                <Flex
                  key={row.key + key}
                  align="center"
                  {...props}
                  css={{
                    height: rowSize === 'dense' ? '50px' : '100px',
                    px: '$3',
                    overflow: 'hidden',
                    ...tableCss,
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
