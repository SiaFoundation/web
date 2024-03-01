import {
  Badge,
  Button,
  ControlGroup,
  Panel,
  Separator,
  TableColumn,
  Text,
} from '@siafoundation/design-system'
import { AlertData, TableColumnId } from './types'
import { dataFields } from './data'
import { Checkmark16 } from '@carbon/icons-react'
import { formatRelative } from 'date-fns'
import { Fragment, useMemo } from 'react'

type Context = never

type KeysTableColumn = TableColumn<TableColumnId, AlertData, Context> & {
  fixed?: boolean
  category?: string
}

export const columns: KeysTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pr-4 [&+*]:!pl-0',
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
          {data['hint'] && (
            <Text size="12" color="subtle">
              {data['hint'] as string}
            </Text>
          )}
          {data['error'] && (
            <Text size="12" color="subtle">
              {data['error'] as string}
            </Text>
          )}
        </div>
      )
    },
  },
  {
    id: 'data',
    label: 'data',
    contentClassName: 'w-[400px]',
    category: 'general',
    render: function DataColumn({ data: { data } }) {
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
            .filter(Boolean),
        [data]
      )
      return (
        <div className="py-4 w-full">
          <Panel color="subtle" className="flex flex-col gap-1 w-full py-1">
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
    render: ({ data: { timestamp } }) => {
      return (
        <Text color="subtle" size="12" ellipsis>
          {formatRelative(new Date(timestamp), new Date())}
        </Text>
      )
    },
  },
]
