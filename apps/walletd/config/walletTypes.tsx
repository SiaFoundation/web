import { Code } from '@siafoundation/design-system'
import { Sprout16, Usb16, View16 } from '@siafoundation/react-icons'
import { WalletType } from '@siafoundation/walletd-types'

export const walletAddTypes = {
  walletAddNew: {
    title: 'Create a wallet',
    description: (
      <>
        Generate a new wallet seed. The seed will never be sent to{' '}
        <Code>walletd</Code>, transactions are signed in the browser.
      </>
    ),
  },
  walletAddRecover: {
    title: 'Recover a wallet',
    description: (
      <>
        Restore a wallet from seed. The seed will never be sent to{' '}
        <Code>walletd</Code>, transactions are signed in the browser.
      </>
    ),
  },
  walletAddWatch: {
    title: 'Add a watch-only wallet',
    description: (
      <>Create a watch-only wallet that tracks a set of addresses.</>
    ),
  },
  walletAddLedger: {
    title: 'Add a Ledger hardware wallet',
    description: (
      <>
        Add a Ledger hardware wallet. Transactions are signed with your hardware
        device.
      </>
    ),
  },
}

export const walletTypes: Record<
  WalletType,
  {
    icon: React.ReactNode
    tip: string
    sendDisabledTip?: string
  }
> = {
  seed: {
    icon: <Sprout16 />,
    tip: 'This is a seed-based wallet. Transactions are signed in the browser and your seed is never sent to the walletd server.',
  },
  watch: {
    icon: <View16 />,
    tip: 'This is a watch-only wallet. Watch-only wallets do not support sending transactions.',
    sendDisabledTip:
      'Watch-only wallets do not support sending transactions through the walletd user interface.',
  },
  ledger: {
    icon: <Usb16 />,
    tip: 'This is a Ledger hardware wallet. Transactions are signed with your hardware device.',
  },
}
