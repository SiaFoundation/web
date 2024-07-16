import {
  secondsInMilliseconds,
  useDatasetEmptyState,
  useTableState,
} from '@siafoundation/design-system'
import { useVolumes as useVolumesData } from '@siafoundation/hostd-react'
import type { VolumeMeta } from '@siafoundation/hostd-types'
import { createContext, useContext, useMemo } from 'react'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { columns } from './columns'
import { useDataset } from './dataset'
import { type TableColumnId, columnsDefaultVisible } from './types'

function useVolumesMain() {
  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState<TableColumnId, never>('hostd/v0/volumes', {
    columns,
    columnsDefaultVisible,
  })

  const response = useVolumesData({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.find((v) => isOperationInProgress(v))
            ? secondsInMilliseconds(5)
            : defaultDatasetRefreshInterval,
      },
    },
  })

  const dataset = useDataset({
    response,
  })

  const filteredTableColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
    [enabledColumns],
  )

  const isValidating = response.isValidating
  const error = response.error
  const dataState = useDatasetEmptyState(dataset, isValidating, error, [])

  return {
    dataState,
    totalCount: dataset?.length || 0,
    isLoading: response.isValidating,
    columns: filteredTableColumns,
    dataset,
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  }
}

type State = ReturnType<typeof useVolumesMain>

const VolumesContext = createContext({} as State)
export const useVolumes = () => useContext(VolumesContext)

type Props = {
  children: React.ReactNode
}

export function VolumesProvider({ children }: Props) {
  const state = useVolumesMain()
  return (
    <VolumesContext.Provider value={state}>{children}</VolumesContext.Provider>
  )
}

function isOperationInProgress(volume: VolumeMeta) {
  return !['ready', 'unavailable'].includes(volume.status)
}
