import { ObjectMetadata } from '@siafoundation/renterd-types'
import { sortBy, toPairs } from '@technically/lodash'
import useSWR from 'swr'
import { useContracts } from '../contracts'
import { ObjectData } from './types'
import {
  buildDirectoryPath,
  getFilename,
  join,
  isDirectory,
  getKeyFromPath,
} from '../../lib/paths'
import { useFilesManager } from '.'
import { useEffect } from 'react'
import { Maybe } from '@siafoundation/types'
import { useUploadsManager } from '../uploadsManager'

type Props = {
  id: string
  objects: {
    isValidating: boolean
    data?: ObjectMetadata[]
  }
  tableState: {
    sortField: keyof ObjectData
    sortDirection: 'asc' | 'desc'
  }
}

export function useDataset({ id, objects, tableState }: Props) {
  const {
    activeBucket,
    activeBucketName,
    fileNamePrefixFilter,
    activeDirectoryPath,
    buckets,
    setActiveDirectory,
  } = useFilesManager()
  const { uploadsList } = useUploadsManager()
  const { dataset: allContracts } = useContracts()
  const response = useSWR<Maybe<ObjectData[]>>(
    objects.isValidating || buckets.isValidating
      ? undefined
      : [id, activeBucketName, activeDirectoryPath],
    () => {
      const dataMap: Record<string, ObjectData> = {}
      if (!activeBucket) {
        buckets.data?.forEach((bucket) => {
          const name = bucket.name
          const path = buildDirectoryPath(name, '')
          const key = getKeyFromPath(path)
          dataMap[name] = {
            id: path,
            path,
            bucket,
            key,
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
        objects.data?.forEach(({ key, size, health }) => {
          const path = join(activeBucket.name, key)
          const name = getFilename(key)
          dataMap[path] = {
            id: path,
            path,
            bucket: activeBucket,
            key,
            size,
            health,
            name,
            type: isDirectory(key) ? 'directory' : 'file',
          }
        })
        // Find intermediate directories that may not exist yet and add them
        // so that they show up before the files are fully uploaded.
        for (const upload of uploadsList) {
          if (upload.path.startsWith(activeDirectoryPath)) {
            // Must be a child of the active directory.
            if (!upload.path.startsWith(activeDirectoryPath)) {
              continue
            }
            const nestedPath = upload.path.slice(activeDirectoryPath.length)
            const parts = nestedPath.split('/')
            // Must be a directory with nested children.
            if (parts.length <= 1) {
              continue
            }
            const newDirName = parts[0]
            const newDirPath = join(activeDirectoryPath, newDirName) + '/'
            // Must not already exist.
            if (dataMap[newDirPath]) {
              continue
            }
            dataMap[newDirPath] = {
              id: newDirPath,
              path: newDirPath,
              bucket: activeBucket,
              key: getKeyFromPath(newDirPath),
              size: 0,
              health: 0,
              name: newDirName + '/',
              type: 'directory',
            }
          }
        }
        // Add file uploads that are direct children of the active directory.
        uploadsList
          .filter(({ path }) => {
            if (!path.startsWith(activeDirectoryPath)) {
              return false
            }
            const parts = path.slice(activeDirectoryPath.length).split('/')
            const isDirectChild = parts.length === 1
            const prefix = fileNamePrefixFilter
              ? join(activeDirectoryPath, fileNamePrefixFilter)
              : activeDirectoryPath
            return isDirectChild && path.startsWith(prefix)
          })
          .forEach((upload) => {
            dataMap[upload.path] = upload
          })
      }
      const all = sortBy(
        toPairs(dataMap).map((p) => p[1]),
        tableState.sortField as keyof ObjectData
      )
      if (tableState.sortDirection === 'desc') {
        all.reverse()
      }
      return all
    },
    {
      keepPreviousData: true,
    }
  )
  // Refetch when the dependent data changes. Adding these object reference
  // dependencies to the swr key would cause the swr cache to grow indefinitely.
  useEffect(() => {
    response.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    objects.data,
    uploadsList,
    allContracts,
    buckets.data,
    fileNamePrefixFilter,
  ])
  return response
}
