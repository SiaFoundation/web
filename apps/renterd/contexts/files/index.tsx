import {
  triggerErrorToast,
  triggerToast,
  useClientFilteredDataset,
  useClientFilters,
  useDatasetEmptyState,
  useTableState,
} from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import {
  useObjectDirectory,
  useObjectDownloadFunc,
  useObjectUpload,
} from '@siafoundation/react-renterd'
import { sortBy, throttle, toPairs } from 'lodash'
import { useRouter } from 'next/router'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { TransfersBar } from '../../components/TransfersBar'
import { useContracts } from '../contracts'
import { columns } from './columns'
import { columnsDefaultSort, columnsDefaultVisible, ObjectData } from './types'
import { getFilename, getFullPath, isDirectory } from './utils'

type UploadsMap = Record<string, ObjectData>

function useFilesMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const offset = Number(router.query.offset || 0)

  // activeDirectory is the path split into an array of parts, stored in the router path
  const activeDirectory = useMemo(
    () => (router.query.path as string[]) || [],
    [router.query.path]
  )
  // activeDirectoryPath is the path string, formatted in the way renterd expects
  const activeDirectoryPath = useMemo(() => {
    return activeDirectory.length ? `/${activeDirectory.join('/')}/` : '/'
  }, [activeDirectory])

  const setActiveDirectory = useCallback(
    (fn: (activeDirectory: string[]) => string[]) => {
      const nextActiveDirectory = fn(activeDirectory)
      router.push('/files/' + nextActiveDirectory.join('/'))
    },
    [router, activeDirectory]
  )

  const upload = useObjectUpload()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  const updateUploadProgress = useCallback(
    (obj: { path: string; name: string; loaded: number; size: number }) => {
      setUploadsMap((uploads) => ({
        ...uploads,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          name: obj.name,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: true,
          isDirectory: false,
        },
      }))
    },
    [setUploadsMap]
  )

  const removeUpload = useCallback(
    (path: string) => {
      setUploadsMap((uploads) => {
        delete uploads[path]
        return {
          ...uploads,
        }
      })
    },
    [setUploadsMap]
  )

  const uploadFiles = async (files: File[]) => {
    files.forEach(async (file) => {
      const name = file.name
      const path = getFullPath(activeDirectoryPath, name)
      const onUploadProgress = throttle(
        (e) =>
          updateUploadProgress({
            name,
            path,
            loaded: e.loaded,
            size: e.total,
          }),
        2000
      )
      updateUploadProgress({
        name,
        path,
        loaded: 0,
        size: 1,
      })
      const response = await upload.put({
        params: {
          key: path.slice(1),
        },
        payload: file,
        config: {
          axios: {
            onUploadProgress,
          },
        },
      })
      if (response.error) {
        triggerErrorToast(response.error)
        removeUpload(path)
      } else {
        removeUpload(path)
        triggerToast(`Upload complete: ${name}`)
      }
    })
  }

  const uploadsList = useMemo(
    () => Object.entries(uploadsMap).map((u) => u[1]),
    [uploadsMap]
  )

  const download = useObjectDownloadFunc()
  const [downloadsMap, setDownloadsMap] = useState<UploadsMap>({})

  const updateDownloadProgress = useCallback(
    (obj: { path: string; name: string; loaded: number; size: number }) => {
      setDownloadsMap((download) => ({
        ...download,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          name: obj.name,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: false,
          isDirectory: false,
        },
      }))
    },
    [setDownloadsMap]
  )

  const removeDownload = useCallback(
    (path: string) => {
      setDownloadsMap((downloads) => {
        delete downloads[path]
        return {
          ...downloads,
        }
      })
    },
    [setDownloadsMap]
  )

  const { settings } = useAppSettings()
  const getFileUrl = useCallback(
    (name: string, authenticated: boolean) => {
      const path = `/worker/objects${name}`
      // Parse settings.api rather than URL because the UI could be pointing at a different API
      const scheme = settings.api.startsWith('https') ? 'https' : 'http'
      const host = settings.api.replace('https://', '').replace('http://', '')
      if (authenticated) {
        return `${scheme}://:${settings.password}@${host}/api${path}`
      }
      return `${scheme}://${host}/api${path}`
    },
    [settings]
  )

  const downloadFiles = async (files: string[]) => {
    files.forEach(async (name) => {
      const path = getFullPath(activeDirectoryPath, name)
      let isDone = false
      const onDownloadProgress = throttle((e) => {
        if (isDone) {
          return
        }
        updateDownloadProgress({
          name,
          path,
          loaded: e.loaded,
          size: e.total,
        })
      }, 2000)
      updateDownloadProgress({
        name,
        path,
        loaded: 0,
        size: 1,
      })
      const response = await download.get(name, {
        params: {
          key: path.slice(1),
        },
        config: {
          axios: {
            onDownloadProgress,
          },
        },
      })
      isDone = true
      if (response.error) {
        triggerErrorToast(response.error)
        removeDownload(path)
      } else {
        removeDownload(path)
        // triggerToast(`Download complete: ${name}`)
      }
    })
  }

  const downloadsList = useMemo(
    () => Object.entries(downloadsMap).map((d) => d[1]),
    [downloadsMap]
  )

  const response = useObjectDirectory({
    params: {
      key: activeDirectoryPath.slice(1),
      // limit: limit,
      // offset: offset,
    },
    config: {
      swr: { keepPreviousData: true },
    },
  })

  const { dataset: allContracts } = useContracts()

  const dataset = useMemo<ObjectData[] | null>(() => {
    if (!response.data) {
      return null
    }

    const dataMap: Record<string, ObjectData> = {}

    response.data.entries?.forEach(({ name: path, size }) => {
      // If there is a directory stub file filter it out.
      if (path === activeDirectoryPath) {
        return
      }
      dataMap[path] = {
        id: path,
        path,
        size,
        name: getFilename(path),
        isDirectory: isDirectory(path),
      }
    })
    uploadsList
      .filter(
        ({ path, name }) => path === getFullPath(activeDirectoryPath, name)
      )
      .forEach((upload) => {
        dataMap[upload.path] = upload
      })
    const all = sortBy(
      toPairs(dataMap).map((p) => p[1]),
      'path'
    )
    return all
    // Purposely do not include activeDirectoryPath - we only want to update
    // when new data fetching is complete. Leaving it in wipes makes the
    // directory stub path matching logic temporarily invalid.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data, uploadsList, allContracts])

  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  } = useTableState(
    'renterd/v0/objects',
    columns,
    columnsDefaultVisible,
    columnsDefaultSort
  )

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ObjectData>()

  const datasetFiltered = useClientFilteredDataset({
    dataset,
    filters,
    sortColumn,
    sortDirection,
  })

  const pageCount = datasetFiltered?.length || 0
  const datasetPage = useMemo(() => {
    if (!datasetFiltered) {
      return null
    }
    if (activeDirectory.length > 0) {
      return [
        {
          id: '..',
          name: '..',
          path: '..',
          isDirectory: true,
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

  return {
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
    downloadFiles,
    downloadsList,
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    sortOptions,
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
  return (
    <FilesContext.Provider value={state}>
      {children}
      <TransfersBar />
    </FilesContext.Provider>
  )
}
