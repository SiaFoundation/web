'use client'

import {
  Badge,
  EntityList,
  type EntityListItemProps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
} from '@siafoundation/design-system'
import type { SiaCentralAddressResponse } from '@siafoundation/sia-central-types'
import { humanNumber } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useMemo, useState } from 'react'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { EntityHeading } from '../EntityHeading'
import { type DatumProps, ExplorerDatum } from '../ExplorerDatum'

type Tab = 'transactions' | 'evolution' | 'utxos'

type Props = {
  id: string
  address: SiaCentralAddressResponse
}

export function Address({ id, address }: Props) {
  const [tab, setTab] = useState<Tab>('transactions')

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'SC',
        sc: new BigNumber(address.unspent_siacoins),
      },
    ]
    if (address.unspent_siafunds !== '0') {
      list.push({
        label: 'SF',
        sf: Number(address.unspent_siafunds),
      })
    }
    return list
  }, [address])

  const transactions = useMemo(() => {
    const list: EntityListItemProps[] = []
    if (address.unconfirmed_transactions?.length) {
      list.push(
        ...address.unconfirmed_transactions.map((tx) => ({
          hash: tx.id,
          sc: getTotal({
            address: id,
            inputs: tx.siacoin_inputs,
            outputs: tx.siacoin_outputs,
          }),
          sf: getTotal({
            address: id,
            inputs: tx.siafund_inputs,
            outputs: tx.siafund_outputs,
          }).toNumber(),
          label: 'Transaction',
          initials: 'T',
          href: routes.transaction.view.replace(':id', tx.id),
          height: tx.block_height,
          timestamp: new Date(tx.timestamp).getTime(),
        })),
      )
    }
    if (address.transactions?.length) {
      list.push(
        ...address.transactions.map((tx) => ({
          hash: tx.id,
          sc: getTotal({
            address: id,
            inputs: tx.siacoin_inputs,
            outputs: tx.siacoin_outputs,
          }),
          sf: getTotal({
            address: id,
            inputs: tx.siafund_inputs,
            outputs: tx.siafund_outputs,
          }).toNumber(),
          label: 'Transaction',
          initials: 'T',
          href: routes.transaction.view.replace(':id', tx.id),
          height: tx.block_height,
          timestamp: new Date(tx.timestamp).getTime(),
        })),
      )
    }
    return list
  }, [id, address])

  const utxos = useMemo(() => {
    const list: EntityListItemProps[] = []
    if (address.unspent_siacoin_outputs?.length) {
      list.push(
        ...address.unspent_siacoin_outputs.map((o) => ({
          hash: o.output_id,
          sc: new BigNumber(o.value),
          label: 'siacoin output',
          initials: 'SO',
          scVariant: 'value' as const,
          height: o.block_height,
        })),
      )
    }
    return list
  }, [address])

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
              <Tooltip
                content={`${humanNumber(
                  address.transactions?.length,
                )} total transactions`}
              >
                <Badge variant="accent">
                  {`${humanNumber(address.transactions?.length)}`} transactions
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
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="utxos">Unspent outputs</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <EntityList dataset={transactions} />
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
  inputs?: { value: string; unlock_hash: string }[]
  outputs?: { value: string; unlock_hash: string }[]
}) {
  return (outputs || [])
    .reduce(
      (acc, o) => (o.unlock_hash === address ? acc.plus(o.value) : acc),
      new BigNumber(0),
    )
    .minus(
      (inputs || []).reduce(
        (acc, i) => (i.unlock_hash === address ? acc.plus(i.value) : acc),
        new BigNumber(0),
      ),
    )
}
