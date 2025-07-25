import {
  useTableState,
  useDatasetState,
  usePaginationOffset,
  useClientFilters,
} from '@siafoundation/design-system'
import React, { createContext, useContext, useMemo } from 'react'
import {
  AlertData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import {
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import {
  useAlerts as useAlertsData,
  useAlertsDismiss,
} from '@siafoundation/hostd-react'
import { useCallback } from 'react'
import { Maybe } from '@siafoundation/types'
import { AlertSeverity } from '@siafoundation/hostd-types'

const defaultLimit = 50

function useAlertsMain() {
  const { limit, offset } = usePaginationOffset(defaultLimit)

  const response = useAlertsData({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const dismiss = useAlertsDismiss()

  const dismissOne = useCallback(
    async (id: string) => {
      const response = await dismiss.post({
        payload: [id],
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error dismissing alert',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Alert has been dismissed' })
      }
    },
    [dismiss]
  )

  const dismissMany = useCallback(
    async (ids: string[]) => {
      const response = await dismiss.post({
        payload: ids,
      })
      if (response.error) {
        triggerErrorToast({
          title: 'Error dismissing alerts',
          body: response.error,
        })
      } else {
        triggerSuccessToast({ title: 'Selected alerts have been dismissed' })
      }
    },
    [dismiss]
  )

  const dataset = useMemo<Maybe<AlertData[]>>(() => {
    if (!response.data) {
      return undefined
    }
    const data: AlertData[] =
      response.data?.map((a) => ({
        id: a.id,
        severity: a.severity,
        message: a.message,
        timestamp: a.timestamp,
        data: a.data,
        dismiss: () => dismissOne(a.id),
      })) || []
    return data
  }, [response.data, dismissOne])

  const clientFilters = useClientFilters<AlertData>()
  const datasetFiltered = useMemo<Maybe<AlertData[]>>(() => {
    if (!dataset) {
      return undefined
    }
    const severityFilter = clientFilters.filters.find(
      (f) => f.id === 'severity'
    )
    if (severityFilter) {
      return dataset.filter(severityFilter.fn)
    }
    return dataset
  }, [dataset, clientFilters.filters])

  const datasetPage = useMemo<Maybe<AlertData[]>>(() => {
    if (!datasetFiltered) {
      return undefined
    }
    return datasetFiltered.slice(offset, offset + limit)
  }, [datasetFiltered, offset, limit])

  const {
    configurableColumns,
    visibleColumns,
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
  } = useTableState('hostd/v0/alerts', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    filters: clientFilters.filters,
    offset,
  })

  // Compute severity totals from complete client-side dataset.
  const totals = useMemo(() => {
    const totals: Record<AlertSeverity | 'all', number> = {
      all: 0,
      info: 0,
      warning: 0,
      error: 0,
      critical: 0,
    }
    if (!dataset) {
      return totals
    }
    for (const a of dataset) {
      totals.all += 1
      totals[a.severity] = (totals[a.severity] || 0) + 1
    }
    return totals
  }, [dataset])

  return {
    datasetState,
    limit,
    offset,
    isLoading: response.isLoading,
    error: response.error,
    datasetPageTotal: datasetPage?.length || 0,
    totals,
    datasetPage,
    configurableColumns,
    visibleColumns,
    visibleColumnIds,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    clientFilters,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
    dismissOne,
    dismissMany,
  }
}

type State = ReturnType<typeof useAlertsMain>

const AlertsContext = createContext({} as State)
export const useAlerts = () => useContext(AlertsContext)

type Props = {
  children: React.ReactNode
}

export function AlertsProvider({ children }: Props) {
  const state = useAlertsMain()
  return (
    <AlertsContext.Provider value={state}>{children}</AlertsContext.Provider>
  )
}
