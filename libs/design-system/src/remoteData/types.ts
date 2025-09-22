export type Remote<T> = {
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

export type ValuesOf<Remotes extends Record<string, Remote<unknown>>> = {
  [K in keyof Remotes]: NonNullable<Remotes[K]['data']>
}

export function checkAllHaveData<
  Remotes extends Record<string, Remote<unknown>>,
>(
  deps: Remotes,
): deps is Remotes & {
  [K in keyof Remotes]: Remote<NonNullable<Remotes[K]['data']>>
} {
  return Object.values(deps).every((d) => d.data !== undefined)
}

export function checkAnyHaveError<
  Remotes extends Record<string, Remote<unknown>>,
>(deps: Remotes): Error | undefined {
  return Object.values(deps).find((d) => d.error !== undefined)?.error
}

export function checkAnyValidating<
  Remotes extends Record<string, Remote<unknown>>,
>(deps: Remotes): deps is Remotes & { [K in keyof Remotes]: Remote<boolean> } {
  return Object.values(deps).some((d) => d.isValidating)
}

export function checkAnyLoading<
  Remotes extends Record<string, Remote<unknown>>,
>(deps: Remotes): deps is Remotes & { [K in keyof Remotes]: Remote<boolean> } {
  return Object.values(deps).some((d) => d.isLoading)
}

export function getValues<Remotes extends Record<string, Remote<unknown>>>(
  deps: Remotes,
): ValuesOf<Remotes> {
  return Object.fromEntries(
    Object.entries(deps).map(([k, v]) => [k, v.data]),
  ) as ValuesOf<Remotes>
}
