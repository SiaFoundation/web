import { Dialog } from '@siafoundation/design-system'
import React, { createContext, useContext, useCallback, useState } from 'react'
import { AddAddressDialog } from '../dialogs/AddAddressDialog'
import { AddWalletDialog } from '../dialogs/AddWalletDialog'
import { PrivacyDialog } from '../dialogs/PrivacyDialog'

const DialogContext = createContext({} as State)
export const useDialog = () => useContext(DialogContext)

type Props = {
  children: React.ReactNode
}

type Dialog = 'privacy' | 'addAddress' | 'addWallet'

type State = {
  dialog?: Dialog
  openDialog: (dialog: Dialog) => void
  setDialog: (dialog?: Dialog) => void
  closeDialog: () => void
}

export function DialogProvider({ children }: Props) {
  const [dialog, setDialog] = useState<Dialog>()

  const openDialog = useCallback(
    (dialog: Dialog) => {
      setDialog(dialog)
    },
    [setDialog]
  )

  const closeDialog = useCallback(() => {
    setDialog(undefined)
  }, [setDialog])

  const value: State = {
    dialog,
    openDialog,
    setDialog,
    closeDialog,
  }

  return (
    <DialogContext.Provider value={value}>
      {/* <Dialog
        open={dialog === 'privacy'}
        onOpenChange={(val) => setDialog(val ? 'privacy' : undefined)}
      >
        <DialogTrigger asChild>
          <Button onClick={() => openDialog('privacy')}>foo</Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Box css={{ display: 'none' }} />
        </DialogTrigger> 
        <PrivacyDialog />
      </Dialog> */}
      <PrivacyDialog />
      <Dialog open={dialog === 'addWallet'} onOpenChange={() => closeDialog()}>
        <AddWalletDialog />
      </Dialog>
      <Dialog open={dialog === 'addAddress'} onOpenChange={() => closeDialog()}>
        <AddAddressDialog />
      </Dialog>
      {children}
    </DialogContext.Provider>
  )
}
