import {
  ObjectDirectoryParams,
  useObjectDirectory,
} from '@siafoundation/react-renterd'
import { useDataset as useDatasetGeneric } from '../filesManager/dataset'
import { bucketAndKeyParamsFromPath } from '../../lib/paths'
import { minutesInMilliseconds } from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useFilesManager } from '../filesManager'

const defaultLimit = 50

export function useDataset() {
  const {
    activeBucketName,
    activeDirectoryPath,
    fileNamePrefix,
    sortDirection,
    sortField,
  } = useFilesManager()
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)

  const params = useMemo(() => {
    const p: ObjectDirectoryParams = {
      ...bucketAndKeyParamsFromPath(activeDirectoryPath),
      sortBy: sortField,
      sortDir: sortDirection,
      offset,
      limit,
    }
    if (fileNamePrefix) {
      p.prefix = fileNamePrefix.slice(1)
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

  const response = useObjectDirectory({
    disabled: !activeBucketName,
    params,
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const d = useDatasetGeneric({
    objects: {
      isValidating: response.isValidating,
      data: response.data?.entries,
    },
  })

  return {
    limit,
    offset,
    response,
    dataset: d.data,
    refresh: response.mutate,
  }
}
