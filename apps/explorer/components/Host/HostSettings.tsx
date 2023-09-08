'use client'

import { useMemo } from 'react'
import { SiaCentralHost } from '@siafoundation/sia-central'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import { Panel } from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import { humanBytes } from '@siafoundation/sia-js'

type Props = {
  host: SiaCentralHost
}

export function HostSettings({ host }: Props) {
  const priceTableValues = useMemo(() => {
    return [
      {
        label: 'base RPC price',
        sc: new BigNumber(host.settings.base_rpc_price),
      },
      {
        label: 'collateral',
        sc: new BigNumber(host.settings.collateral),
      },
      {
        label: 'contract price',
        sc: new BigNumber(host.settings.contract_price),
      },
      {
        label: 'download price',
        sc: new BigNumber(host.settings.download_price),
      },
      {
        label: 'ephemeral account expiry',
        value: host.settings.ephemeral_account_expiry,
      },
      {
        label: 'max collateral',
        sc: new BigNumber(host.settings.max_collateral),
      },
      {
        label: 'max download batch size',
        value: host.settings.max_download_batch_size,
      },
      {
        label: 'max duration',
        value: host.settings.max_duration,
      },
      {
        label: 'max ephemeral account balance',
        sc: new BigNumber(host.settings.max_ephemeral_account_balance),
      },
      {
        label: 'max revise batch size',
        value: host.settings.max_revise_batch_size,
      },
      {
        label: 'remaining storage',
        value: humanBytes(host.settings.remaining_storage),
      },
      {
        label: 'revision number',
        value: host.settings.revision_number,
      },
      {
        label: 'sector access price',
        sc: new BigNumber(host.settings.sector_access_price),
      },
      {
        label: 'sector size',
        value: humanBytes(host.settings.sector_size),
      },
      {
        label: 'sia mux port',
        value: host.settings.sia_mux_port,
      },
      {
        label: 'storage price',
        sc: new BigNumber(host.settings.storage_price),
      },
      {
        label: 'total storage',
        value: humanBytes(host.settings.total_storage),
      },
      {
        label: 'upload price',
        sc: new BigNumber(host.settings.upload_price),
      },
      {
        label: 'window size',
        value: host.settings.window_size,
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
