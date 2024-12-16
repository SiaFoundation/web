import {
  useTableState,
  useDatasetState,
  useServerFilters,
  usePaginationOffset,
} from '@siafoundation/design-system'
import { createContext, useContext, useMemo } from 'react'
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
import { AlertSeverity, AlertsParams } from '@siafoundation/renterd-types'
import {
  useAlerts as useAlertsData,
  useAlertsDismiss,
} from '@siafoundation/renterd-react'
import { useCallback } from 'react'
import { Maybe } from '@siafoundation/types'

const defaultLimit = 50

function useAlertsMain() {
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const setSeverityFilter = useCallback(
    (severity?: AlertSeverity) => {
      if (!severity) {
        removeFilter('severity')
      } else {
        setFilter({
          id: 'severity',
          value: severity,
          label: severity,
        })
      }
    },
    [setFilter, removeFilter]
  )

  const severityFilter = filters.find((f) => f.id === 'severity')
    ?.value as AlertSeverity

  const params = useMemo(() => {
    const params: AlertsParams = {
      limit,
      offset,
    }
    if (severityFilter) {
      params.severity = severityFilter
    }
    return params
  }, [limit, offset, severityFilter])

  const response = useAlertsData({
    params,
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
        triggerSuccessToast({ title: 'Alert has been dismissed.' })
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

  const datasetPage = useMemo<Maybe<AlertData[]>>(() => {
    if (!response.data) {
      return undefined
    }
    const data: AlertData[] =
      response.data?.alerts?.map((a) => ({
        id: a.id,
        severity: a.severity,
        message: a.message,
        timestamp: a.timestamp,
        data: a.data,
        dismiss: () => dismissOne(a.id),
      })) || []
    return data
  }, [response.data, dismissOne])

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
  } = useTableState('renterd/v0/alerts', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    filters,
    offset,
  })

  const totals = useMemo(
    () => ({
      ...response.data?.totals,
      all: Object.entries(response.data?.totals || {}).reduce(
        (acc, [severity, count]) => {
          return acc + count
        },
        0
      ),
    }),
    [response.data]
  )

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
    sortField,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
    dismissOne,
    dismissMany,
    severityFilter,
    setSeverityFilter,
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
