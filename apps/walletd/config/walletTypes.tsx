import { Code } from '@siafoundation/design-system'
import { Sprout16, Usb16, View16 } from '@siafoundation/react-icons'

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

export const walletTypes = {
  seed: {
    title: 'Seed-based wallet',
    icon: <Sprout16 />,
  },
  watch: {
    title: 'Watch-only wallet',
    icon: <View16 />,
  },
  ledger: {
    title: 'Ledger hardware wallet',
    icon: <Usb16 />,
  },
}
