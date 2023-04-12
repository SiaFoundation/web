import { Fetcher, Key, SWRConfiguration } from 'swr'

export type SWROptions<Data> = SWRConfiguration<Data, Error, Fetcher<Data, Key>>

export interface SWRError extends Error {
  status?: number
}

export type Only<T, U> = {
  [P in keyof T]: T[P]
} & {
  [P in keyof U]?: never
}

export type Either<T, U> = Only<T, U> | Only<U, T>
