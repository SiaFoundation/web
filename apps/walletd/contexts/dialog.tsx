import React, { createContext, useContext, useCallback, useState } from 'react'
// import { WalletAddAddressDialog } from '../dialogs/WalletAddAddressDialog'
// import { AddWalletDialog } from '../dialogs/AddWalletDialog'

const DialogContext = createContext({} as State)
export const useDialog = () => useContext(DialogContext)

type Props = {
  children: React.ReactNode
}

export type DialogType = 'privacy' | 'addAddress' | 'addWallet'

type State = {
  dialog?: DialogType
  id?: string
  openDialog: (dialog: DialogType, id?: string) => void
  closeDialog: () => void
}

export function DialogProvider({ children }: Props) {
  const [dialog, setDialog] = useState<DialogType>()
  const [id, setId] = useState<string>()

  const openDialog = useCallback(
    (dialog: DialogType, id?: string) => {
      setDialog(dialog)
      setId(id)
    },
    [setDialog, setId]
  )

  const closeDialog = useCallback(() => {
    setDialog(undefined)
    setId(undefined)
  }, [setDialog, setId])

  const value: State = {
    dialog,
    id,
    openDialog,
    closeDialog,
  }

  return (
    <DialogContext.Provider value={value}>
      {/* <PrivacyDialog />
      <TransactionDetailsDialog />
      <AddWalletDialog />
      <WalletAddAddressDialog />
      <AddressDetailsDialog />
      <SyncerConnectPeerDialog /> */}
      {children}
    </DialogContext.Provider>
  )
}
