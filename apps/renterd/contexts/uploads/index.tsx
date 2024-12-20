import {
  useTableState,
  useDatasetState,
  useServerFilters,
  usePaginationMarker,
} from '@siafoundation/design-system'
import {
  useMultipartUploadAbort,
  useMultipartUploadListUploads,
} from '@siafoundation/renterd-react'
import { createContext, useCallback, useContext, useMemo } from 'react'
import { columnsDefaultVisible, defaultSortField, sortOptions } from './types'
import { columns } from './columns'
import { join, getFilename } from '../../lib/paths'
import { useFilesManager } from '../filesManager'
import { ObjectUploadData } from '../filesManager/types'
import { MultipartUploadListUploadsPayload } from '@siafoundation/renterd-types'
import { maybeFromNullishArrayResponse } from '@siafoundation/react-core'
import { Maybe, Nullable } from '@siafoundation/types'

const defaultLimit = 50

function useUploadsMain() {
  const { uploadsMap, activeBucket } = useFilesManager()
  const { limit, marker } = usePaginationMarker(defaultLimit)
  const markers = useMarkersFromParam(marker)

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const apiBusUploadAbort = useMultipartUploadAbort()

  const payload = useMemo<Maybe<MultipartUploadListUploadsPayload>>(() => {
    if (!activeBucket?.name) {
      return undefined
    }
    return {
      bucket: activeBucket?.name,
      uploadIDMarker: markers?.uploadIDMarker || undefined,
      keyMarker: markers?.keyMarker || undefined,
      limit,
    }
  }, [activeBucket, limit, markers])

  const response = useMultipartUploadListUploads({
    disabled: !payload,
    payload: payload as MultipartUploadListUploadsPayload,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })

  const abortAll = useCallback(async () => {
    if (!response.data?.uploads || !activeBucket?.name) {
      return
    }
    return Promise.all(
      response.data.uploads.map(async (upload) => {
        const localUpload = uploadsMap[upload.uploadID]
        if (localUpload) {
          localUpload.uploadAbort?.()
        } else {
          await apiBusUploadAbort.post({
            payload: {
              bucket: activeBucket.name,
              key: upload.key,
              uploadID: upload.uploadID,
            },
          })
        }
      })
    )
  }, [response.data, apiBusUploadAbort, activeBucket, uploadsMap])

  const datasetPage = useMemo<Maybe<ObjectUploadData[]>>(() => {
    const uploads = maybeFromNullishArrayResponse(response.data?.uploads)
    if (!uploads || !activeBucket?.name) {
      return undefined
    }
    return uploads.map((upload) => {
      const id = upload.uploadID
      const key = upload.key
      const name = getFilename(key)
      const fullPath = join(activeBucket.name, upload.key)
      const localUpload = uploadsMap[id]
      if (localUpload) {
        return localUpload
      }
      return {
        id,
        path: fullPath,
        key,
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
              key: upload.key,
              uploadID: upload.uploadID,
            },
          })
        },
      }
    })
  }, [uploadsMap, activeBucket, response, apiBusUploadAbort])

  const {
    configurableColumns,
    visibleColumnIds,
    visibleColumns,
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

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    marker,
    filters,
  })

  const nextMarker = useBuildMarkerParam({
    uploadIDMarker: response.data?.nextUploadIDMarker || '',
    keyMarker: response.data?.nextMarker || '',
  })

  return {
    abortAll,
    datasetState,
    limit,
    marker,
    nextMarker,
    hasMore: !!response.data?.hasMore,
    isLoading: response.isLoading,
    error: response.error,
    datasetPageTotal: datasetPage?.length || 0,
    visibleColumns,
    datasetPage,
    configurableColumns,
    visibleColumnIds,
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

function useMarkersFromParam(marker: Nullable<string>) {
  return useMemo<Maybe<{ uploadIDMarker: string; keyMarker: string }>>(() => {
    if (marker) {
      const [uploadIDMarker, keyMarker] = marker.split('<keyMarker>')
      if (uploadIDMarker && keyMarker) {
        return { keyMarker, uploadIDMarker }
      }
      return undefined
    }
    return undefined
  }, [marker])
}

function useBuildMarkerParam({
  uploadIDMarker,
  keyMarker,
}: {
  uploadIDMarker: string
  keyMarker: string
}): Nullable<string> {
  return useMemo(() => {
    if (!uploadIDMarker || !keyMarker) {
      return null
    }
    return `${uploadIDMarker}<keyMarker>${keyMarker}`
  }, [uploadIDMarker, keyMarker])
}
