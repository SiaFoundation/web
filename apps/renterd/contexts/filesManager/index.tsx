'use client'

import { useServerFilters } from '@siafoundation/design-system'
import { useParams, useAppRouter, usePathname } from '@siafoundation/next'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { ExplorerMode } from './types'
import {
  FullPath,
  FullPathSegments,
  getDirectorySegmentsFromPath,
  getFilename,
  getKeyFromPath,
  pathSegmentsToPath,
} from '../../lib/paths'
import { useBuckets } from '@siafoundation/renterd-react'
import { routes } from '../../config/routes'
import useLocalStorageState from 'use-local-storage-state'

function useFilesManagerMain() {
  const router = useAppRouter()
  const params = useParams<{ bucket?: string; path?: FullPathSegments }>()
  const activeBucketName = params?.bucket
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const fileNamePrefixFilter = useMemo(() => {
    const prefix = filters.find((f) => f.id === 'fileNamePrefix')?.value
    return prefix || ''
  }, [filters])

  // [bucket, key, directory]
  const activeDirectory = useMemo<FullPathSegments>(() => {
    if (!activeBucketName) return []
    const path = (params?.path || []).map(decodeURIComponent)
    return [activeBucketName, ...path]
  }, [activeBucketName, params?.path])

  // bucket
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
      if (nextActiveDirectory.length === 0) {
        router.push(routes.buckets.index)
        return
      }
      const route = routes.buckets.files
        .replace('[bucket]', nextActiveDirectory[0])
        .replace(
          '[path]',
          nextActiveDirectory.slice(1).map(encodeURIComponent).join('/')
        )
      router.push(route)
    },
    [router, activeDirectory]
  )

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

  const removeFileNamePrefixFilter = useCallback(() => {
    removeFilter('fileNamePrefix')
  }, [removeFilter])

  const setActiveDirectoryAndFileNamePrefix = useCallback(
    (activeDirectory: string[], prefix?: string) => {
      if (prefix) {
        setFileNamePrefixFilter(prefix)
      } else {
        removeFileNamePrefixFilter()
      }
      setActiveDirectory(() => activeDirectory)
    },
    [setActiveDirectory, setFileNamePrefixFilter, removeFileNamePrefixFilter]
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

  const uploadsRoute = routes.buckets.uploads.replace(
    '[bucket]',
    activeBucketName || ''
  )

  const navigateToUploads = useCallback(() => {
    if (!activeBucket) {
      return
    }
    router.push(uploadsRoute)
  }, [activeBucket, uploadsRoute, router])

  const pathname = usePathname()
  const isViewingUploads = activeBucketName && pathname.startsWith(uploadsRoute)

  const setExplorerModeDirectory = useCallback(async () => {
    if (!isViewingUploads && activeExplorerMode === 'directory') {
      return
    }
    if (!activeBucketName) {
      return
    }
    setActiveDirectoryAndFileNamePrefix([activeBucketName], undefined)
    setActiveExplorerMode('directory')
  }, [
    isViewingUploads,
    activeExplorerMode,
    activeBucketName,
    setActiveExplorerMode,
    setActiveDirectoryAndFileNamePrefix,
  ])

  const setExplorerModeFlat = useCallback(async () => {
    if (!isViewingUploads && activeExplorerMode === 'flat') {
      return
    }
    if (!activeBucketName) {
      return
    }
    setActiveDirectoryAndFileNamePrefix(
      [activeBucketName],
      getKeyFromPath(activeDirectoryPath).slice(1)
    )
    setActiveExplorerMode('flat')
  }, [
    isViewingUploads,
    activeExplorerMode,
    activeBucketName,
    activeDirectoryPath,
    setActiveExplorerMode,
    setActiveDirectoryAndFileNamePrefix,
  ])

  return {
    isViewingBuckets,
    isViewingABucket,
    isViewingRootOfABucket,
    isViewingUploads,
    buckets,
    activeBucket,
    activeBucketName,
    activeDirectory,
    navigateToUploads,
    setActiveDirectory,
    setActiveDirectoryAndFileNamePrefix,
    activeDirectoryPath,
    navigateToModeSpecificFiltering,
    filters,
    fileNamePrefixFilter,
    setFileNamePrefixFilter,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    activeExplorerMode,
    setExplorerModeDirectory,
    setExplorerModeFlat,
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
