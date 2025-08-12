'use client'

import { ConfigActions } from '../../../components/Config/ConfigActions'
import { ConfigNav } from '../../../components/Config/ConfigNav'
import { AppRouterAppContentLayout } from '@siafoundation/design-system'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterAppContentLayout
      title="Configuration"
      nav={<ConfigNav />}
      actions={<ConfigActions />}
    >
      {children}
    </AppRouterAppContentLayout>
  )
}
