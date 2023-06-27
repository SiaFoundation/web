import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
} from '@siafoundation/design-system'
import { useSyncerConnect } from '@siafoundation/react-walletd'
import { WalletAddTypeDialog } from '../dialogs/WalletAddTypeDialog'
import { WalletAddNewDialog } from '../dialogs/WalletAddNewDialog'
import { WalletCopySeedDialog } from '../dialogs/WalletCopySeedDialog'
import { WalletGenerateAddressesDialog } from '../dialogs/WalletGenerateAddressesDialog'
import { WalletRemoveDialog } from '../dialogs/WalletRemoveDialog'
import { AddressUpdateDialog } from '../dialogs/AddressUpdateDialog'
import { WalletUpdateDialog } from '../dialogs/WalletUpdateDialog'
// import { CmdKDialog } from '../components/CmdKDialog'
// import { WalletdTransactionDetailsDialog } from '../dialogs/WalletdTransactionDetailsDialog'

export type DialogType =
  // | 'cmdk'
  | 'settings'
  | 'sendSiacoin'
  | 'transactionDetails'
  | 'addressDetails'
  | 'addressUpdate'
  | 'connectPeer'
  | 'confirm'
  | 'walletAddType'
  | 'walletAddNew'
  | 'walletAddRecover'
  | 'walletAddWatch'
  | 'walletAddLedger'
  | 'walletAddNewCopySeed'
  | 'walletGenerateAddresses'
  | 'walletRemove'
  | 'walletUpdate'

type ConfirmProps = {
  title: React.ReactNode
  action: React.ReactNode
  variant: 'red' | 'accent'
  body: React.ReactNode
  onConfirm: () => void
}

type DialogParams = Record<string, unknown>

function useDialogMain() {
  const [dialog, setDialog] = useState<DialogType>()
  const [id, setId] = useState<string>()
  const [params, setParams] = useState<DialogParams>()

  const openDialog = useCallback(
    (
      dialog: DialogType,
      args: {
        id?: string
        params?: DialogParams
      } = {}
    ) => {
      setDialog(dialog)
      setId(args.id)
      setParams(args.params)
    },
    [setDialog, setId, setParams]
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
    setParams(undefined)
    setConfirm(undefined)
  }, [setDialog, setId, setConfirm, setParams])

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
    params,
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
    params,
    dialog,
    openDialog,
    onOpenChange,
    closeDialog,
    confirm,
    openConfirmDialog,
  } = useDialog()
  const connect = useSyncerConnect()

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
        showSiaStats={false}
      />
      <WalletAddTypeDialog
        open={dialog === 'walletAddType'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletAddNewDialog />
      <WalletCopySeedDialog
        id={id}
        open={dialog === 'walletAddNewCopySeed'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletGenerateAddressesDialog
        id={id}
        open={dialog === 'walletGenerateAddresses'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletRemoveDialog
        open={dialog === 'walletRemove'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletUpdateDialog
        open={dialog === 'walletUpdate'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <AddressUpdateDialog
        open={dialog === 'addressUpdate'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      {/* <WalletCreateDialog
        title={walletAddTypes.walletAddRecover.title}
        description={walletAddTypes.walletAddRecover.description}
        onCreate={() => closeDialog()}
        open={dialog === 'walletAddRecover'}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      /> */}
      {/* <WalletdTransactionDetailsDialog /> */}
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        connect={(address: string) =>
          connect.post({
            payload: address,
          })
        }
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ConfirmDialog
        open={dialog === 'confirm'}
        title={confirm?.title}
        action={confirm?.action}
        body={confirm?.body}
        variant={confirm?.variant}
        onConfirm={confirm?.onConfirm}
        onOpenChange={(val) =>
          val ? openConfirmDialog(confirm) : closeDialog()
        }
      />
    </>
  )
}
