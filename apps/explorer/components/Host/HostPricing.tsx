'use client'

import { ExplorerHost } from '@siafoundation/explored-types'
import {
  Text,
  Tooltip,
  useActiveSiascanExchangeRate,
} from '@siafoundation/design-system'
import {
  CloudDownload16,
  CloudUpload16,
  VmdkDisk16,
} from '@siafoundation/react-icons'
import { useMemo } from 'react'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import LoadingCurrency from '../LoadingCurrency'
import { useExploredAddress } from '../../hooks/useExploredAddress'

type Props = {
  host: ExplorerHost
}

export function HostPricing({ host }: Props) {
  const api = useExploredAddress()
  const exchange = useActiveSiascanExchangeRate({
    api,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })
  const storageCost = useMemo(
    () =>
      exchange.currency && exchange.rate ? (
        getStorageCost({
          price: host.v2
            ? host.v2Settings.prices.storagePrice
            : host.settings.storageprice,
          exchange: {
            currency: { prefix: exchange.currency.prefix },
            rate: exchange.rate.toString(),
          },
        })
      ) : (
        <LoadingCurrency type="perTB" />
      ),
    [exchange, host]
  )

  const downloadCost = useMemo(
    () =>
      exchange.currency && exchange.rate ? (
        getDownloadCost({
          price: host.v2
            ? host.v2Settings.prices.egressPrice
            : host.settings.downloadbandwidthprice,
          exchange: {
            currency: { prefix: exchange.currency.prefix },
            rate: exchange.rate.toString(),
          },
        })
      ) : (
        <LoadingCurrency type="perTB" />
      ),
    [exchange, host]
  )

  const uploadCost = useMemo(
    () =>
      exchange.currency && exchange.rate ? (
        getUploadCost({
          price: host.v2
            ? host.v2Settings.prices.ingressPrice
            : host.settings.uploadbandwidthprice,
          exchange: {
            currency: { prefix: exchange.currency.prefix },
            rate: exchange.rate.toString(),
          },
        })
      ) : (
        <LoadingCurrency type="perTB" />
      ),
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
