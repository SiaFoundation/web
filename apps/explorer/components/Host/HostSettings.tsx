'use client'

import { useMemo } from 'react'
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { Panel } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { humanBytes, toSiacoins } from '@siafoundation/sia-js'
import { getDownloadCost, getStorageCost, getUploadCost } from '../../lib/host'

type Props = {
  host: SiaCentralHost
  rates: SiaCentralExchangeRates
}

export function HostSettings({ host, rates }: Props) {
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
          rates,
        })}/month`,
      },
      {
        label: 'download price',
        copyable: false,
        value: getDownloadCost({ price: host.settings.download_price, rates }),
      },
      {
        label: 'upload price',
        copyable: false,
        value: getUploadCost({ price: host.settings.download_price, rates }),
      },
      {
        label: 'collateral',
        copyable: false,
        value: `$${toSiacoins(host.settings.collateral)
          .times(rates.sc.usd || 1)
          .toFixed(2)}`,
      },
      {
        label: 'max collateral',
        copyable: false,
        value: `$${toSiacoins(host.settings.max_collateral)
          .times(rates.sc.usd || 1)
          .toFixed(2)}`,
      },
      {
        label: 'contract price',
        copyable: false,
        sc: new BigNumber(host.settings.contract_price),
      },
      {
        label: 'base RPC price',
        copyable: false,
        value: `${toSiacoins(host.settings.base_rpc_price)
          .div(1e6)
          .toExponential()} SC/million`,
      },
      {
        label: 'sector access price',
        copyable: false,
        value: `${toSiacoins(host.settings.sector_access_price)
          .div(1e6)
          .toExponential()} SC/million`,
      },
      {
        label: 'ephemeral account expiry',
        copyable: false,
        value: host.settings.ephemeral_account_expiry,
      },
      {
        label: 'max duration',
        copyable: false,
        value: host.settings.max_duration,
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
        value: `${host.settings.window_size} blocks`,
      },
    ] as DatumProps[]
  }, [host, rates])

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
