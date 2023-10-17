import { useBuckets, useObjectDirectory } from '@siafoundation/react-renterd'
import { sortBy, toPairs } from 'lodash'
import useSWR from 'swr'
import { useContracts } from '../contracts'
import { ObjectData } from './types'
import {
  bucketAndKeyParamsFromPath,
  bucketAndResponseKeyToFilePath,
  getBucketFromPath,
  getDirPath,
  getFilename,
  getFilePath,
  isDirectory,
} from './paths'
import { minutesInMilliseconds } from '@siafoundation/design-system'

type Props = {
  activeDirectoryPath: string
  uploadsList: ObjectData[]
}

export function useDataset({ activeDirectoryPath, uploadsList }: Props) {
  const buckets = useBuckets()

  const bucket = getBucketFromPath(activeDirectoryPath)
  const response = useObjectDirectory({
    disabled: !bucket,
    params: bucketAndKeyParamsFromPath(activeDirectoryPath),
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const { dataset: allContracts } = useContracts()

  const d = useSWR<ObjectData[] | null>(
    response.isValidating || buckets.isValidating
      ? null
      : [
          response.data,
          uploadsList,
          allContracts,
          buckets.data,
          bucket,
          activeDirectoryPath,
        ],
    () => {
      const dataMap: Record<string, ObjectData> = {}
      if (!bucket) {
        buckets.data?.forEach(({ name }) => {
          const bucket = name
          const path = getDirPath(bucket, '')
          dataMap[name] = {
            id: path,
            path,
            bucket,
            size: 0,
            health: 0,
            name: name,
            type: 'bucket',
          }
        })
      } else if (response.data) {
        response.data.entries?.forEach(({ name: key, size, health }) => {
          const path = bucketAndResponseKeyToFilePath(bucket, key)
          dataMap[path] = {
            id: path,
            path,
            bucket,
            size,
            health,
            name: getFilename(key),
            type: isDirectory(key) ? 'directory' : 'file',
          }
        })
        uploadsList
          .filter(
            ({ path, name }) => path === getFilePath(activeDirectoryPath, name)
          )
          .forEach((upload) => {
            dataMap[upload.path] = upload
          })
      }
      const all = sortBy(
        toPairs(dataMap).map((p) => p[1]),
        'path'
      )
      return all
    },
    {
      keepPreviousData: true,
    }
  )

  return {
    response,
    dataset: d.data,
  }
}
