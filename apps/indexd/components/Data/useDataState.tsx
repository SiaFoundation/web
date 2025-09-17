import { SWRResponse } from 'swr'

export type DataLoaded<O> = {
  state: 'loaded'
  data: O
}

export type DataLoading = {
  state: 'loading'
  data: undefined
}

export type DataNotFound = {
  state: 'notFound'
  data: undefined
}

export type DataStateResult<O> = DataLoaded<O> | DataLoading | DataNotFound

export function useDataState<I, O>({
  response,
  transform,
}: {
  response: SWRResponse<I, Error>
  transform: (data: I) => O
}): DataStateResult<O> {
  if (response.isValidating && !response.data) {
    return {
      state: 'loading',
      data: undefined,
    } as DataLoading
  }

  if (response.data) {
    return {
      state: 'loaded',
      data: transform(response.data),
    } as DataLoaded<O>
  }

  return {
    state: 'notFound',
    data: undefined,
  } as DataNotFound
}
