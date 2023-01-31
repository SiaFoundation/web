import {
  Text,
  ValueNum,
  TableColumn,
  ValueCopyable,
  CheckmarkFilled16,
  ValueSc,
} from '@siafoundation/design-system'
import {
  Host,
  HostSortBy,
  HostSortDir,
  ListMetaResponse,
  useHosts as useHostsGET,
} from '@siafoundation/react-core'
import { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import useLocalStorageState from 'use-local-storage-state'
import { humanNumber, toHastings } from '@siafoundation/sia-js'
import { formatDistance, formatRelative } from 'date-fns'
import { useRouter } from 'next/router'

export type HostColumn =
  | 'publicKey'
  | 'lastSeen'
  | 'firstSeen'
  | 'autopilotScore'
  | 'status'

export type HostRow = {
  key: string
  host: Host
}

export type HostFilter = {
  key: string
  type: 'contains' | 'bool'
  value: string | boolean
}

const defaultColumns: HostColumn[] = [
  'publicKey',
  'firstSeen',
  'lastSeen',
  'autopilotScore',
  'status',
]

export function useHosts() {
  const [enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    'renterd/v0/hosts/enabledColumns',
    {
      defaultValue: defaultColumns,
    }
  )

  const [sortBy, setSortBy] = useLocalStorageState<HostSortBy>(
    'renterd/v0/hosts/sortBy',
    {
      defaultValue: 'lastSeen',
    }
  )

  const [sortDir, setSortDir] = useLocalStorageState<HostSortDir>(
    'renterd/v0/hosts/sortDir',
    {
      defaultValue: 'desc',
    }
  )

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
    Record<string, HostFilter>
  >('renterd/v0/hosts/filters', {
    defaultValue: {},
  })

  const setFilter = useCallback(
    (filter: HostFilter) => {
      _setFilters((filters) => ({
        ...filters,
        [filter.key]: filter,
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

  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const skip = Number(router.query.skip || 0)

  const response = useHostsGET({
    params: {
      max: limit,
    },
    // limit,
    // skip,
    // sortBy,
    // sortDir: sortDir,
  })

  const hosts: HostRow[] = useMemo(
    () =>
      // TODO: add structure to response
      // response.data?.hosts.slice(0, 20).map((host) => ({
      response.data?.slice(0, 20).map((host) => ({
        key: host.PublicKey,
        host,
      })) || [],
    [response.data]
  )

  const [meta] = useState<ListMetaResponse>({
    total: 0,
    totalFiltered: 0,
  })
  // TODO: add meta to response
  // useEffect(() => {
  //   if (response.data) {
  //     setMeta(response.data.meta)
  //   }
  // }, [response.data])

  const columns = useMemo<TableColumn<HostRow>[]>(
    () => [
      {
        key: 'publicKey',
        label: 'Public key',
        size: 3,
        render: ({ host }) => (
          <div className="flex flex-col gap-2">
            <ValueCopyable
              value={host.PublicKey}
              maxLength={30}
              label="host public key"
            />
            {host.Announcements && (
              <ValueCopyable
                value={host.Announcements[0].NetAddress}
                type="ip"
                color="subtle"
                size="12"
              />
            )}
          </div>
        ),
      },
      {
        key: 'lastSeen',
        label: 'Last seen',
        size: 1.5,
        sortable: 'time',
        render: ({ host }) => {
          const { Announcements } = host

          if (!Announcements) {
            return <Text>-</Text>
          }

          return (
            <div className="flex flex-col gap-1">
              <Text>
                {formatDistance(
                  new Date(Announcements[Announcements.length - 1].Timestamp),
                  new Date(),
                  { addSuffix: true }
                )}
              </Text>
              <Text color="subtle" size="12">
                {formatRelative(
                  new Date(Announcements[Announcements.length - 1].Timestamp),
                  new Date()
                )}
              </Text>
            </div>
          )
        },
      },
      {
        key: 'age',
        label: 'Age',
        size: 1.5,
        sortable: 'time',
        render: ({ host }) => {
          const { Announcements } = host

          if (!Announcements) {
            return <Text>-</Text>
          }

          return (
            <div className="flex flex-col gap-1">
              <Text>
                {formatDistance(
                  new Date(),
                  new Date(Announcements[0].Timestamp)
                )}{' '}
                old
              </Text>
              <Text color="subtle" size="12">
                {formatRelative(
                  new Date(Announcements[0].Timestamp),
                  new Date()
                )}
              </Text>
            </div>
          )
        },
      },
      {
        key: 'version',
        label: 'Version',
        size: 1,
        sortable: 'quality',
        className: 'justify-center',
        render: ({ host }) => {
          return <Text>1.5.9</Text>
        },
      },
      {
        key: 'collateral',
        label: 'Collateral',
        size: 1,
        sortable: 'quality',
        className: 'justify-center',
        render: ({ host }) => {
          return <ValueSc variant="value" value={toHastings(1_040)} />
        },
      },
      {
        key: 'maxCollateral',
        label: 'Max collateral',
        size: 1,
        sortable: 'quality',
        className: 'justify-center',
        render: ({ host }) => {
          return <ValueSc variant="value" value={toHastings(1_040)} />
        },
      },
      {
        key: 'interactions',
        label: 'Successful Interactions',
        size: 1,
        sortable: 'quality',
        className: 'justify-center bg-accent-200/20',
        render: ({ host }) => {
          let val = new BigNumber(0)
          if (host.Interactions) {
            const result = host.Interactions?.reduce(
              (acc, i) => ({
                success: i.Result ? acc.success + 1 : acc.success,
                fail: !i.Result ? acc.fail + 1 : acc.fail,
              }),
              {
                success: 0,
                fail: 0,
              }
            ) || {
              success: 0,
              fail: 0,
            }
            val = new BigNumber(result.fail).div(result.success + result.fail)
          }
          return (
            <ValueNum
              value={val}
              variant="value"
              // color="$gray9"
              format={(v) => `${v.times(100)}%`}
            />
          )
        },
      },
      {
        key: 'uptime',
        label: 'Uptime',
        size: 1,
        sortable: 'quality',
        className: 'justify-center bg-accent-200/20',
        render: ({ host }) => {
          return (
            <ValueNum
              value={new BigNumber(0.998)}
              variant="value"
              // color="$gray9"
              format={(v) => `${v.times(100)}%`}
            />
          )
        },
      },
      {
        key: 'whitelist',
        label: 'Whitelist',
        size: 1,
        group: 'autopilot',
        className: 'justify-center bg-accent-200/20',
        render: (row) => (
          <div className="flex gap-1" color="green">
            <CheckmarkFilled16 />
          </div>
        ),
      },
      {
        key: 'blacklist',
        label: 'Blacklist',
        size: 1,
        group: 'autopilot',
        className: 'justify-center bg-accent-200/20',
        render: (row) => (
          <div className="flex gap-1" color="red">
            <CheckmarkFilled16 />
          </div>
        ),
      },
      {
        key: 'score',
        label: 'Score',
        size: 1,
        sortable: 'quality',
        group: 'autopilot',
        className: 'justify-center bg-accent-200/20',
        render: (row) => (
          <ValueNum
            value={new BigNumber(0)}
            // TODO: add score
            // value={new BigNumber(row.host.Score)}
            variant="value"
            // color="$gray9"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      // {
      //   key: 'actions',
      //   label: '',
      //   size: 0.5,
      //   type: 'fixed',
      //   className: 'justify-end',
      //   render: (row) => <HostDropdownMenu id={row.host.PublicKey} />,
      // },
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
    hosts,
    configurableColumns,
    enabledColumns,
    toggleColumn,
    skip,
    limit,
    meta,
    filters,
    setFilter,
    removeFilter,
    sortOptions,
    setSortDir,
    setSortBy,
    sortBy,
    sortDir,
    resetDefaultColumns,
  }
}
