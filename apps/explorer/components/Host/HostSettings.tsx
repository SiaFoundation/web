'use client'

import { useMemo } from 'react'
import { DatumProps, ExplorerDatum } from '../ExplorerDatum'
import {
  Panel,
  toFixedOrPrecision,
  useActiveSiascanExchangeRate,
} from '@siafoundation/design-system'
import BigNumber from 'bignumber.js'
import {
  blocksToDays,
  blocksToMonths,
  humanBytes,
  humanSiacoin,
  toSiacoins,
  displayEgressPricePerTBPerMonth,
  displayIngressPricePerTBPerMonth,
  displayStoragePricePerTBPerMonth,
  sectorsToBytes,
} from '@siafoundation/units'
import { ExplorerHost } from '@siafoundation/explored-types'
import LoadingCurrency from '../LoadingCurrency'
import { hastingsToFiat } from '../../lib/currency'
import { useApi } from '../../contexts/api'
import { getHostNetAddress } from '../../lib/hostType'

type Props = {
  host: ExplorerHost
}

export function HostSettings({ host }: Props) {
  const { api } = useApi()
  const exchange = useActiveSiascanExchangeRate({
    api,
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
        value: humanBytes(
          host.v2
            ? sectorsToBytes(host.v2Settings.totalStorage)
            : host.settings.totalstorage,
        ),
      },
      {
        label: 'remaining storage',
        copyable: false,
        value: humanBytes(
          host.v2
            ? sectorsToBytes(host.v2Settings.remainingStorage)
            : host.settings.remainingstorage,
        ),
      },
      {
        label: 'storage price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayStoragePricePerTBPerMonth({
              price: host.v2
                ? host.v2Settings.prices.storagePrice
                : host.settings.storageprice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTBMonth" />
          ),
        comment: displayStoragePricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.storagePrice
            : host.settings.storageprice,
        }),
      },
      {
        label: 'download price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayEgressPricePerTBPerMonth({
              price: host.v2
                ? host.v2Settings.prices.egressPrice
                : host.settings.downloadbandwidthprice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: displayEgressPricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.egressPrice
            : host.settings.downloadbandwidthprice,
        }),
      },
      {
        label: 'upload price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayIngressPricePerTBPerMonth({
              price: host.v2
                ? host.v2Settings.prices.ingressPrice
                : host.settings.uploadbandwidthprice,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: displayIngressPricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.ingressPrice
            : host.settings.uploadbandwidthprice,
        }),
      },
      {
        label: 'collateral',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            displayStoragePricePerTBPerMonth({
              price: host.v2
                ? host.v2Settings.prices.collateral
                : host.settings.collateral,
              exchange: {
                currency: { prefix: exchange.currency.prefix },
                rate: exchange.rate,
              },
            })
          ) : (
            <LoadingCurrency type="perTB" />
          ),
        comment: displayStoragePricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.collateral
            : host.settings.collateral,
        }),
      },
      {
        label: 'max collateral',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            hastingsToFiat(
              host.v2
                ? host.v2Settings.maxCollateral
                : host.settings.maxcollateral,
              {
                rate: exchange.rate,
                currency: exchange.currency,
              },
            )
          ) : (
            <LoadingCurrency />
          ),
        comment: humanSiacoin(
          host.v2 ? host.v2Settings.maxCollateral : host.settings.maxcollateral,
        ),
      },
      {
        label: 'contract price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            hastingsToFiat(
              host.v2
                ? host.v2Settings.prices.contractPrice
                : host.settings.contractprice,
              {
                rate: exchange.rate,
                currency: exchange.currency,
              },
            )
          ) : (
            <LoadingCurrency />
          ),
        comment: humanSiacoin(
          host.v2
            ? host.v2Settings.prices.contractPrice
            : host.settings.contractprice,
        ),
      },
      !host.v2 && {
        label: 'base RPC price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            `${exchange.currency.prefix || ''}${toSiacoins(
              host.settings.baserpcprice,
            )
              .times(1e6)
              .times(exchange.rate || 1)
              .precision(2)}/million`
          ) : (
            <LoadingCurrency type="perMillion" />
          ),
        comment: `${toSiacoins(host.settings.baserpcprice).times(
          1e6,
        )} SC/million`,
      },
      !host.v2 && {
        label: 'sector access price',
        copyable: false,
        value:
          exchange.currency && exchange.rate ? (
            `${exchange.currency.prefix || ''}${toSiacoins(
              host.settings.sectoraccessprice,
            )
              .times(1e6)
              .times(exchange.rate || 1)
              .precision(2)} SC/million`
          ) : (
            <LoadingCurrency type="perSCMillion" />
          ),
        comment: `${toSiacoins(host.settings.sectoraccessprice).times(
          1e6,
        )} SC/million`,
      },
      !host.v2 && {
        label: 'ephemeral account expiry',
        copyable: false,
        value: host.settings.ephemeralaccountexpiry,
      },
      {
        label: 'max duration',
        copyable: false,
        value: `${toFixedOrPrecision(
          blocksToMonths(
            host.v2
              ? host.v2Settings.maxContractDuration
              : host.settings.maxduration,
          ),
          {
            digits: 2,
          },
        )} months`,
        comment: `${
          host.v2
            ? host.v2Settings.maxContractDuration
            : host.settings.maxduration
        } blocks`,
      },
      !host.v2 && {
        label: 'max ephemeral account balance',
        copyable: false,
        sc: new BigNumber(host.settings.maxephemeralaccountbalance),
      },
      !host.v2 && {
        label: 'sector size',
        copyable: false,
        value: humanBytes(host.settings.sectorsize),
      },
      {
        label: 'sia mux port',
        copyable: false,
        value: getHostNetAddress(host).slice(-4),
      },
      !host.v2 && {
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
            {priceTableValues.map(
              (item) => item && <ExplorerDatum key={item.label} {...item} />,
            )}
          </div>
        )}
      </div>
    </Panel>
  )
}
