import {
  Badge,
  Button,
  ControlGroup,
  Panel,
  Separator,
  type TableColumn,
  Text,
} from '@siafoundation/design-system'
import { Checkmark16 } from '@siafoundation/react-icons'
import { formatRelative } from 'date-fns'
import { Fragment, useMemo } from 'react'
import {
  type SetAdditions,
  SetChangesField,
  type SetRemovals,
} from './SetChange'
import { dataFields } from './data'
import type { AlertCellContext, AlertData, TableColumnId } from './types'

type AlertsTableColumn = TableColumn<
  TableColumnId,
  AlertData,
  AlertCellContext
> & {
  fixed?: boolean
  category?: string
}

export const columns: AlertsTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pr-4 [&+*]:!pl-0',
    rowCellClassName: 'align-top pt-[19px]',
    render: ({ data: { dismiss } }) => (
      <ControlGroup>
        <Button tip="Dismiss alert" onClick={dismiss}>
          <Checkmark16 />
        </Button>
        {/* <AlertContextMenu id={id} buttonProps={{ variant: 'gray' }} /> */}
      </ControlGroup>
    ),
  },
  {
    id: 'overview',
    label: 'overview',
    category: 'general',
    contentClassName: 'min-w-[200px] max-w-[500px]',
    rowCellClassName: 'align-top pt-[5px]',
    render: ({ data: { message, severity, data } }) => {
      return (
        <div className="flex flex-col gap-1 py-4">
          <div className="flex gap-1 items-center">
            <Badge
              variant={
                severity === 'error' || severity === 'critical'
                  ? 'red'
                  : severity === 'warning'
                    ? 'amber'
                    : 'gray'
              }
              size="small"
            >
              {severity}
            </Badge>
            <Text weight="medium" noWrap>
              {message}
            </Text>
          </div>
          {data['hint'] ? (
            <Text size="12" color="subtle">
              {data['hint'] as string}
            </Text>
          ) : null}
          {data['error'] ? (
            <Text size="12" color="subtle">
              {data['error'] as string}
            </Text>
          ) : null}
        </div>
      )
    },
  },
  {
    id: 'data',
    label: 'data',
    contentClassName: 'w-[500px]',
    rowCellClassName: 'align-top',
    category: 'general',
    render: function DataColumn({ data: { data } }) {
      // Collect data for data fields
      const datums = useMemo(
        () =>
          Object.keys(dataFields)
            .map((key) => {
              const value = data[key]
              if (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && !Object.keys(value).length)
              ) {
                return null
              }
              return { key, value }
            })
            .filter(Boolean) as { key: string; value: unknown }[],
        [data],
      )
      // Collect set changes for the custom SetChangeField component
      // which is a special case that combines two keys of data
      const setAdditions = useMemo(
        () => data['setAdditions'] as SetAdditions,
        [data],
      )
      const setRemovals = useMemo(
        () => data['setRemovals'] as SetRemovals,
        [data],
      )
      return (
        <div className="py-4 w-full">
          <Panel color="subtle" className="flex flex-col gap-1 w-full py-1">
            {(setAdditions || setRemovals) && (
              <Fragment key="setChanges">
                <div className="py-1 px-2">
                  <SetChangesField
                    setAdditions={setAdditions}
                    setRemovals={setRemovals}
                  />
                </div>
                {datums.length >= 1 && (
                  <Separator color="verySubtle" className="w-full" />
                )}
              </Fragment>
            )}
            {datums.map(({ key, value }, i) => {
              const Component = dataFields?.[key]?.render
              if (!Component) {
                return null
              }
              return (
                <Fragment key={key}>
                  <div className="py-1 px-2">
                    <Component key={key} value={value} />
                  </div>
                  {datums.length > 1 && i < datums.length - 1 && (
                    <Separator color="verySubtle" className="w-full" />
                  )}
                </Fragment>
              )
            })}
          </Panel>
        </div>
      )
    },
  },
  {
    id: 'time',
    label: 'time',
    category: 'general',
    contentClassName: 'w-[120px] justify-end',
    rowCellClassName: 'align-top pt-[26px]',
    render: ({ data: { timestamp } }) => {
      return (
        <Text color="subtle" size="12" ellipsis>
          {formatRelative(new Date(timestamp), new Date())}
        </Text>
      )
    },
  },
]
