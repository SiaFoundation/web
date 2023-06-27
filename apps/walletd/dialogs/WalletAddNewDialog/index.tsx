import { useCallback, useMemo } from 'react'
import { useDialog } from '../../contexts/dialog'
import { walletAddTypes } from '../../config/walletTypes'
import { WalletCreateDialog } from '../WalletCreateDialog'
import * as bip39 from 'bip39'
import blake from 'blakejs'
import { useWalletAdd } from '@siafoundation/react-walletd'

export function WalletAddNewDialog() {
  const { dialog, openDialog, closeDialog } = useDialog()
  const open = dialog === 'walletAddNew'
  const walletAdd = useWalletAdd()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mnemonic = useMemo(() => bip39.generateMnemonic(), [open])
  const seed = useMemo(() => bip39.mnemonicToSeedSync(mnemonic), [mnemonic])
  const seedHash = useMemo(() => blake.blake2bHex(seed), [seed])
  const create = useCallback(
    async (id, values) => {
      return walletAdd.put({
        params: {
          id,
        },
        payload: {
          type: 'seed',
          seedHash,
          name: values.name,
          description: values.description,
        },
      })
    },
    [walletAdd, seedHash]
  )
  const onCreateSuccess = useCallback(
    (id: string) => {
      // navigate to copy seed
      openDialog('walletAddNewCopySeed', {
        id,
        params: {
          mnemonic,
        },
      })
    },
    [openDialog, mnemonic]
  )
  return (
    <WalletCreateDialog
      title={walletAddTypes.walletAddNew.title}
      description={walletAddTypes.walletAddNew.description}
      create={create}
      open={open}
      onCreateSuccess={onCreateSuccess}
      onOpenChange={(val) => (val ? openDialog(dialog) : closeDialog())}
    />
  )
}
