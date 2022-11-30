import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  WalletSendSiacoinDialog,
  WalletSingleAddressDetailsDialog,
  TransactionDetailsDialog,
  SyncerConnectPeerDialog,
  SettingsDialog,
} from '@siafoundation/design-system'
import { StorageFolderAddDialog } from '../dialogs/StorageFolderAddDialog'
import { StorageFolderResizeDialog } from '../dialogs/StorageFolderResizeDialog'
import { StorageFolderRemoveDialog } from '../dialogs/StorageFolderRemoveDialog'
import { HostAnnounceDialog } from '../dialogs/HostAnnounceDialog'

const DialogContext = createContext({} as State)
export const useDialog = () => useContext(DialogContext)

type Props = {
  children: React.ReactNode
}

export type DialogType =
  | 'settings'
  | 'sendSiacoin'
  | 'addWallet'
  | 'transactionDetails'
  | 'addressDetails'
  | 'connectPeer'
  | 'storageFolderAdd'
  | 'storageFolderResize'
  | 'storageFolderRemove'
  | 'hostAnnounce'

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
        onOpenChange={onOpenChange}
      />
      <WalletSingleAddressDetailsDialog
        open={dialog === 'addressDetails'}
        onOpenChange={onOpenChange}
      />
      <TransactionDetailsDialog
        id={id}
        open={dialog === 'transactionDetails'}
        onOpenChange={onOpenChange}
      />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        onOpenChange={onOpenChange}
      />
      <StorageFolderAddDialog
        open={dialog === 'storageFolderAdd'}
        onOpenChange={onOpenChange}
      />
      <StorageFolderResizeDialog
        open={dialog === 'storageFolderResize'}
        onOpenChange={onOpenChange}
      />
      <StorageFolderRemoveDialog
        open={dialog === 'storageFolderRemove'}
        onOpenChange={onOpenChange}
      />
      <HostAnnounceDialog
        open={dialog === 'hostAnnounce'}
        onOpenChange={onOpenChange}
      />
      {children}
    </DialogContext.Provider>
  )
}
