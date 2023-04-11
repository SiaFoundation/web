import { useGetSwr } from '@siafoundation/react-core'

type Props = {
  route: string
}

export function useConnectivity<Response extends { Synced: boolean }>({
  route,
}: Props) {
  const w = useGetSwr<void, Response>({
    route,
    config: {
      swr: {
        refreshInterval: (data) => (data?.Synced ? 30_000 : 1_000),
      },
    },
  })
  return {
    isConnected: !w.error,
    isSynced: w.data?.Synced,
  }
}
