import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { VolumeCreateDialog } from '../dialogs/VolumeCreateDialog'
import { VolumeResizeDialog } from '../dialogs/VolumeResizeDialog'
import { VolumeDeleteDialog } from '../dialogs/VolumeDeleteDialog'
import { useSyncerConnect, useWallet } from '@siafoundation/hostd-react'
import { HostdSendSiacoinDialog } from '../dialogs/HostdSendSiacoinDialog'
import { HostdTransactionDetailsDialog } from '../dialogs/HostdTransactionDetailsDialog'
import { ContractsFilterContractIdDialog } from '../dialogs/ContractsFilterContractIdDialog'
import { CmdKDialog } from '../components/CmdKDialog'

export type DialogType =
  | 'cmdk'
  | 'settings'
  | 'sendSiacoin'
  | 'addWallet'
  | 'transactionDetails'
  | 'addressDetails'
  | 'connectPeer'
  | 'volumeCreate'
  | 'volumeResize'
  | 'volumeDelete'
  | 'contractsFilterContractId'
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
    openConfirmDialog,
    onOpenChange,
    closeDialog,
    confirm,
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
      />
      <HostdSendSiacoinDialog />
      <WalletSingleAddressDetailsDialog
        open={dialog === 'addressDetails'}
        address={wallet.data?.address}
        isValidating={wallet.isValidating}
        onOpenChange={onOpenChange}
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
        onOpenChange={onOpenChange}
      />
      <VolumeCreateDialog
        open={dialog === 'volumeCreate'}
        onOpenChange={onOpenChange}
      />
      <VolumeResizeDialog
        open={dialog === 'volumeResize'}
        onOpenChange={onOpenChange}
      />
      <VolumeDeleteDialog
        open={dialog === 'volumeDelete'}
        onOpenChange={onOpenChange}
      />
      <ContractsFilterContractIdDialog
        open={dialog === 'contractsFilterContractId'}
        onOpenChange={onOpenChange}
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
