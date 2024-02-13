import {
  useDatasetEmptyState,
  useServerFilters,
  useTableState,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { columns } from './columns'
import {
  defaultSortField,
  columnsDefaultVisible,
  sortOptions,
  ObjectData,
} from './types'
import {
  FullPath,
  FullPathSegments,
  getDirectorySegmentsFromPath,
  getFilename,
  pathSegmentsToPath,
} from './paths'
import { useUploads } from './uploads'
import { useDownloads } from './downloads'
import { useDataset } from './dataset'
import { useMove } from './move'

function useFilesMain() {
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
  } = useTableState('renterd/v0/objects', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })
  const router = useRouter()
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  // [bucket, key, directory]
  const activeDirectory = useMemo<FullPathSegments>(
    () =>
      ((router.query.path || []) as FullPathSegments).map(decodeURIComponent),
    [router.query.path]
  )

  // bucket
  const activeBucket = useMemo(() => {
    return activeDirectory[0]
  }, [activeDirectory])

  // bucket/key/directory/
  const activeDirectoryPath = useMemo<FullPath>(() => {
    return pathSegmentsToPath(activeDirectory) + '/'
  }, [activeDirectory])

  const setActiveDirectory = useCallback(
    (fn: (activeDirectory: FullPathSegments) => FullPathSegments) => {
      const nextActiveDirectory = fn(activeDirectory)
      router.push(
        '/files/' + nextActiveDirectory.map(encodeURIComponent).join('/')
      )
    },
    [router, activeDirectory]
  )

  const { uploadFiles, uploadsList, uploadCancel } = useUploads({
    activeDirectoryPath,
  })
  const { downloadFiles, downloadsList, getFileUrl, downloadCancel } =
    useDownloads()

  const { limit, offset, response, refresh, dataset } = useDataset({
    activeDirectoryPath,
    setActiveDirectory,
    uploadsList,
    sortField,
    sortDirection,
    filters,
  })

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

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    dataset,
    response.isValidating,
    response.error,
    filters
  )

  const isViewingBuckets = activeDirectory.length === 0
  const isViewingRootOfABucket = activeDirectory.length === 1
  const isViewingABucket = activeDirectory.length > 0

  const navigateToFile = useCallback(
    (path: string) => {
      setActiveDirectory(() => [
        activeBucket,
        ...getDirectorySegmentsFromPath(path),
      ])
      setFilter({
        id: 'fileNamePrefix',
        label: '',
        value: getFilename(path),
      })
    },
    [activeBucket, setActiveDirectory, setFilter]
  )

  return {
    isViewingBuckets,
    isViewingABucket,
    isViewingRootOfABucket,
    activeBucket,
    activeDirectory,
    setActiveDirectory,
    activeDirectoryPath,
    navigateToFile,
    dataState,
    refresh,
    limit,
    offset,
    datasetPage,
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    uploadFiles,
    uploadsList,
    uploadCancel,
    downloadFiles,
    downloadsList,
    downloadCancel,
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
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
    getFileUrl,
    onDragStart,
    onDragEnd,
    onDragMove,
    onDragCancel,
    onDragOver,
    draggingObject,
  }
}

type State = ReturnType<typeof useFilesMain>

const FilesContext = createContext({} as State)
export const useFiles = () => useContext(FilesContext)

type Props = {
  children: React.ReactNode
}

export function FilesProvider({ children }: Props) {
  const state = useFilesMain()
  return <FilesContext.Provider value={state}>{children}</FilesContext.Provider>
}
