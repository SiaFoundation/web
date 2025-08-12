'use client'

import { NodeActions } from '../../../components/Node/NodeActions'
import { AppRouterAppContentLayout } from '@siafoundation/design-system'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterAppContentLayout title="Node" actions={<NodeActions />}>
      {children}
    </AppRouterAppContentLayout>
  )
}
