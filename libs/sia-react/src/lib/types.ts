import { Fetcher, Key, SWRConfiguration } from 'swr'

export type SWROptions<Data> = SWRConfiguration<
  Data,
  Error,
  Fetcher<Data, Key>
> & {
  api?: string
}

export interface SWRError extends Error {
  status?: number
}
