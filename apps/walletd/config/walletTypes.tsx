import { Code } from '@siafoundation/design-system'

export const walletAddTypes = {
  walletAddNew: {
    title: 'Create a wallet',
    description: (
      <>
        Generates a new wallet seed. The seed will never be sent to{' '}
        <Code>walletd</Code>, transactions are signed in the browser.
      </>
    ),
  },
  walletAddRecover: {
    title: 'Recover from seed',
    description: (
      <>
        Restore a wallet from seed. The seed will never be sent to{' '}
        <Code>walletd</Code>, transactions are signed in the browser.
      </>
    ),
  },
  walletAddWatch: {
    title: 'Add a watch-only wallet',
    description: <>Create a watch-only wallet from provided addresses.</>,
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
