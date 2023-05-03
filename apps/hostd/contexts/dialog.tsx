import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { VolumeAddDialog } from '../dialogs/VolumeAddDialog'
import { VolumeResizeDialog } from '../dialogs/VolumeResizeDialog'
import { VolumeDeleteDialog } from '../dialogs/VolumeDeleteDialog'
import { useSyncerConnect, useWallet } from '@siafoundation/react-hostd'
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
      <VolumeAddDialog
        open={dialog === 'volumeCreate'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <VolumeResizeDialog
        open={dialog === 'volumeResize'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <VolumeDeleteDialog
        open={dialog === 'volumeDelete'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ContractsFilterContractIdDialog
        open={dialog === 'contractsFilterContractId'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
    </>
  )
}
