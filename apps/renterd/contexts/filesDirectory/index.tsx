import {
  useDatasetEmptyState,
  useMultiSelect,
} from '@siafoundation/design-system'
import {
  createContext,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { CellContext, ObjectData } from '../filesManager/types'
import { useDataset } from './dataset'
import { useMove } from './move'
import { useFilesManager } from '../filesManager'
import { columns } from './columns'

function useFilesDirectoryMain() {
  const {
    activeDirectory,
    activeBucket,
    setActiveDirectory,
    filters,
    enabledColumns,
    isViewingBuckets,
  } = useFilesManager()

  const { limit, marker, isMore, response, refresh, dataset } = useDataset()

  // Add parent directory to the dataset.
  const _datasetPage = useMemo(() => {
    if (!dataset) {
      return undefined
    }
    if (activeDirectory.length > 0 && dataset.length > 0) {
      return [
        {
          bucket: activeBucket,
          id: '..',
          name: '..',
          path: '..',
          key: '..',
          size: 0,
          type: 'directory',
          onClick: () => {
            setActiveDirectory((p) => p.slice(0, -1))
          },
        } as ObjectData,
        ...dataset,
      ]
    }
    return dataset
    // Purposely do not include activeDirectory - we only want to update
    // when new data fetching is complete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset])

  const multiSelect = useMultiSelect(_datasetPage)

  // If the active bucket changes, clear the multi-select.
  useEffect(() => {
    if (activeBucket) {
      multiSelect.deselectAll()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBucket])

  const {
    onDragEnd,
    onDragOver,
    onDragCancel,
    onDragMove,
    onDragStart,
    draggingObjects,
    moveSelectedFiles,
    moveSelectedFilesOperationCount,
  } = useMove({
    dataset,
    activeDirectory,
    setActiveDirectory,
    refresh,
    multiSelect,
  })

  const datasetPageWithOnClick = useMemo(() => {
    if (!_datasetPage) {
      return undefined
    }
    return _datasetPage.map((datum) => {
      if (datum.type === 'bucket') {
        return datum
      }
      if (datum.id === '..') {
        return datum
      }
      return {
        ...datum,
        isSelected: !!multiSelect.selectionMap[datum.id],
        onClick: (e: MouseEvent<HTMLTableRowElement>) =>
          multiSelect.onSelect(datum.id, e),
      }
    })
  }, [_datasetPage, multiSelect])

  // Add drag and drop properties to the dataset.
  const datasetPage = useMemo(() => {
    if (!datasetPageWithOnClick) {
      return undefined
    }
    return datasetPageWithOnClick.map((d) => {
      if (
        draggingObjects &&
        draggingObjects.find((dobj) => dobj.id !== d.id) &&
        d.type === 'directory'
      ) {
        return {
          ...d,
          isDroppable: true,
        }
      }
      return {
        ...d,
        isDraggable: d.type !== 'bucket' && !d.isUploading,
      }
    })
  }, [datasetPageWithOnClick, draggingObjects])

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const cellContext = useMemo(
    () =>
      ({
        isViewingBuckets,
        multiSelect,
      } as CellContext),
    [multiSelect, isViewingBuckets]
  )

  return {
    dataState,
    columns: filteredTableColumns,
    multiSelect,
    cellContext,
    refresh,
    limit,
    marker,
    isMore,
    datasetPage,
    pageCount: dataset?.length || 0,
    onDragStart,
    onDragEnd,
    onDragMove,
    onDragCancel,
    onDragOver,
    draggingObjects,
    moveSelectedFiles,
    moveSelectedFilesOperationCount,
  }
}

type State = ReturnType<typeof useFilesDirectoryMain>

const FilesDirectoryContext = createContext({} as State)
export const useFilesDirectory = () => useContext(FilesDirectoryContext)

type Props = {
  children: React.ReactNode
}

export function FilesDirectoryProvider({ children }: Props) {
  const state = useFilesDirectoryMain()
  return (
    <FilesDirectoryContext.Provider value={state}>
      {children}
    </FilesDirectoryContext.Provider>
  )
}
