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
  const { isUnlocked } = useAppSettings()
  const { isConnected } = useConnectivity({
    route: connectivityRoute,
  })
  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    if (!isUnlocked || !isConnected) {
      return
    }
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isUnlocked, isConnected, setOpen])

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
        contentVariants={{
          className: '!absolute !p-1 w-[450px] top-[200px]',
        }}
        bodyClassName="!px-1 !py-1"
        closeClassName="hidden"
      >
        <CmdRoot />
      </Dialog>
      {/* <Button
        className="z-20 fixed bottom-5 right-5 font-mono flex items-center gap-1"
        onClick={setOpen}
      >
        {getOS() === 'apple' ? (
          <Text font="mono" size="12">
            ⌘
          </Text>
        ) : (
          <Text font="mono" size="12">
            Ctrl
          </Text>
        )}
        <Text font="mono" size="12">
          +
        </Text>
        <Text font="mono" size="12">
          K
        </Text>
      </Button> */}
    </>
  )
}
