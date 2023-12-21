import { Tooltip } from '../core/Tooltip'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { useCallback } from 'react'
import { cx } from 'class-variance-authority'
import { CaretDown16, CaretUp16 } from '@siafoundation/react-icons'
import { times } from '@technically/lodash'

type Data = {
  id: string
  onClick?: () => void
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
  size?: number | string
  cellClassName?: string
  contentClassName?: string
  render: React.FC<Row<Data, Context>>
  summary?: () => React.ReactNode
}

type Props<
  Columns extends string,
  SortField extends string,
  D extends Data,
  Context
> = {
  data?: D[]
  context?: Context
  columns: TableColumn<Columns, D, Context>[]
  sortField?: SortField
  sortDirection?: 'asc' | 'desc'
  toggleSort?: (field: SortField) => void
  sortableColumns?: SortField[]
  summary?: boolean
  rowSize?: 'dense' | 'default'
  pageSize: number
  isLoading: boolean
  emptyState?: React.ReactNode
  focusId?: string
  focusColor?: 'green' | 'red' | 'amber' | 'blue' | 'default'
}

export function Table<
  Columns extends string,
  SortField extends string,
  D extends Data,
  Context
>({
  columns,
  data,
  context,
  sortField,
  sortDirection,
  sortableColumns,
  toggleSort,
  summary,
  rowSize = 'default',
  pageSize,
  isLoading,
  emptyState,
  focusId,
  focusColor = 'default',
}: Props<Columns, SortField, D, Context>) {
  let show = 'emptyState'

  if (isLoading && !data?.length) {
    show = 'skeleton'
  }

  if (data?.length) {
    show = 'currentData'
  }

  const getCellClassNames = useCallback(
    (i: number, className: string | undefined, rounded?: boolean) =>
      cx(
        i === 0 ? 'pl-6' : 'pl-4',
        i === columns.length - 1 ? 'pr-6' : 'pr-4',
        rounded
          ? [
              i === 0 ? 'rounded-tl-lg' : '',
              i === columns.length - 1 ? 'rounded-tr-lg' : '',
            ]
          : '',
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
      <table className="relative z-10 table-auto border-collapse w-full">
        <thead
          className={cx(
            'sticky top-0 z-20 bg-white dark:bg-graydark-100',
            'shadow-border-b shadow-gray-400 dark:shadow-graydark-300'
          )}
        >
          <tr>
            {columns.map(
              (
                { id, icon, label, tip, cellClassName, contentClassName },
                i
              ) => {
                const isSortable =
                  sortableColumns?.includes(id as unknown as SortField) &&
                  !!toggleSort
                const isSortActive = (sortField as string) === id
                return (
                  <th
                    key={id}
                    className={cx(
                      getCellClassNames(i, cellClassName, false),
                      'border-b border-gray-400 dark:border-graydark-400'
                    )}
                  >
                    <div className={cx('overflow-hidden', 'py-3')}>
                      <div
                        onClick={() => {
                          if (isSortable) {
                            toggleSort(id as unknown as SortField)
                          }
                        }}
                        className={cx(
                          getContentClassNames(i, contentClassName),
                          isSortable ? 'cursor-pointer' : ''
                        )}
                      >
                        <Tooltip content={tip}>
                          <Text
                            color="subtle"
                            className="relative flex gap-1"
                            ellipsis
                          >
                            {icon ? <div>{icon}</div> : null}
                            <Text ellipsis size="12" weight="medium">
                              {label}
                            </Text>
                          </Text>
                        </Tooltip>
                        {isSortActive && (
                          <Text color="contrast">
                            {sortDirection === 'asc' ? (
                              <CaretUp16 className="scale-75" />
                            ) : (
                              <CaretDown16 className="scale-75" />
                            )}
                          </Text>
                        )}
                        {isSortable && !isSortActive && (
                          <Text color="verySubtle">
                            <CaretUp16 className="scale-75" />
                          </Text>
                        )}
                        {/* {tip && <InfoTip>{tip}</InfoTip>} */}
                      </div>
                    </div>
                  </th>
                )
              }
            )}
          </tr>
        </thead>
        <tbody className="bg-gray-50 dark:bg-graydark-50">
          {summary && (
            <tr className="bg-gray-50 dark:bg-graydark-50 border-l border-r border-b border-gray-200 dark:border-graydark-200">
              {columns.map(
                ({ id, summary, contentClassName, cellClassName }, i) => (
                  <td
                    key={id}
                    className={getCellClassNames(i, cellClassName, false)}
                  >
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
                id={row.id}
                onClick={row.onClick}
                className={cx(
                  'border-b border-gray-200/50 dark:border-graydark-100',
                  row.onClick ? 'cursor-pointer' : ''
                )}
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
                      className={cx(
                        getCellClassNames(i, cellClassName, false),
                        // must use shadow based borders on the individual tds because a tailwind ring
                        // on the tr does not show up correctly in Safari
                        focusId && focusId === row.id
                          ? [
                              'shadow-border-y',
                              'first:shadow-border-tlb',
                              'last:shadow-border-trb',
                            ]
                          : '',
                        focusColor === 'default'
                          ? '!shadow-blue-900 dark:!shadow-blue-200'
                          : '',
                        focusColor === 'blue'
                          ? '!shadow-blue-500 dark:!shadow-blue-400'
                          : '',
                        focusColor === 'red'
                          ? '!shadow-red-500 dark:!shadow-red-400'
                          : '',
                        focusColor === 'amber'
                          ? '!shadow-amber-500 dark:!shadow-amber-500'
                          : '',
                        focusColor === 'green'
                          ? '!shadow-green-500 dark:!shadow-green-400'
                          : ''
                      )}
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
                className="border-b border-gray-200/50 dark:border-graydark-100"
              >
                {columns.map(({ id, contentClassName, cellClassName }, i) => (
                  <td
                    key={`${i}/${id}`}
                    className={getCellClassNames(i, cellClassName, false)}
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
