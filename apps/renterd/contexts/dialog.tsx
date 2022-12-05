import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  WalletSendSiacoinDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  TransactionDetailsDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'

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
  | 'hostScoreSet'
  | 'hostBlocklistAdd'
  | 'hostBlocklistRemove'
  | 'objectDownload'
  | 'objectDelete'

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

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        closeDialog()
      }
    },
    [closeDialog]
  )

  const value: State = {
    dialog,
    id,
    openDialog,
    closeDialog,
  }

  return (
    <DialogContext.Provider value={value}>
      <SettingsDialog
        open={dialog === 'settings'}
        onOpenChange={onOpenChange}
      />
      <WalletSendSiacoinDialog
        open={dialog === 'sendSiacoin'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletSingleAddressDetailsDialog
        open={dialog === 'addressDetails'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <TransactionDetailsDialog
        id={id}
        open={dialog === 'transactionDetails'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      {children}
    </DialogContext.Provider>
  )
}
