'use client'

import { Tooltip } from '../../core/Tooltip'
import { Panel } from '../../core/Panel'
import { Text } from '../../core/Text'
import { useCallback, useMemo } from 'react'
import { cx } from 'class-variance-authority'
import { CaretDown16, CaretUp16 } from '@siafoundation/react-icons'
import { times } from '@technically/lodash'
import {
  DndContext,
  DragStartEvent,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  TableRowDraggable,
  TableRowDroppable,
  createTableRow,
} from './TableRow'

type Data = {
  id: string
  isDraggable?: boolean
  isDroppable?: boolean
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
  rowSize?: 'dense' | 'default'
  pageSize: number
  isLoading: boolean
  emptyState?: React.ReactNode
  focusId?: string
  focusColor?: 'green' | 'red' | 'amber' | 'blue' | 'default'
  onDragStart?: (e: DragStartEvent) => void
  onDragOver?: (e: DragOverEvent) => void
  onDragMove?: (e: DragMoveEvent) => void
  onDragEnd?: (e: DragEndEvent) => void
  onDragCancel?: (e: DragCancelEvent) => void
  draggingDatum?: D
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
  rowSize = 'default',
  pageSize,
  isLoading,
  emptyState,
  focusId,
  focusColor = 'default',
  onDragStart,
  onDragOver,
  onDragMove,
  onDragEnd,
  onDragCancel,
  draggingDatum,
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

  const TableRow = useMemo(() => createTableRow<Columns, D, Context>(), [])

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <DragOverlay>
        {draggingDatum && (
          <Panel className="inline-block">
            <table>
              <TableRow
                className="pointer-events-none"
                key={draggingDatum.id}
                data={draggingDatum}
                context={context}
                columns={columns}
                rowSize={rowSize}
                focusId={focusId}
                focusColor={focusColor}
                getCellClassNames={getCellClassNames}
                getContentClassNames={getContentClassNames}
              />
            </table>
          </Panel>
        )}
      </DragOverlay>
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
            {show === 'currentData' &&
              data?.map((row) => {
                if (draggingDatum?.id === row.id) {
                  return null
                }

                if (row.isDraggable) {
                  return (
                    <TableRowDraggable
                      key={row.id}
                      data={row}
                      context={context}
                      columns={columns}
                      rowSize={rowSize}
                      focusId={focusId}
                      focusColor={focusColor}
                      getCellClassNames={getCellClassNames}
                      getContentClassNames={getContentClassNames}
                    />
                  )
                }

                if (row.isDroppable) {
                  return (
                    <TableRowDroppable
                      key={row.id}
                      data={row}
                      context={context}
                      columns={columns}
                      rowSize={rowSize}
                      focusId={focusId}
                      focusColor={focusColor}
                      getCellClassNames={getCellClassNames}
                      getContentClassNames={getContentClassNames}
                    />
                  )
                }
                return (
                  <TableRow
                    key={row.id}
                    data={row}
                    context={context}
                    columns={columns}
                    rowSize={rowSize}
                    focusId={focusId}
                    focusColor={focusColor}
                    getCellClassNames={getCellClassNames}
                    getContentClassNames={getContentClassNames}
                  />
                )
              })}
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
    </DndContext>
  )
}
