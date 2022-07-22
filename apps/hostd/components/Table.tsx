import {
  CSS,
  Flex,
  Grid,
  InfoTip,
  Panel,
  Text,
} from '@siafoundation/design-system'
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
  summary?: (row: R) => React.ReactNode
}

type Props<R extends Row> = {
  data: R[]
  columns: TableColumn<R>[]
  summary?: boolean
}

export function Table<R extends Row>({
  columns: _columns,
  data,
  summary,
}: Props<R>) {
  const columns = useMemo(
    () =>
      _columns?.reduce((acc, column, i) => {
        const size = column.size || 1
        const last = acc[i - 1]
        const start = last?.end || 1
        const end = start + size
        return acc.concat({
          ...column,
          start,
          end,
          gridColumn: `${start} / span ${size}`,
        })
      }, []) || [],
    [_columns]
  )

  const columnCount = columns[columns.length - 1]?.start || 0

  return (
    <Panel>
      <Flex
        direction="column"
        css={{
          overflow: 'hidden',
        }}
      >
        <Grid
          gap="3-5"
          css={{
            padding: '$2-5 $3',
            borderBottom: '1px solid $slate7',
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          }}
        >
          {columns.map(({ key, label, tip, props, gridColumn }) => (
            <Flex
              key={key || label}
              {...props}
              css={{ gridColumn, overflow: 'hidden' }}
            >
              <Text
                weight="semibold"
                color="subtle"
                css={{ position: 'relative', top: '1px' }}
                ellipsis
              >
                {label}
              </Text>
              {tip && <InfoTip>{tip}</InfoTip>}
            </Flex>
          ))}
        </Grid>
        {summary && (
          <Grid
            gap="3-5"
            align="center"
            css={{
              padding: '$1 $3',
              background: '$slate1',
              border: '2px solid $slate5',
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            }}
          >
            {columns.map(({ gridColumn, summary, props, css }, i) => (
              <Flex
                key={gridColumn}
                {...props}
                css={{
                  gridColumn,
                  overflow: 'hidden',
                  ...css,
                }}
              >
                {summary && summary()}
              </Flex>
            ))}
          </Grid>
        )}
        <Flex direction="column">
          {data.map((row) => (
            <Grid
              key={row.key}
              gap="3-5"
              align="center"
              css={{
                padding: '$3',
                borderBottom: '1px solid $slate5',
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              }}
            >
              {columns.map(({ gridColumn, render, props, css }, i) => (
                <Flex
                  key={gridColumn}
                  {...props}
                  css={{
                    gridColumn,
                    overflow: 'hidden',
                    ...css,
                  }}
                >
                  {render(row)}
                </Flex>
              ))}
            </Grid>
          ))}
        </Flex>
      </Flex>
    </Panel>
  )
}
