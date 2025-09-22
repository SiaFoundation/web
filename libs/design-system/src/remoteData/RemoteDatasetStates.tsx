'use client'

import React from 'react'
import { StateNoneOnPage } from '../components/EmptyState/StateNoneOnPage'
import { StateNoneYet } from '../components/EmptyState/StateNoneYet'
import { StateNoneMatching } from '../components/EmptyState/StateNoneMatching'
import { StateError } from '../components/EmptyState/StateError'
import { RemoteDataset } from './types'

export type RemoteDatasetStatesProps<T> = {
  dataset: RemoteDataset<T>
  loaded: React.ReactNode | ((data: T) => React.ReactNode)
  loading?: React.ReactNode
  noneOnPage?: React.ReactNode
  noneYet?: React.ReactNode
  noneMatchingFilters?: React.ReactNode
  error?: React.ReactNode
}

export function RemoteDatasetStates<T>({
  loaded,
  loading,
  noneOnPage = <StateNoneOnPage />,
  noneYet = <StateNoneYet />,
  noneMatchingFilters = <StateNoneMatching />,
  dataset,
  error = <StateError />,
}: RemoteDatasetStatesProps<T>) {
  if (dataset.state === 'loading') {
    return loading ?? null
  }

  if (dataset.state === 'loaded') {
    return typeof loaded === 'function' ? loaded(dataset.data) : loaded
  }

  if (dataset.state === 'error') {
    return error ?? null
  }

  if (dataset.state === 'noneOnPage') {
    return noneOnPage ?? null
  }

  if (dataset.state === 'noneMatchingFilters') {
    return noneMatchingFilters ?? null
  }

  if (dataset.state === 'noneYet') {
    return noneYet ?? null
  }

  return null
}
