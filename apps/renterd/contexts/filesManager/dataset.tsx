import { ObjEntry } from '@siafoundation/renterd-types'
import { sortBy, toPairs } from '@technically/lodash'
import useSWR from 'swr'
import { useContracts } from '../contracts'
import { ObjectData } from './types'
import {
  buildDirectoryPath,
  getFilename,
  join,
  isDirectory,
} from '../../lib/paths'
import { useFilesManager } from '.'
import { useEffect } from 'react'

type Props = {
  id: string
  objects: {
    isValidating: boolean
    data?: ObjEntry[]
  }
}

export function useDataset({ id, objects }: Props) {
  const {
    activeBucket,
    activeBucketName,
    fileNamePrefixFilter,
    uploadsList,
    sortDirection,
    sortField,
    activeDirectoryPath,
    buckets,
    setActiveDirectory,
  } = useFilesManager()
  const { dataset: allContracts } = useContracts()
  const response = useSWR<ObjectData[] | null>(
    objects.isValidating || buckets.isValidating
      ? null
      : [id, activeBucketName, activeDirectoryPath],
    () => {
      const dataMap: Record<string, ObjectData> = {}
      if (!activeBucket) {
        buckets.data?.forEach((bucket) => {
          const name = bucket.name
          const path = buildDirectoryPath(name, '')
          dataMap[name] = {
            id: path,
            path,
            bucket,
            size: 0,
            health: 0,
            name,
            onClick: () => {
              setActiveDirectory((p) => p.concat(name))
            },
            type: 'bucket',
          }
        })
      } else if (objects.data || uploadsList.length) {
        objects.data?.forEach(({ name: key, size, health }) => {
          const path = join(activeBucketName, key)
          const name = getFilename(key)
          dataMap[path] = {
            id: path,
            path,
            bucket: activeBucket,
            size,
            health,
            name,
            onClick: isDirectory(key)
              ? () => {
                  setActiveDirectory((p) => p.concat(name.slice(0, -1)))
                }
              : undefined,
            type: isDirectory(key) ? 'directory' : 'file',
          }
        })
        uploadsList
          .filter(({ path, name }) => path === join(activeDirectoryPath, name))
          .filter(({ path }) =>
            path.startsWith(join(activeBucketName, fileNamePrefixFilter))
          )
          .forEach((upload) => {
            dataMap[upload.path] = upload
          })
      }
      const all = sortBy(
        toPairs(dataMap).map((p) => p[1]),
        sortField as keyof ObjectData
      )
      if (sortDirection === 'desc') {
        all.reverse()
      }
      return all
    },
    {
      keepPreviousData: true,
    }
  )
  // refetch when the dependent data changes
  useEffect(() => {
    response.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objects.data, uploadsList, allContracts, buckets.data])
  return response
}
