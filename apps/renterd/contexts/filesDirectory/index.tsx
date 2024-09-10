import { useDatasetEmptyState } from '@siafoundation/design-system'
import { createContext, useContext, useMemo } from 'react'
import { ObjectData } from '../filesManager/types'
import { useDataset } from './dataset'
import { useMove } from './move'
import { useFilesManager } from '../filesManager'
import { columns } from './columns'

function useFilesDirectoryMain() {
  const {
    activeDirectory,
    activeBucketName: activeBucket,
    activeDirectoryPath,
    setActiveDirectory,
    filters,
    enabledColumns,
  } = useFilesManager()

  const { limit, marker, isMore, response, refresh, dataset } = useDataset()

  const {
    onDragEnd,
    onDragOver,
    onDragCancel,
    onDragMove,
    onDragStart,
    draggingObject,
  } = useMove({
    dataset,
    activeDirectory,
    setActiveDirectory,
    refresh,
  })

  // Add parent directory to the dataset
  const _datasetPage = useMemo(() => {
    if (!dataset) {
      return null
    }
    if (activeDirectory.length > 0 && dataset.length > 0) {
      return [
        {
          id: '..',
          name: '..',
          path: '..',
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

  // Add drag and drop properties to the dataset
  const datasetPage = useMemo(() => {
    if (!_datasetPage) {
      return null
    }
    return _datasetPage.map((d) => {
      if (
        draggingObject &&
        draggingObject.id !== d.id &&
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
  }, [_datasetPage, draggingObject])

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

  return {
    activeBucket,
    activeDirectory,
    setActiveDirectory,
    activeDirectoryPath,
    dataState,
    columns: filteredTableColumns,
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
    draggingObject,
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
