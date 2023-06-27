import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { CmdKDialog } from '../components/CmdKDialog'
import { FilesCreateDirectoryDialog } from '../components/Files/FilesCreateDirectoryDialog'
import { HostsAllowBlockDialog } from '../components/Hosts/HostsAllowBlockDialog'
import { HostsFilterAddressDialog } from '../components/Hosts/HostsFilterAddressDialog'
import { ContractsFilterAddressDialog } from '../components/Contracts/ContractsFilterAddressDialog'
import { ContractsFilterPublicKeyDialog } from '../components/Contracts/ContractsFilterPublicKeyDialog'
import { FilesSearchDialog } from '../components/Files/FilesSearchDialog'
import {
  useSyncerConnect,
  useWalletAddress,
} from '@siafoundation/react-renterd'
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
  | 'contractsFilterAddress'
  | 'contractsFilterPublicKey'
  | 'filesCreateDirectory'
  | 'filesSearch'
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
    dialog,
    openDialog,
    onOpenChange,
    closeDialog,
    confirm,
    openConfirmDialog,
  } = useDialog()
  const connect = useSyncerConnect()
  const address = useWalletAddress()

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
        showSiaStats={false}
      />
      <RenterdSendSiacoinDialog />
      <WalletSingleAddressDetailsDialog
        address={address.data}
        isValidating={address.isValidating}
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
      <FilesCreateDirectoryDialog
        open={dialog === 'filesCreateDirectory'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <FilesSearchDialog
        open={dialog === 'filesSearch'}
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
