'use client'

import React from 'react'
import { RemoteData } from './types'

export type RemoteDataStatesProps<T> = {
  data: RemoteData<T>
  loaded: React.ReactNode | ((data: T) => React.ReactNode)
  loading: React.ReactNode
  notFound: React.ReactNode
  error?: React.ReactNode
}

export function RemoteDataStates<T>({
  loaded,
  loading,
  notFound,
  data,
  error,
}: RemoteDataStatesProps<T>) {
  if (data.state === 'loading') {
    return loading
  }

  if (data.state === 'loaded') {
    return typeof loaded === 'function' ? loaded(data.data) : loaded
  }

  if (data.state === 'error' && error) {
    return error
  }

  return notFound
}
