'use client'

import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  EntityList,
  EntityListItemProps,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/units'
import { ExplorerDatum, DatumProps } from '../ExplorerDatum'
import { useMemo, useState } from 'react'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import BigNumber from 'bignumber.js'
import { ContentLayout } from '../ContentLayout'
import {
  AddressBalance,
  ExplorerEvent,
  EventPayout,
  EventV1ContractResolution,
  EventV1Transaction,
  ExplorerSiacoinOutput,
  ExplorerV2Transaction,
  EventV2ContractResolution,
} from '@siafoundation/explored-types'

type Tab = 'events' | 'evolution' | 'utxos'

type Props = {
  id: string
  addressInfo: {
    balance: AddressBalance
    events: ExplorerEvent[]
    unspentOutputs: ExplorerSiacoinOutput[]
  }
}

export function Address({
  id,
  addressInfo: {
    balance: { unspentSiacoins, unspentSiafunds },
    events,
    unspentOutputs,
  },
}: Props) {
  const [tab, setTab] = useState<Tab>('events')

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'SC',
        sc: new BigNumber(unspentSiacoins),
      },
    ]
    if (unspentSiafunds !== 0) {
      list.push({
        label: 'SF',
        sf: Number(unspentSiafunds),
      })
    }
    return list
  }, [unspentSiacoins, unspentSiafunds])

  const eventEntities = useMemo(() => {
    const list: EntityListItemProps[] = []

    if (events.length) {
      events.forEach((event) => {
        switch (event.type) {
          case 'v1Transaction':
            list.push(formatV1TransactionEntity(id, event))
            break
          case 'v2Transaction':
            list.push(formatV2TransactionEntity(id, event))
            break
          case 'v1ContractResolution':
            list.push(formatV1ContractResolutionEntity(event))
            break
          case 'v2ContractResolution':
            list.push(formatV2ContractResolutionEntity(event))
            break
          case 'payout':
            list.push(formatPayoutEntity(event))
            break
        }
      })
    }

    return list.sort(
      (a, b) =>
        new Date(b.timestamp || 0).getTime() -
        new Date(a.timestamp || 0).getTime()
    )
  }, [id, events])

  const utxos = useMemo(() => {
    const list: EntityListItemProps[] = []
    if (unspentOutputs.length) {
      unspentOutputs.forEach((output) =>
        list.push(formatUnspentSiacoinOutputEntity(output))
      )
    }
    return list
  }, [unspentOutputs])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-y-2 justify-between items-center">
            <EntityHeading
              label="address"
              type="address"
              value={id}
              href={routes.address.view.replace(':id', id)}
            />
            <div className="flex gap-2 items-center">
              <Tooltip content={`${humanNumber(events.length)} total events`}>
                <Badge variant="accent">
                  {`${humanNumber(events.length)}`} events
                </Badge>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-4 max-w-sm">
            {values.map((item) => (
              <ExplorerDatum key={item.label} {...item} />
            ))}
          </div>
        </div>
      }
    >
      <Tabs
        defaultValue={tab}
        value={tab}
        onValueChange={(val) => setTab(val as Tab)}
      >
        <TabsList aria-label="Address tabs">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="utxos">Unspent outputs</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <EntityList dataset={eventEntities} />
        </TabsContent>
        <TabsContent value="utxos">
          <EntityList dataset={utxos} />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}

function getTotal({
  address,
  inputs,
  outputs,
}: {
  address: string
  inputs?: { value: string; address: string }[]
  outputs?: { value: string | number; address: string }[]
}) {
  return (outputs || [])
    .reduce(
      (acc, o) => (o.address === address ? acc.plus(o.value) : acc),
      new BigNumber(0)
    )
    .minus(
      (inputs || []).reduce(
        (acc, i) => (i.address === address ? acc.plus(i.value) : acc),
        new BigNumber(0)
      )
    )
}

function formatV1TransactionEntity(id: string, v1Transaction: ExplorerEvent) {
  const { transaction } = v1Transaction.data as EventV1Transaction
  return {
    hash: v1Transaction.id,
    sc: getTotal({
      address: id,
      inputs: transaction.siacoinInputs,
      outputs: transaction.siacoinOutputs?.map((o) => o.siacoinOutput),
    }),
    sf: getTotal({
      address: id,
      inputs: transaction.siafundInputs,
      outputs: transaction.siafundOutputs?.map((o) => o.siafundOutput),
    }).toNumber(),
    label: 'Transaction',
    initials: 'TX',
    href: routes.transaction.view.replace(':id', transaction.id),
    height: v1Transaction.index.height,
    timestamp: new Date(v1Transaction.timestamp).getTime(),
  }
}

function formatV2TransactionEntity(id: string, v2Transaction: ExplorerEvent) {
  const transaction = v2Transaction.data as ExplorerV2Transaction
  return {
    hash: v2Transaction.id,
    sc: getTotal({
      address: id,
      inputs: transaction.siacoinInputs?.map((o) => o.parent.siacoinOutput),
      outputs: transaction.siacoinOutputs,
    }),
    sf: getTotal({
      address: id,
      inputs: transaction.siafundInputs?.map((o) => ({
        address: o.parent.siafundOutput.address,
        value: String(o.parent.siafundOutput.value),
      })),
      outputs: transaction.siafundOutputs,
    }).toNumber(),
    label: 'Transaction',
    initials: 'TX',
    href: routes.transaction.view.replace(':id', transaction.id),
    height: v2Transaction.index.height,
    timestamp: new Date(v2Transaction.timestamp).getTime(),
  }
}

function formatV1ContractResolutionEntity(v1ContractResolution: ExplorerEvent) {
  const { parent, siacoinElement } =
    v1ContractResolution.data as EventV1ContractResolution
  return {
    hash: v1ContractResolution.id,
    label: 'Contract Resolution',
    initials: 'CR',
    href: routes.contract.view.replace(':id', parent.id),
    sc: new BigNumber(siacoinElement.siacoinOutput.value),
    timestamp: new Date(v1ContractResolution.timestamp).getTime(),
  }
}

function formatV2ContractResolutionEntity(v1ContractResolution: ExplorerEvent) {
  const { resolution, siacoinElement } =
    v1ContractResolution.data as EventV2ContractResolution
  return {
    hash: v1ContractResolution.id,
    label: 'Contract Resolution',
    initials: 'CR',
    href: routes.contract.view.replace(':id', resolution.parent.id),
    sc: new BigNumber(siacoinElement.siacoinOutput.value),
    timestamp: new Date(v1ContractResolution.timestamp).getTime(),
  }
}

function formatPayoutEntity(payout: ExplorerEvent) {
  const { siacoinElement } = payout.data as EventPayout
  return {
    hash: payout.id,
    label: 'Payout',
    initials: 'P',
    href: routes.address.view.replace(':id', siacoinElement.source),
    height: payout.index.height,
    sc: new BigNumber(siacoinElement.siacoinOutput.value),
    timestamp: new Date(payout.timestamp).getTime(),
  }
}

function formatUnspentSiacoinOutputEntity(
  siacoinOutput: ExplorerSiacoinOutput
) {
  return {
    hash: siacoinOutput.id,
    sc: new BigNumber(siacoinOutput.siacoinOutput.value),
    label: 'siacoin output',
    initials: 'SO',
    scVariant: 'value' as const,
  }
}
