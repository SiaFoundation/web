import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  ConfirmDialogParams,
  SettingsDialog,
  SyncerConnectPeerDialog,
  SyncerConnectPeerDialogParams,
} from '@siafoundation/design-system'
import { useSyncerConnect } from '@siafoundation/react-walletd'
import {
  WalletAddTypeDialog,
  WalletAddTypeDialogParams,
} from '../dialogs/WalletAddTypeDialog'
import {
  WalletAddNewDialog,
  WalletAddNewDialogParams,
} from '../dialogs/WalletAddNewDialog'
import {
  WalletAddressesGenerateDialog,
  WalletAddressesGenerateDialogParams,
} from '../dialogs/WalletAddressesGenerateDialog'
import {
  WalletRemoveDialog,
  WalletRemoveDialogParams,
} from '../dialogs/WalletRemoveDialog'
import {
  AddressUpdateDialog,
  AddressUpdateDialogParams,
} from '../dialogs/AddressUpdateDialog'
import {
  WalletUpdateDialog,
  WalletUpdateDialogParams,
} from '../dialogs/WalletUpdateDialog'
import {
  WalletAddRecoverDialog,
  WalletAddRecoverDialogParams,
} from '../dialogs/WalletAddRecoverDialog'
import {
  WalletAddWatchDialog,
  WalletAddWatchDialogParams,
} from '../dialogs/WalletAddWatchDialog'
import {
  WalletAddressesAddDialog,
  WalletAddressesAddDialogParams,
} from '../dialogs/WalletAddressesAddDialog'
// import { CmdKDialog } from '../components/CmdKDialog'

type DialogParams = {
  cmdk?: void
  settings?: void
  sendSiacoin?: void
  transactionDetails?: void
  addressUpdate?: AddressUpdateDialogParams
  connectPeer?: SyncerConnectPeerDialogParams
  confirm?: ConfirmDialogParams
  walletAddType?: WalletAddTypeDialogParams
  walletAddNew?: WalletAddNewDialogParams
  walletAddRecover?: WalletAddRecoverDialogParams
  walletAddWatch?: WalletAddWatchDialogParams
  walletAddLedger?: void
  walletAddressesGenerate?: WalletAddressesGenerateDialogParams
  walletAddressesAdd?: WalletAddressesAddDialogParams
  walletRemove?: WalletRemoveDialogParams
  walletUpdate?: WalletUpdateDialogParams
}

type DialogType = keyof DialogParams

function useDialogMain() {
  const [dialog, setDialog] = useState<DialogType>()
  const [params, setParams] = useState<DialogParams>({})

  const openDialog = useCallback(
    <D extends DialogType>(type: D, params?: DialogParams[D]) => {
      setParams((p) => ({
        ...p,
        [type]: params,
      }))
      setDialog(type)
    },
    [setParams, setDialog]
  )

  // const [confirm, setConfirm] = useState<ConfirmProps>()
  // const openConfirmDialog = useCallback(
  //   (confirm: ConfirmProps) => {
  //     setDialogParams('confirm')
  //     setConfirm(confirm)
  //   },
  //   [setDialog, setConfirm]
  // )

  const closeDialog = useCallback(() => {
    setParams((p) => ({
      ...p,
      [dialog]: undefined,
    }))
    setDialog(undefined)
  }, [setDialog, setParams, dialog])

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
    params,
    openDialog,
    confirm,
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
  const { openDialog, onOpenChange, closeDialog, dialog, params } = useDialog()
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
        params={params['walletAddType']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddType']) : closeDialog()
        }
      />
      <WalletAddNewDialog
        open={dialog === 'walletAddNew'}
        params={params['walletAddNew']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddNew']) : closeDialog()
        }
      />
      <WalletAddRecoverDialog
        open={dialog === 'walletAddRecover'}
        params={params['walletAddRecover']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddRecover']) : closeDialog()
        }
      />
      <WalletAddWatchDialog
        open={dialog === 'walletAddWatch'}
        params={params['walletAddWatch']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddWatch']) : closeDialog()
        }
      />
      <WalletAddressesGenerateDialog
        open={dialog === 'walletAddressesGenerate'}
        params={params['walletAddressesGenerate']}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletAddressesAddDialog
        open={dialog === 'walletAddressesAdd'}
        params={params['walletAddressesAdd']}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletRemoveDialog
        open={dialog === 'walletRemove'}
        params={params['walletRemove']}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <WalletUpdateDialog
        open={dialog === 'walletUpdate'}
        params={params['walletUpdate']}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <AddressUpdateDialog
        open={dialog === 'addressUpdate'}
        params={params['addressUpdate']}
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        params={params['connectPeer']}
        connect={(address: string) =>
          connect.post({
            payload: address,
          })
        }
        onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
      />
      <ConfirmDialog
        open={dialog === 'confirm'}
        params={params['confirm']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['confirm']) : closeDialog()
        }
      />
    </>
  )
}
