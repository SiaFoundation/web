import {
  Badge,
  Button,
  ControlGroup,
  objectEntries,
  Panel,
  Separator,
  TableColumn,
  Text,
  ExpandableText,
} from '@siafoundation/design-system'
import { AlertData, TableColumnId } from './types'
import { dataFields } from './data'
import { Checkmark16 } from '@siafoundation/react-icons'
import { formatRelative } from 'date-fns'
import { Fragment, useMemo } from 'react'

type Context = Record<string, unknown>

type AlertsTableColumn = TableColumn<TableColumnId, AlertData, Context> & {
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
        <Button
          aria-label="dismiss alert"
          tip="dismiss alert"
          onClick={dismiss}
        >
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
            <ExpandableText
              text={data['error'] as string}
              size="12"
              color="subtle"
            />
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
          objectEntries(dataFields)
            .map(([key]) => {
              const value = data[key]
              if (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && !Object.keys(value).length)
              ) {
                return false
              }
              return { key, value }
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((data) => data) as { key: string; value: any }[],
        [data]
      )
      return (
        <div className="py-4 w-full">
          <Panel color="subtle" className="flex flex-col gap-1 w-full py-1">
            {datums.map(({ key, value }, i) => {
              const Component: // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ((props: { value: any }) => React.ReactNode) | undefined =
                dataFields?.[key as keyof AlertData['data']]?.render
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
