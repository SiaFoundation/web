import { type ReactNode } from 'react'
import { Button, Panel, ScrollArea } from '@siafoundation/design-system'
import { Close16 } from '@siafoundation/react-icons'

type Props = {
  customCloseAction?: ReactNode
  actions?: ReactNode
  onClose?: () => void
  children: ReactNode
  heading: ReactNode
  onSubmit?: () => void
}

export function SidePanel({
  customCloseAction,
  actions,
  onClose,
  children,
  heading,
  onSubmit,
}: Props) {
  const Tag = onSubmit ? 'form' : 'div'
  return (
    <Panel className="relative h-full w-full">
      <Tag
        className="relative h-full w-full overflow-hidden flex flex-col"
        onSubmit={onSubmit}
      >
        <div className="h-[45px] z-10 flex items-center justify-between gap-2 bg-white dark:bg-graydark-200 py-2 px-2 border-b border-gray-200 dark:border-graydark-400">
          {heading}
          {customCloseAction ||
            (onClose ? (
              <Button
                className="p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
                onClick={onClose}
                aria-label="Close drawer"
                variant="ghost"
                icon="hover"
                size="none"
              >
                <Close16 className="w-5 h-5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100" />
              </Button>
            ) : null)}
        </div>
        {actions && (
          <div className="z-10 flex items-center justify-end gap-1 bg-white dark:bg-graydark-200 py-2 px-2 border-b border-gray-200 dark:border-graydark-400">
            {actions}
          </div>
        )}
        <ScrollArea className="flex-1">
          <div className="p-4">{children}</div>
        </ScrollArea>
      </Tag>
    </Panel>
  )
}
