import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  WalletSendSiacoinDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  TransactionDetailsDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { ControlledDialog } from '../dialogs/ControlledDialog'

const DialogContext = createContext({} as State)
export const useDialog = () => useContext(DialogContext)

type Props = {
  children: React.ReactNode
}

export type DialogType =
  | 'settings'
  | 'sendSiacoin'
  | 'transactionDetails'
  | 'addressDetails'
  | 'connectPeer'

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
      <ControlledDialog dialog="settings">
        <SettingsDialog />
      </ControlledDialog>
      <ControlledDialog dialog="transactionDetails">
        <TransactionDetailsDialog id={id} />
      </ControlledDialog>
      <ControlledDialog dialog="sendSiacoin">
        <WalletSendSiacoinDialog />
      </ControlledDialog>
      <ControlledDialog dialog="addressDetails">
        <WalletSingleAddressDetailsDialog />
      </ControlledDialog>
      <ControlledDialog dialog="connectPeer">
        <SyncerConnectPeerDialog closeDialog={closeDialog} />
      </ControlledDialog>
      {children}
    </DialogContext.Provider>
  )
}
