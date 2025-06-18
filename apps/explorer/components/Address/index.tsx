'use client'

import { useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import BigNumber from 'bignumber.js'
import {
  AddressBalance,
  EventPayout,
  EventV1ContractResolution,
  EventV1Transaction,
  EventV2ContractResolution,
  ExplorerEvent,
  ExplorerSiacoinOutput,
  ExplorerV2Transaction,
} from '@siafoundation/explored-types'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { EntityList } from '../Entity/EntityList'
import { EntityListItemProps } from '../Entity/EntityListItem'
import { ExplorerDatum, DatumProps } from '../ExplorerDatum'
import { EntityHeading } from '../EntityHeading'
import { ContentLayout } from '../ContentLayout'
import { useExplored } from '../../hooks/useExplored'

type Tab = 'events' | 'utxos'

type Props = {
  id: string
  currentHeight: number
  addressInfo: {
    balance: AddressBalance
    unconfirmedEvents: ExplorerEvent[]
    unspentOutputs: ExplorerSiacoinOutput[]
  }
}

export function Address({
  id,
  currentHeight,
  addressInfo: {
    balance: { unspentSiacoins, unspentSiafunds },
    unconfirmedEvents,
    unspentOutputs,
  },
}: Props) {
  const [tab, setTab] = useState<Tab>('events')
  const [exhausted, setExhausted] = useState(false)
  const explored = useExplored()

  const getKey = (
    pageIndex: number,
    previousPageData: ExplorerEvent[] | null
  ) => {
    if (previousPageData && !previousPageData.length) return null
    return { address: id, limit: 100, offset: pageIndex * 100 }
  }

  const { data, isValidating, setSize } = useSWRInfinite<ExplorerEvent[]>(
    getKey,
    async ({ address, limit, offset }) => {
      const { data } = await explored.addressEvents({
        params: { address, limit, offset },
      })
      if (data.length < 100) setExhausted(true)
      return data
    },
    {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    }
  )

  const confirmedEvents = useMemo(() => data?.flat() || [], [data])

  const eventEntities = useMemo(() => {
    return [
      ...unconfirmedEvents.map((event) =>
        formatEvent(id, currentHeight, event, true)
      ),
      ...confirmedEvents.map((event) =>
        formatEvent(id, currentHeight, event, false)
      ),
    ].sort(
      (a, b) =>
        new Date(b.timestamp || 0).getTime() -
        new Date(a.timestamp || 0).getTime()
    )
  }, [id, currentHeight, confirmedEvents, unconfirmedEvents])

  const fetchMoreEvents = () => {
    if (isValidating || exhausted) return
    setSize((prevSize) => prevSize + 1)
  }

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

  const utxos = useMemo(() => {
    return unspentOutputs.map((output) =>
      formatUnspentSiacoinOutputEntity(output, currentHeight)
    )
  }, [unspentOutputs, currentHeight])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-y-2 justify-between items-start">
            <EntityHeading
              label="address"
              type="address"
              value={id}
              href={routes.address.view.replace(':id', id)}
            />
            <div className="flex flex-col gap-1">
              {values.map((item) => (
                <ExplorerDatum key={item.label} {...item} />
              ))}
            </div>
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
          <EntityList
            dataset={eventEntities}
            onScrollThroughMiddle={!exhausted ? fetchMoreEvents : undefined}
            exhausted={exhausted}
            isLoading={isValidating}
            skeletonCount={100}
          />
        </TabsContent>
        <TabsContent value="utxos">
          <EntityList dataset={utxos} skeletonCount={100} />
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

function formatV1TransactionEntity(
  id: string,
  v1Transaction: ExplorerEvent,
  currentHeight: number
): EntityListItemProps {
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
    maturityData: {
      currentHeight,
      maturityHeight: v1Transaction.maturityHeight,
    },
  }
}

function formatV2TransactionEntity(
  id: string,
  v2Transaction: ExplorerEvent,
  currentHeight: number
): EntityListItemProps {
  const transaction = v2Transaction.data as ExplorerV2Transaction
  return {
    hash: v2Transaction.id,
    sc: getTotal({
      address: id,
      inputs: transaction.siacoinInputs?.map((o) => o.parent.siacoinOutput),
      outputs: transaction.siacoinOutputs?.map((o) => o.siacoinOutput),
    }),
    sf: getTotal({
      address: id,
      inputs: transaction.siafundInputs?.map((o) => ({
        address: o.parent.siafundOutput.address,
        value: String(o.parent.siafundOutput.value),
      })),
      outputs: transaction.siafundOutputs?.map((o) => ({
        address: o.siafundOutput.address,
        value: String(o.siafundOutput.value),
      })),
    }).toNumber(),
    label: 'Transaction',
    initials: 'TX',
    href: routes.transaction.view.replace(':id', transaction.id),
    height: v2Transaction.index.height,
    timestamp: new Date(v2Transaction.timestamp).getTime(),
    maturityData: {
      currentHeight,
      maturityHeight: v2Transaction.maturityHeight,
    },
  }
}

function formatV1ContractResolutionEntity(
  v1ContractResolution: ExplorerEvent,
  currentHeight: number
): EntityListItemProps {
  const { parent, siacoinElement } =
    v1ContractResolution.data as EventV1ContractResolution
  return {
    hash: v1ContractResolution.id,
    label: 'Contract Resolution',
    initials: 'CR',
    href: routes.contract.view.replace(':id', parent.id),
    sc: new BigNumber(siacoinElement.siacoinOutput.value),
    timestamp: new Date(v1ContractResolution.timestamp).getTime(),
    maturityData: {
      currentHeight,
      maturityHeight: v1ContractResolution.maturityHeight,
    },
  }
}

function formatV2ContractResolutionEntity(
  v1ContractResolution: ExplorerEvent,
  currentHeight: number
): EntityListItemProps {
  const { resolution, siacoinElement } =
    v1ContractResolution.data as EventV2ContractResolution
  return {
    hash: v1ContractResolution.id,
    label: 'Contract Resolution',
    initials: 'CR',
    href: routes.contract.view.replace(':id', resolution.parent.id),
    sc: new BigNumber(siacoinElement.siacoinOutput.value),
    timestamp: new Date(v1ContractResolution.timestamp).getTime(),
    maturityData: {
      currentHeight,
      maturityHeight: v1ContractResolution.maturityHeight,
    },
  }
}

function formatPayoutEntity(
  payout: ExplorerEvent,
  currentHeight: number
): EntityListItemProps {
  const { siacoinElement } = payout.data as EventPayout
  const capitalizedType =
    payout.type.slice(0, 1).toUpperCase() + payout.type.slice(1)
  return {
    hash: payout.id,
    label: `${capitalizedType} Payout`,
    initials: `${capitalizedType.slice(0, 1)}P`,
    href: routes.address.view.replace(':id', siacoinElement.source),
    height: payout.index.height,
    sc: new BigNumber(siacoinElement.siacoinOutput.value),
    timestamp: new Date(payout.timestamp).getTime(),
    maturityData: {
      currentHeight,
      maturityHeight: siacoinElement.maturityHeight,
    },
  }
}

function formatUnspentSiacoinOutputEntity(
  siacoinOutput: ExplorerSiacoinOutput,
  currentHeight: number
): EntityListItemProps {
  return {
    hash: siacoinOutput.id,
    sc: new BigNumber(siacoinOutput.siacoinOutput.value),
    label: 'siacoin output',
    initials: 'SO',
    scVariant: 'value' as const,
    maturityData: {
      currentHeight,
      maturityHeight: siacoinOutput.maturityHeight,
    },
  }
}

const formatEvent = (
  id: string,
  currentHeight: number,
  event: ExplorerEvent,
  isUnconfirmed = false
): EntityListItemProps => {
  let baseEntity: EntityListItemProps

  switch (event.type) {
    case 'v1Transaction':
      baseEntity = formatV1TransactionEntity(id, event, currentHeight)
      break
    case 'v2Transaction':
      baseEntity = formatV2TransactionEntity(id, event, currentHeight)
      break
    case 'v1ContractResolution':
      baseEntity = formatV1ContractResolutionEntity(event, currentHeight)
      break
    case 'v2ContractResolution':
      baseEntity = formatV2ContractResolutionEntity(event, currentHeight)
      break
    case 'miner':
    case 'foundation':
    case 'siafundClaim':
      baseEntity = formatPayoutEntity(event, currentHeight)
      break
  }

  return isUnconfirmed ? { ...baseEntity, unconfirmed: true } : baseEntity
}
