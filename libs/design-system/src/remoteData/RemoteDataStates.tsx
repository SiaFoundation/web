'use client'

import React from 'react'
import { RemoteData } from './types'

export type RemoteDataStatesProps<T> = {
  data: RemoteData<T>
  loaded: React.ReactNode | ((data: T) => React.ReactNode)
  skeleton: React.ReactNode
  noFound: React.ReactNode
  error?: React.ReactNode
}

export function RemoteDataStates<T>({
  loaded,
  skeleton,
  noFound,
  data,
  error,
}: RemoteDataStatesProps<T>) {
  if (data.state === 'loading') {
    return skeleton
  }

  if (data.state === 'loaded') {
    return typeof loaded === 'function' ? loaded(data.data) : loaded
  }

  if (data.state === 'error' && error) {
    return error
  }

  return noFound
}
