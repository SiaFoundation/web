export type Dep<T> = {
  isLoading?: boolean
  data: T | undefined
  isValidating: boolean
  error?: Error
}

export type FetchingInfo = {
  isLoading?: boolean
  isValidating: boolean
}

export type DataLoaded<O> = {
  state: 'loaded'
  data: O
} & FetchingInfo

export type DataLoading = {
  state: 'loading'
  data: undefined
} & FetchingInfo

export type DataEmptyNotFound = {
  state: 'notFound'
  data: undefined
} & FetchingInfo

export type DataError = {
  state: 'error'
  data: undefined
  error?: Error
} & FetchingInfo

export type DataEmptyNoneYet = {
  state: 'noneYet'
  data: undefined
} & FetchingInfo

export type DataEmptyNoneMatchingFilters = {
  state: 'noneMatchingFilters'
  data: undefined
} & FetchingInfo

export type DataEmptyNoneOnPage = {
  state: 'noneOnPage'
  data: undefined
} & FetchingInfo

export type RemoteData<O> =
  | DataLoaded<O>
  | DataLoading
  | DataError
  | DataEmptyNotFound

export type RemoteDataset<O> =
  | DataLoaded<O>
  | DataLoading
  | DataError
  | DataEmptyNoneYet
  | DataEmptyNoneMatchingFilters
  | DataEmptyNoneOnPage

export type ValuesOf<TDeps extends Record<string, Dep<unknown>>> = {
  [K in keyof TDeps]: NonNullable<TDeps[K]['data']>
}

export function checkAllHaveData<TDeps extends Record<string, Dep<unknown>>>(
  deps: TDeps,
): deps is TDeps & { [K in keyof TDeps]: Dep<NonNullable<TDeps[K]['data']>> } {
  return Object.values(deps).every((d) => d.data !== undefined)
}

export function checkAllLoaded<TDeps extends Record<string, Dep<unknown>>>(
  deps: TDeps,
): deps is TDeps & { [K in keyof TDeps]: Dep<NonNullable<TDeps[K]['data']>> } {
  return Object.values(deps).every((d) => d.data)
}

export function checkAnyHaveError<TDeps extends Record<string, Dep<unknown>>>(
  deps: TDeps,
): Error | undefined {
  return Object.values(deps).find((d) => d.error !== undefined)?.error
}

export function checkAnyRevalidating<
  TDeps extends Record<string, Dep<unknown>>,
>(deps: TDeps): deps is TDeps & { [K in keyof TDeps]: Dep<boolean> } {
  return Object.values(deps).some((d) => d.isValidating)
}

export function checkAnyLoading<TDeps extends Record<string, Dep<unknown>>>(
  deps: TDeps,
): deps is TDeps & { [K in keyof TDeps]: Dep<boolean> } {
  return Object.values(deps).some((d) => d.isLoading)
}

export function getValues<TDeps extends Record<string, Dep<unknown>>>(
  deps: TDeps,
): ValuesOf<TDeps> {
  return Object.fromEntries(
    Object.entries(deps).map(([k, v]) => [k, v.data]),
  ) as ValuesOf<TDeps>
}
