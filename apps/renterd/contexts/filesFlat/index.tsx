import { useDatasetEmptyState } from '@siafoundation/design-system'
import { createContext, useContext, useMemo } from 'react'
import { useFilesManager } from '../filesManager'
import { columns } from './columns'
import { useDataset } from './dataset'

function useFilesFlatMain() {
  const { sortDirection, sortField, filters, enabledColumns } =
    useFilesManager()
  const { limit, response, refresh, dataset } = useDataset({
    sortField,
    sortDirection,
  })
  const nextMarker = response.data?.nextMarker
  const isMore = !!response.data?.hasMore

  const datasetPage = useMemo(() => {
    return dataset
  }, [dataset])

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters,
  )

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id),
      ),
    [enabledColumns],
  )

  return {
    dataState,
    refresh,
    limit,
    datasetPage,
    columns: filteredTableColumns,
    nextMarker,
    isMore,
    pageCount: dataset?.length || 0,
    sortField,
    filters,
    sortDirection,
  }
}

type State = ReturnType<typeof useFilesFlatMain>

const FilesFlatContext = createContext({} as State)
export const useFilesFlat = () => useContext(FilesFlatContext)

type Props = {
  children: React.ReactNode
}

export function FilesFlatProvider({ children }: Props) {
  const state = useFilesFlatMain()
  return (
    <FilesFlatContext.Provider value={state}>
      {children}
    </FilesFlatContext.Provider>
  )
}
