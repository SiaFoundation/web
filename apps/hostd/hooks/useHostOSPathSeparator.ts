import { useStateHost } from '@siafoundation/hostd-react'

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
