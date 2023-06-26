import { useCallback } from 'react'
import { useDialog } from '../../contexts/dialog'
import { walletAddTypes } from '../../config/walletTypes'
import { WalletCreateDialog } from '../WalletCreateDialog'
import * as bip39 from 'bip39'

export function WalletAddNewDialog() {
  const { dialog, openDialog, closeDialog } = useDialog()
  const onCreate = useCallback(
    (name: string) => {
      // generate seed
      const mnemonic = bip39.generateMnemonic()
      // navigate to copy seed
      openDialog('walletAddNewCopySeed', {
        id: name,
        params: {
          mnemonic,
        },
      })
    },
    [openDialog]
  )
  return (
    <WalletCreateDialog
      title={walletAddTypes.walletAddNew.title}
      description={walletAddTypes.walletAddNew.description}
      onCreate={onCreate}
      open={dialog === 'walletAddNew'}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    />
  )
}
