'use client'

import { useMemo } from 'react'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { Panel, toFixedOrPrecision } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import {
  blocksToDays,
  blocksToMonths,
  humanBytes,
  humanSiacoin,
  toSiacoins,
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { siacoinToFiat } from '../../lib/currency'
import { ExplorerHost } from '@siafoundation/explored-types'

type Props = {
  host: ExplorerHost
  rates?: SiaCentralExchangeRates
}

export function HostSettings({ host, rates }: Props) {
  const exchange = useExchangeRate(rates)
  const priceTableValues = useMemo(() => {
    return [
      {
        label: 'total storage',
        copyable: false,
        value: humanBytes(host.settings.totalstorage),
      },
      {
        label: 'remaining storage',
        copyable: false,
        value: humanBytes(host.settings.remainingstorage),
      },
      {
        label: 'storage price',
        copyable: false,
        value: `${getStorageCost({
          price: host.settings.storageprice,
          exchange,
        })}/month`,
        comment: `${getStorageCost({
          price: host.settings.storageprice,
        })}/month`,
      },
      {
        label: 'download price',
        copyable: false,
        value: getDownloadCost({
          price: host.settings.downloadbandwidthprice,
          exchange,
        }),
        comment: getDownloadCost({
          price: host.settings.downloadbandwidthprice,
        }),
      },
      {
        label: 'upload price',
        copyable: false,
        value: getUploadCost({
          price: host.settings.uploadbandwidthprice,
          exchange,
        }),
        comment: getUploadCost({ price: host.settings.uploadbandwidthprice }),
      },
      {
        label: 'collateral',
        copyable: false,
        value: getStorageCost({ price: host.settings.collateral, exchange }),
        comment: getStorageCost({ price: host.settings.collateral }),
      },
      {
        label: 'max collateral',
        copyable: false,
        value: siacoinToFiat(host.settings.maxcollateral, exchange),
        comment: humanSiacoin(host.settings.maxcollateral),
      },
      {
        label: 'contract price',
        copyable: false,
        value: siacoinToFiat(host.settings.contractprice, exchange),
        comment: humanSiacoin(host.settings.contractprice),
      },
      {
        label: 'base RPC price',
        copyable: false,
        value: `${exchange?.currency.prefix || ''}${toSiacoins(
          host.settings.baserpcprice
        )
          .times(1e6)
          .times(exchange?.rate || 1)
          .precision(2)}/million`,
        comment: `${toSiacoins(host.settings.baserpcprice).times(
          1e6
        )} SC/million`,
      },
      {
        label: 'sector access price',
        copyable: false,
        value: `${exchange?.currency.prefix || ''}${toSiacoins(
          host.settings.sectoraccessprice
        )
          .times(1e6)
          .times(exchange?.rate || 1)
          .precision(2)} SC/million`,
        comment: `${toSiacoins(host.settings.sectoraccessprice).times(
          1e6
        )} SC/million`,
      },
      {
        label: 'ephemeral account expiry',
        copyable: false,
        value: host.settings.ephemeralaccountexpiry,
      },
      {
        label: 'max duration',
        copyable: false,
        value: `${toFixedOrPrecision(
          blocksToMonths(host.settings.maxduration),
          {
            digits: 2,
          }
        )} months`,
        comment: `${host.settings.maxduration} blocks`,
      },
      {
        label: 'max ephemeral account balance',
        copyable: false,
        sc: new BigNumber(host.settings.maxephemeralaccountbalance),
      },
      {
        label: 'sector size',
        copyable: false,
        value: humanBytes(host.settings.sectorsize),
      },
      {
        label: 'sia mux port',
        copyable: false,
        value: host.settings.siamuxport,
      },
      {
        label: 'window size',
        copyable: false,
        value: `${toFixedOrPrecision(blocksToDays(host.settings.windowsize), {
          digits: 2,
        })} days`,
        comment: `${host.settings.windowsize} blocks`,
      },
    ] as DatumProps[]
  }, [host, exchange])

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
