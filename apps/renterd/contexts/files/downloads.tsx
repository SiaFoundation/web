import { triggerErrorToast } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { useObjectDownloadFunc } from '@siafoundation/react-renterd'
import { throttle } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { ObjectData } from './types'
import {
  FullPath,
  bucketAndKeyParamsFromPath,
  getBucketFromPath,
  getFilename,
} from './paths'

type UploadsMap = Record<string, ObjectData>

type Props = {
  activeDirectoryPath: string
}

export function useDownloads({ activeDirectoryPath }: Props) {
  const download = useObjectDownloadFunc()
  const [downloadsMap, setDownloadsMap] = useState<UploadsMap>({})

  const updateDownloadProgress = useCallback(
    (obj: {
      path: string
      bucket: string
      name: string
      loaded: number
      size: number
    }) => {
      setDownloadsMap((download) => ({
        ...download,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          name: obj.name,
          bucket: obj.bucket,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: false,
          type: 'file',
        },
      }))
    },
    [setDownloadsMap]
  )

  const removeDownload = useCallback(
    (path: string) => {
      setDownloadsMap((downloads) => {
        delete downloads[path]
        return {
          ...downloads,
        }
      })
    },
    [setDownloadsMap]
  )

  const downloadFiles = async (files: FullPath[]) => {
    files.forEach(async (path) => {
      let isDone = false
      const bucket = getBucketFromPath(path)
      const name = getFilename(path)
      const onDownloadProgress = throttle((e) => {
        if (isDone) {
          return
        }
        updateDownloadProgress({
          name,
          path,
          bucket,
          loaded: e.loaded,
          size: e.total,
        })
      }, 2000)
      updateDownloadProgress({
        name,
        path,
        bucket,
        loaded: 0,
        size: 1,
      })
      const response = await download.get(name, {
        params: bucketAndKeyParamsFromPath(path),
        config: {
          axios: {
            onDownloadProgress,
          },
        },
      })
      isDone = true
      if (response.error) {
        triggerErrorToast(response.error)
        removeDownload(path)
      } else {
        removeDownload(path)
        // triggerToast(`Download complete: ${name}`)
      }
    })
  }

  const downloadsList = useMemo(
    () => Object.entries(downloadsMap).map((d) => d[1]),
    [downloadsMap]
  )

  const { settings } = useAppSettings()
  const getFileUrl = useCallback(
    (name: string, authenticated: boolean) => {
      const path = `/worker/objects${name}`
      // Parse settings.api if its set otherwise URL
      const origin = settings.api || location.origin
      const scheme = origin.startsWith('https') ? 'https' : 'http'
      const host = origin.replace('https://', '').replace('http://', '')
      if (authenticated) {
        return `${scheme}://:${settings.password}@${host}/api${path}`
      }
      return `${scheme}://${host}/api${path}`
    },
    [settings]
  )

  return {
    downloadFiles,
    downloadsList,
    getFileUrl,
  }
}
