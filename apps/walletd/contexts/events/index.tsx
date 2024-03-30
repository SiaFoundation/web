import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import { useWalletEvents, useWalletTxPool } from '@siafoundation/react-walletd'
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
import BigNumber from 'bignumber.js'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'

const defaultLimit = 100

export function useEventsMain() {
  const router = useRouter()
  const id = router.query.id as string
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const responseTxPool = useWalletTxPool({
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

  const dataset = useMemo<EventData[] | null>(() => {
    if (!responseEvents.data || !responseTxPool.data) {
      return null
    }
    const dataTxPool: EventData[] = responseTxPool.data.map((e) => ({
      id: e.id,
      timestamp: 0,
      pending: true,
      type: e.type,
      amount: new BigNumber(e.received).minus(e.sent),
    }))
    const dataEvents: EventData[] = responseEvents.data.map((e, index) => {
      let amountSc = new BigNumber(0)
      let amountSf = 0
      if (e.type === 'transaction') {
        const inputsScTotal =
          e.val?.siacoinInputs?.reduce((acc, o) => {
            if (e.relevant.includes(o.siacoinOutput.address)) {
              return acc.plus(o.siacoinOutput.value)
            }
            return acc
          }, new BigNumber(0)) || new BigNumber(0)
        const outputsScTotal =
          e.val?.siacoinOutputs?.reduce((acc, o) => {
            if (e.relevant.includes(o.siacoinOutput.address)) {
              return acc.plus(o.siacoinOutput.value)
            }
            return acc
          }, new BigNumber(0)) || new BigNumber(0)
        amountSc = outputsScTotal.minus(inputsScTotal)

        const inputsSfTotal =
          e.val?.siafundInputs?.reduce((acc, o) => {
            if (e.relevant.includes(o.siafundElement.siafundOutput.address)) {
              return acc + o.siafundElement.siafundOutput.value
            }
            return acc
          }, 0) || 0
        const outputsSfTotal =
          e.val?.siafundOutputs?.reduce((acc, o) => {
            if (e.relevant.includes(o.siafundOutput.address)) {
              return acc + o.siafundOutput.value
            }
            return acc
          }, 0) || 0
        amountSf = outputsSfTotal - inputsSfTotal
      }

      if (e.type === 'miner payout') {
        amountSc = new BigNumber(e.val.siacoinOutput.siacoinOutput.value)
      }
      if (e.type === 'foundation subsidy') {
        amountSc = new BigNumber(e.val.siacoinOutput.siacoinOutput.value)
      }

      const res: EventData = {
        id: e.id,
        type: e.type,
        timestamp: new Date(e.timestamp).getTime(),
        height: e.index.height,
        pending: false,
        amountSc,
        amountSf,
      }
      if (e.type === 'transaction') {
        res.fee = new BigNumber(e.val.fee)
      }
      if (e.type === 'contract payout') {
        res.contractId = e.val.fileContract.id
      }
      return res
    })
    return [...dataTxPool.reverse(), ...dataEvents]
  }, [responseEvents.data, responseTxPool.data])

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
