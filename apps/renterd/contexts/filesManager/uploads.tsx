import {
  minutesInMilliseconds,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { Bucket } from '@siafoundation/renterd-types'
import {
  useBuckets,
  useMultipartUploadAbort,
  useMultipartUploadPart,
  useMultipartUploadComplete,
  useMultipartUploadCreate,
} from '@siafoundation/renterd-react'
import { throttle } from '@technically/lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ObjectUploadData, UploadsMap } from './types'
import {
  FullPath,
  getBucketFromPath,
  getKeyFromPath,
  join,
} from '../../lib/paths'
import { MultipartUpload } from '../../lib/multipartUpload'
import { MiBToBytes } from '@siafoundation/units'
import { useMutate } from '@siafoundation/react-core'
import { useRedundancySettings } from '../../hooks/useRedundancySettings'
import { useWarnActiveUploadsOnClose } from './useWarnActiveUploadsOnClose'

const maxConcurrentUploads = 5
const maxConcurrentPartsPerUpload = 5
const getMultipartUploadPartSize = (minShards: number) =>
  MiBToBytes(4).times(minShards)

type Props = {
  activeDirectoryPath: string
}

export function useUploads({ activeDirectoryPath }: Props) {
  const buckets = useBuckets()
  const mutate = useMutate()
  const workerUploadPart = useMultipartUploadPart()
  const busUploadComplete = useMultipartUploadComplete()
  const busUploadCreate = useMultipartUploadCreate()
  const busUploadAbort = useMultipartUploadAbort()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})
  const redundancy = useRedundancySettings({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const updateStatusToUploading = useCallback(
    ({ id }: { id: string }) => {
      setUploadsMap((map) => ({
        ...map,
        [id]: {
          ...map[id],
          uploadStatus: 'uploading',
          loaded: 0,
        },
      }))
    },
    [setUploadsMap]
  )

  const updateUploadProgress = useCallback(
    (obj: { id: string; loaded: number; size: number }) => {
      setUploadsMap((map) => {
        if (!map[obj.id]) {
          return map
        }
        return {
          ...map,
          [obj.id]: {
            ...map[obj.id],
            loaded: obj.loaded,
            uploadStatus: obj.loaded === obj.size ? 'processing' : 'uploading',
            size: obj.size,
          },
        }
      })
    },
    [setUploadsMap]
  )

  const removeUpload = useCallback(
    (id: string) => {
      setUploadsMap((uploads) => {
        delete uploads[id]
        return {
          ...uploads,
        }
      })
    },
    [setUploadsMap]
  )

  const createMultipartUpload = useCallback(
    async ({
      path,
      bucket,
      uploadFile,
    }: {
      path: FullPath
      bucket: Bucket
      uploadFile: File
    }) => {
      const key = getKeyFromPath(path)
      const multipartUpload = new MultipartUpload({
        file: uploadFile,
        path: key,
        bucket: bucket.name,
        api: ref.current,
        partSize: getMultipartUploadPartSize(
          redundancy.data?.minShards || 1
        ).toNumber(),
        maxConcurrentParts: maxConcurrentPartsPerUpload,
      })

      const uploadId = await multipartUpload.create()
      multipartUpload.setOnError((error) => {
        triggerErrorToast({
          title: 'Error uploading file',
          body: error.message,
        })
        ref.current.removeUpload(uploadId)
      })
      multipartUpload.setOnProgress(
        throttle((progress) => {
          ref.current.updateUploadProgress({
            id: uploadId,
            loaded: progress.sent,
            size: progress.total,
          })
        }, 1000)
      )
      multipartUpload.setOnComplete(async () => {
        await ref.current.mutate((key) => key.startsWith('/bus/objects'))
        ref.current.removeUpload(uploadId)
        setTimeout(() => {
          ref.current.checkAndStartUploads()
        }, 100)
      })
      return {
        uploadId,
        multipartUpload,
      }
    },
    [redundancy.data]
  )

  const addUploadToQueue = useCallback(
    async ({
      path,
      bucket,
      name,
      uploadFile,
    }: {
      path: FullPath
      bucket: Bucket
      name: string
      uploadFile: File
    }) => {
      const { uploadId, multipartUpload } = await createMultipartUpload({
        path,
        bucket,
        uploadFile,
      })
      setUploadsMap((map) => ({
        ...map,
        [uploadId]: {
          id: uploadId,
          path: path,
          bucket: bucket,
          name: name,
          size: uploadFile.size,
          loaded: 0,
          isUploading: true,
          upload: multipartUpload,
          uploadStatus: 'queued',
          uploadFile: uploadFile,
          createdAt: new Date().toISOString(),
          uploadAbort: async () => {
            await multipartUpload.abort()
            ref.current.removeUpload(uploadId)
          },
          type: 'file',
        },
      }))
    },
    [setUploadsMap, createMultipartUpload]
  )

  const startMultipartUpload = useCallback(
    async ({ id, upload }: { id: string; upload: MultipartUpload }) => {
      updateStatusToUploading({
        id,
      })
      upload.start()
    },
    [updateStatusToUploading]
  )

  const checkAndStartUploads = useCallback(() => {
    const uploads = Object.values(uploadsMap)
    const activeUploads = uploads.filter(
      (upload) => upload.uploadStatus === 'uploading'
    ).length
    const queuedUploads = uploads.filter(
      (upload) => upload.uploadStatus === 'queued'
    )

    const availableSlots = maxConcurrentUploads - activeUploads

    // Start uploads if there are available slots and queued uploads
    queuedUploads.slice(0, availableSlots).forEach((upload) => {
      startMultipartUpload({
        id: upload.id,
        upload: upload.upload,
      })
    })
    return uploadsMap
  }, [uploadsMap, startMultipartUpload])

  const uploadFiles = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/File
        // Documentation does not include `path` but all browsers populate it
        // with the relative path of the file. Whereas webkitRelativePath is
        // empty string in most browsers.
        // Try `path` otherwise fallback to flat file structure.
        const relativeUserFilePath = (file['path'] as string) || file.name
        const path = join(activeDirectoryPath, relativeUserFilePath)
        const name = file.name
        const bucketName = getBucketFromPath(path)
        const bucket = buckets.data?.find((b) => b.name === bucketName)
        if (uploadsMap[path]) {
          triggerErrorToast({
            title: `Already uploading file, aborting previous upload.`,
            body: path,
          })
          uploadsMap[path].uploadAbort?.()
        }
        addUploadToQueue({
          path,
          name,
          bucket,
          uploadFile: file,
        })
      })
      setTimeout(() => {
        ref.current.checkAndStartUploads()
      }, 1_000)
    },
    [activeDirectoryPath, addUploadToQueue, buckets.data, uploadsMap]
  )

  // Use a ref for functions that will be used in closures/asynchronous callbacks
  // to ensure the latest version of the function is used.
  const ref = useRef({
    checkAndStartUploads,
    workerUploadPart: workerUploadPart,
    busUploadComplete: busUploadComplete,
    busUploadCreate: busUploadCreate,
    busUploadAbort: busUploadAbort,
    removeUpload,
    updateUploadProgress,
    updateStatusToUploading,
    mutate,
  })

  useEffect(() => {
    ref.current = {
      checkAndStartUploads,
      busUploadAbort,
      busUploadComplete,
      busUploadCreate,
      workerUploadPart,
      mutate,
      removeUpload,
      updateUploadProgress,
      updateStatusToUploading,
    }
  }, [
    checkAndStartUploads,
    busUploadAbort,
    busUploadComplete,
    busUploadCreate,
    workerUploadPart,
    mutate,
    removeUpload,
    updateUploadProgress,
    updateStatusToUploading,
  ])

  useEffect(() => {
    const i = setInterval(() => {
      ref.current.checkAndStartUploads()
    }, 3_000)
    return () => {
      clearInterval(i)
    }
  }, [])

  const uploadsList: ObjectUploadData[] = useMemo(
    () => Object.entries(uploadsMap).map((u) => u[1] as ObjectUploadData),
    [uploadsMap]
  )

  // Abort local uploads when the browser tab is closed
  useWarnActiveUploadsOnClose({ uploadsMap })

  return {
    uploadFiles,
    uploadsMap,
    uploadsList,
  }
}
