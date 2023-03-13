import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  WalletSendSiacoinDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  TransactionDetailsDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { CmdKDialog } from '../components/CmdKDialog'
import { FilesCreateDirectoryDialog } from '../components/Files/FilesCreateDirectoryDialog'
import { HostsAllowBlockDialog } from '../components/Hosts/HostsAllowBlockDialog'
import { HostsFilterAddressDialog } from '../components/Hosts/HostsFilterAddressDialog'
import { ContractsFilterAddressDialog } from '../components/Contracts/ContractsFilterAddressDialog'
import { ContractsFilterPublicKeyDialog } from '../components/Contracts/ContractsFilterPublicKeyDialog'

export type DialogType =
  | 'cmdk'
  | 'settings'
  | 'sendSiacoin'
  | 'transactionDetails'
  | 'addressDetails'
  | 'connectPeer'
  | 'hostScoreSet'
  | 'hostsManageAllowBlock'
  | 'hostBlocklistAdd'
  | 'hostBlocklistRemove'
  | 'hostsFilterAddress'
  | 'contractsFilterAddress'
  | 'contractsFilterPublicKey'
  | 'objectDownload'
  | 'objectDelete'
  | 'objectCreateDirectory'

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
  const { id, dialog, openDialog, onOpenChange, closeDialog } = useDialog()
  return (
    <>
      <CmdKDialog
        open={dialog === 'cmdk'}
        onOpenChange={onOpenChange}
        setOpen={() => openDialog('cmdk')}
      />
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
      <FilesCreateDirectoryDialog
        open={dialog === 'objectCreateDirectory'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <HostsAllowBlockDialog
        open={dialog === 'hostsManageAllowBlock'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <HostsFilterAddressDialog
        open={dialog === 'hostsFilterAddress'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ContractsFilterAddressDialog
        open={dialog === 'contractsFilterAddress'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ContractsFilterPublicKeyDialog
        open={dialog === 'contractsFilterPublicKey'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
    </>
  )
}
