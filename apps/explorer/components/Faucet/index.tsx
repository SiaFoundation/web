'use client'

import {
  Container,
  Heading,
  Panel,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  webLinks,
} from '@siafoundation/design-system'
import { FaucetIcon } from '@siafoundation/react-icons'
import { useCallback, useEffect, useState } from 'react'
import { FaucetFundForm } from './FaucetFundForm'
import { FaucetStatus } from './FaucetStatus'
import { isMainnet, networkName } from '../../config'

type Tab = 'fund' | 'status'

export function Faucet() {
  const [id, setId] = useState('')
  const [tab, setTab] = useState<Tab>('fund')

  useEffect(() => {
    if (isMainnet) {
      window.location.replace(webLinks.explore.testnetZenFaucet)
    }
  }, [])

  const onDone = useCallback(
    (id: string) => {
      setId(id)
      setTab('status')
    },
    [setId, setTab],
  )

  return (
    <Container size="1">
      <div className="flex flex-col gap-12 min-h-[60vh]">
        <Panel className="p-4 md:p-4 !rounded-lg !border-3">
          <div className="flex flex-col gap-2 items-center w-full">
            <Text>
              <FaucetIcon size={100} />
            </Text>
            <Heading className="mb-2">{networkName} Faucet</Heading>
            <Tabs
              defaultValue={tab}
              value={tab}
              onValueChange={(val) => setTab(val as Tab)}
              className="w-full"
            >
              <TabsList aria-label="Address tabs">
                <TabsTrigger value="fund">Fund</TabsTrigger>
                <TabsTrigger value="status">Status</TabsTrigger>
              </TabsList>
              <TabsContent value="fund">
                <FaucetFundForm onDone={onDone} />
              </TabsContent>
              <TabsContent value="status">
                <FaucetStatus id={id} setId={setId} />
              </TabsContent>
            </Tabs>
          </div>
        </Panel>
      </div>
    </Container>
  )
}
