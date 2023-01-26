import { Fetcher, Key, SWRConfiguration } from 'swr'

export type SWROptions<Data> = SWRConfiguration<Data, Error, Fetcher<Data, Key>>

export interface SWRError extends Error {
  status?: number
}
