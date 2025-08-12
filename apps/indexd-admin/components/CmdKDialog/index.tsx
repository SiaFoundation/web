import { Dialog, useConnectivity } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { connectivityRoute } from '../../config/routes'
import { useEffect } from 'react'
import { CmdRoot } from '../CmdRoot'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  setOpen: () => void
}

export function CmdKDialog({ open, onOpenChange, setOpen }: Props) {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const { isConnected } = useConnectivity({
    route: connectivityRoute,
  })
  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    if (!isUnlockedAndAuthedRoute || !isConnected) {
      return
    }
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        setOpen()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isUnlockedAndAuthedRoute, isConnected, setOpen])

  return (
    <>
      <Dialog
        open={open}
        title="Command palette"
        titleVisuallyHidden
        onOpenChange={onOpenChange}
        contentVariants={{
          className: '!absolute !p-1 w-[450px] top-[200px]',
        }}
        bodyClassName="!px-1 !py-1"
        closeClassName="hidden"
      >
        <CmdRoot />
      </Dialog>
    </>
  )
}
