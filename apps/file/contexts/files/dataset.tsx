'use client'

import { sortBy, toPairs } from '@technically/lodash'
import useSWR from 'swr'
import { ObjectData, SortField } from './types'
import { getFilename, getFilePath, isDirectory } from './paths'
import {
  ServerFilterItem,
  minutesInMilliseconds,
} from '@siafoundation/design-system'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { IDBPDatabase } from 'idb'

type ObjectDirectoryParams = {
  path: string
  limit?: number
  prefix?: string
  offset?: number
  sortBy?: 'name' | 'health'
  sortDir?: 'asc' | 'desc'
}

type Props = {
  db: IDBPDatabase | null
  activeDirectoryPath: string
  uploadsList: ObjectData[]
  sortDirection: 'asc' | 'desc'
  sortField: SortField
  filters: ServerFilterItem[]
}

const defaultLimit = 50

export function useDataset({
  db,
  activeDirectoryPath,
  uploadsList,
  sortDirection,
  sortField,
  filters,
}: Props) {
  // const router = useRouter()
  const query = useSearchParams()
  const limit = Number(query['limit'] || defaultLimit)
  const offset = Number(query['offset'] || 0)
  const fileNamePrefix =
    filters.find((f) => f.id === 'fileNamePrefix')?.value || ''

  const params = useMemo(() => {
    const p: ObjectDirectoryParams = {
      path: activeDirectoryPath,
      sortBy: sortField,
      sortDir: sortDirection,
      offset,
      limit,
    }
    if (fileNamePrefix) {
      p.prefix = fileNamePrefix
    }
    return p
  }, [
    activeDirectoryPath,
    fileNamePrefix,
    sortField,
    sortDirection,
    offset,
    limit,
  ])

  const response = useSWR<ObjectData[]>([db, 'files'], async () => {
    if (!db) {
      return []
    }
    // TODO: use params
    const files = await db.getAll('files')
    return files
  })

  const d = useSWR<ObjectData[] | null>(
    response.isValidating
      ? null
      : [response.data, uploadsList, activeDirectoryPath],
    () => {
      const dataMap: Record<string, ObjectData> = {}
      if (response.data) {
        response.data?.forEach((obj) => {
          dataMap[obj.path] = obj
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

  return {
    limit,
    offset,
    response,
    dataset: d.data,
  }
}
