'use client'

import { WalletActions } from '../../../components/Wallet/WalletActions'
import { WalletFilterBar } from '../../../components/Wallet/WalletFilterBar'
import { AppRouterAppContentLayout } from '@siafoundation/design-system'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterAppContentLayout
      title="Wallet"
      stats={<WalletFilterBar />}
      actions={<WalletActions />}
    >
      {children}
    </AppRouterAppContentLayout>
  )
}
