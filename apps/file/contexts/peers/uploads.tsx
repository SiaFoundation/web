'use client'

import {
  triggerErrorToast,
  triggerSuccessToast,
  triggerToast,
} from '@siafoundation/design-system'
import { throttle } from '@technically/lodash'
import { useCallback, useMemo, useState } from 'react'
import { PeerData } from './types'
import { getFilePath } from './paths'

type UploadProgress = PeerData & {
  controller: AbortController
}

type UploadProgressParams = Omit<UploadProgress, 'id' | 'type'>

type UploadsMap = Record<string, UploadProgress>

type Props = {
  activeDirectoryPath: string
  upload: (path: string, file: File) => void
}

export function useUploads({ activeDirectoryPath, upload }: Props) {
  const buckets = ['default']
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  const initUploadProgress = useCallback(
    (obj: UploadProgressParams) => {
      setUploadsMap((map) => ({
        ...map,
        [obj.path]: {
          id: obj.id,
          path: obj.path,
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

      if (uploadsMap[path]) {
        triggerErrorToast(`Already uploading file: ${path}`)
        return
      }

      // const controller = new AbortController()
      // const onUploadProgress = throttle(
      //   (e) =>
      //     updateUploadProgress({
      //       path,
      //       loaded: e.loaded,
      //       size: e.total,
      //     }),
      //   2000
      // )
      // initUploadProgress({
      //   path,
      //   name,
      //   loaded: 0,
      //   size: 1,
      //   controller,
      // })
      // const response = await upload.put({
      //   params: bucketAndKeyParamsFromPath(path),
      //   payload: file,
      //   config: {
      //     axios: {
      //       onUploadProgress,
      //       signal: controller.signal,
      //     },
      //   },
      // })
      const response = await upload(path, file)
      // if (response.error) {
      //   if (response.error === 'canceled') {
      //     triggerToast('File upload canceled.')
      //   } else {
      //     triggerErrorToast(response.error)
      //   }
      //   removeUpload(path)
      // } else {
      //   removeUpload(path)
      //   triggerSuccessToast(`Upload complete: ${name}`)
      // }
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
