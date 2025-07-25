'use client'

import { AppRouterAppPublicLayout } from '@siafoundation/design-system'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppRouterAppPublicLayout>{children}</AppRouterAppPublicLayout>
}
