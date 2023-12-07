import { useStateHost } from '@siafoundation/react-hostd'

export function useHostOSPathSeparator() {
  const state = useStateHost({
    config: {
      swr: {
        revalidateOnFocus: false,
        keepPreviousData: true,
      },
    },
  })
  return state.data?.os === 'windows' ? '\\' : '/'
}
