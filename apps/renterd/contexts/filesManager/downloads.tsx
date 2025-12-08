import { triggerErrorToast } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { useAuthToken } from '@siafoundation/renterd-react'
import { useCallback } from 'react'
import { FullPath, bucketAndKeyParamsFromPath } from '../../lib/paths'
import { workerObjectKeyRoute } from '@siafoundation/renterd-types'
import { minutesInMilliseconds } from '@siafoundation/units'

export function useDownloads() {
  const { settings } = useAppSettings()
  const generateAuthToken = useAuthToken()

  const getDownloadUrl = useCallback(
    (path: FullPath, token?: string) => {
      const { bucket, key } = bucketAndKeyParamsFromPath(path)
      let workerPath = `${workerObjectKeyRoute.replace(
        ':key',
        key,
      )}?bucket=${bucket}&dl=true`
      if (token) {
        workerPath += `&apikey=${token}`
      }
      // Parse settings.api if its set otherwise URL.
      // eslint-disable-next-line no-restricted-globals
      const origin = settings.api || location.origin
      const scheme = origin.startsWith('https') ? 'https' : 'http'
      const host = origin.replace('https://', '').replace('http://', '')
      return `${scheme}://${host}/api${workerPath}`
    },
    [settings],
  )

  const getAuthenticatedFileUrl = useCallback(
    (path: FullPath) => {
      const { bucket, key } = bucketAndKeyParamsFromPath(path)
      const workerPath = `${workerObjectKeyRoute.replace(
        ':key',
        key,
      )}?bucket=${bucket}`
      // Parse settings.api if its set otherwise URL.
      // eslint-disable-next-line no-restricted-globals
      const origin = settings.api || location.origin
      const scheme = origin.startsWith('https') ? 'https' : 'http'
      const host = origin.replace('https://', '').replace('http://', '')
      return `${scheme}://:${settings.password}@${host}/api${workerPath}`
    },
    [settings],
  )

  const getAuthToken = useCallback(async () => {
    const response = await generateAuthToken.post({
      params: {
        validity: minutesInMilliseconds(1),
      },
    })

    if (response.error) {
      triggerErrorToast({
        title: 'Failed to get auth token for download',
        body: response.error,
      })
      return null
    }

    return response.data?.token ?? null
  }, [generateAuthToken])

  const downloadFiles = useCallback(
    async (files: FullPath[]) => {
      const token = await getAuthToken()

      if (!token) {
        return
      }

      files.forEach(async (path) => {
        const url = getDownloadUrl(path, token)
        window.open(url)
      })
    },
    [getAuthToken, getDownloadUrl],
  )

  return {
    downloadFiles,
    getDownloadUrl,
    getAuthenticatedFileUrl,
  }
}
