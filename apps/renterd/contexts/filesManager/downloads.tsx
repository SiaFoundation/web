import { triggerErrorToast, triggerToast } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { useBuckets, useObjectDownloadFunc } from '@siafoundation/renterd-react'
import { throttle } from '@technically/lodash'
import { useCallback, useMemo, useState } from 'react'
import {
  FullPath,
  bucketAndKeyParamsFromPath,
  getBucketFromPath,
  getFilename,
  getKeyFromPath,
} from '../../lib/paths'
import { ObjectData } from './types'

type DownloadProgress = ObjectData & {
  controller: AbortController
}

type DownloadProgressParams = Omit<DownloadProgress, 'id' | 'type'>

type DownloadsMap = Record<string, DownloadProgress>

export function useDownloads() {
  const buckets = useBuckets()
  const download = useObjectDownloadFunc()
  const [downloadsMap, setDownloadsMap] = useState<DownloadsMap>({})

  const initDownloadProgress = useCallback(
    (obj: DownloadProgressParams) => {
      setDownloadsMap((map) => {
        const downloadProgress: DownloadProgress = {
          id: obj.path,
          path: obj.path,
          key: obj.key,
          bucket: obj.bucket,
          name: obj.name,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: false,
          controller: obj.controller,
          type: 'file',
        }
        return {
          ...map,
          [obj.path]: downloadProgress,
        }
      })
    },
    [setDownloadsMap]
  )

  const updateDownloadProgress = useCallback(
    (obj: { path: string; loaded: number; size: number }) => {
      setDownloadsMap((map) => {
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

  const downloadCancel = useCallback((download: DownloadProgress) => {
    download.controller.abort()
  }, [])

  const downloadFiles = useCallback(
    async (files: FullPath[]) => {
      files.forEach(async (path) => {
        let isDone = false
        const bucketName = getBucketFromPath(path)
        const key = getKeyFromPath(path)
        const bucket = buckets.data?.find((b) => b.name === bucketName)
        if (!bucket) {
          triggerErrorToast({ title: 'Bucket not found', body: bucketName })
          return
        }
        const name = getFilename(path)

        if (downloadsMap[path]) {
          triggerErrorToast({ title: 'Already downloading file', body: path })
          return
        }

        const controller = new AbortController()
        const onDownloadProgress = throttle((e) => {
          if (isDone) {
            return
          }
          updateDownloadProgress({
            path,
            loaded: e.loaded,
            size: e.total,
          })
        }, 2000)
        initDownloadProgress({
          path,
          key,
          name,
          bucket,
          loaded: 0,
          size: 1,
          controller,
        })
        const response = await download.get(name, {
          params: bucketAndKeyParamsFromPath(path),
          config: {
            axios: {
              onDownloadProgress,
              signal: controller.signal,
            },
          },
        })
        isDone = true
        if (response.error) {
          if (response.error === 'canceled') {
            triggerToast({ title: 'File download canceled' })
          } else {
            triggerErrorToast({
              title: 'Error downloading file',
              body: response.error,
            })
          }
          removeDownload(path)
        } else {
          removeDownload(path)
        }
      })
    },
    [
      buckets.data,
      download,
      downloadsMap,
      initDownloadProgress,
      removeDownload,
      updateDownloadProgress,
    ]
  )

  const downloadsList = useMemo(
    () => Object.entries(downloadsMap).map((d) => d[1]),
    [downloadsMap]
  )

  const { settings } = useAppSettings()
  const getFileUrl = useCallback(
    (path: FullPath, authenticated: boolean) => {
      const { bucket, key } = bucketAndKeyParamsFromPath(path)
      const workerPath = `/worker/objects/${key}?bucket=${bucket}`
      // Parse settings.api if its set otherwise URL
      const origin = settings.api || location.origin
      const scheme = origin.startsWith('https') ? 'https' : 'http'
      const host = origin.replace('https://', '').replace('http://', '')
      if (authenticated) {
        return `${scheme}://:${settings.password}@${host}/api${workerPath}`
      }
      return `${scheme}://${host}/api${workerPath}`
    },
    [settings]
  )

  return {
    downloadFiles,
    downloadsList,
    getFileUrl,
    downloadCancel,
  }
}
