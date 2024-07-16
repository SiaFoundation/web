import { useObjectList } from '@siafoundation/renterd-react'
import type { ObjectListPayload } from '@siafoundation/renterd-types'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useFilesManager } from '../filesManager'
import { useDataset as useDatasetGeneric } from '../filesManager/dataset'
import type { SortField } from '../filesManager/types'

type Props = {
  sortDirection: 'asc' | 'desc'
  sortField: SortField
}

const defaultLimit = 50

export function useDataset({ sortDirection, sortField }: Props) {
  const { activeBucketName, fileNamePrefixFilter } = useFilesManager()
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const marker = router.query.marker as string

  const params = useMemo(() => {
    const p: ObjectListPayload = {
      bucket: activeBucketName!,
      sortBy: sortField,
      sortDir: sortDirection,
      marker,
      limit,
    }
    if (fileNamePrefixFilter) {
      p.prefix = fileNamePrefixFilter.startsWith('/')
        ? fileNamePrefixFilter
        : '/' + fileNamePrefixFilter
    }
    return p
  }, [
    activeBucketName,
    fileNamePrefixFilter,
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
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const objects = useMemo(
    () => ({
      isValidating: response.isValidating,
      data: response.data?.objects,
    }),
    [response.isValidating, response.data],
  )

  const d = useDatasetGeneric({
    id: 'filesFlat',
    objects,
  })

  return {
    limit,
    marker,
    response,
    dataset: d.data,
    refresh: response.mutate,
  }
}
