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
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
  Button,
  CheckmarkFilled16,
  WarningFilled16,
  Misuse16,
  HoverCard,
  Separator,
  ScrollArea,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import BigNumber from 'bignumber.js'
import {
  Obj,
  SlabSlice,
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
import { min, sortBy, throttle, toPairs } from 'lodash'
import { FileDropdownMenu } from '../../components/Files/FileDropdownMenu'
import {
  columnsDefaultSort,
  columnsDefaultVisible,
  columnsMeta,
  ObjectData,
  TableColumnId,
} from './types'
import { useRouter } from 'next/router'
import { UploadsBar } from '../../components/UploadsBar'
import { useContracts } from '../contracts'
import { ContractData } from '../contracts/types'

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

  const { dataset: allContracts } = useContracts()

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
  }, [response.data, uploadsList, allContracts])

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

  const tableColumns = useMemo(() => {
    const columns: TableColumn<TableColumnId, ObjectData>[] = [
      {
        id: 'type',
        label: columnsMeta.type.label,
        sortable: columnsMeta.type.sortable,
        size: '0 0 50px',
        className: '!pl-2 !pr-0',
        render: ({ isUploading, isDirectory, name, path }) => {
          if (isUploading) {
            return (
              <Button variant="ghost" state="waiting">
                <Document16 />
              </Button>
            )
          }
          return isDirectory ? (
            // TODO: renable once actual child file deletion is implemented
            // <DirectoryDropdownMenu name={name} path={path} />
            <Button variant="ghost" state="waiting">
              <FolderIcon size={16} />
            </Button>
          ) : (
            <FileDropdownMenu name={name} path={path} />
          )
        },
      },
      {
        id: 'name',
        label: columnsMeta.name.label,
        sortable: columnsMeta.name.sortable,
        size: '10',
        className: '!pl-0 min-w-[200px] max-w-[800px]',
        render: ({ name, isDirectory }) => {
          if (isDirectory) {
            if (name === '..') {
              return (
                <Text
                  ellipsis
                  color="accent"
                  weight="semibold"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveDirectory((p) => p.slice(0, -1))
                  }}
                >
                  {name}
                </Text>
              )
            }
            return (
              <Text
                ellipsis
                color="accent"
                weight="semibold"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
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
        size: '1 1 150px',
        className: 'justify-end',
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
        id: 'health',
        label: columnsMeta.health.label,
        sortable: columnsMeta.health.sortable,
        size: '1 1 150px',
        className: 'justify-center',
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

          if (obj.data?.object && allContracts) {
            const { health, slabs } = getObjectHealth(
              obj.data.object,
              allContracts
            )

            let label = 'excellent'
            let color: React.ComponentProps<typeof Text>['color'] = 'green'
            let icon = <CheckmarkFilled16 />
            if (health < 1) {
              label = 'good'
              color = 'green'
              icon = <CheckmarkFilled16 />
            }
            if (health < 0.5) {
              label = 'poor'
              color = 'amber'
              icon = <WarningFilled16 />
            }
            if (health < 0) {
              label = 'bad'
              color = 'red'
              icon = <Misuse16 />
            }
            return (
              <HoverCard
                rootProps={{
                  openDelay: 100,
                }}
                trigger={
                  <Text color={color} className="flex cursor-pointer">
                    {icon}
                  </Text>
                }
              >
                <div
                  className="z-10 flex flex-col pb-1 -mx-1 overflow-hidden"
                  style={{
                    height: slabs.length > 15 ? '300px' : undefined,
                  }}
                >
                  <div className="px-2">
                    <Text size="12">{`${label} health (${(health * 100).toFixed(
                      0
                    )}%)`}</Text>
                  </div>
                  <div className="px-2">
                    <Separator className="w-full mt-0.5 mb-1.5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <ScrollArea>
                      <div className="px-2">
                        {sortBy(slabs, 'contractShards').map((slab) => (
                          <div
                            key={slab.index}
                            className="flex justify-between"
                          >
                            <Text
                              size="12"
                              color="subtle"
                              className="flex items-center"
                            >
                              Slab {slab.index}:
                            </Text>
                            <Text
                              size="12"
                              color="subtle"
                              className="flex items-center"
                            >
                              {slab.contractShards}/{slab.totalShards}
                            </Text>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </HoverCard>
            )
          }
          return null
        },
      },
      {
        id: 'slabs',
        label: columnsMeta.slabs.label,
        sortable: columnsMeta.slabs.sortable,
        size: '1 1 150px',
        className: 'justify-center',
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
        id: 'shards',
        label: columnsMeta.shards.label,
        sortable: columnsMeta.shards.sortable,
        size: '1 1 150px',
        className: 'justify-center',
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
                value={
                  new BigNumber(
                    obj.data?.object.Slabs?.reduce(
                      (acc, slab) => acc + slab.Shards?.length,
                      0
                    ) || 0
                  )
                }
                variant="value"
                color="subtle"
                format={(v) => humanNumber(v)}
              />
            )
          }
          return null
        },
      },
    ]
    return columns
  }, [setActiveDirectory, allContracts])

  const filteredTableColumns = useMemo(
    () =>
      tableColumns.filter(
        (column) =>
          columnsMeta[column.id].fixed || enabledColumns.includes(column.id)
      ),
    [tableColumns, enabledColumns]
  )

  const dataState = useDatasetEmptyState(
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
    datasetPage,
    pageCount,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
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

export function isDirectory(path: string) {
  return path.endsWith('/')
}

export function getDirectoryFromPath(path: string) {
  if (isDirectory(path)) {
    return path.slice(1).slice(0, -1).split('/')
  }
  return path.slice(1).split('/').slice(0, -1)
}

function getObjectHealth(
  obj: Obj,
  contracts: ContractData[]
): {
  slabs: SlabHealthStats[]
  health: number
} {
  const slabHealths = []
  obj.Slabs?.forEach((sl, index) => {
    slabHealths.push(getSlabHealthStats(sl, contracts, String(index)))
  })
  const health = min(slabHealths.map((s) => s.health))
  return {
    health,
    slabs: slabHealths,
  }
}

type SlabHealthStats = {
  index: string
  health: number
  contractShards: number
  totalShards: number
  minShards: number
}

function getSlabHealthStats(
  slab: SlabSlice,
  contracts: ContractData[],
  index: string
): SlabHealthStats {
  const shardContractStatus = []
  slab.Shards?.forEach((sh) => {
    shardContractStatus.push(!!contracts.find((c) => c.hostKey === sh.Host))
  })
  const shardsWithContracts = shardContractStatus.filter((s) => s).length
  const minShards = slab.MinShards
  const totalShards = slab.Shards?.length || 0
  return {
    index,
    health: computeSlabHealth(totalShards, minShards, shardsWithContracts),
    minShards: slab.MinShards,
    totalShards: slab.Shards?.length || 0,
    contractShards: shardsWithContracts,
  }
}

export function computeSlabHealth(
  totalShards: number,
  minShards: number,
  contractShards: number
) {
  if (contractShards >= totalShards) {
    return 1
  }

  const adjustedShards = contractShards - minShards
  const adjustedTotalShards = totalShards - minShards

  return adjustedShards / adjustedTotalShards
}
