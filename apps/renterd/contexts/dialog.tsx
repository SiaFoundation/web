import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { CmdKDialog } from '../components/CmdKDialog'
import { FilesCreateDirectoryDialog } from '../dialogs/FilesCreateDirectoryDialog'
import { HostsAllowBlockDialog } from '../components/Hosts/HostsAllowBlockDialog'
import { HostsFilterAddressDialog } from '../components/Hosts/HostsFilterAddressDialog'
import { ContractsFilterAddressDialog } from '../components/Contracts/ContractsFilterAddressDialog'
import { ContractsFilterPublicKeyDialog } from '../components/Contracts/ContractsFilterPublicKeyDialog'
import { ContractsFilterContractSetDialog } from '../components/Contracts/ContractsFilterContractSetDialog'
import { FilesSearchDialog } from '../dialogs/FilesSearchDialog'
import { useSyncerConnect, useWallet } from '@siafoundation/renterd-react'
import { RenterdSendSiacoinDialog } from '../dialogs/RenterdSendSiacoinDialog'
import { RenterdTransactionDetailsDialog } from '../dialogs/RenterdTransactionDetailsDialog'
import { HostsFilterPublicKeyDialog } from '../components/Hosts/HostsFilterPublicKeyDialog'
import { FilesBucketDeleteDialog } from '../dialogs/FilesBucketDeleteDialog'
import { FilesBucketPolicyDialog } from '../dialogs/FilesBucketPolicyDialog'
import { FilesBucketCreateDialog } from '../dialogs/FilesBucketCreateDialog'
import { FileRenameDialog } from '../dialogs/FileRenameDialog'
import { KeysCreateDialog } from '../components/Keys/KeysCreateDialog'

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
  | 'hostsFilterPublicKey'
  | 'contractsFilterAddress'
  | 'contractsFilterPublicKey'
  | 'contractsFilterContractSet'
  | 'filesCreateBucket'
  | 'filesDeleteBucket'
  | 'filesCreateDirectory'
  | 'filesBucketPolicy'
  | 'filesSearch'
  | 'fileRename'
  | 'keysCreate'
  | 'confirm'

type ConfirmProps = {
  title: React.ReactNode
  action: React.ReactNode
  variant: 'red' | 'accent'
  body: React.ReactNode
  onConfirm: () => void
}

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

  const [confirm, setConfirm] = useState<ConfirmProps>()
  const openConfirmDialog = useCallback(
    (confirm: ConfirmProps) => {
      setDialog('confirm')
      setConfirm(confirm)
    },
    [setDialog, setConfirm]
  )

  const closeDialog = useCallback(() => {
    setDialog(undefined)
    setId(undefined)
    setConfirm(undefined)
  }, [setDialog, setId, setConfirm])

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
    confirm,
    openConfirmDialog,
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
  const {
    id,
    dialog,
    openDialog,
    onOpenChange,
    closeDialog,
    confirm,
    openConfirmDialog,
  } = useDialog()
  const connect = useSyncerConnect()
  const wallet = useWallet()

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
        showGpuSetting
      />
      <RenterdSendSiacoinDialog />
      <WalletSingleAddressDetailsDialog
        address={wallet.data?.address}
        isValidating={wallet.isValidating}
        open={dialog === 'addressDetails'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <RenterdTransactionDetailsDialog />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        connect={(address: string) =>
          connect.post({
            payload: address,
          })
        }
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FilesBucketCreateDialog
        open={dialog === 'filesCreateBucket'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FilesBucketDeleteDialog
        open={dialog === 'filesDeleteBucket'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FilesBucketPolicyDialog
        open={dialog === 'filesBucketPolicy'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FilesCreateDirectoryDialog
        open={dialog === 'filesCreateDirectory'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FilesSearchDialog
        open={dialog === 'filesSearch'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FileRenameDialog
        id={id}
        open={dialog === 'fileRename'}
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
      <HostsFilterPublicKeyDialog
        open={dialog === 'hostsFilterPublicKey'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ContractsFilterAddressDialog
        open={dialog === 'contractsFilterAddress'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ContractsFilterContractSetDialog
        open={dialog === 'contractsFilterContractSet'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ContractsFilterPublicKeyDialog
        open={dialog === 'contractsFilterPublicKey'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <KeysCreateDialog
        open={dialog === 'keysCreate'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ConfirmDialog
        open={dialog === 'confirm'}
        params={confirm}
        onOpenChange={(val) =>
          val ? openConfirmDialog(confirm) : closeDialog()
        }
      />
    </>
  )
}
