import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  ConfirmDialog,
  ConfirmDialogParams,
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
  WalletAddressesGenerateSeedDialog,
  WalletAddressesGenerateSeedDialogParams,
} from '../dialogs/WalletAddressesGenerateSeedDialog'
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
  WalletAddLedgerDialog,
  WalletAddLedgerDialogParams,
} from '../dialogs/WalletAddLedgerDialog'
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
import {
  AddressRemoveDialog,
  AddressRemoveDialogParams,
} from '../dialogs/AddressRemoveDialog'
import {
  WalletSendSeedDialog,
  WalletSendSeedDialogParams,
} from '../dialogs/WalletSendSeedDialog'
import {
  WalletSendLedgerDialog,
  WalletSendLedgerDialogParams,
} from '../dialogs/WalletSendLedgerDialog'
import {
  WalletUnlockDialog,
  WalletUnlockDialogParams,
} from '../dialogs/WalletUnlockDialog'
import {
  WalletdSettingsDialog,
  WalletdSettingsDialogParams,
} from '../dialogs/WalletdSettingsDialog'
import {
  WalletAddressesGenerateLedgerDialog,
  WalletAddressesGenerateLedgerDialogParams,
} from '../dialogs/WalletAddressesGenerateLedgerDialog'
import {
  WalletsRescanDialogParams,
  WalletsRescanDialog,
} from '../dialogs/WalletsRescanDialog'
// import { CmdKDialog } from '../components/CmdKDialog'

export type DialogParams = {
  cmdk?: void
  settings?: WalletdSettingsDialogParams
  walletSendSeed?: WalletSendSeedDialogParams
  walletSendLedger?: WalletSendLedgerDialogParams
  transactionDetails?: void
  addressUpdate?: AddressUpdateDialogParams
  addressRemove?: AddressRemoveDialogParams
  connectPeer?: SyncerConnectPeerDialogParams
  confirm?: ConfirmDialogParams
  walletsRescan?: WalletsRescanDialogParams
  walletAddType?: WalletAddTypeDialogParams
  walletAddNew?: WalletAddNewDialogParams
  walletAddRecover?: WalletAddRecoverDialogParams
  walletAddWatch?: WalletAddWatchDialogParams
  walletAddLedger?: WalletAddLedgerDialogParams
  walletAddressesGenerate?: WalletAddressesGenerateSeedDialogParams
  walletLedgerAddressGenerate?: WalletAddressesGenerateLedgerDialogParams
  walletAddressesAdd?: WalletAddressesAddDialogParams
  walletRemove?: WalletRemoveDialogParams
  walletUpdate?: WalletUpdateDialogParams
  walletUnlock?: WalletUnlockDialogParams
}

export type OpenDialog = <D extends DialogType>(
  type: D,
  params?: DialogParams[D]
) => void

export type DialogType = keyof DialogParams

function useDialogMain() {
  const [dialog, setDialog] = useState<DialogType>()
  const [params, setParams] = useState<DialogParams>({})

  const openDialog = useCallback<OpenDialog>(
    <D extends DialogType>(type: D, params?: DialogParams[D]) => {
      setParams((p) => ({
        ...p,
        [type]: params,
      }))
      setDialog(type)
    },
    [setParams, setDialog]
  )

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
      <WalletdSettingsDialog
        open={dialog === 'settings'}
        onOpenChange={onOpenChange}
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
      <WalletAddLedgerDialog
        open={dialog === 'walletAddLedger'}
        params={params['walletAddLedger']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddLedger']) : closeDialog()
        }
      />
      <WalletAddWatchDialog
        open={dialog === 'walletAddWatch'}
        params={params['walletAddWatch']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddWatch']) : closeDialog()
        }
      />
      <WalletAddressesGenerateSeedDialog
        open={dialog === 'walletAddressesGenerate'}
        params={params['walletAddressesGenerate']}
        onOpenChange={(val) =>
          val
            ? openDialog(dialog, params['walletAddressesGenerate'])
            : closeDialog()
        }
      />
      <WalletAddressesGenerateLedgerDialog
        open={dialog === 'walletLedgerAddressGenerate'}
        params={params['walletLedgerAddressGenerate']}
        onOpenChange={(val) =>
          val
            ? openDialog(dialog, params['walletLedgerAddressGenerate'])
            : closeDialog()
        }
      />
      <WalletAddressesAddDialog
        open={dialog === 'walletAddressesAdd'}
        params={params['walletAddressesAdd']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletAddressesAdd']) : closeDialog()
        }
      />
      <WalletRemoveDialog
        open={dialog === 'walletRemove'}
        params={params['walletRemove']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletRemove']) : closeDialog()
        }
      />
      <WalletUpdateDialog
        open={dialog === 'walletUpdate'}
        params={params['walletUpdate']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletUpdate']) : closeDialog()
        }
      />
      <WalletUnlockDialog
        open={dialog === 'walletUnlock'}
        params={params['walletUnlock']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletUnlock']) : closeDialog()
        }
      />
      <WalletsRescanDialog
        open={dialog === 'walletsRescan'}
        params={params['walletsRescan']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletsRescan']) : closeDialog()
        }
      />
      <AddressUpdateDialog
        open={dialog === 'addressUpdate'}
        params={params['addressUpdate']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['addressUpdate']) : closeDialog()
        }
      />
      <AddressRemoveDialog
        open={dialog === 'addressRemove'}
        params={params['addressRemove']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['addressRemove']) : closeDialog()
        }
      />
      <SyncerConnectPeerDialog
        open={dialog === 'connectPeer'}
        params={params['connectPeer']}
        connect={(address: string) =>
          connect.post({
            payload: address,
          })
        }
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['connectPeer']) : closeDialog()
        }
      />
      <WalletSendSeedDialog
        open={dialog === 'walletSendSeed'}
        params={params['walletSendSeed']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletSendSeed']) : closeDialog()
        }
      />
      <WalletSendLedgerDialog
        open={dialog === 'walletSendLedger'}
        params={params['walletSendLedger']}
        onOpenChange={(val) =>
          val ? openDialog(dialog, params['walletSendLedger']) : closeDialog()
        }
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
