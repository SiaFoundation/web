'use client'

import { ClientSideOnly } from '@siafoundation/design-system'
import { ContentLayout } from '../ContentLayout'
import { CostComparison } from '../CostComparison'

export function Home() {
  return (
    <ContentLayout>
      <ClientSideOnly>
        <CostComparison />
      </ClientSideOnly>
    </ContentLayout>
  )
}
