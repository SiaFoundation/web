import {
  useTableState,
  useServerFilters,
  useDatasetState,
  usePaginationOffset,
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
import React, { createContext, useContext, useMemo } from 'react'
import {
  CellContext,
  EventData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useParams } from 'next/navigation'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { Maybe } from '@siafoundation/types'

const defaultLimit = 100

export function useEventsMain() {
  const params = useParams<Maybe<{ id: Maybe<string> }>>()
  const id = params?.id
  const { limit, offset } = usePaginationOffset(defaultLimit)
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
  const datasetPage = useMemo<Maybe<EventData[]>>(() => {
    if (!responseEvents.data || !responseTxPool.data) {
      return undefined
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
    if (offset === 0) {
      return [...dataTxPool.reverse(), ...dataEvents]
    } else {
      return [...dataEvents]
    }
  }, [
    responseEvents.data,
    responseTxPool.data,
    syncStatus.nodeBlockHeight,
    offset,
  ])

  const {
    configurableColumns,
    visibleColumnIds,
    visibleColumns,
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

  const isValidating =
    responseEvents.isValidating || responseTxPool.isValidating
  const error = responseEvents.error || responseTxPool.error

  const datasetState = useDatasetState({
    datasetPage,
    isValidating,
    error,
    filters,
    offset,
  })

  const siascanUrl = useSiascanUrl()
  const cellContext = useMemo<CellContext>(
    () => ({
      siascanUrl,
    }),
    [siascanUrl],
  )

  return {
    datasetState,
    error: responseEvents.error,
    datasetPageTotal: datasetPage?.length || 0,
    visibleColumns,
    datasetPage,
    cellContext,
    configurableColumns,
    visibleColumnIds,
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
