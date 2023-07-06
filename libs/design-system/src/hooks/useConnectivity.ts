import { useGetSwr } from '@siafoundation/react-core'

type Props = {
  route: string
}

export function useConnectivity({ route }: Props) {
  const w = useGetSwr<void, Response>({
    route,
    config: {
      swr: {
        refreshInterval: 30_000,
      },
    },
  })
  return {
    isConnected: !w.error,
    isValidating: w.isValidating,
  }
}
