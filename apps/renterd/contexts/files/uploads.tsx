import { triggerErrorToast, triggerToast } from '@siafoundation/design-system'
import { useObjectUpload } from '@siafoundation/react-renterd'
import { throttle } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { ObjectData } from './types'
import {
  bucketAndKeyParamsFromPath,
  getBucketFromPath,
  getFilePath,
} from './paths'

type UploadsMap = Record<string, ObjectData>

type Props = {
  activeDirectoryPath: string
}

export function useUploads({ activeDirectoryPath }: Props) {
  const upload = useObjectUpload()
  const [uploadsMap, setUploadsMap] = useState<UploadsMap>({})

  const updateUploadProgress = useCallback(
    (obj: {
      path: string
      name: string
      bucket: string
      loaded: number
      size: number
    }) => {
      setUploadsMap((uploads) => ({
        ...uploads,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          bucket: obj.bucket,
          name: obj.name,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: true,
          type: 'file',
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

  const uploadFiles = async (files: File[]) => {
    files.forEach(async (file) => {
      const name = file.name
      // TODO: check if name has /prefix
      const path = getFilePath(activeDirectoryPath, name)
      const bucket = getBucketFromPath(path)
      const onUploadProgress = throttle(
        (e) =>
          updateUploadProgress({
            name,
            path,
            bucket,
            loaded: e.loaded,
            size: e.total,
          }),
        2000
      )
      updateUploadProgress({
        name,
        path,
        bucket,
        loaded: 0,
        size: 1,
      })
      const response = await upload.put({
        params: bucketAndKeyParamsFromPath(path),
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

  return {
    uploadFiles,
    uploadsList,
  }
}
