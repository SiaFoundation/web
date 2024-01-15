'use client'

import {
  useClientFilters,
  useDatasetEmptyState,
  useTableState,
} from '@siafoundation/design-system'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
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
  getFilePath,
  getFilename,
  pathSegmentsToPath,
} from './paths'
import { useUploads } from './uploads'
import { useDownloads } from './downloads'
import { useDataset } from './dataset'
import { useHelia } from '../helia'
import { openDB, IDBPDatabase } from 'idb'

function useFilesMain() {
  const { addFile } = useHelia()
  const [db, setDb] = useState<IDBPDatabase | null>(null)

  // initialize the database
  useEffect(() => {
    const initDB = async () => {
      const db = await openDB('filesDB', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('files')) {
            db.createObjectStore('files', { keyPath: 'name' })
          }
        },
      })
      setDb(db)
    }
    initDB()
    return () => {
      db?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
  } = useTableState('file/v0/objects', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })
  const router = useRouter()
  const pathname = usePathname()
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters()

  // [bucket, key, directory]
  const activeDirectory = useMemo<FullPathSegments>(
    () =>
      ((pathname.split('/').slice(1) || []) as FullPathSegments).map(
        decodeURIComponent
      ),
    [pathname]
  )

  // key/directory/
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

  const uploadFile = useCallback(
    async (directory: string, file: File) => {
      const cid = await addFile(file)
      console.log(cid)
      const path = getFilePath(directory, file.name)
      const cidV2 = cid.toString()
      const object: ObjectData = {
        id: path,
        path,
        name: file.name,
        fileType: file.type,
        type: 'file',
        size: file.size,
        cid: cidV2,
      }
      await db.put('files', object)
      response.mutate()
    },
    [db, addFile]
  )

  const { uploadFiles, uploadsList, uploadCancel } = useUploads({
    activeDirectoryPath,
    upload: (path, file) => uploadFile(path, file),
  })
  const { downloadFiles, downloadsList, downloadCancel } = useDownloads()

  const { limit, offset, response, dataset } = useDataset({
    db,
    activeDirectoryPath,
    uploadsList,
    sortField,
    sortDirection,
    filters,
  })

  const datasetPage = useMemo(() => {
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
        },
        ...dataset,
      ]
    }
    return dataset
    // Purposely do not include activeDirectory - we only want to update
    // when new data fetching is complete.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset])

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

  const navigateToFile = useCallback(
    (path: string) => {
      setActiveDirectory(() => [...getDirectorySegmentsFromPath(path)])
      setFilter({
        id: 'fileNamePrefix',
        label: '',
        value: getFilename(path),
        fn: (name: string) => name.startsWith(getFilename(path)),
      })
    },
    [setActiveDirectory, setFilter]
  )

  const totalSize = response.data?.reduce((acc, file) => acc + file.size, 0)
  const formattedSize = (totalSize / 1024).toFixed(2)

  return {
    activeDirectory,
    setActiveDirectory,
    activeDirectoryPath,
    navigateToFile,
    dataState,
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
    formattedSize,
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
