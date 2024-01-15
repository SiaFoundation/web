'use client'

import { triggerErrorToast, triggerToast } from '@siafoundation/design-system'
import { throttle } from '@technically/lodash'
import { useCallback, useMemo, useState } from 'react'
import { FullPath, getFilename } from './paths'
import { PeerData } from './types'

type DownloadProgress = PeerData & {
  controller: AbortController
}

type DownloadProgressParams = Omit<DownloadProgress, 'id' | 'type'>

type DownloadsMap = Record<string, DownloadProgress>

export function useDownloads() {
  // const download = useObjectDownloadFunc()
  const [downloadsMap, setDownloadsMap] = useState<DownloadsMap>({})

  const initDownloadProgress = useCallback(
    (obj: DownloadProgressParams) => {
      setDownloadsMap((map) => ({
        ...map,
        [obj.path]: {
          id: obj.path,
          path: obj.path,
          name: obj.name,
          size: obj.size,
          loaded: obj.loaded,
          isUploading: false,
          controller: obj.controller,
          type: 'file',
        },
      }))
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

  const downloadFiles = async (files: FullPath[]) => {
    files.forEach(async (path) => {
      let isDone = false
      const name = getFilename(path)

      if (downloadsMap[path]) {
        triggerErrorToast(`Already downloading file: ${path}`)
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
        name,
        loaded: 0,
        size: 1,
        controller,
      })
      // const response = await download.get(name, {
      //   params: bucketAndKeyParamsFromPath(path),
      //   config: {
      //     axios: {
      //       onDownloadProgress,
      //       signal: controller.signal,
      //     },
      //   },
      // })
      // isDone = true
      // if (response.error) {
      //   if (response.error === 'canceled') {
      //     triggerToast('File download canceled.')
      //   } else {
      //     triggerErrorToast(response.error)
      //   }
      //   removeDownload(path)
      // } else {
      //   removeDownload(path)
      //   // triggerToast(`Download complete: ${name}`)
      // }
    })
  }

  const downloadsList = useMemo(
    () => Object.entries(downloadsMap).map((d) => d[1]),
    [downloadsMap]
  )

  return {
    downloadFiles,
    downloadsList,
    downloadCancel,
  }
}
