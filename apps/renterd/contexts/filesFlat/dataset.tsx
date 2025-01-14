import { useObjects } from '@siafoundation/renterd-react'
import { SortField } from '../filesManager/types'
import { useDataset as useDatasetGeneric } from '../filesManager/dataset'
import { useMemo } from 'react'
import { useFilesManager } from '../filesManager'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { ObjectsParams } from '@siafoundation/renterd-types'
import { usePaginationMarker } from '@siafoundation/design-system'

type Props = {
  tableState: {
    sortDirection: 'asc' | 'desc'
    sortField: SortField
  }
}

const defaultLimit = 50

export function useDataset({ tableState }: Props) {
  const { activeBucketName, fileNamePrefixFilter } = useFilesManager()
  const { limit, marker } = usePaginationMarker(defaultLimit)

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
      sortby: tableState.sortField,
      sortdir: tableState.sortDirection,
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
    tableState.sortField,
    tableState.sortDirection,
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
    tableState,
  })

  return {
    limit,
    marker,
    nextMarker: response.data?.nextMarker || null,
    response,
    isMore: !!response.data?.hasMore,
    dataset: d.data,
    refresh: response.mutate,
  }
}
