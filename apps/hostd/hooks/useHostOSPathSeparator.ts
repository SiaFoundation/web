import { useSystemDirectory } from '@siafoundation/react-hostd'

export function useHostOSPathSeparator() {
  const root = useSystemDirectory({
    params: {
      path: '~',
    },
    config: {
      swr: {
        revalidateOnFocus: false,
        keepPreviousData: true,
      },
    },
  })
  return root.data?.path.includes(':\\') ? '\\' : '/'
}
