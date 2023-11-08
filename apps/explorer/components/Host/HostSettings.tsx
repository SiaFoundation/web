'use client'

import { useMemo } from 'react'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import {
  Panel,
  blocksToDays,
  blocksToMonths,
  toFixedOrPrecision,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { humanBytes, humanSiacoin, toSiacoins } from '@siafoundation/sia-js'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { siacoinToFiat } from '../../lib/currency'

type Props = {
  host: SiaCentralHost
  rates?: SiaCentralExchangeRates
}

export function HostSettings({ host, rates }: Props) {
  const exchange = useExchangeRate(rates)
  const priceTableValues = useMemo(() => {
    return [
      {
        label: 'total storage',
        copyable: false,
        value: humanBytes(host.settings.total_storage),
      },
      {
        label: 'remaining storage',
        copyable: false,
        value: humanBytes(host.settings.remaining_storage),
      },
      {
        label: 'storage price',
        copyable: false,
        value: `${getStorageCost({
          price: host.settings.storage_price,
          exchange,
        })}/month`,
        comment: `${getStorageCost({
          price: host.settings.storage_price,
        })}/month`,
      },
      {
        label: 'download price',
        copyable: false,
        value: getDownloadCost({
          price: host.settings.download_price,
          exchange,
        }),
        comment: getDownloadCost({ price: host.settings.download_price }),
      },
      {
        label: 'upload price',
        copyable: false,
        value: getUploadCost({ price: host.settings.upload_price, exchange }),
        comment: getUploadCost({ price: host.settings.upload_price }),
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
        value: siacoinToFiat(host.settings.max_collateral, exchange),
        comment: humanSiacoin(host.settings.max_collateral),
      },
      {
        label: 'contract price',
        copyable: false,
        value: siacoinToFiat(host.settings.contract_price, exchange),
        comment: humanSiacoin(host.settings.contract_price),
      },
      {
        label: 'base RPC price',
        copyable: false,
        value: `${exchange?.currency.prefix || ''}${toSiacoins(
          host.settings.base_rpc_price
        )
          .times(1e6)
          .times(exchange?.rate || 1)
          .precision(2)}/million`,
        comment: `${toSiacoins(host.settings.base_rpc_price).times(
          1e6
        )} SC/million`,
      },
      {
        label: 'sector access price',
        copyable: false,
        value: `${exchange?.currency.prefix || ''}${toSiacoins(
          host.settings.sector_access_price
        )
          .times(1e6)
          .times(exchange?.rate || 1)
          .precision(2)} SC/million`,
        comment: `${toSiacoins(host.settings.sector_access_price).times(
          1e6
        )} SC/million`,
      },
      {
        label: 'ephemeral account expiry',
        copyable: false,
        value: host.settings.ephemeral_account_expiry,
      },
      {
        label: 'max duration',
        copyable: false,
        value: `${toFixedOrPrecision(
          blocksToMonths(host.settings.max_duration),
          {
            digits: 2,
          }
        )} months`,
        comment: `${host.settings.max_duration} blocks`,
      },
      {
        label: 'max ephemeral account balance',
        copyable: false,
        sc: new BigNumber(host.settings.max_ephemeral_account_balance),
      },
      {
        label: 'sector size',
        copyable: false,
        value: humanBytes(host.settings.sector_size),
      },
      {
        label: 'sia mux port',
        copyable: false,
        value: host.settings.sia_mux_port,
      },
      {
        label: 'window size',
        copyable: false,
        value: `${toFixedOrPrecision(blocksToDays(host.settings.window_size), {
          digits: 2,
        })} days`,
        comment: `${host.settings.window_size} blocks`,
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
