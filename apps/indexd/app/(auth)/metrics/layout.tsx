'use client'

import { AppRouterAppContentLayout } from '@siafoundation/design-system'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterAppContentLayout title="Metrics">
      {children}
    </AppRouterAppContentLayout>
  )
}
