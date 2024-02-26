'use client'

import { useServerFilters, useTableState } from '@siafoundation/design-system'
import { useParams, useAppRouter } from '@siafoundation/next'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { columns } from '../filesDirectory/columns'
import {
  defaultSortField,
  columnsDefaultVisible,
  sortOptions,
  ExplorerMode,
} from './types'
import {
  FullPath,
  FullPathSegments,
  getDirectorySegmentsFromPath,
  getFilename,
  getKeyFromPath,
  pathSegmentsToPath,
} from '../../lib/paths'
import { useUploads } from './uploads'
import { useDownloads } from './downloads'
import { useBuckets } from '@siafoundation/react-renterd'
import { routes } from '../../config/routes'
import useLocalStorageState from 'use-local-storage-state'

function useFilesManagerMain() {
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
  const router = useAppRouter()
  const params = useParams<{ path: FullPathSegments }>()
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const fileNamePrefixFilter = useMemo(() => {
    const prefix = filters.find((f) => f.id === 'fileNamePrefix')?.value
    return prefix || ''
  }, [filters])

  // [bucket, key, directory]
  const activeDirectory = useMemo<FullPathSegments>(
    () => (params?.path || []).map(decodeURIComponent),
    [params?.path]
  )

  // bucket
  const activeBucketName = useMemo(() => {
    return activeDirectory[0]
  }, [activeDirectory])
  const buckets = useBuckets()
  const activeBucket = buckets.data?.find((b) => b.name === activeBucketName)

  // bucket/key/directory/
  const activeDirectoryPath = useMemo<FullPath>(() => {
    return pathSegmentsToPath(activeDirectory) + '/'
  }, [activeDirectory])

  const [activeExplorerMode, setActiveExplorerMode] =
    useLocalStorageState<ExplorerMode>('renterd/v0/explorerMode', {
      defaultValue: 'directory',
    })

  const setActiveDirectory = useCallback(
    (fn: (activeDirectory: FullPathSegments) => FullPathSegments) => {
      const nextActiveDirectory = fn(activeDirectory)
      const route = `${routes.files.index}/${nextActiveDirectory
        .map(encodeURIComponent)
        .join('/')}`
      router.push(route)
    },
    [router, activeDirectory]
  )

  const { uploadFiles, uploadsList } = useUploads({
    activeDirectoryPath,
  })
  const { downloadFiles, downloadsList, getFileUrl, downloadCancel } =
    useDownloads()

  const isViewingBuckets = activeDirectory.length === 0
  const isViewingRootOfABucket = activeDirectory.length === 1
  const isViewingABucket = activeDirectory.length > 0

  const setFileNamePrefixFilter = useCallback(
    (value: string) => {
      setFilter({
        id: 'fileNamePrefix',
        label: '',
        value,
      })
    },
    [setFilter]
  )

  const setActiveDirectoryAndFileNamePrefix = useCallback(
    (activeDirectory: string[], prefix: string) => {
      setFileNamePrefixFilter(prefix)
      setActiveDirectory(() => activeDirectory)
    },
    [setActiveDirectory, setFileNamePrefixFilter]
  )

  const navigateToFileInFilteredDirectory = useCallback(
    (path: FullPath) => {
      setActiveDirectoryAndFileNamePrefix(
        getDirectorySegmentsFromPath(path),
        getFilename(path)
      )
    },
    [setActiveDirectoryAndFileNamePrefix]
  )

  const navigateToModeSpecificFiltering = useCallback(
    (path: string) => {
      if (activeExplorerMode === 'directory') {
        navigateToFileInFilteredDirectory(path)
      } else {
        setFileNamePrefixFilter(getKeyFromPath(path).slice(1))
      }
    },
    [
      activeExplorerMode,
      navigateToFileInFilteredDirectory,
      setFileNamePrefixFilter,
    ]
  )

  const toggleExplorerMode = useCallback(async () => {
    const nextMode = activeExplorerMode === 'directory' ? 'flat' : 'directory'
    if (nextMode === 'flat') {
      setActiveDirectoryAndFileNamePrefix(
        [activeBucketName],
        getKeyFromPath(activeDirectoryPath).slice(1)
      )
    } else {
      setActiveDirectoryAndFileNamePrefix([activeBucketName], '')
    }
    setActiveExplorerMode(nextMode)
  }, [
    activeBucketName,
    activeDirectoryPath,
    activeExplorerMode,
    setActiveExplorerMode,
    setActiveDirectoryAndFileNamePrefix,
  ])

  return {
    isViewingBuckets,
    isViewingABucket,
    isViewingRootOfABucket,
    buckets,
    activeBucket,
    activeBucketName,
    activeDirectory,
    setActiveDirectory,
    setActiveDirectoryAndFileNamePrefix,
    activeDirectoryPath,
    navigateToModeSpecificFiltering,
    uploadFiles,
    uploadsList,
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
    fileNamePrefixFilter,
    setFileNamePrefixFilter,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
    getFileUrl,
    activeExplorerMode,
    toggleExplorerMode,
  }
}

export type FilesManagerState = ReturnType<typeof useFilesManagerMain>

const FilesManagerContext = createContext({} as FilesManagerState)
export const useFilesManager = () => useContext(FilesManagerContext)

type Props = {
  children: React.ReactNode
}

export function FilesManagerProvider({ children }: Props) {
  const state = useFilesManagerMain()
  return (
    <FilesManagerContext.Provider value={state}>
      {children}
    </FilesManagerContext.Provider>
  )
}
