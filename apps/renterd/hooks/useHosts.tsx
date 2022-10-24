import {
  Badge,
  Text,
  ValueNum,
  getMonthsInMs,
  getNowInMs,
  getWeeksInMs,
  getYearsInMs,
  getDaysInMs,
  TableColumn,
} from '@siafoundation/design-system'
import { useCallback, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import useLocalStorageState from 'use-local-storage-state'
import { humanNumber } from '@siafoundation/sia-js'
import { HostDropdownMenu } from '../components/HostDropdownMenu'

export type HostColumn = 'publicKey' | 'announcement' | 'score' | 'status'

export type Row = {
  key: string
  publicKey: string
  score: number
  announcement: string
  status: 'active' | 'blocked'
}

export type ContractFilter = {
  key: string
  timeRange?: [number, number]
  values?: string[]
  value?: string
}

const defaultColumns: HostColumn[] = [
  'publicKey',
  'announcement',
  'score',
  'status',
]

export function useHosts() {
  const [enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    'renterd/v0/hosts/enabledColumns',
    {
      defaultValue: defaultColumns,
    }
  )

  const [sortColumn, setSortColumn] = useLocalStorageState<HostColumn>(
    'renterd/v0/hosts/sortColumn',
    {
      defaultValue: 'publicKey',
    }
  )

  const [sortDirection, setSortDirection] = useLocalStorageState<
    'desc' | 'asc'
  >('renterd/v0/hosts/sortDirection', {
    defaultValue: 'desc',
  })

  const toggleColumn = useCallback(
    (column: string) => {
      setEnabledColumns((columns) => {
        if (columns.includes(column)) {
          return columns.filter((c) => c != column)
        }
        return columns.concat(column)
      })
    },
    [setEnabledColumns]
  )

  const resetDefaultColumns = useCallback(() => {
    setEnabledColumns(defaultColumns)
  }, [setEnabledColumns])

  const [filters, _setFilters] = useLocalStorageState<
    Record<string, ContractFilter>
  >('renterd/v0/hosts/filters', {
    defaultValue: {},
  })

  const setFilter = useCallback(
    (value: ContractFilter) => {
      _setFilters((filters) => ({
        ...filters,
        [value.key]: value,
      }))
    },
    [_setFilters]
  )

  const removeFilter = useCallback(
    (key: string) => {
      _setFilters((filters) => ({
        ...filters,
        [key]: undefined,
      }))
    },
    [_setFilters]
  )

  const data: Row[] = useMemo(
    () => [
      {
        key: 'ed25519:3fb9dfa29ec4263b436ecbc13d69451a84bc9ca7d46ee0d1db0a03be043ccda3',
        publicKey:
          'ed25519:3fb9dfa29ec4263b436ecbc13d69451a84bc9ca7d46ee0d1db0a03be043ccda3',
        score: 44,
        announcement: '192.0.0.23',
        status: 'active',
      },
      {
        key: 'ed25519:90730bbc9edc3fab5f9276bc5c0de9e5f5ac329c9f1ac5d16b4c8d709ade23b1',
        publicKey:
          'ed25519:90730bbc9edc3fab5f9276bc5c0de9e5f5ac329c9f1ac5d16b4c8d709ade23b1',
        score: 131,
        announcement: 'host.freedns.com',
        status: 'blocked',
      },
      {
        key: 'ed25519:b893195b5306acb0917f5a36a628fc94a89cdc7046ce8cea65b85b8a841104e2',
        publicKey:
          'ed25519:b893195b5306acb0917f5a36a628fc94a89cdc7046ce8cea65b85b8a841104e2',
        score: 128,
        announcement: 'host-329fu32.spam.com',
        status: 'blocked',
      },
    ],
    []
  )

  const filteredHosts = useMemo(() => {
    const filterList = Object.entries(filters).filter(([_, val]) => val)
    const filtered = filterList.length
      ? data.filter((contract) => {
          for (const [key, filter] of Object.entries(filters)) {
            const value = contract[key]
            if (key === 'expirationDate') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const range = getTimeRange(filter.value as any)
              if (!range) {
                return false
              }
              console.log(filter, range)
              return value >= range[0] && value <= range[1]
            }
            if (key === 'status') {
              return filter.values?.includes(value)
            }
          }
          return false
        })
      : data
    const sorted = filtered.sort((a, b) => {
      if (sortDirection === 'desc') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1
      }
      return a[sortColumn] > b[sortColumn] ? 1 : -1
    })
    return sorted
  }, [data, filters, sortColumn, sortDirection])

  const columns = useMemo<TableColumn<Row>[]>(
    () => [
      {
        key: 'publicKey',
        label: 'Public key',
        size: 5,
        render: ({ publicKey }) => (
          <Text ellipsis weight="semibold">
            {publicKey}
          </Text>
        ),
      },
      {
        key: 'announcement',
        label: 'Last announcement',
        size: 2,
        render: ({ announcement }) => <Text>{announcement}</Text>,
      },
      {
        key: 'score',
        label: 'Score',
        size: 2,
        render: ({ score }) => (
          <ValueNum
            value={new BigNumber(score)}
            variant="value"
            // color="$gray9"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        key: 'status',
        label: 'Status',
        size: 2,
        render: ({ status }) => (
          <Badge variant={status === 'blocked' ? 'red' : 'gray'}>
            {status}
          </Badge>
        ),
      },
      {
        key: 'actions',
        label: '',
        size: 0.5,
        type: 'fixed',
        props: {
          justify: 'end',
        },
        render: ({ publicKey }) => <HostDropdownMenu id={publicKey} />,
      },
    ],
    []
  )

  const configurableColumns = useMemo(
    () => columns.filter((c) => c.type !== 'fixed'),
    [columns]
  )

  const filteredColumns = useMemo(
    () =>
      columns.filter(
        (column) =>
          column.type === 'fixed' || enabledColumns.includes(column.key)
      ),
    [columns, enabledColumns]
  )

  const sortOptions = useMemo(
    () => groupBy(filter(columns, 'sortable'), 'sortable'),
    [columns]
  )

  return {
    columns: filteredColumns,
    hosts: filteredHosts,
    configurableColumns,
    enabledColumns,
    toggleColumn,
    setSortDirection,
    setSortColumn,
    sortColumn,
    filters,
    setFilter,
    removeFilter,
    sortDirection,
    sortOptions,
    resetDefaultColumns,
  }
}

function getTimeRange(range: 'day' | 'week' | 'month' | 'year') {
  const now = getNowInMs()
  if (range === 'month') {
    return [now - getMonthsInMs(1), now]
  }
  if (range === 'week') {
    return [now - getWeeksInMs(1), now]
  }
  if (range === 'year') {
    return [now - getYearsInMs(1), now]
  }
  if (range === 'day') {
    return [now - getDaysInMs(1), now]
  }
}
