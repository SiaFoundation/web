'use client'

import { triggerErrorToast } from '@siafoundation/design-system'
import {
  throttle,
  useMutate,
  useThrottledStateMap,
} from '@siafoundation/react-core'
import {
  useBuckets,
  useMultipartUploadAbort,
  useMultipartUploadComplete,
  useMultipartUploadCreate,
  useMultipartUploadPart,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { Bucket, busObjectsRoute } from '@siafoundation/renterd-types'
import { MiBToBytes, minutesInMilliseconds } from '@siafoundation/units'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { MultipartUpload } from '../../lib/multipartUpload'
import {
  FullPath,
  getBucketFromPath,
  getKeyFromPath,
  join,
} from '../../lib/paths'
import { ObjectUploadData, UploadsMap } from './types'
import { useWarnActiveUploadsOnClose } from './useWarnActiveUploadsOnClose'
import { useFilesManager } from '../filesManager'

const maxConcurrentUploads = 5
const maxConcurrentPartsPerUpload = 5
const getMultipartUploadPartSize = (minShards: number) =>
  MiBToBytes(4).times(minShards)
const checkAndStartUploadsInterval = 500

function useUploadsManagerMain() {
  const { activeDirectoryPath } = useFilesManager()
  const buckets = useBuckets()
  const mutate = useMutate()
  const workerUploadPart = useMultipartUploadPart()
  const busUploadComplete = useMultipartUploadComplete()
  const busUploadCreate = useMultipartUploadCreate()
  const busUploadAbort = useMultipartUploadAbort()
  const [uploadsMapRef, setUploadsMapRef, uploadsMap] =
    useThrottledStateMap<UploadsMap>({})
  const uploadSettings = useSettingsUpload({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const uploadsList: ObjectUploadData[] = useMemo(
    () => Object.values(uploadsMap),
    [uploadsMap]
  )

  const hasUploads = uploadsList.length > 0

  const updateStatusToUploading = useCallback(
    ({ id, multipartId }: { id: string; multipartId: string }) => {
      setUploadsMapRef((current) => {
        current[id] = {
          ...current[id],
          multipartId,
          uploadStatus: 'uploading',
          loaded: 0,
        }
        return current
      })
    },
    [setUploadsMapRef]
  )

  const updateUploadProgress = useCallback(
    (obj: { id: string; loaded: number; size: number }) => {
      setUploadsMapRef((current) => {
        const upload = current[obj.id]
        if (!upload || upload.loaded === obj.loaded) {
          return current
        }

        current[obj.id] = {
          ...upload,
          loaded: obj.loaded,
          uploadStatus: obj.loaded === obj.size ? 'processing' : 'uploading',
          size: obj.size,
        }
        return current
      })
    },
    [setUploadsMapRef]
  )

  const removeUpload = useCallback(
    (id: string) => {
      setUploadsMapRef((current) => {
        delete current[id]
        return current
      })
    },
    [setUploadsMapRef]
  )

  const initMultipartUpload = useCallback(
    async ({
      id,
      path,
      bucket,
      uploadFile,
    }: {
      id: string
      path: FullPath
      bucket: Bucket
      uploadFile: File
    }) => {
      const key = getKeyFromPath(path)
      const multipartUpload = new MultipartUpload({
        file: uploadFile,
        key,
        bucket: bucket.name,
        api: ref.current,
        partSize: getMultipartUploadPartSize(
          uploadSettings.data?.redundancy.minShards || 1
        ).toNumber(),
        maxConcurrentParts: maxConcurrentPartsPerUpload,
      })

      multipartUpload.setOnError((error) => {
        triggerErrorToast({
          title: 'Error uploading file',
          body: error.message,
        })
        ref.current.removeUpload(id)
      })
      multipartUpload.setOnProgress((progress) => {
        ref.current.updateUploadProgress({
          id,
          loaded: progress.sent,
          size: progress.total,
        })
      })
      multipartUpload.setOnComplete(async () => {
        throttle(busObjectsRoute, 5000, () =>
          mutate((key) => key.startsWith(busObjectsRoute))
        )
        ref.current.removeUpload(id)
      })
      return multipartUpload
    },
    [uploadSettings.data, mutate]
  )

  const addUploadToQueue = useCallback(
    async ({
      id,
      path,
      bucket,
      name,
      uploadFile,
    }: {
      id: string
      path: FullPath
      bucket: Bucket
      name: string
      uploadFile: File
    }) => {
      const multipartUpload = await initMultipartUpload({
        id,
        path,
        bucket,
        uploadFile,
      })
      if (!multipartUpload) {
        return
      }
      const key = getKeyFromPath(path)
      const uploadItem: ObjectUploadData = {
        id,
        path,
        key,
        bucket,
        name,
        size: uploadFile.size,
        loaded: 0,
        isUploading: true,
        multipartId: undefined,
        multipartUpload,
        uploadStatus: 'queued',
        uploadFile: uploadFile,
        createdAt: new Date().toISOString(),
        uploadAbort: async () => {
          ref.current.removeUpload(id)
          multipartUpload.abort()
        },
        type: 'file',
      }
      setUploadsMapRef((current) => {
        current[id] = uploadItem
        return current
      })
    },
    [initMultipartUpload, setUploadsMapRef]
  )

  const startMultipartUpload = useCallback(
    async ({ id, upload }: { id: string; upload: MultipartUpload }) => {
      const multipartId = await upload.create()
      if (!multipartId) {
        triggerErrorToast({
          title: 'Error creating upload',
          body: 'Failed to create upload',
        })
        return
      }
      updateStatusToUploading({
        id,
        multipartId,
      })
      await upload.start()
    },
    [updateStatusToUploading]
  )

  const checkAndStartUploads = useCallback(
    () =>
      throttle('checkAndStartUploads', checkAndStartUploadsInterval, () => {
        const uploadsListRef = Object.values(uploadsMapRef)
        const activeUploads = uploadsListRef.filter(
          (upload) => upload.uploadStatus === 'uploading'
        )
        const queuedUploads = uploadsListRef.filter(
          (upload) => upload.uploadStatus === 'queued'
        )

        const availableSlots = Math.max(
          maxConcurrentUploads - activeUploads.length,
          0
        )
        queuedUploads.slice(0, availableSlots).forEach((upload) => {
          if (!upload.multipartUpload) {
            return
          }
          startMultipartUpload({
            id: upload.id,
            upload: upload.multipartUpload,
          })
        })
      }),
    [uploadsMapRef, startMultipartUpload]
  )

  const uploadFiles = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        // @ts-expect-error: https://developer.mozilla.org/en-US/docs/Web/API/File
        // Documentation does not include `path` but all browsers populate it
        // with the relative path of the file. Whereas webkitRelativePath is
        // empty string in most browsers.
        // Try `path` otherwise fallback to flat file structure.
        const relativeUserFilePath = (file['path'] as string) || file.name
        const path = join(activeDirectoryPath, relativeUserFilePath)
        const id = getUploadId(path)
        const name = file.name
        const bucketName = getBucketFromPath(path)
        const bucket = buckets.data?.find((b) => b.name === bucketName)
        if (!bucket) {
          triggerErrorToast({
            title: `Bucket not found`,
            body: bucketName,
          })
          return
        }
        if (uploadsMapRef[id]) {
          triggerErrorToast({
            title: `Already uploading file, aborting previous upload.`,
            body: path,
          })
          uploadsMapRef[id].uploadAbort?.()
        }
        addUploadToQueue({
          id,
          path,
          name,
          bucket,
          uploadFile: file,
        })
      })
    },
    [activeDirectoryPath, addUploadToQueue, buckets.data, uploadsMapRef]
  )

  // Use a ref for functions that will be used in closures/asynchronous callbacks
  // to ensure the latest version of the function is used.
  const ref = useRef({
    checkAndStartUploads,
    workerUploadPart,
    busUploadComplete,
    busUploadCreate,
    busUploadAbort,
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
    if (hasUploads) {
      const id = setInterval(() => {
        ref.current.checkAndStartUploads()
      }, checkAndStartUploadsInterval)
      return () => clearInterval(id)
    }
  }, [hasUploads])

  // Abort local uploads when the browser tab is closed.
  useWarnActiveUploadsOnClose({ uploadsList })

  return {
    uploadFiles,
    uploadsMap,
    uploadsList,
  }
}

export type UploadsManagerState = ReturnType<typeof useUploadsManagerMain>

const UploadsManagerContext = createContext({} as UploadsManagerState)
export const useUploadsManager = () => useContext(UploadsManagerContext)

type Props = {
  children: React.ReactNode
}

export function UploadsManagerProvider({ children }: Props) {
  const state = useUploadsManagerMain()
  return (
    <UploadsManagerContext.Provider value={state}>
      {children}
    </UploadsManagerContext.Provider>
  )
}

export function getUploadId(path: FullPath) {
  return path
}
