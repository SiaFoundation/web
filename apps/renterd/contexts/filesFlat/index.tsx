import { useDatasetState, useMultiSelect } from '@siafoundation/design-system'
import React, {
  createContext,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useDataset } from './dataset'
import { useFilesManager } from '../filesManager'
import { CellContext } from '../filesManager/types'
import { columns } from './columns'
import { useFilesTableState } from '../filesManager/useFilesTableState'

function useFilesFlatMain() {
  const tableState = useFilesTableState(columns)
  const { activeBucket, filters, isViewingBuckets } = useFilesManager()
  const { limit, marker, nextMarker, response, isMore, refresh, dataset } =
    useDataset({
      tableState,
    })

  const _datasetPage = useMemo(() => {
    return dataset
  }, [dataset])

  const multiSelect = useMultiSelect(dataset)

  // If the active bucket changes, clear the multi-select.
  useEffect(() => {
    if (activeBucket) {
      multiSelect.deselectAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBucket])

  const datasetPage = useMemo(() => {
    if (!_datasetPage) {
      return undefined
    }
    return _datasetPage.map((datum) => {
      return {
        ...datum,
        isSelected: !!multiSelect.selection[datum.id],
        onClick: (e: MouseEvent<HTMLTableRowElement>) =>
          multiSelect.onSelect(datum.id, e),
      }
    })
  }, [_datasetPage, multiSelect])

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    marker,
    filters,
  })

  const cellContext = useMemo(
    () =>
      ({
        isViewingBuckets,
        multiSelect,
      } as CellContext),
    [multiSelect, isViewingBuckets]
  )

  return {
    datasetState,
    multiSelect,
    cellContext,
    refresh,
    limit,
    datasetPage,
    marker,
    nextMarker,
    isMore,
    datasetPageTotal: dataset?.length || 0,
    tableState,
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
