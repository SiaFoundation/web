import {
  ConfirmDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { useSyncerConnect, useWallet } from '@siafoundation/renterd-react'
import type React from 'react'
import { createContext, useCallback, useContext, useState } from 'react'
import { CmdKDialog } from '../components/CmdKDialog'
import { ContractsFilterAddressDialog } from '../components/Contracts/ContractsFilterAddressDialog'
import { ContractsFilterContractSetDialog } from '../components/Contracts/ContractsFilterContractSetDialog'
import { ContractsFilterPublicKeyDialog } from '../components/Contracts/ContractsFilterPublicKeyDialog'
import { HostsAllowBlockDialog } from '../components/Hosts/HostsAllowBlockDialog'
import { HostsFilterAddressDialog } from '../components/Hosts/HostsFilterAddressDialog'
import { HostsFilterPublicKeyDialog } from '../components/Hosts/HostsFilterPublicKeyDialog'
import { KeysCreateDialog } from '../components/Keys/KeysCreateDialog'
import { FileRenameDialog } from '../dialogs/FileRenameDialog'
import { FilesBucketCreateDialog } from '../dialogs/FilesBucketCreateDialog'
import { FilesBucketDeleteDialog } from '../dialogs/FilesBucketDeleteDialog'
import { FilesBucketPolicyDialog } from '../dialogs/FilesBucketPolicyDialog'
import { FilesCreateDirectoryDialog } from '../dialogs/FilesCreateDirectoryDialog'
import { FilesSearchDialog } from '../dialogs/FilesSearchDialog'
import { RenterdSendSiacoinDialog } from '../dialogs/RenterdSendSiacoinDialog'
import { RenterdTransactionDetailsDialog } from '../dialogs/RenterdTransactionDetailsDialog'

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
    [setDialog, setId],
  )

  const [confirm, setConfirm] = useState<ConfirmProps>()
  const openConfirmDialog = useCallback(
    (confirm: ConfirmProps) => {
      setDialog('confirm')
      setConfirm(confirm)
    },
    [setDialog, setConfirm],
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
    [closeDialog],
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
        address={wallet.data?.address!}
        isValidating={wallet.isValidating}
        open={dialog === 'addressDetails'}
        onOpenChange={onOpenChange}
      />
      <RenterdTransactionDetailsDialog />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        connect={(address: string) =>
          connect.post({
            payload: address,
          })
        }
        onOpenChange={onOpenChange}
      />
      <FilesBucketCreateDialog
        open={dialog === 'filesCreateBucket'}
        onOpenChange={onOpenChange}
      />
      <FilesBucketDeleteDialog
        open={dialog === 'filesDeleteBucket'}
        onOpenChange={onOpenChange}
      />
      <FilesBucketPolicyDialog
        open={dialog === 'filesBucketPolicy'}
        onOpenChange={onOpenChange}
      />
      <FilesCreateDirectoryDialog
        open={dialog === 'filesCreateDirectory'}
        onOpenChange={onOpenChange}
      />
      <FilesSearchDialog
        open={dialog === 'filesSearch'}
        onOpenChange={onOpenChange}
      />
      <FileRenameDialog
        open={dialog === 'fileRename'}
        onOpenChange={onOpenChange}
      />
      <HostsAllowBlockDialog
        open={dialog === 'hostsManageAllowBlock'}
        onOpenChange={onOpenChange}
      />
      <HostsFilterAddressDialog
        open={dialog === 'hostsFilterAddress'}
        onOpenChange={onOpenChange}
      />
      <HostsFilterPublicKeyDialog
        open={dialog === 'hostsFilterPublicKey'}
        onOpenChange={onOpenChange}
      />
      <ContractsFilterAddressDialog
        open={dialog === 'contractsFilterAddress'}
        onOpenChange={onOpenChange}
      />
      <ContractsFilterContractSetDialog
        open={dialog === 'contractsFilterContractSet'}
        onOpenChange={onOpenChange}
      />
      <ContractsFilterPublicKeyDialog
        open={dialog === 'contractsFilterPublicKey'}
        onOpenChange={onOpenChange}
      />
      <KeysCreateDialog
        open={dialog === 'keysCreate'}
        onOpenChange={onOpenChange}
      />
      <ConfirmDialog
        open={dialog === 'confirm'}
        params={confirm}
        onOpenChange={(val) =>
          val ? openConfirmDialog(confirm!) : closeDialog()
        }
      />
    </>
  )
}
