import { type ReactNode } from 'react'
import { Panel } from '@siafoundation/design-system'
import { Close16 } from '@siafoundation/react-icons'

type Props = {
  showCloseButton?: boolean
  onClose: () => void
  children: ReactNode
}

export function SidePanel({ showCloseButton, onClose, children }: Props) {
  return (
    <Panel className="relative p-4 h-full bg-transparent shadow-none border-none flex-1 flex flex-col w-[350px] lg:w-[450px]">
      {showCloseButton && (
        <button
          className="absolute top-3 right-3 p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
          onClick={onClose}
          aria-label="Close drawer"
          type="button"
        >
          <Close16 className="w-5 h-5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100" />
        </button>
      )}
      {children}
    </Panel>
  )
}
