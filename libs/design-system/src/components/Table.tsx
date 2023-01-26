import { InfoTip } from '../core/InfoTip'
import { Tooltip } from '../core/Tooltip'
import { Panel } from '../core/Panel'
import { Text } from '../core/Text'
import { useMemo } from 'react'
import { cx } from 'class-variance-authority'

export type Row = {
  key: string
}

export type TableColumn<R> = {
  key: string
  label: string
  tip?: string
  size?: number
  className?: string
  render: React.FC<R>
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
          {columns.map(({ key, label, tip, style, className }) => (
            <div
              className={cx('flex py-3 px-6 overflow-hidden', className)}
              style={style}
              key={key}
            >
              <Tooltip content={label}>
                <Text
                  weight="semibold"
                  color="subtle"
                  size="12"
                  className="relative top-px"
                  ellipsis
                >
                  {label}
                </Text>
              </Tooltip>
              {tip && <InfoTip>{tip}</InfoTip>}
            </div>
          ))}
        </div>
        {summary && (
          <div className="flex items-center py-2 bg-gray-50 dark:bg-graydark-50 border-l border-r border-b border-gray-200 dark:border-graydark-200">
            {columns.map(({ key, summary, style, className }) => (
              <div
                key={key}
                className={cx('flex px-6 overflow-hidden', className)}
                style={style}
              >
                {summary && summary()}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          {data.map((row) => (
            <div
              className="flex items-center border-b border-gray-300 dark:border-graydark-300 last-of-type:border-b-none overflow-hidden"
              key={row.key}
            >
              {/* {toPairs(groupBy(columns, 'group')).map(
                ([name, groupColumns]) => (
                  <div className="flex gap-7 items-center"
                    key={name}
                    className={
                      {
                        // padding: rowSize === 'dense' ? '$1 $3' : '$3 $3',
                      }
                    }
                  > */}
              {columns.map(({ key, render: Render, style, className }, i) => (
                <div
                  key={row.key + key}
                  className={cx(
                    'flex items-center px-6 overflow-hidden',
                    rowSize === 'dense' ? 'h-[50px]' : 'h-[100px]',
                    className
                  )}
                  style={style}
                >
                  <Render {...row} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
