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
  pathSegmentsToPath,
} from '../../lib/paths'
import { useUploads } from './uploads'
import { useDownloads } from './downloads'
import { usePathname, useSearchParams } from '@siafoundation/next'
import { useBuckets } from '@siafoundation/react-renterd'
import { routes } from '../../config/routes'

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
  const fileNamePrefix = useMemo(() => {
    const prefix = filters.find((f) => f.id === 'fileNamePrefix')?.value
    if (prefix) {
      return prefix.startsWith('/') ? prefix : '/' + prefix
    }
    return ''
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

  const setActiveDirectory = useCallback(
    (
      fn: (activeDirectory: FullPathSegments) => FullPathSegments,
      explorerMode?: ExplorerMode
    ) => {
      const nextActiveDirectory = fn(activeDirectory)
      let route =
        routes.files.index +
        '/' +
        nextActiveDirectory.map(encodeURIComponent).join('/')
      if (explorerMode === 'flat') {
        route += `?view=flat`
      }
      router.push(route)
    },
    [router, activeDirectory]
  )

  const { uploadFiles, uploadsList, uploadCancel } = useUploads({
    activeDirectoryPath,
  })
  const { downloadFiles, downloadsList, getFileUrl, downloadCancel } =
    useDownloads()

  const isViewingBuckets = activeDirectory.length === 0
  const isViewingRootOfABucket = activeDirectory.length === 1
  const isViewingABucket = activeDirectory.length > 0

  const pathname = usePathname()
  const activeParams = useSearchParams()
  const activeViewMode: ExplorerMode =
    activeParams.get('view') === 'flat' ? 'flat' : 'directory'
  const toggleViewModeParams = useMemo(() => {
    const switchParams = new URLSearchParams(activeParams)
    if (switchParams.get('view') === 'flat') {
      switchParams.delete('view')
    } else {
      switchParams.set('view', 'flat')
    }
    const str = switchParams.toString()
    return str ? `?${str}` : str
  }, [activeParams])
  const switchViewModeUrl = `${pathname}${toggleViewModeParams}`

  const navigateToFileDirectory = useCallback(
    (path: string) => {
      setFilter({
        id: 'fileNamePrefix',
        label: '',
        value: getFilename(path),
      })
      setActiveDirectory(
        () => [
          activeBucketName,
          ...getDirectorySegmentsFromPath(path.slice(1)),
        ],
        'directory'
      )
    },
    [activeBucketName, setActiveDirectory, setFilter]
  )

  return {
    isViewingBuckets,
    isViewingABucket,
    isViewingRootOfABucket,
    buckets,
    activeBucket,
    activeBucketName,
    activeDirectory,
    setActiveDirectory,
    activeDirectoryPath,
    navigateToFileDirectory,
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
    fileNamePrefix,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
    getFileUrl,
    activeViewMode,
    switchViewModeUrl,
  }
}

type State = ReturnType<typeof useFilesManagerMain>

const FilesManagerContext = createContext({} as State)
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
