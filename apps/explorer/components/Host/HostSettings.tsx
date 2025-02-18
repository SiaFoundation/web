'use client'

import { useMemo } from 'react'
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
import { ExplorerHost } from '@siafoundation/explored-types'
import { useActiveCurrencySiascanExchangeRate } from '@siafoundation/react-core'
import LoadingCurrency from '../LoadingCurrency'
import { exploredApi } from '../../config'
import { siacoinToFiat } from '../../lib/currency'

type Props = {
  host: ExplorerHost
}

export function HostSettings({ host }: Props) {
  const exchange = useActiveCurrencySiascanExchangeRate({
    api: exploredApi,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })
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
        value:
          exchange.currency && exchange.rate ? (
            `${getStorageCost({
              price: host.settings.storageprice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate.toString(),
              },
            })}/month`
          ) : (
            <LoadingCurrency type="perTBMonth" />
          ),
        comment: `${getStorageCost({
          price: host.settings.storageprice,
        })}/month`,
      },
      {
        label: 'download price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            getDownloadCost({
              price: host.settings.downloadbandwidthprice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate.toString(),
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: getDownloadCost({
          price: host.settings.downloadbandwidthprice,
        }),
      },
      {
        label: 'upload price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            getUploadCost({
              price: host.settings.uploadbandwidthprice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate.toString(),
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: getUploadCost({ price: host.settings.uploadbandwidthprice }),
      },
      {
        label: 'collateral',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            getStorageCost({
              price: host.settings.collateral,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate.toString(),
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: getStorageCost({ price: host.settings.collateral }),
      },
      {
        label: 'max collateral',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            siacoinToFiat(host.settings.maxcollateral, {
              rate: exchange.rate,
              currency: exchange.currency,
            })
          ) : (
            <LoadingCurrency />
          ),
        comment: humanSiacoin(host.settings.maxcollateral),
      },
      {
        label: 'contract price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            siacoinToFiat(host.settings.contractprice, {
              rate: exchange.rate,
              currency: exchange.currency,
            })
          ) : (
            <LoadingCurrency />
          ),
        comment: humanSiacoin(host.settings.contractprice),
      },
      {
        label: 'base RPC price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            `${exchange.currency.prefix || ''}${toSiacoins(
              host.settings.baserpcprice
            )
              .times(1e6)
              .times(exchange.rate || 1)
              .precision(2)}/million`
          ) : (
            <LoadingCurrency type="perMillion" />
          ),
        comment: `${toSiacoins(host.settings.baserpcprice).times(
          1e6
        )} SC/million`,
      },
      {
        label: 'sector access price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            `${exchange.currency.prefix || ''}${toSiacoins(
              host.settings.sectoraccessprice
            )
              .times(1e6)
              .times(exchange.rate || 1)
              .precision(2)} SC/million`
          ) : (
            <LoadingCurrency type="perSCMillion" />
          ),
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
