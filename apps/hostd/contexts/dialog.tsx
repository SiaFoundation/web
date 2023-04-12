import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { StorageFolderAddDialog } from '../dialogs/StorageFolderAddDialog'
import { StorageFolderResizeDialog } from '../dialogs/StorageFolderResizeDialog'
import { StorageFolderRemoveDialog } from '../dialogs/StorageFolderRemoveDialog'
import { HostAnnounceDialog } from '../dialogs/HostAnnounceDialog'
import { useSyncerConnect, useWallet } from '@siafoundation/react-hostd'
import { HostdSendSiacoinDialog } from '../dialogs/HostdSendSiacoinDialog'
import { HostdTransactionDetailsDialog } from '../dialogs/HostdTransactionDetailsDialog'

export type DialogType =
  // | 'cmdk'
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

function useDialogMain() {
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

  return {
    dialog,
    id,
    openDialog,
    closeDialog,
    onOpenChange,
  }
}

type State = ReturnType<typeof useDialogMain>

const DialogContext = createContext({} as State)
export const useDialog = () => useContext(DialogContext)

type Props = {
  children: React.ReactNode
}

export function DialogProvider({ children }: Props) {
  const state = useDialogMain()
  return (
    <DialogContext.Provider value={state}>{children}</DialogContext.Provider>
  )
}

export function Dialogs() {
  const { dialog, openDialog, onOpenChange, closeDialog } = useDialog()
  const connect = useSyncerConnect()
  const wallet = useWallet()
  return (
    <>
      {/* <CmdKDialog
        open={dialog === 'cmdk'}
        onOpenChange={onOpenChange}
        setOpen={() => openDialog('cmdk')}
      /> */}
      <SettingsDialog
        open={dialog === 'settings'}
        onOpenChange={onOpenChange}
      />
      <HostdSendSiacoinDialog />
      <WalletSingleAddressDetailsDialog
        open={dialog === 'addressDetails'}
        address={wallet.data?.address}
        isValidating={wallet.isValidating}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <HostdTransactionDetailsDialog />
      <SyncerConnectPeerDialog
        connect={(address: string) =>
          connect.put({
            payload: {
              address,
            },
          })
        }
        open={dialog === 'connectPeer'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <StorageFolderAddDialog
        open={dialog === 'storageFolderAdd'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <StorageFolderResizeDialog
        open={dialog === 'storageFolderResize'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <StorageFolderRemoveDialog
        open={dialog === 'storageFolderRemove'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <HostAnnounceDialog
        open={dialog === 'hostAnnounce'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
    </>
  )
}
