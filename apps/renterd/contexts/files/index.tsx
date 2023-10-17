import {
  useClientFilteredDataset,
  useClientFilters,
  useDatasetEmptyState,
  useTableState,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { columns } from './columns'
import {
  defaultSortField,
  columnsDefaultVisible,
  ObjectData,
  sortOptions,
} from './types'
import { FullPath, FullPathSegments, pathSegmentsToPath } from './paths'
import { useUploads } from './uploads'
import { useDownloads } from './downloads'
import { useDataset } from './dataset'

function useFilesMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const offset = Number(router.query.offset || 0)

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

  const { response, dataset } = useDataset({
    activeDirectoryPath,
    uploadsList,
  })

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

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ObjectData>()

  const datasetFiltered = useClientFilteredDataset({
    dataset,
    filters,
    sortField,
    sortDirection,
  })

  const pageCount = datasetFiltered?.length || 0
  const datasetPage = useMemo(() => {
    if (!datasetFiltered) {
      return null
    }
    if (activeDirectory.length > 0 && datasetFiltered.length > 0) {
      return [
        {
          id: '..',
          name: '..',
          path: '..',
          type: 'directory',
        },
        ...datasetFiltered,
      ]
    }
    return datasetFiltered
    // Purposely do not include activeDirectory - we only want to update
    // when new data fetching is complete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasetFiltered])

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    datasetFiltered,
    response.isValidating,
    response.error,
    filters
  )

  const isViewingBuckets = activeDirectory.length === 0
  const isViewingRootOfABucket = activeDirectory.length === 1
  const isViewingABucket = activeDirectory.length > 0

  return {
    isViewingBuckets,
    isViewingABucket,
    isViewingRootOfABucket,
    activeBucket,
    activeDirectory,
    setActiveDirectory,
    activeDirectoryPath,
    dataState,
    limit,
    offset,
    datasetPage,
    pageCount,
    datasetCount: datasetFiltered?.length || 0,
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
