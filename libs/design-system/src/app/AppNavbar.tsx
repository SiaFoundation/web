import { Text } from '../core/Text'

type Props = {
  title?: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
  stats?: React.ReactNode
}

export const navbarAppHeight = 60

export function AppNavbar({ title, nav, stats, actions }: Props) {
  return (
    <>
      <div className="flex items-center gap-2 px-6 h-14 z-10 bg-white dark:bg-graydark-50 border-b border-gray-500 dark:border-graydark-500">
        {title ? (
          typeof title === 'string' ? (
            <Text
              font="mono"
              size="18"
              weight="bold"
              className="hidden lg:block relative -top-px"
            >
              {title}
            </Text>
          ) : (
            title
          )
        ) : null}
        <div className="flex-1 flex gap-4 items-center justify-between h-full px-1 -mx-1 overflow-x-hidden">
          <div className="flex gap-2 items-center h-full flex-1 overflow-x-hidden">
            {nav}
          </div>
          <div className="flex gap-2 items-center h-full">{actions}</div>
        </div>
      </div>
      {stats && (
        <div className="flex items-center gap-2 px-6 py-3 z-10 bg-gray-50 dark:bg-graydark-50 border-b border-gray-500 dark:border-graydark-300">
          {stats}
        </div>
      )}
    </>
  )
}
