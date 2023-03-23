import { InfoTip } from '../core/InfoTip'
import { Tooltip } from '../core/Tooltip'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { useCallback } from 'react'
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
  sortable?: string
  size?: number | string
  cellClassName?: string
  contentClassName?: string
  render: React.FC<R>
  summary?: () => React.ReactNode
}

type Props<Columns extends string, R extends Row> = {
  data?: R[]
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
  columns,
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
  let show = 'emptyState'

  if (isLoading && !data?.length) {
    show = 'skeleton'
  }

  if (data?.length) {
    show = 'currentData'
  }

  const getCellClassNames = useCallback(
    (i: number, className?: string) =>
      cx(
        i === columns.length - 1 ? 'pr-6' : 'pr-4',
        i === 0 ? 'pl-6' : 'pl-4',
        className
      ),
    [columns]
  )

  const getContentClassNames = useCallback(
    (i: number, className?: string) => cx('flex items-center', className),
    []
  )

  return (
    <Panel>
      <table className="table-auto border-collapse w-full">
        <thead className="border-b border-gray-400 dark:border-graydark-400">
          <tr>
            {columns.map(
              (
                { id, label, tip, sortable, cellClassName, contentClassName },
                i
              ) => (
                <th key={id} className={getCellClassNames(i, cellClassName)}>
                  <div
                    className={cx(
                      getContentClassNames(i, contentClassName),
                      'py-3'
                    )}
                  >
                    <Tooltip content={label}>
                      <Text
                        onClick={() => {
                          if (sortable && toggleSort) {
                            toggleSort(id)
                          }
                        }}
                        weight="semibold"
                        color="subtle"
                        size="12"
                        className={cx(
                          'relative top-px',
                          sortable ? 'cursor-pointer' : ''
                        )}
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
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {summary && (
            <tr className="bg-gray-50 dark:bg-graydark-50 border-l border-r border-b border-gray-200 dark:border-graydark-200">
              {columns.map(
                ({ id, summary, contentClassName, cellClassName }, i) => (
                  <td key={id} className={getCellClassNames(i, cellClassName)}>
                    <div className={getContentClassNames(i, contentClassName)}>
                      {summary && summary()}
                    </div>
                  </td>
                )
              )}
            </tr>
          )}
          {/* <tr className="flex flex-col"> */}
          {show === 'currentData' &&
            data?.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 dark:border-graydark-300"
              >
                {columns.map(
                  (
                    {
                      id,
                      render: Render,
                      contentClassName: className,
                      cellClassName,
                    },
                    i
                  ) => (
                    <td
                      key={`${id}/${row.id}`}
                      className={getCellClassNames(i, cellClassName)}
                    >
                      <div
                        className={cx(
                          getContentClassNames(i, className),
                          rowSize === 'dense' ? 'h-[50px]' : 'h-[100px]'
                        )}
                      >
                        <Render {...row} />
                      </div>
                    </td>
                  )
                )}
              </tr>
            ))}
          {show === 'emptyState' && emptyState}
          {show === 'skeleton' &&
            times(pageSize).map((i) => (
              <tr
                key={i}
                className="border-b border-gray-300 dark:border-graydark-300"
              >
                {columns.map(({ id, contentClassName, cellClassName }, i) => (
                  <td
                    key={`${i}/${id}`}
                    className={getCellClassNames(i, cellClassName)}
                  >
                    <div
                      className={cx(
                        getContentClassNames(i, contentClassName),
                        rowSize === 'dense' ? 'h-[50px]' : 'h-[100px]'
                      )}
                    />
                  </td>
                ))}
              </tr>
            ))}
          {/* </tr> */}
        </tbody>
      </table>
    </Panel>
  )
}
