import {
  triggerErrorToast,
  triggerSuccessToast,
  triggerToast,
} from '@siafoundation/design-system'
import {
  Bucket,
  useBuckets,
  useMultipartUploadAbort,
  useMultipartUploadChunk,
  useMultipartUploadComplete,
  useMultipartUploadCreate,
} from '@siafoundation/react-renterd'
import { throttle } from '@technically/lodash'
import { useCallback, useMemo, useRef, useState } from 'react'
import { ObjectData } from './types'
import {
  FullPath,
  getBucketFromPath,
  getKeyFromPath,
  join,
} from '../../lib/paths'
import { MultipartUpload } from '../../lib/multipartUpload'
import { MiBToBytes } from '@siafoundation/units'
import { useMutate } from '@siafoundation/react-core'
import { flushSync } from 'react-dom'

const maxConcurrentUploads = 5
const maxConcurrentChunksPerUpload = 5

type UploadStatus =
  | 'queued'
  | 'uploading'
  | 'processing'
  | 'completed'
  | 'aborted'

type ObjectUploadData = ObjectData & {
  uploadStatus: UploadStatus
  uploadAbort?: () => void
  uploadFile?: File
}

type UploadsMap = Record<string, ObjectUploadData>

type Props = {
  activeDirectoryPath: string
}

export function useUploads({ activeDirectoryPath }: Props) {
  const buckets = useBuckets()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  // Because checkAndStartUploads is called in closures/asynchronous callbacks,
  // use a ref to ensure the latest version of the function is used.
  const ref = useRef<{
    checkAndStartUploads: () => void
  }>({
    checkAndStartUploads: () => null,
  })

  const addUploadToQueue = useCallback(
    (obj: {
      path: FullPath
      bucket: Bucket
      name: string
      health?: number
      uploadFile: File
    }) => {
      setUploadsMap((map) => ({
        ...map,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          bucket: obj.bucket,
          name: obj.name,
          size: obj.uploadFile.size,
          loaded: 0,
          isUploading: true,
          uploadStatus: 'queued',
          uploadFile: obj.uploadFile,
          type: 'file',
        },
      }))
    },
    [setUploadsMap]
  )

  const updateStatusToUploading = useCallback(
    ({ path, abort }: { path: FullPath; abort: () => void }) => {
      setUploadsMap((map) => ({
        ...map,
        [path]: {
          ...map[path],
          uploadStatus: 'uploading',
          loaded: 0,
          uploadAbort: abort,
        },
      }))
    },
    [setUploadsMap]
  )

  const updateUploadProgress = useCallback(
    (obj: { path: string; loaded: number; size: number }) => {
      setUploadsMap((map) => {
        if (!map[obj.path]) {
          return map
        }
        return {
          ...map,
          [obj.path]: {
            ...map[obj.path],
            path: obj.path,
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

  const uploadCancel = useCallback(
    (upload: ObjectUploadData) => {
      upload.uploadAbort?.()
      removeUpload(upload.path)
    },
    [removeUpload]
  )

  const mutate = useMutate()
  const apiWorkerUploadChunk = useMultipartUploadChunk()
  const apiBusUploadComplete = useMultipartUploadComplete()
  const apiBusUploadCreate = useMultipartUploadCreate()
  const apiBusUploadAbort = useMultipartUploadAbort()

  const startMultipartUpload = useCallback(
    async ({
      path,
      name,
      bucket,
      uploadFile,
    }: {
      path: string
      name: string
      bucket: Bucket
      uploadFile: File
    }) => {
      const key = getKeyFromPath(path)
      const multipartUpload = new MultipartUpload({
        file: uploadFile,
        path: key,
        bucket: bucket.name,
        apiWorkerUploadChunk,
        apiBusUploadComplete,
        apiBusUploadCreate,
        apiBusUploadAbort,
        chunkSize: MiBToBytes(4).toNumber(),
        maxConcurrentChunks: maxConcurrentChunksPerUpload,
        onError: (error) => {
          if (error.message === 'canceled') {
            triggerToast('File upload canceled.')
          } else {
            triggerErrorToast(error.message)
          }
          removeUpload(path)
        },
        onProgress: throttle((progress) => {
          updateUploadProgress({
            path,
            loaded: progress.sent,
            size: progress.total,
          })
        }, 200),
        onComplete: async () => {
          triggerSuccessToast(`Upload complete: ${name}`)
          await mutate((key) => key.startsWith('/bus/objects'))
          removeUpload(path)
          setTimeout(() => {
            ref.current.checkAndStartUploads()
          }, 100)
        },
      })
      updateStatusToUploading({
        path,
        abort: multipartUpload.abort,
      })
      await multipartUpload.start()
    },
    [
      removeUpload,
      updateUploadProgress,
      mutate,
      updateStatusToUploading,
      apiWorkerUploadChunk,
      apiBusUploadComplete,
      apiBusUploadCreate,
      apiBusUploadAbort,
    ]
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
        path: upload.path,
        name: upload.name,
        bucket: upload.bucket,
        uploadFile: upload.uploadFile,
      })
    })
    return uploadsMap
  }, [uploadsMap, startMultipartUpload])

  const uploadFiles = useCallback(
    (files: File[]) => {
      // flush updates before calling checkAndStartUploads
      flushSync(() => {
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
            triggerErrorToast(
              `Already uploading file: ${path}, aborting previous upload.`
            )
            uploadCancel(uploadsMap[path])
          }
          addUploadToQueue({
            path,
            name,
            bucket,
            uploadFile: file,
          })
        })
      })
      ref.current.checkAndStartUploads()
    },
    [
      activeDirectoryPath,
      addUploadToQueue,
      buckets.data,
      uploadsMap,
      uploadCancel,
    ]
  )

  ref.current = {
    checkAndStartUploads,
  }

  const uploadsList = useMemo(
    () => Object.entries(uploadsMap).map((u) => u[1]),
    [uploadsMap]
  )

  return {
    uploadFiles,
    uploadsList,
    uploadCancel,
  }
}
