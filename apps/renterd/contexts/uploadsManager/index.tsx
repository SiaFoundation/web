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
import React, {
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
import { ObjectUploadData, UploadsMap, UploadStatus } from './types'
import { useWarnActiveUploadsOnClose } from './useWarnActiveUploadsOnClose'
import { useFilesManager } from '../filesManager'

function getLikelyHttpVersion() {
  // If the browser is using https, it is likely using http/2.
  // This is not a guarantee, but it is a good enough guess.
  // - http (100%): always correctly categorized as http/1.1
  // - https (99%): Modern caddy, traefik, tailscale, nginx, etc setups
  //   with https configured will almost always have http/2 enabled.
  return window.location.href.startsWith('https://') ? '2' : '1.1'
}

const maxMultipartUploads = 5

// This value is used to limit the number of concurrent part uploads to the daemon.
function getMaxConcurrentRequests(): number {
  const httpVersion = getLikelyHttpVersion()
  if (httpVersion === '2') {
    // Set a reasonable limit. This value is not based on a hard http limit.
    // For minShards=10 this would mean 25*40MiB = 1GiB of parts.
    return 25
  }
  // The max concurrent requests for http/1.1 is 6.
  // Ensure we do not block all the request slots and stall other app requests.
  return 5
}

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
    [uploadsMap],
  )

  const hasUploads = uploadsList.length > 0

  const updateStatus = useCallback(
    ({
      id,
      uploadStatus,
      multipartId,
      loaded,
    }: {
      id: string
      uploadStatus: UploadStatus
      multipartId?: string
      loaded?: number
    }) => {
      setUploadsMapRef((current) => {
        current[id] = {
          ...current[id],
          multipartId,
          uploadStatus,
          loaded,
        }
        return current
      })
    },
    [setUploadsMapRef],
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
          uploadStatus:
            obj.loaded === obj.size
              ? 'uploading to hosts'
              : 'uploading to daemon',
          size: obj.size,
        }
        return current
      })
    },
    [setUploadsMapRef],
  )

  const removeUpload = useCallback(
    (id: string) => {
      setUploadsMapRef((current) => {
        delete current[id]
        return current
      })
    },
    [setUploadsMapRef],
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
      MultipartUpload.setGlobalMaxConcurrentParts(getMaxConcurrentRequests())
      const multipartUpload = new MultipartUpload({
        file: uploadFile,
        key,
        bucket: bucket.name,
        api: ref.current,
        partSize: getMultipartUploadPartSize(
          uploadSettings.data?.redundancy.minShards || 1,
        ).toNumber(),
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
          mutate((key) => key.startsWith(busObjectsRoute)),
        )
        ref.current.removeUpload(id)
      })
      return multipartUpload
    },
    [uploadSettings.data, mutate],
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
    [initMultipartUpload, setUploadsMapRef],
  )

  const startMultipartUpload = useCallback(
    async ({ id, upload }: { id: string; upload: MultipartUpload }) => {
      // Mark as uploading right away to avoid race conditions where the queued
      // upload is selected again.
      updateStatus({
        id,
        uploadStatus: 'uploading to daemon',
        loaded: 0,
      })
      const multipartId = await upload.create()
      if (!multipartId) {
        triggerErrorToast({
          title: 'Error creating upload',
          body: 'Failed to create upload',
        })
        updateStatus({
          id,
          uploadStatus: 'queued',
          loaded: 0,
        })
        return
      }
      // Update status again with the now available multipartId.
      updateStatus({
        id,
        uploadStatus: 'uploading to daemon',
        multipartId,
        loaded: 0,
      })
      await upload.start()
    },
    [updateStatus],
  )

  const checkAndStartUploads = useCallback(
    () =>
      throttle('checkAndStartUploads', checkAndStartUploadsInterval, () => {
        const uploadsListRef = Object.values(uploadsMapRef.current)
        // Active uploads should include uploads that are in either uploading state.
        const activeUploads = uploadsListRef.filter(
          (upload) =>
            upload.uploadStatus === 'uploading to daemon' ||
            upload.uploadStatus === 'uploading to hosts',
        )
        const queuedUploads = uploadsListRef.filter(
          (upload) => upload.uploadStatus === 'queued',
        )

        const availableSlots = Math.max(
          maxMultipartUploads - activeUploads.length,
          0,
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
    [uploadsMapRef, startMultipartUpload],
  )

  const uploadFiles = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        // When uploading a file vs directory File.path is:
        // File:
        // - chrome eg: `./test.txt`
        // - firefox eg: `/test.txt`
        // File in a directory:
        // - chrome eg: `/dir/test.txt`
        // - firefox eg: `/dir/test.txt`

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
        if (uploadsMapRef.current[id]) {
          triggerErrorToast({
            title: `Already uploading file, aborting previous upload.`,
            body: path,
          })
          uploadsMapRef.current[id].uploadAbort?.()
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
    [activeDirectoryPath, addUploadToQueue, buckets.data, uploadsMapRef],
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
    updateStatusToUploading: updateStatus,
    mutate,
  })

  // Update ref with latest function values for use in closures
  // eslint-disable-next-line react-hooks/immutability -- ref.current is intentionally mutable to provide latest function values to closures
  ref.current = {
    checkAndStartUploads,
    busUploadAbort,
    busUploadComplete,
    busUploadCreate,
    workerUploadPart,
    mutate,
    removeUpload,
    updateUploadProgress,
    updateStatusToUploading: updateStatus,
  }

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

  const bucketsWithUploads = useMemo(() => {
    return [...new Set(uploadsList.map((upload) => upload.bucket))]
  }, [uploadsList])

  return {
    uploadFiles,
    uploadsMap,
    uploadsList,
    bucketsWithUploads,
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
