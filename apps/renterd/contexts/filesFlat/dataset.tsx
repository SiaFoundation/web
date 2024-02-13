import { ObjectListParams, useObjectList } from '@siafoundation/react-renterd'
import { SortField } from '../filesManager/types'
import { useDataset as useDatasetGeneric } from '../filesManager/dataset'
import {
  ServerFilterItem,
  minutesInMilliseconds,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFilesManager } from '../filesManager'

type Props = {
  setActiveDirectory: (func: (directory: string[]) => string[]) => void
  activeDirectoryPath: string
  sortDirection: 'asc' | 'desc'
  sortField: SortField
  filters: ServerFilterItem[]
}

const defaultLimit = 50

export function useDataset({ sortDirection, sortField, filters }: Props) {
  const { activeBucketName, fileNamePrefix } = useFilesManager()
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const marker = router.query.marker as string

  const params = useMemo(() => {
    const p: ObjectListParams = {
      bucket: activeBucketName,
      sortBy: sortField,
      sortDir: sortDirection,
      marker,
      limit,
    }
    if (fileNamePrefix) {
      p.prefix = fileNamePrefix
    }
    return p
  }, [
    activeBucketName,
    fileNamePrefix,
    sortField,
    sortDirection,
    marker,
    limit,
  ])

  const response = useObjectList({
    disabled: !activeBucketName,
    payload: params,
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const d = useDatasetGeneric({
    objects: {
      isValidating: response.isValidating,
      data: response.data?.objects,
    },
  })

  return {
    limit,
    marker,
    response,
    dataset: d.data,
    refresh: response.mutate,
  }
}
