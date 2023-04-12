import { Either, useGetSwr } from '@siafoundation/react-core'

type Props = {
  route: string
}

type ResponseWithSynced = Either<
  {
    Synced: boolean
  },
  {
    synced: boolean
  }
>

export function useConnectivity<Response extends ResponseWithSynced>({
  route,
}: Props) {
  const w = useGetSwr<void, Response>({
    route,
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.Synced || data?.synced ? 30_000 : 1_000,
      },
    },
  })
  return {
    isConnected: !w.error,
    isSynced: w.data?.Synced || w.data?.synced,
  }
}
