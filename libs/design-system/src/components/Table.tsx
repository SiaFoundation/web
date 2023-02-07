import { InfoTip } from '../core/InfoTip'
import { Tooltip } from '../core/Tooltip'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { useMemo } from 'react'
import { cx } from 'class-variance-authority'
import { CaretDown16, CaretUp16 } from '@carbon/icons-react'
import { times } from 'lodash'

export type Row = {
  id: string
}

export type TableColumn<Columns, R> = {
  id: Columns
  label: string
  tip?: string
  size?: number
  className?: string
  render: React.FC<R>
  summary?: () => React.ReactNode
  sortable?: string
}

type Props<Columns extends string, R extends Row> = {
  data: R[]
  columns: TableColumn<Columns, R>[]
  sortColumn?: Columns
  sortDirection?: 'asc' | 'desc'
  toggleSort?: (column: Columns) => void
  summary?: boolean
  rowSize?: 'dense' | 'default'
  pageSize: number
  isLoading: boolean
  emptyState?: React.ReactNode
}

export function Table<Columns extends string, R extends Row>({
  columns: _columns,
  data,
  sortColumn,
  sortDirection,
  toggleSort,
  summary,
  rowSize = 'default',
  pageSize,
  isLoading,
  emptyState,
}: Props<Columns, R>) {
  const columns = useMemo(
    () =>
      _columns?.map((column) => {
        const size = column.size || 1
        return {
          ...column,
          style: {
            minWidth: `${size * 50}px`,
            flex: size,
          },
        }
      }, []) || [],
    [_columns]
  )

  return (
    <Panel>
      <div className="flex flex-col">
        <div className="flex border-b border-gray-400 dark:border-graydark-400">
          {columns.map(({ id, label, tip, style, className }) => (
            <div
              key={id}
              className={cx('flex py-3 px-6 overflow-hidden', className)}
              style={style}
            >
              <Tooltip content={label}>
                <Text
                  onClick={() => {
                    if (toggleSort) {
                      toggleSort(id)
                    }
                  }}
                  weight="semibold"
                  color="subtle"
                  size="12"
                  className="relative top-px cursor-pointer"
                  ellipsis
                >
                  {label}
                </Text>
              </Tooltip>
              <Text color="subtle">
                {sortColumn === id &&
                  (sortDirection === 'asc' ? (
                    <CaretUp16 className="scale-75" />
                  ) : (
                    <CaretDown16 className="scale-75" />
                  ))}
              </Text>
              {tip && <InfoTip>{tip}</InfoTip>}
            </div>
          ))}
        </div>
        {summary && (
          <div className="flex items-center py-2 bg-gray-50 dark:bg-graydark-50 border-l border-r border-b border-gray-200 dark:border-graydark-200">
            {columns.map(({ id, summary, style, className }) => (
              <div
                key={id}
                className={cx('flex px-6 overflow-hidden', className)}
                style={style}
              >
                {summary && summary()}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          {data.length
            ? data.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center border-b border-gray-300 dark:border-graydark-300 last-of-type:border-b-none overflow-hidden"
                >
                  {columns.map(
                    ({ id, render: Render, style, className }, i) => (
                      <div
                        key={`${id}/${row.id}`}
                        className={cx(
                          'flex items-center px-6 overflow-hidden',
                          rowSize === 'dense' ? 'h-[50px]' : 'h-[100px]',
                          className
                        )}
                        style={style}
                      >
                        <Render {...row} />
                      </div>
                    )
                  )}
                </div>
              ))
            : emptyState}
          {isLoading &&
            !data.length &&
            times(pageSize).map((i) => (
              <div
                key={i}
                className="flex items-center border-b border-gray-300 dark:border-graydark-300 last-of-type:border-b-none overflow-hidden"
              >
                {columns.map(({ id, render: Render, style, className }, i) => (
                  <div
                    key={`${i}/${id}`}
                    className={cx(
                      'flex items-center px-6 overflow-hidden',
                      rowSize === 'dense' ? 'h-[50px]' : 'h-[100px]',
                      className
                    )}
                    style={style}
                  >
                    {/* <Render {...row} /> */}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </Panel>
  )
}
