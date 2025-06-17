import {
  useDatasetState,
  usePaginationMarker,
  useTableState,
} from '@siafoundation/design-system'
import {
  useMultipartUploadAbort,
  useMultipartUploadListUploads,
} from '@siafoundation/renterd-react'
import { useMemo } from 'react'
import { columnsDefaultVisible, defaultSortField, sortOptions } from './types'
import { columns } from './columns'
import { join, getFilename } from '../../lib/paths'
import { useFilesManager } from '../filesManager'
import { ObjectUploadData } from '../uploadsManager/types'
import { MultipartUploadListUploadsPayload } from '@siafoundation/renterd-types'
import { maybeFromNullishArrayResponse } from '@siafoundation/react-core'
import { Maybe, Nullable } from '@siafoundation/types'
import { getUploadId, useUploadsManager } from '../uploadsManager'

const defaultLimit = 50

export function useRemoteUploads() {
  const { activeBucket } = useFilesManager()
  const { uploadsMap } = useUploadsManager()
  const { limit, marker } = usePaginationMarker(defaultLimit)
  const markers = useMarkersFromParam(marker)

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

  const nextMarker = useBuildMarkerParam({
    uploadIDMarker: response.data?.nextUploadIDMarker || '',
    keyMarker: response.data?.nextMarker || '',
  })

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
      const localUpload = uploadsMap[getUploadId(fullPath)]
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
        multipartId: upload.uploadID,
        isUploading: true,
        uploadStatus: 'uploading to hosts',
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

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: response.isValidating,
    error: response.error,
    marker,
  })

  const tableState = useTableState('renterd/v0/uploads', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  return {
    datasetState,
    limit,
    marker,
    nextMarker,
    hasMore: !!response.data?.hasMore,
    isLoading: response.isLoading,
    error: response.error,
    datasetPageTotal: datasetPage?.length || 0,
    datasetPage,
    tableState,
  }
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
