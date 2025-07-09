'use client'

import { CSSProperties, MouseEvent, useMemo } from 'react'
import { cx } from 'class-variance-authority'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from '@dnd-kit/core/dist/hooks'

type Data = {
  id: string
  isDraggable?: boolean
  isDroppable?: boolean
  className?: string
  onClick?: (e: MouseEvent<HTMLTableRowElement>) => void
  isSelected?: boolean
}

export type Row<Data, Context> = {
  data: Data
  context: Context
}

export type TableColumn<Columns, Data, Context> = {
  id: Columns
  label: string
  icon?: React.ReactNode
  tip?: string
  size?: number | string
  cellClassName?: string
  contentClassName?: string
  rowCellClassName?: string
  rowContentClassName?: string
  render: React.FC<Row<Data, Context>>
}

type Props<Columns extends string, Data, Context> = {
  data: Data
  context: Context
  columns: TableColumn<Columns, Data, Context>[]
  rowSize?: 'dense' | 'default' | 'auto'
  focusId?: string
  focusColor?: 'green' | 'red' | 'amber' | 'blue' | 'default'
  getCellClassNames: (
    i: number,
    className: string | undefined,
    rounded?: boolean
  ) => string
  getContentClassNames: (i: number, className?: string) => string
}

export function createTableRow<
  Columns extends string,
  D extends Data,
  Context
>() {
  const TableRow = ({
    ref,
    data,
    style,
    attributes,
    listeners,
    context,
    columns,
    rowSize = 'default',
    focusId,
    focusColor = 'default',
    getCellClassNames,
    getContentClassNames,
    className,
  }: Props<Columns, D, Context> & {
    className?: string
    style?: CSSProperties
    attributes?: DraggableAttributes
    listeners?: DraggableSyntheticListeners
    ref?: React.Ref<HTMLTableRowElement>
  }) => {
    return (
      <tr
        ref={ref}
        key={data.id}
        {...attributes}
        {...listeners}
        style={style}
        id={data.id}
        data-testid={data.id}
        onClick={data.onClick}
        className={cx(
          'border-b',
          data.isSelected
            ? [
                'bg-blue-400 border-blue-500/30',
                'dark:bg-blue-600/50 dark:border-blue-600/20',
              ]
            : 'border-gray-200/50 dark:border-graydark-100',
          data.onClick ? 'cursor-pointer' : '',
          data.className,
          className
        )}
      >
        {columns.map(
          (
            {
              id,
              render: Render,
              contentClassName,
              cellClassName,
              rowCellClassName,
              rowContentClassName,
            },
            i
          ) => (
            <td
              key={`${id}/${data.id}`}
              data-testid={id}
              className={cx(
                getCellClassNames(
                  i,
                  cx(cellClassName, rowCellClassName),
                  false
                ),
                // Must use shadow based borders on the individual tds because a tailwind ring
                // on the tr does not show up correctly in Safari.
                focusId && focusId === data.id
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
                  getContentClassNames(
                    i,
                    cx(contentClassName, rowContentClassName)
                  ),
                  rowSize === 'dense'
                    ? 'h-[50px]'
                    : rowSize === 'default'
                    ? 'h-[100px]'
                    : ''
                )}
              >
                <Render data={data} context={context} />
              </div>
            </td>
          )
        )}
      </tr>
    )
  }
  return TableRow
}

export function TableRowDraggable<
  Columns extends string,
  D extends Data,
  Context
>({
  data,
  context,
  columns,
  rowSize = 'default',
  focusId,
  focusColor = 'default',
  getCellClassNames,
  getContentClassNames,
}: Props<Columns, D, Context>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined
  const TableRow = useMemo(() => createTableRow<Columns, D, Context>(), [])

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      data={data}
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

export function TableRowDroppable<
  Columns extends string,
  D extends Data,
  Context
>({
  data,
  context,
  columns,
  rowSize = 'default',
  focusId,
  focusColor = 'default',
  getCellClassNames,
  getContentClassNames,
}: Props<Columns, D, Context>) {
  const { isOver, setNodeRef } = useDroppable({
    id: data.id,
  })
  const TableRow = useMemo(() => createTableRow<Columns, D, Context>(), [])
  const className = isOver ? 'bg-blue-200/20 dark:bg-blue-300/20' : ''

  return (
    <TableRow
      ref={setNodeRef}
      className={className}
      data={data}
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
