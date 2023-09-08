'use client'

import { useMemo } from 'react'
import { SiaCentralHost } from '@siafoundation/sia-central'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { Panel } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'

type Props = {
  host: SiaCentralHost
}

export function HostPriceTable({ host }: Props) {
  const priceTableValues = useMemo(() => {
    return [
      {
        label: 'account balance cost',
        sc: new BigNumber(host.price_table.accountbalancecost),
      },
      {
        label: 'collateral cost',
        sc: new BigNumber(host.price_table.collateralcost),
      },
      {
        label: 'contract price',
        sc: new BigNumber(host.price_table.contractprice),
      },
      {
        label: 'download bandwidth cost',
        sc: new BigNumber(host.price_table.downloadbandwidthcost),
      },
      {
        label: 'drop sectors base cost',
        sc: new BigNumber(host.price_table.dropsectorsbasecost),
      },
      {
        label: 'drop sectors unit cost',
        sc: new BigNumber(host.price_table.dropsectorsunitcost),
      },
      {
        label: 'fund account cost',
        sc: new BigNumber(host.price_table.fundaccountcost),
      },
      {
        label: 'has sector base cost',
        sc: new BigNumber(host.price_table.hassectorbasecost),
      },
      {
        label: 'host block height',
        value: host.price_table.hostblockheight,
      },
      {
        label: 'init base cost',
        sc: new BigNumber(host.price_table.initbasecost),
      },
      {
        label: 'latest revision cost',
        sc: new BigNumber(host.price_table.latestrevisioncost),
      },
      {
        label: 'max collateral',
        sc: new BigNumber(host.price_table.maxcollateral),
      },
      {
        label: 'max duration',
        value: host.price_table.maxduration,
      },
      {
        label: 'memory time cost',
        sc: new BigNumber(host.price_table.memorytimecost),
      },
      {
        label: 'read base cost',
        sc: new BigNumber(host.price_table.readbasecost),
      },
      {
        label: 'read length cost',
        sc: new BigNumber(host.price_table.readlengthcost),
      },
      {
        label: 'registry entries left',
        value: host.price_table.registryentriesleft,
      },
      {
        label: 'registry entries total',
        value: host.price_table.registryentriestotal,
      },
      {
        label: 'renew contract cost',
        sc: new BigNumber(host.price_table.renewcontractcost),
      },
      {
        label: 'revision base cost',
        sc: new BigNumber(host.price_table.revisionbasecost),
      },
      {
        label: 'subscription memory cost',
        sc: new BigNumber(host.price_table.subscriptionmemorycost),
      },
      {
        label: 'subscription notification cost',
        sc: new BigNumber(host.price_table.subscriptionnotificationcost),
      },
      {
        label: 'swap sector cost',
        sc: new BigNumber(host.price_table.swapsectorcost),
      },
      {
        label: 'txn fee max recommended',
        sc: new BigNumber(host.price_table.txnfeemaxrecommended),
      },
      {
        label: 'txn fee min recommended',
        sc: new BigNumber(host.price_table.txnfeeminrecommended),
      },
      {
        label: 'UID',
        value: host.price_table.uid,
      },
      {
        label: 'update price table cost',
        sc: new BigNumber(host.price_table.updatepricetablecost),
      },
      {
        label: 'upload bandwidth cost',
        sc: new BigNumber(host.price_table.uploadbandwidthcost),
      },
      {
        label: 'validity',
        value: host.price_table.validity,
      },
      {
        label: 'window size',
        value: host.price_table.windowsize,
      },
      {
        label: 'write base cost',
        sc: new BigNumber(host.price_table.writebasecost),
      },
      {
        label: 'write length cost',
        sc: new BigNumber(host.price_table.writelengthcost),
      },
      {
        label: 'write store cost',
        sc: new BigNumber(host.price_table.writestorecost),
      },
    ] as DatumProps[]
  }, [host])

  return (
    <Panel className="p-4">
      <div className="flex flex-col">
        {!!priceTableValues?.length && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-4">
            {priceTableValues.map((item) => (
              <ExplorerDatum key={item.label} {...item} />
            ))}
          </div>
        )}
      </div>
    </Panel>
  )
}
