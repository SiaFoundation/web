import React, { createContext, useContext, useCallback, useState } from 'react'
import { WalletAddAddressDialog } from '../dialogs/WalletAddAddressDialog'
import { AddressDetailsDialog } from '../dialogs/AddressDetailsDialog'
import { AddWalletDialog } from '../dialogs/AddWalletDialog'
import { ControlledDialog } from '../dialogs/ControlledDialog'
import { TransactionDetailsDialog } from '../dialogs/TransactionDetailsDialog'
import { SyncerConnectPeerDialog } from '../dialogs/SyncerConnectPeerDialog'
import { StorageFolderAddDialog } from '../dialogs/StorageFolderAddDialog'
import { StorageFolderResizeDialog } from '../dialogs/StorageFolderResizeDialog'
import { StorageFolderRemoveDialog } from '../dialogs/StorageFolderRemoveDialog'
import { HostAnnounceDialog } from '../dialogs/HostAnnounceDialog'
import { SettingsDialog } from '../dialogs/SettingsDialog'

const DialogContext = createContext({} as State)
export const useDialog = () => useContext(DialogContext)

type Props = {
  children: React.ReactNode
}

export type DialogType =
  | 'settings'
  | 'addAddress'
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
        <TransactionDetailsDialog />
      </ControlledDialog>
      <ControlledDialog dialog="addWallet">
        <AddWalletDialog />
      </ControlledDialog>
      <ControlledDialog dialog="addAddress">
        <WalletAddAddressDialog />
      </ControlledDialog>
      <ControlledDialog dialog="addressDetails">
        <AddressDetailsDialog />
      </ControlledDialog>
      <ControlledDialog dialog="connectPeer">
        <SyncerConnectPeerDialog />
      </ControlledDialog>
      <ControlledDialog dialog="storageFolderAdd">
        <StorageFolderAddDialog />
      </ControlledDialog>
      <ControlledDialog dialog="storageFolderResize">
        <StorageFolderResizeDialog />
      </ControlledDialog>
      <ControlledDialog dialog="storageFolderRemove">
        <StorageFolderRemoveDialog />
      </ControlledDialog>
      <ControlledDialog dialog="hostAnnounce">
        <HostAnnounceDialog />
      </ControlledDialog>
      {children}
    </DialogContext.Provider>
  )
}
