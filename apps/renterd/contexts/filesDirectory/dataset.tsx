import { useObjects } from '@siafoundation/renterd-react'
import { useDataset as useDatasetGeneric } from '../filesManager/dataset'
import { bucketAndKeyParamsFromPath } from '../../lib/paths'
import { useMemo } from 'react'
import { useFilesManager } from '../filesManager'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { ObjectsParams } from '@siafoundation/renterd-types'
import { usePaginationMarker } from '@siafoundation/design-system'

const defaultLimit = 50

export function useDataset() {
  const {
    activeBucketName,
    activeDirectoryPath,
    fileNamePrefixFilter,
    sortDirection,
    sortField,
  } = useFilesManager()
  const { limit, marker } = usePaginationMarker(defaultLimit)
  const pathParams = bucketAndKeyParamsFromPath(activeDirectoryPath)

  const params = useMemo(() => {
    let prefix = pathParams.key
    if (fileNamePrefixFilter) {
      prefix += fileNamePrefixFilter.startsWith('/')
        ? fileNamePrefixFilter.slice(1)
        : fileNamePrefixFilter
    }
    const p: ObjectsParams = {
      prefix,
      bucket: pathParams.bucket,
      sortby: sortField,
      sortdir: sortDirection,
      limit,
      delimiter: '/',
    }
    if (marker) {
      p.marker = marker
    }
    return p
  }, [
    fileNamePrefixFilter,
    pathParams,
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
    [response.isValidating, response.data?.objects]
  )

  const d = useDatasetGeneric({
    id: 'filesDirectory',
    objects,
  })

  return {
    limit,
    marker,
    nextMarker: response.data?.nextMarker || null,
    isMore: !!response.data?.hasMore,
    response,
    dataset: d.data,
    refresh: response.mutate,
  }
}
