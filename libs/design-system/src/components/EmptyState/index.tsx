import { StateNoneMatching } from './StateNoneMatching'
import { StateNoneYet } from './StateNoneYet'
import { StateError } from './StateError'
import { StateNoneOnPage } from './StateNoneOnPage'
import React from 'react'
import { DatasetState } from '../../hooks/useDatasetState'

export function EmptyState({
  datasetState,
  noneOnPage,
  noneMatching,
  noneYet,
  error,
}: {
  datasetState: DatasetState
  noneOnPage?: React.ReactNode
  noneMatching?: React.ReactNode
  noneYet?: React.ReactNode
  error?: React.ReactNode
}) {
  return datasetState === 'noneOnPage'
    ? noneOnPage || <StateNoneOnPage />
    : datasetState === 'noneMatchingFilters'
    ? noneMatching || <StateNoneMatching />
    : datasetState === 'noneYet'
    ? noneYet || <StateNoneYet />
    : datasetState === 'error'
    ? error || <StateError />
    : null
}
