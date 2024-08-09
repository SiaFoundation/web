import { useHostState } from '@siafoundation/hostd-react'

export function useHostOSPathSeparator() {
  const state = useHostState({
    config: {
      swr: {
        revalidateOnFocus: false,
        keepPreviousData: true,
      },
    },
  })
  return state.data?.os === 'windows' ? '\\' : '/'
}
