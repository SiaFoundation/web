'use client'

import { ExplorerHost } from '@siafoundation/explored-types'
import { Text, Tooltip } from '@siafoundation/design-system'
import {
  CloudDownload16,
  CloudUpload16,
  VmdkDisk16,
} from '@siafoundation/react-icons'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central-types'
import { useMemo } from 'react'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { useExchangeRate } from '../../hooks/useExchangeRate'

type Props = {
  host: ExplorerHost
  rates?: SiaCentralExchangeRates
}

export function HostPricing({ host, rates }: Props) {
  const exchange = useExchangeRate(rates)
  const storageCost = useMemo(
    () => getStorageCost({ price: host.settings.storageprice, exchange }),
    [exchange, host]
  )

  const downloadCost = useMemo(
    () =>
      getDownloadCost({
        price: host.settings.downloadbandwidthprice,
        exchange,
      }),
    [exchange, host]
  )

  const uploadCost = useMemo(
    () =>
      getUploadCost({ price: host.settings.uploadbandwidthprice, exchange }),
    [exchange, host]
  )

  return (
    <div className="flex flex-col" data-testid="explorer-hostPricing">
      <div className="grid grid-cols-3 gap-4">
        <Tooltip content={`Storage cost ${storageCost}/month`}>
          <div className="flex gap-2 items-center justify-end">
            <Text color="verySubtle" className="hidden sm:block">
              <VmdkDisk16 />
            </Text>
            <Text weight="semibold" font="mono" size="20" noWrap>
              {storageCost}
            </Text>
          </div>
        </Tooltip>
        <Tooltip content={`Download cost ${downloadCost}/month`}>
          <div className="flex gap-2 items-center justify-end">
            <Text color="verySubtle" className="hidden sm:block">
              <CloudDownload16 />
            </Text>
            <Text weight="semibold" font="mono" size="20" noWrap>
              {downloadCost}
            </Text>
          </div>
        </Tooltip>
        <Tooltip content={`Upload cost ${uploadCost}/month`}>
          <div className="flex gap-2 items-center justify-end">
            <Text color="verySubtle" className="hidden sm:block">
              <CloudUpload16 />
            </Text>
            <Text weight="semibold" font="mono" size="20" noWrap>
              {uploadCost}
            </Text>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
