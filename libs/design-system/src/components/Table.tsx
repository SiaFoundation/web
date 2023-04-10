import { Tooltip } from '../core/Tooltip'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { useCallback } from 'react'
import { cx } from 'class-variance-authority'
import { CaretDown16, CaretUp16 } from '@carbon/icons-react'
import { times } from 'lodash'

type Data = {
  id: string
}

export type Row<Data, Context> = {
  data: Data
  context?: Context
}

export type TableColumn<Columns, Data, Context> = {
  id: Columns
  label: string
  icon?: React.ReactNode
  tip?: string
  sortable?: boolean
  size?: number | string
  cellClassName?: string
  contentClassName?: string
  render: React.FC<Row<Data, Context>>
  summary?: () => React.ReactNode
}

type Props<Columns extends string, D extends Data, Context> = {
  data?: D[]
  context?: Context
  columns: TableColumn<Columns, D, Context>[]
  sortColumn?: Columns
  sortDirection?: 'asc' | 'desc'
  toggleSort?: (column: Columns) => void
  summary?: boolean
  rowSize?: 'dense' | 'default'
  pageSize: number
  isLoading: boolean
  emptyState?: React.ReactNode
}

export function Table<Columns extends string, D extends Data, Context>({
  columns,
  data,
  context,
  sortColumn,
  sortDirection,
  toggleSort,
  summary,
  rowSize = 'default',
  pageSize,
  isLoading,
  emptyState,
}: Props<Columns, D, Context>) {
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
                {
                  id,
                  icon,
                  label,
                  tip,
                  sortable,
                  cellClassName,
                  contentClassName,
                },
                i
              ) => (
                <th key={id} className={getCellClassNames(i, cellClassName)}>
                  <div
                    className={cx(
                      getContentClassNames(i, contentClassName),
                      'overflow-hidden',
                      'py-3'
                    )}
                  >
                    <Tooltip content={tip}>
                      <Text
                        onClick={() => {
                          if (sortable && toggleSort) {
                            toggleSort(id)
                          }
                        }}
                        color="subtle"
                        className={cx(
                          'relative flex gap-1',
                          sortable && toggleSort ? 'cursor-pointer' : ''
                        )}
                        ellipsis
                      >
                        {icon ? <div>{icon}</div> : null}
                        <Text ellipsis size="12" weight="medium">
                          {label}
                        </Text>
                      </Text>
                    </Tooltip>
                    {sortColumn === id ? (
                      <Text color="subtle">
                        {sortDirection === 'asc' ? (
                          <CaretUp16 className="scale-75" />
                        ) : (
                          <CaretDown16 className="scale-75" />
                        )}
                      </Text>
                    ) : null}
                    {/* {tip && <InfoTip>{tip}</InfoTip>} */}
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
                        <Render data={row} context={context} />
                      </div>
                    </td>
                  )
                )}
              </tr>
            ))}
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
        </tbody>
      </table>
      {show === 'emptyState' && emptyState}
    </Panel>
  )
}
