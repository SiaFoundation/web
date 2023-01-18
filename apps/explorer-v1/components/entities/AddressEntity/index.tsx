import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  ChartTimeValue,
  ValueSc,
  EntityList,
  EntityListItemProps,
} from '@siafoundation/design-system'
import { humanNumber, humanSiacoin } from '@siafoundation/sia-js'
import { NvgDatum, DatumProps } from '../../NvgDatum'
import {
  getNvgEntityTypeInitials,
  getNvgEntityTypeLabel,
  NvgAddressEntity,
} from '../../../config/navigatorTypes'
import { useBalanceHistory } from '../../../hooks/useBalanceHistory'
import { useMemo, useState } from 'react'
import { useStatus } from '../../../hooks/useStatus'
import { routes } from '../../../config/routes'
import { EntityHeading } from '../../EntityHeading'
import { useUtxos } from '../../../hooks/useUtxos'
import { getHrefForType } from '../../../lib/utils'
import BigNumber from 'bignumber.js'
import { ContentLayout } from '../../ContentLayout'

type Tab = 'transactions' | 'evolution' | 'utxos'

type Props = {
  entity: NvgAddressEntity
}

export function AddressEntity({ entity }: Props) {
  const status = useStatus()
  const { data } = entity

  const [tab, setTab] = useState<Tab>('transactions')
  const balanceHistory = useBalanceHistory(
    tab === 'evolution' ? entity.data[0].MasterHash : null
  )
  const utxos = useUtxos(tab === 'utxos' ? entity.data[0].MasterHash : null)

  const firstSeen = data[1].firstSeen === '-' ? 0 : data[1].firstSeen
  const firstSeenAgo =
    status.data?.lastblock && status.data.lastblock - firstSeen

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Confirmed SC',
        sc: new BigNumber(data[1].balanceSc),
        comment: (
          <div className="flex flex-wrap gap-2">
            <ValueSc
              tooltip="Received"
              value={new BigNumber(data[1].receivedSc)}
              variant="change"
              size="10"
            />
            <ValueSc
              tooltip="Sent"
              value={new BigNumber(-data[1].sentSc)}
              variant="change"
              size="10"
            />
          </div>
        ),
      },
      {
        label: 'Pending SC',
        sc: new BigNumber(data[1].pendingSc),
      },
      {
        label: 'Confirmed SF',
        sf: data[1].balanceSf,
      },
      {
        label: 'Pending SF',
        sf: data[1].pendingSf,
      },
    ]
    return list
  }, [data])

  const address = data[0].MasterHash

  const transactions = useMemo(() => {
    const list: EntityListItemProps[] = [
      ...data[1].unconfirmedTransactions.map((tx) => ({
        hash: tx.TxHash,
        sc: new BigNumber(tx.ScValue),
        sf: tx.SfValue,
        label: getNvgEntityTypeLabel(tx.TxType),
        initials: getNvgEntityTypeInitials(tx.TxType),
        href: getHrefForType(tx.TxType, tx.TxHash),
        timestamp: tx.Timestamp * 1000,
        unconfirmed: true,
      })),
      ...data[1].last100Transactions.map((tx) => ({
        hash: tx.MasterHash,
        sc: new BigNumber(tx.ScChange),
        sf: tx.SfChange,
        label: getNvgEntityTypeLabel(tx.TxType),
        initials: getNvgEntityTypeInitials(tx.TxType),
        href: getHrefForType(tx.TxType, tx.MasterHash),
        height: tx.Height,
        timestamp: tx.Timestamp * 1000,
      })),
    ]
    return list
  }, [data])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-y-2 justify-between items-center">
            <EntityHeading
              label="address"
              type="address"
              value={address}
              href={routes.address.view.replace('[id]', address)}
            />
            <div className="flex gap-2 items-center">
              <Tooltip
                content={`First seen ${humanNumber(
                  firstSeenAgo
                )} blocks ago, at block ${humanNumber(firstSeen)}`}
              >
                <Badge variant="simple">{`${humanNumber(firstSeen)}`}</Badge>
              </Tooltip>
              <Tooltip
                content={`${humanNumber(
                  data[1].TotalTxCount
                )} total transactions`}
              >
                <Badge variant="accent">
                  {`${humanNumber(data[1].TotalTxCount)}`} transactions
                </Badge>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            {values.map((item) => (
              <NvgDatum key={item.label} {...item} />
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
          <TabsTrigger value="transactions">Last 100 transactions</TabsTrigger>
          <TabsTrigger value="evolution">Balance evolution</TabsTrigger>
          <TabsTrigger value="utxos">Unspent outputs</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <EntityList entities={transactions} />
        </TabsContent>
        <TabsContent value="evolution">
          <ChartTimeValue
            datasets={[
              {
                name: 'SC',
                dataset: balanceHistory.data?.scJson || [],
                formatValue: (v) => humanSiacoin(v),
              },
              {
                name: 'SF',
                dataset: balanceHistory.data?.sfJson || [],
                formatValue: (v) => humanNumber(v, { units: 'SF' }),
              },
            ]}
            height={300}
          />
        </TabsContent>
        <TabsContent value="utxos">
          <EntityList
            entities={utxos.data?.map((output) => ({
              sc: new BigNumber(output.hastings || '0'),
              sf: output.sf,
              hash: output.output,
              label: getNvgEntityTypeLabel('output'),
              initials: getNvgEntityTypeInitials('output'),
              href: getHrefForType('output', output.output),
            }))}
          />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
