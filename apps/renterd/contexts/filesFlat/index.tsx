import { useDatasetState, useMultiSelect } from '@siafoundation/design-system'
import {
  createContext,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useDataset } from './dataset'
import { useFilesManager } from '../filesManager'
import { CellContext } from '../filesManager/types'

function useFilesFlatMain() {
  const {
    activeBucket,
    sortDirection,
    sortField,
    filters,
    visibleColumns,
    isViewingBuckets,
  } = useFilesManager()
  const { limit, marker, nextMarker, response, isMore, refresh, dataset } =
    useDataset({
      sortField,
      sortDirection,
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
    visibleColumns,
    marker,
    nextMarker,
    isMore,
    datasetPageTotal: dataset?.length || 0,
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
