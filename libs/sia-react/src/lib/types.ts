import { Fetcher, Key, SWRConfiguration } from 'swr'

export type SWROptions<Data> = SWRConfiguration<
  Data,
  Error,
  Fetcher<Data, Key>
> & {
  api?: string
}
