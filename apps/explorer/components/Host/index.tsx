'use client'

import { useState } from 'react'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import { ContentLayout } from '../ContentLayout'
import { HostHeader } from './HostHeader'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@siafoundation/design-system'
import { HostPriceTable } from './HostPriceTable'
import { HostSettings } from './HostSettings'

type Props = {
  host: SiaCentralHost
  rates: SiaCentralExchangeRates
}

type Tab = 'priceTable' | 'settings'

export function Host({ host, rates }: Props) {
  const [tab, setTab] = useState<Tab>('priceTable')

  return (
    <ContentLayout heading={<HostHeader host={host} rates={rates} />}>
      <Tabs
        defaultValue={tab}
        value={tab}
        onValueChange={(val) => setTab(val as Tab)}
      >
        <TabsList aria-label="Data tabs">
          <TabsTrigger value="priceTable">Price table (RHPv3)</TabsTrigger>
          <TabsTrigger value="settings">Settings (RHPv2)</TabsTrigger>
        </TabsList>
        <TabsContent value="priceTable">
          <HostPriceTable host={host} />
        </TabsContent>
        <TabsContent value="settings">
          <HostSettings host={host} />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
