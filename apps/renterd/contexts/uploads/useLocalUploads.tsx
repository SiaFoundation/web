import {
  useDatasetState,
  usePaginationOffset,
  useTableState,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { columnsDefaultVisible, defaultSortField, sortOptions } from './types'
import { columns } from './columns'
import { ObjectUploadData } from '../uploadsManager/types'
import { Maybe } from '@siafoundation/types'
import { useUploadsManager } from '../uploadsManager'
import { useFilesManager } from '../filesManager'

const defaultLimit = 50

export function useLocalUploads() {
  const { uploadsList } = useUploadsManager()
  const { limit, offset } = usePaginationOffset(defaultLimit)
  const { activeBucket } = useFilesManager()

  const datasetPage = useMemo<Maybe<ObjectUploadData[]>>(() => {
    return uploadsList
      .filter((upload) => upload.bucket.name === activeBucket?.name)
      .slice(offset, offset + limit)
  }, [uploadsList, offset, limit, activeBucket?.name])

  const datasetState = useDatasetState({
    datasetPage,
    isValidating: false,
    offset,
    error: undefined,
  })

  const tableState = useTableState('renterd/v0/uploads', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  return {
    datasetState,
    limit,
    offset,
    hasMore: uploadsList.length > offset + limit,
    isLoading: false,
    error: undefined,
    datasetTotal: uploadsList.length,
    datasetPageTotal: datasetPage?.length || 0,
    datasetPage,
    tableState,
  }
}
