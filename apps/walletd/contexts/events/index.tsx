import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import {
  useWalletEvents,
  useWalletEventsUnconfirmed,
} from '@siafoundation/walletd-react'
import {
  calculateScValue,
  calculateSfValue,
  getEventContractId,
  getEventFee,
  getEventTxType,
} from '@siafoundation/units'
import { createContext, useContext, useMemo } from 'react'
import {
  CellContext,
  EventData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useRouter } from 'next/router'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSyncStatus } from '../../hooks/useSyncStatus'

const defaultLimit = 100

export function useEventsMain() {
  const router = useRouter()
  const id = router.query.id as string
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const responseTxPool = useWalletEventsUnconfirmed({
    disabled: !id,
    params: {
      id,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const responseEvents = useWalletEvents({
    disabled: !id,
    params: {
      limit,
      offset,
      id,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const syncStatus = useSyncStatus()
  const dataset = useMemo<EventData[] | null>(() => {
    if (!responseEvents.data || !responseTxPool.data) {
      return null
    }
    const dataTxPool: EventData[] = responseTxPool.data.map((e) => {
      const amountSc = calculateScValue(e)
      const amountSf = calculateSfValue(e)
      const fee = getEventFee(e)
      const event: EventData = {
        id: e.id,
        timestamp: 0,
        pending: true,
        type: e.type,
        txType: getEventTxType(e),
        isMature: false,
        amountSc,
        amountSf,
        fee,
      }
      return event
    })
    const dataEvents: EventData[] = responseEvents.data.map((e) => {
      const amountSc = calculateScValue(e)
      const amountSf = calculateSfValue(e)
      const fee = getEventFee(e)
      const contractId = getEventContractId(e)
      const isMature = e.maturityHeight <= syncStatus.nodeBlockHeight
      const res: EventData = {
        id: e.id,
        type: e.type,
        txType: getEventTxType(e),
        timestamp: new Date(e.timestamp).getTime(),
        maturityHeight: e.maturityHeight,
        isMature,
        height: e.index.height,
        pending: false,
        amountSc,
        amountSf,
        fee,
        contractId,
      }
      return res
    })
    return [...dataTxPool.reverse(), ...dataEvents]
  }, [responseEvents.data, responseTxPool.data, syncStatus.nodeBlockHeight])

  const {
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState('walletd/v0/events', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const isValidating =
    responseEvents.isValidating || responseTxPool.isValidating
  const error = responseEvents.error || responseTxPool.error

  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  const siascanUrl = useSiascanUrl()
  const cellContext = useMemo<CellContext>(
    () => ({
      siascanUrl,
    }),
    [siascanUrl]
  )

  return {
    dataState,
    error: responseEvents.error,
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    dataset,
    cellContext,
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    offset,
    limit,
  }
}

type State = ReturnType<typeof useEventsMain>

const EventsContext = createContext({} as State)
export const useEvents = () => useContext(EventsContext)

type Props = {
  children: React.ReactNode
}

export function EventsProvider({ children }: Props) {
  const state = useEventsMain()
  return (
    <EventsContext.Provider value={state}>{children}</EventsContext.Provider>
  )
}
