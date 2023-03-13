import {
  Text,
  TableColumn,
  ValueCopyable,
  ValueNum,
  CheckmarkFilled16,
  Misuse16,
  useTableState,
  Tooltip,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/sia-js'
import {
  HostsSearchFilterMode,
  useHostsAllowlist,
  useHostsBlocklist,
  useHostsSearch,
} from '@siafoundation/react-core'
import { createContext, useContext, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import {
  HostData,
  TableColumnId,
  columnsMeta,
  columnsDefaultVisible,
  columnsDefaultSort,
} from './types'
import { formatDistance, formatRelative } from 'date-fns'
import { useRouter } from 'next/router'
import { HostDropdownMenu } from '../../components/Hosts/HostDropdownMenu'

function useHostsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const response = useHostsSearch({
    payload: {
      limit,
      offset,
      filterMode: (filters.find((f) => f.id === 'filterMode')?.value ||
        'all') as HostsSearchFilterMode,
      addressContains: filters.find((f) => f.id === 'addressContains')?.value,
      keyIn: filters.find((f) => f.id === 'keyIn')?.values,
    },
  })
  const allowlist = useHostsAllowlist()
  const blocklist = useHostsBlocklist()
  const isAllowlistActive = !!allowlist.data?.length

  const dataset = useMemo<HostData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const dataset: HostData[] =
      response.data?.map((c) => {
        const isOnAllowlist = !!allowlist.data?.find((a) => a === c.public_key)
        const allowed = !isAllowlistActive || isOnAllowlist
        const isOnBlocklist = !!blocklist.data?.find((b) => b === c.netAddress)
        const isBlocked = isOnBlocklist || !allowed
        return {
          id: c.public_key,
          isOnAllowlist,
          isOnBlocklist,
          isBlocked,
          netAddress: c.netAddress,
          publicKey: c.public_key,
          lastScanSuccess: c.interactions.LastScanSuccess,
          lastScan: c.interactions.LastScan,
          knownSince: c.knownSince,
          uptime: c.interactions.Uptime,
          downtime: c.interactions.Downtime,
          successfulInteractions: new BigNumber(
            c.interactions.SuccessfulInteractions || 0
          ),
          totalInteractions: new BigNumber(
            c.interactions.SuccessfulInteractions +
              c.interactions.FailedInteractions || 0
          ),
          failedInteractions: new BigNumber(
            c.interactions.FailedInteractions || 0
          ),
          totalScans: new BigNumber(c.interactions.TotalScans || 0),
        }
      }) || []
    return dataset
  }, [response.data, allowlist.data, blocklist.data, isAllowlistActive])

  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  } = useTableState<TableColumnId>(
    'renterd/v0/hosts',
    columnsMeta,
    columnsDefaultVisible,
    columnsDefaultSort
  )

  const tableColumns = useMemo(() => {
    const columns: TableColumn<TableColumnId, HostData>[] = [
      {
        id: 'actions',
        label: columnsMeta.actions.label,
        size: '50px 0 0',
        className: '!pl-2 !pr-0',
        render: (host) => (
          <HostDropdownMenu
            address={host.netAddress}
            publicKey={host.publicKey}
          />
        ),
      },
      {
        id: 'status',
        label: columnsMeta.status.label,
        size: '80px 0 0',
        className: '!pl-2 justify-center',
        render: (host) => (
          <Tooltip
            side="right"
            content={
              (isAllowlistActive
                ? `Allowlist ${
                    host.isOnAllowlist
                      ? 'allows this host.'
                      : 'does not allow this host.'
                  }`
                : `Allowlist is inactive.`) +
              ` Blocklist ${
                host.isOnBlocklist
                  ? 'blocks this host.'
                  : 'does not block this host.'
              }`
            }
          >
            <div className="flex gap-1 items-center">
              <Text color={host.isBlocked ? 'red' : 'green'}>
                {host.isBlocked ? <Misuse16 /> : <CheckmarkFilled16 />}
              </Text>
              {/* <Text color={host.isBlocked ? 'red' : 'green'}>
              {host.isBlocked ? 'blocked' : 'allowed'}
            </Text> */}
            </div>
          </Tooltip>
        ),
      },
      {
        id: 'netAddress',
        label: columnsMeta.netAddress.label,
        size: 2,
        className: '!pl-2',
        render: (host) => (
          <ValueCopyable
            value={host.netAddress}
            type="ip"
            label="host address"
          />
        ),
      },
      {
        id: 'publicKey',
        label: columnsMeta.publicKey.label,
        size: 2,
        render: (host) => (
          <ValueCopyable value={host.publicKey} label="host public key" />
        ),
      },
      {
        id: 'lastScan',
        label: columnsMeta.lastScan.label,
        size: 2,
        render: (host) => {
          return (
            <div className="flex gap-2 overflow-hidden">
              <div>
                <Text className="mt-[5px]">
                  {host.lastScanSuccess ? <CheckmarkFilled16 /> : <Misuse16 />}
                </Text>
              </div>
              <div className="flex flex-col gap-1 overflow-hidden">
                <Text ellipsis>
                  {formatDistance(new Date(host.lastScan), new Date(), {
                    addSuffix: true,
                  })}
                </Text>
                <Text color="subtle" size="12" ellipsis>
                  {formatRelative(new Date(host.lastScan), new Date())}
                </Text>
              </div>
            </div>
          )
        },
      },
      {
        id: 'knownSince',
        label: columnsMeta.knownSince.label,
        size: 1.5,
        render: (host) => {
          return (
            <div className="flex flex-col gap-1 overflow-hidden">
              <Text ellipsis>
                {formatDistance(new Date(), new Date(host.knownSince))} old
              </Text>
              <Text color="subtle" size="12" ellipsis>
                {formatRelative(new Date(host.knownSince), new Date())}
              </Text>
            </div>
          )
        },
      },
      {
        id: 'totalScans',
        label: columnsMeta.totalScans.label,
        size: 1,
        className: 'justify-center',
        render: (host) => (
          <ValueNum
            value={host.totalScans}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        id: 'uptime',
        label: columnsMeta.uptime.label,
        size: 1,
        className: 'justify-center',
        render: (host) => {
          return (
            <ValueNum
              value={new BigNumber(host.uptime)
                .div(1e9)
                .div(60)
                .div(60)
                .div(24)}
              variant="value"
              format={(v) =>
                humanNumber(v, { fixed: v.isZero() ? 0 : 2, units: 'days' })
              }
            />
          )
        },
      },
      {
        id: 'downtime',
        label: columnsMeta.downtime.label,
        size: 1,
        className: 'justify-center',
        render: (host) => {
          return (
            <ValueNum
              value={new BigNumber(host.downtime)
                .div(1e9)
                .div(60)
                .div(60)
                .div(24)}
              variant="value"
              format={(v) =>
                humanNumber(v, { fixed: v.isZero() ? 0 : 2, units: 'days' })
              }
            />
          )
        },
      },
      {
        id: 'totalInteractions',
        label: columnsMeta.totalInteractions.label,
        size: 1,
        className: 'justify-center',
        render: (host) => {
          return (
            <ValueNum
              value={host.totalInteractions}
              variant="value"
              format={(v) => humanNumber(v)}
            />
          )
        },
      },
      {
        id: 'successfulInteractions',
        label: columnsMeta.successfulInteractions.label,
        size: 1,
        className: 'justify-center',
        render: (host) => (
          <ValueNum
            value={host.successfulInteractions}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        id: 'failedInteractions',
        label: columnsMeta.failedInteractions.label,
        size: 1,
        className: 'justify-center',
        render: (host) => (
          <ValueNum
            value={host.failedInteractions}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
    ]
    return columns
  }, [isAllowlistActive])

  const filteredTableColumns = useMemo(
    () =>
      tableColumns.filter(
        (column) =>
          columnsMeta[column.id].fixed || enabledColumns.includes(column.id)
      ),
    [tableColumns, enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    filters
  )

  return {
    dataState,
    offset,
    limit,
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    dataset,
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
  }
}

type State = ReturnType<typeof useHostsMain>

const HostsContext = createContext({} as State)
export const useHosts = () => useContext(HostsContext)

type Props = {
  children: React.ReactNode
}

export function HostsProvider({ children }: Props) {
  const state = useHostsMain()
  return <HostsContext.Provider value={state}>{children}</HostsContext.Provider>
}
