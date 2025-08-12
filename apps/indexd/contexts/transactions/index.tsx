'use client'

import { useDatasetState, useTableState } from '@siafoundation/design-system'
import {
  useAdminWalletEvents,
  useAdminWalletPending,
} from '@siafoundation/indexd-react'
import { createContext, useContext, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { columns } from './columns'
import {
  calculateScValue,
  getEventContractId,
  getEventFee,
  getEventTxType,
} from '@siafoundation/units'
import {
  CellContext,
  EventData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { Maybe } from '@siafoundation/types'

const defaultPageSize = 50
const filters = [] as string[]

function useTransactionsMain() {
  const searchParams = useSearchParams()
  const limit = Number(searchParams.get('limit') || defaultPageSize)
  const offset = Number(searchParams.get('offset') || 0)
  const events = useAdminWalletEvents({
    params: {
      limit,
      offset,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const pending = useAdminWalletPending({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const syncStatus = useSyncStatus()
  const datasetPage = useMemo<Maybe<EventData[]>>(() => {
    if (!events.data || !pending.data) {
      return undefined
    }
    const dataPending: EventData[] = pending.data.map((e) => {
      const amountSc = calculateScValue(e)
      const fee = getEventFee(e)
      const event: EventData = {
        id: e.id,
        timestamp: 0,
        pending: true,
        type: e.type,
        txType: getEventTxType(e),
        isMature: false,
        amountSc,
        fee,
      }
      return event
    })
    const dataEvents: EventData[] = events.data.map((e) => {
      const amountSc = calculateScValue(e)
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
        fee,
        contractId,
      }
      return res
    })
    if (offset === 0) {
      return [...dataPending.reverse(), ...dataEvents]
    } else {
      return [...dataEvents]
    }
  }, [events.data, pending.data, syncStatus.nodeBlockHeight, offset])

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
  } = useTableState('indexd/v0/events', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const isValidating = events.isValidating || pending.isValidating
  const error = events.error || pending.error

  const datasetState = useDatasetState({
    datasetPage,
    isValidating,
    error,
    offset,
    filters,
  })

  const siascanUrl = useSiascanUrl()
  const cellContext = useMemo<CellContext>(
    () => ({
      siascanUrl,
    }),
    [siascanUrl],
  )

  return {
    datasetPage,
    error,
    datasetState,
    offset,
    limit,
    datasetPageTotal: datasetPage?.length || 0,
    defaultPageSize,
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
    visibleColumns,
  }
}

type State = ReturnType<typeof useTransactionsMain>

const TransactionsContext = createContext({} as State)
export const useTransactions = () => useContext(TransactionsContext)

type Props = {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: Props) {
  const state = useTransactionsMain()
  return (
    <TransactionsContext.Provider value={state}>
      {children}
    </TransactionsContext.Provider>
  )
}
