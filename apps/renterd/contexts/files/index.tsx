import {
  Text,
  ValueNum,
  TableColumn,
  LoadingDots,
  FolderIcon,
  Document16,
  useTableState,
  triggerErrorToast,
  triggerToast,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import {
  useObject,
  useObjectDirectory,
  useObjectUpload,
} from '@siafoundation/react-core'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { sortBy, throttle, toPairs } from 'lodash'
import { FileActionsDropdownMenu } from '../../components/Files/FileActionsDropdownMenu'
import { useDataState } from '../../hooks/useDataState'
import {
  columnsDefaultSort,
  columnsDefaultVisible,
  columnsMeta,
  ObjectData,
  TableColumnId,
} from './types'
import { useClientFilters } from '../../hooks/useClientFilters'
import { useRouter } from 'next/router'
import { UploadsBar } from '../../components/UploadsBar'
import { useClientFilterData } from '../../hooks/useClientFilterData'

type UploadsMap = Record<string, ObjectData>

function useFilesMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const offset = Number(router.query.offset || 0)

  const activeDirectoryRawPath = ((router.query.path as string[]) || []).join(
    '/'
  )
  const activeDirectoryPath = useMemo(() => {
    return activeDirectoryRawPath ? `/${activeDirectoryRawPath}/` : '/'
  }, [activeDirectoryRawPath])
  const activeDirectory = useMemo(
    () => (activeDirectoryRawPath ? activeDirectoryRawPath.split('/') : []),
    [activeDirectoryRawPath]
  )
  const setActiveDirectory = useCallback(
    (fn: (activeDirectory: string[]) => string[]) => {
      const nextActiveDirectory = fn(activeDirectory)
      router.push('/files/' + nextActiveDirectory.join('/'))
    },
    [router, activeDirectory]
  )

  const upload = useObjectUpload()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  const updateProgress = useCallback(
    (obj: { path: string; name: string; loaded: number; total: number }) => {
      setUploadsMap((uploads) => ({
        ...uploads,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          name: obj.name,
          total: obj.total,
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

  const onDrop = async (droppedFiles: File[]) => {
    droppedFiles.forEach(async (file) => {
      const name = file.name
      const path = getFullPath(activeDirectoryPath, name)
      const onUploadProgress = throttle(
        (e) =>
          updateProgress({
            name,
            path,
            loaded: e.loaded,
            total: e.total,
          }),
        2000
      )
      updateProgress({
        name,
        path,
        loaded: 0,
        total: 1,
      })
      const response = await upload.put({
        params: {
          key: encodeURIComponent(path.slice(1)),
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
        removeUpload(file.name)
      } else {
        removeUpload(file.name)
        triggerToast(`Upload complete: ${file.name}`)
      }
    })
  }

  const uploadsList = useMemo(
    () => Object.entries(uploadsMap).map((u) => u[1]),
    [uploadsMap]
  )

  const response = useObjectDirectory({
    params: {
      key: encodeURIComponent(activeDirectoryPath.slice(1)),
      // limit: limit,
      // offset: offset,
    },
    config: {
      swr: { keepPreviousData: true },
    },
  })

  const dataset = useMemo<ObjectData[] | null>(() => {
    if (!response.data) {
      return null
    }

    const dataMap: Record<string, ObjectData> = {}

    response.data.entries?.forEach((path) => {
      // If there is a directory stub file filter it out.
      if (path === activeDirectoryPath) {
        return
      }
      dataMap[path] = {
        id: path,
        path,
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
  }, [response.data, uploadsList])

  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  } = useTableState(
    'renterd/v0/objects',
    columnsMeta,
    columnsDefaultVisible,
    columnsDefaultSort
  )

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ObjectData>()

  const datasetFiltered = useClientFilterData({
    dataset,
    filters,
    sortColumn,
    sortDirection,
  })

  const datasetPage = useMemo(() => datasetFiltered, [datasetFiltered])

  const tableColumns = useMemo(() => {
    const columns: TableColumn<TableColumnId, ObjectData>[] = [
      {
        id: 'type',
        label: columnsMeta.type.label,
        sortable: columnsMeta.type.sortable,
        size: '0 0 35px',
        className: '!pl-4 !pr-0',
        render: ({ path }) => {
          return (
            <Text color="subtle">
              {path.endsWith('/') ? <FolderIcon size={16} /> : <Document16 />}
            </Text>
          )
        },
      },
      {
        id: 'name',
        label: columnsMeta.name.label,
        sortable: columnsMeta.name.sortable,
        size: 5,
        className: '!pl-4',
        render: ({ name }) => {
          if (name.endsWith('/')) {
            return (
              <Text
                ellipsis
                color="accent"
                weight="semibold"
                className="cursor-pointer"
                onClick={() => {
                  setActiveDirectory((p) => p.concat(name.slice(0, -1)))
                }}
              >
                {name}
              </Text>
            )
          }
          return (
            <Text ellipsis weight="semibold">
              {name}
            </Text>
          )
        },
      },
      {
        id: 'size',
        label: columnsMeta.size.label,
        sortable: columnsMeta.size.sortable,
        size: 2,
        render: function SizeColumn({ path, isUploading, isDirectory }) {
          const obj = useObject({
            disabled: isUploading || isDirectory,
            params: {
              key: encodeURIComponent(path.slice(1)),
            },
            config: {
              swr: {
                dedupingInterval: 5000,
              },
            },
          })
          if (isUploading) {
            return <LoadingDots />
          }

          if (obj.data?.object) {
            return (
              <ValueNum
                size="12"
                value={(obj.data?.object.Slabs || []).reduce(
                  (acc, s) => acc.plus(s.Length - s.Offset),
                  new BigNumber(0)
                )}
                variant="value"
                color="subtle"
                format={(v) => humanBytes(v.toNumber())}
              />
            )
          }
          return null
        },
      },
      {
        id: 'slabs',
        label: columnsMeta.slabs.label,
        sortable: columnsMeta.slabs.sortable,
        size: 2,
        render: function SlabsColumn({ path, isUploading, isDirectory }) {
          const obj = useObject({
            disabled: isUploading || isDirectory,
            params: {
              key: encodeURIComponent(path.slice(1)),
            },
            config: {
              swr: {
                dedupingInterval: 5000,
              },
            },
          })
          if (isUploading) {
            return <LoadingDots />
          }
          if (obj.data?.object) {
            return (
              <ValueNum
                size="12"
                value={new BigNumber(obj.data?.object.Slabs.length || 0)}
                variant="value"
                color="subtle"
                format={(v) => humanNumber(v)}
              />
            )
          }
          return null
        },
      },
      {
        id: 'actions',
        label: columnsMeta.actions.label,
        sortable: columnsMeta.actions.sortable,
        size: 0.5,
        className: 'justify-end',
        render: ({ name, path, isUploading, isDirectory }) => {
          if (isUploading || isDirectory) {
            return null
          }
          return (
            <div className="relative">
              <FileActionsDropdownMenu name={name} path={path} />
            </div>
          )
        },
      },
    ]
    return columns
  }, [setActiveDirectory])

  const filteredTableColumns = useMemo(
    () => tableColumns.filter((column) => enabledColumns.includes(column.id)),
    [tableColumns, enabledColumns]
  )

  const dataState = useDataState(
    datasetFiltered,
    response.isValidating,
    filters
  )

  return {
    activeDirectory,
    setActiveDirectory,
    activeDirectoryPath,
    dataState,
    limit,
    offset,
    pageCount: datasetPage?.length || 0,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    datasetPage,
    onDrop,
    uploadsList,
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
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
      <UploadsBar />
    </FilesContext.Provider>
  )
}

function getFullPath(dirPathStr: string, name: string) {
  return dirPathStr + name
}

function getFilename(filePath: string) {
  const parts = filePath.split('/')
  if (filePath.endsWith('/')) {
    return `${parts[parts.length - 2]}/`
  }
  return parts[parts.length - 1]
}

function isDirectory(path: string) {
  return path.endsWith('/')
}
