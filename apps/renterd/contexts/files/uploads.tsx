import {
  triggerErrorToast,
  triggerSuccessToast,
  triggerToast,
} from '@siafoundation/design-system'
import { useBuckets, useObjectUpload } from '@siafoundation/react-renterd'
import { throttle } from 'lodash-es'
import { useCallback, useMemo, useState } from 'react'
import { ObjectData } from './types'
import {
  bucketAndKeyParamsFromPath,
  getBucketFromPath,
  getFilePath,
} from './paths'

type UploadProgress = ObjectData & {
  controller: AbortController
}

type UploadProgressParams = Omit<UploadProgress, 'id' | 'type'>

type UploadsMap = Record<string, UploadProgress>

type Props = {
  activeDirectoryPath: string
}

export function useUploads({ activeDirectoryPath }: Props) {
  const buckets = useBuckets()
  const upload = useObjectUpload()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  const initUploadProgress = useCallback(
    (obj: UploadProgressParams) => {
      setUploadsMap((map) => ({
        ...map,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          bucket: obj.bucket,
          name: obj.name,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: true,
          controller: obj.controller,
          type: 'file',
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

  const uploadCancel = useCallback((upload: UploadProgress) => {
    upload.controller.abort()
  }, [])

  const uploadFiles = async (files: File[]) => {
    files.forEach(async (file) => {
      const name = file.name
      // TODO: check if name has /prefix
      const path = getFilePath(activeDirectoryPath, name)
      const bucketName = getBucketFromPath(path)
      const bucket = buckets.data?.find((b) => b.name === bucketName)

      if (uploadsMap[path]) {
        triggerErrorToast(`Already uploading file: ${path}`)
        return
      }

      const controller = new AbortController()
      const onUploadProgress = throttle(
        (e) =>
          updateUploadProgress({
            path,
            loaded: e.loaded,
            size: e.total,
          }),
        2000
      )
      initUploadProgress({
        path,
        name,
        bucket,
        loaded: 0,
        size: 1,
        controller,
      })
      const response = await upload.put({
        params: bucketAndKeyParamsFromPath(path),
        payload: file,
        config: {
          axios: {
            onUploadProgress,
            signal: controller.signal,
          },
        },
      })
      if (response.error) {
        if (response.error === 'canceled') {
          triggerToast('File upload canceled.')
        } else {
          triggerErrorToast(response.error)
        }
        removeUpload(path)
      } else {
        removeUpload(path)
        triggerSuccessToast(`Upload complete: ${name}`)
      }
    })
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
