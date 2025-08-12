'use client'

import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  SettingsDialog,
  SyncerConnectPeerDialog,
  WalletSingleAddressDetailsDialog,
} from '@siafoundation/design-system'
import { CmdKDialog } from '../components/CmdKDialog'
import {
  useAdminSyncerConnect,
  useAdminWallet,
} from '@siafoundation/indexd-react'
import { IndexdSendSiacoinDialog } from '../dialogs/IndexdSendSiacoinDialog'
import { IndexdTransactionDetailsDialog } from '../dialogs/IndexdTransactionDetailsDialog'
import { DebugDialog } from '../dialogs/DebugDialog'
import { AccountDeleteDialog } from '../dialogs/AccountDeleteDialog'

export type DialogType =
  | 'cmdk'
  | 'settings'
  | 'sendSiacoin'
  | 'transactionDetails'
  | 'addressDetails'
  | 'connectPeer'
  | 'bugReport'
  | 'confirm'
  | 'accountDelete'

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
    id,
    dialog,
    openDialog,
    onOpenChange,
    closeDialog,
    confirm,
    openConfirmDialog,
  } = useDialog()
  const connect = useAdminSyncerConnect()
  const wallet = useAdminWallet()

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
      <IndexdSendSiacoinDialog />
      <WalletSingleAddressDetailsDialog
        address={wallet.data?.address}
        isValidating={wallet.isValidating}
        open={dialog === 'addressDetails'}
        onOpenChange={onOpenChange}
      />
      <IndexdTransactionDetailsDialog />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        connect={async (address: string) => {
          try {
            await connect.post({
              payload: {
                addr: address,
              },
            })
            return { error: undefined, status: 200 }
          } catch (error) {
            return { error: (error as Error).message, status: 500 }
          }
        }}
        onOpenChange={onOpenChange}
      />
      <DebugDialog open={dialog === 'bugReport'} onOpenChange={onOpenChange} />
      <ConfirmDialog
        open={dialog === 'confirm'}
        params={confirm}
        onOpenChange={(val) =>
          val && confirm ? openConfirmDialog(confirm) : closeDialog()
        }
      />
      <AccountDeleteDialog
        id={id}
        open={dialog === 'accountDelete'}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
