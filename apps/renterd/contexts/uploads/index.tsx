import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
} from '@siafoundation/design-system'
import { useAppRouter, usePathname, useSearchParams } from '@siafoundation/next'
import {
  useMultipartUploadAbort,
  useMultipartUploadListUploads,
} from '@siafoundation/react-renterd'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { columnsDefaultVisible, defaultSortField, sortOptions } from './types'
import { columns } from './columns'
import { join, getFilename } from '../../lib/paths'
import { useFilesManager } from '../filesManager'
import { ObjectUploadData } from '../filesManager/types'
import { routes } from '../../config/routes'

const defaultLimit = 50

function useUploadsMain() {
  const { uploadsMap, activeBucket } = useFilesManager()
  const router = useAppRouter()
  const params = useSearchParams()
  const limit = Number(params.get('limit') || defaultLimit)
  const marker = params.get('marker')

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const apiBusUploadAbort = useMultipartUploadAbort()
  const response = useMultipartUploadListUploads({
    disabled: !activeBucket,
    payload: {
      bucket: activeBucket?.name,
      uploadIDMarker: marker,
      limit,
    },
  })

  const dataset: ObjectUploadData[] = useMemo(() => {
    return (
      response.data?.uploads?.map((upload) => {
        const id = upload.uploadID
        const name = getFilename(upload.path)
        const fullPath = join(activeBucket?.name, upload.path)
        const localUpload = uploadsMap[id]
        if (localUpload) {
          {
            return localUpload
          }
        }
        return {
          id,
          path: fullPath,
          bucket: activeBucket,
          name,
          size: 1,
          loaded: 1,
          isUploading: true,
          uploadStatus: 'uploading',
          createdAt: upload.createdAt,
          remote: true,
          type: 'file',
          uploadAbort: async () => {
            await apiBusUploadAbort.post({
              payload: {
                bucket: activeBucket?.name,
                path: upload.path,
                uploadID: upload.uploadID,
              },
            })
          },
        }
      }) || []
    )
  }, [uploadsMap, activeBucket, response.data, apiBusUploadAbort])

  console.log(dataset)

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
  } = useTableState('renterd/v0/uploads', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

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

  const uploadsRoute = routes.buckets.uploads.replace(
    '[bucket]',
    activeBucket?.name
  )

  const pathname = usePathname()
  const isViewingUploads = activeBucket && pathname.startsWith(uploadsRoute)

  const navigateToUploads = useCallback(() => {
    if (!activeBucket) {
      return
    }
    router.push(uploadsRoute)
  }, [activeBucket, uploadsRoute, router])

  return {
    navigateToUploads,
    isViewingUploads,
    dataState,
    limit,
    marker,
    nextMarker: response.data?.nextUploadIDMarker,
    hasMore: response.data?.hasMore,
    isLoading: response.isLoading,
    error: response.error,
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    datasetPage: dataset,
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
  }
}

type State = ReturnType<typeof useUploadsMain>

const UploadsContext = createContext({} as State)
export const useUploads = () => useContext(UploadsContext)

type Props = {
  children: React.ReactNode
}

export function UploadsProvider({ children }: Props) {
  const state = useUploadsMain()
  return (
    <UploadsContext.Provider value={state}>{children}</UploadsContext.Provider>
  )
}
