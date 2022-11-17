import { Text } from '../core/Text'

type Props = {
  title?: string
  filters?: React.ReactNode
  actions?: React.ReactNode
}

export const navbarAppHeight = 60

export function AppNavbar({ title, filters, actions }: Props) {
  return (
    <div className="flex items-center gap-4 px-6 z-10 bg-white dark:bg-graydark-50 border-b border-gray-500 dark:border-graydark-500">
      {title && (
        <Text font="mono" size="18" weight="bold" className="hidden lg:block">
          {title}
        </Text>
      )}
      <div className="flex-1">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">{filters}</div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 items-center">{actions}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
