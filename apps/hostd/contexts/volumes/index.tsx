import {
  useTableState,
  useDatasetState,
  useClientFilteredDataset,
  useClientFilters,
  usePaginationOffset,
} from '@siafoundation/design-system'
import { VolumeMeta } from '@siafoundation/hostd-types'
import { useVolumes as useVolumesData } from '@siafoundation/hostd-react'
import { createContext, useContext } from 'react'
import { columnsDefaultVisible, VolumeData } from './types'
import { columns } from './columns'
import { useDataset } from './dataset'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { secondsInMilliseconds } from '@siafoundation/units'

const defaultLimit = 50

function useVolumesMain() {
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const { filters } = useClientFilters<VolumeData>()

  const {
    configurableColumns,
    visibleColumnIds,
    visibleColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState('hostd/v0/volumes', {
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

  const { datasetFiltered, datasetPage } = useClientFilteredDataset({
    dataset,
    filters,
    sortField,
    sortDirection,
    offset,
    limit,
  })

  const isValidating = response.isValidating
  const error = response.error
  const datasetState = useDatasetState({
    datasetPage,
    isValidating,
    error,
  })

  return {
    datasetState,
    datasetTotal: dataset?.length || 0,
    datasetFilteredTotal: datasetFiltered?.length || 0,
    datasetPageTotal: datasetPage?.length || 0,
    isLoading: response.isValidating,
    visibleColumns,
    dataset,
    datasetPage,
    offset,
    limit,
    configurableColumns,
    visibleColumnIds,
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
