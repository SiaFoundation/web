import { useObjects } from '@siafoundation/renterd-react'
import { SortField } from '../filesManager/types'
import { useDataset as useDatasetGeneric } from '../filesManager/dataset'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFilesManager } from '../filesManager'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { ObjectsParams } from '@siafoundation/renterd-types'

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
    let prefix = ''
    if (fileNamePrefixFilter) {
      prefix += fileNamePrefixFilter.startsWith('/')
        ? fileNamePrefixFilter.slice(1)
        : fileNamePrefixFilter
    }
    const p: ObjectsParams = {
      prefix,
      bucket: activeBucketName,
      sortBy: sortField,
      sortDir: sortDirection,
      limit,
      delimiter: '',
    }
    if (marker) {
      p.marker = marker
    }
    return p
  }, [
    fileNamePrefixFilter,
    activeBucketName,
    sortField,
    sortDirection,
    marker,
    limit,
  ])

  const response = useObjects({
    disabled: !activeBucketName,
    params,
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
    [response.isValidating, response.data]
  )

  const d = useDatasetGeneric({
    id: 'filesFlat',
    objects,
  })

  return {
    limit,
    marker,
    response,
    isMore: !!response.data?.hasMore,
    dataset: d.data,
    refresh: response.mutate,
  }
}
