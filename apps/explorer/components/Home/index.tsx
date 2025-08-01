'use client'

import {
  Text,
  Tooltip,
  useActiveSiascanExchangeRate,
} from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { BlockList } from '../Entity/BlockList'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { reverse, sortBy } from '@technically/lodash'
import { hashToAvatar } from '../../lib/avatar'
import {
  humanBytes,
  humanNumber,
  displayEgressPricePerTBPerMonth,
  displayIngressPricePerTBPerMonth,
  displayStoragePricePerTBPerMonth,
} from '@siafoundation/units'
import { HostListItem } from './HostListItem'
import {
  ExplorerBlock,
  ExplorerHost,
  HostMetrics,
} from '@siafoundation/explored-types'
import { Information20 } from '@siafoundation/react-icons'
import LoadingCurrency from '../LoadingCurrency'
import { useExploredAddress } from '../../hooks/useExploredAddress'
import { getHostNetAddress } from '../../lib/hostType'

export function Home({
  version,
  metrics,
  blockHeight,
  blocks,
  hosts,
  totalHosts,
}: {
  version: 'v1' | 'v2'
  metrics?: HostMetrics
  blockHeight: number
  blocks: ExplorerBlock[]
  hosts: ExplorerHost[]
  totalHosts?: number
}) {
  const api = useExploredAddress()
  const exchange = useActiveSiascanExchangeRate({
    api,
    config: {
      swr: {
        keepPreviousData: true,
      },
    },
  })
  const values = useMemo(() => {
    const list = [
      {
        label: 'Blockchain height',
        value: (
          <Tooltip content="Block height">
            <Text
              className="text-xl md:text-3xl"
              weight="semibold"
              color="contrast"
              data-testid="explorer-home-height"
            >
              {humanNumber(blockHeight)}
            </Text>
          </Tooltip>
        ),
      },
    ]
    if (metrics) {
      const storagePrice =
        version === 'v1'
          ? metrics?.settings.storageprice
          : metrics?.v2Settings.prices.storagePrice
      const downloadPrice =
        version === 'v1'
          ? metrics?.priceTable.downloadbandwidthcost
          : metrics?.v2Settings.prices.egressPrice
      const uploadPrice =
        version === 'v1'
          ? metrics?.priceTable.uploadbandwidthcost
          : metrics?.v2Settings.prices.ingressPrice

      list.push(
        {
          label: 'Storage utilization',
          value: (
            <div className="flex flex-col gap-1 items-baseline">
              <Tooltip
                content={`${humanBytes(
                  metrics?.totalStorage - metrics?.remainingStorage,
                )} used storage`}
              >
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {humanBytes(
                    metrics?.totalStorage - metrics?.remainingStorage,
                  )}
                </Text>
              </Tooltip>
              <Tooltip
                content={`${humanBytes(metrics?.totalStorage)} total storage`}
              >
                <Text scaleSize="20" color="subtle">
                  {humanBytes(metrics?.totalStorage)}
                </Text>
              </Tooltip>
            </div>
          ),
        },
        {
          label: 'Active hosts',
          value: (
            <div
              className="flex flex-col gap-1 items-baseline"
              data-testid="explorer-home-activeHosts"
            >
              <Tooltip content="Active hosts">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {humanNumber(metrics?.activeHosts)}
                </Text>
              </Tooltip>
              <Tooltip content="Total hosts">
                <Text scaleSize="20" color="subtle">
                  {humanNumber(totalHosts)}
                </Text>
              </Tooltip>
            </div>
          ),
        },
        {
          label: 'Median storage price',
          value: (
            <Tooltip content="Median storage price per TB/month">
              <div className="flex flex-col gap-1">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {exchange.currency && exchange.rate ? (
                    displayStoragePricePerTBPerMonth({
                      price: storagePrice,
                      exchange: {
                        currency: {
                          prefix: exchange.currency.prefix,
                        },
                        rate: exchange.rate,
                      },
                    })
                  ) : (
                    <LoadingCurrency type="perTB" />
                  )}
                </Text>
                <Text color="subtle">
                  {displayStoragePricePerTBPerMonth({
                    price: storagePrice,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        },
        {
          label: 'Median download price',
          value: (
            <Tooltip content="Median download price per TB">
              <div className="flex flex-col gap-1">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {exchange.currency && exchange.rate ? (
                    displayEgressPricePerTBPerMonth({
                      price: downloadPrice,
                      exchange: {
                        currency: {
                          prefix: exchange.currency.prefix,
                        },
                        rate: exchange.rate,
                      },
                    })
                  ) : (
                    <LoadingCurrency type="perTB" />
                  )}
                </Text>
                <Text color="subtle">
                  {displayEgressPricePerTBPerMonth({
                    price: downloadPrice,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        },
        {
          label: 'Median upload price',
          value: (
            <Tooltip content="Median upload price per TB">
              <div className="flex flex-col gap-1">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {exchange.currency && exchange.rate ? (
                    displayIngressPricePerTBPerMonth({
                      price: uploadPrice,
                      exchange: {
                        currency: {
                          prefix: exchange.currency.prefix,
                        },
                        rate: exchange.rate,
                      },
                    })
                  ) : (
                    <LoadingCurrency type="perTB" />
                  )}
                </Text>
                <Text color="subtle">
                  {displayIngressPricePerTBPerMonth({
                    price: uploadPrice,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        },
      )
    }
    return list
  }, [metrics, blockHeight, exchange, totalHosts, version])

  return (
    <ContentLayout
      panel={
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
          {values.map(({ label, value }) => (
            <div
              className="flex flex-col gap-6 items-start overflow-hidden"
              key={label}
              data-testid="explorer-metrics-item"
            >
              <Text color="subtle" scaleSize="14" className="w-full" ellipsis>
                {label}
              </Text>
              {value}
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        <div>
          <BlockList
            title="Latest blocks"
            dataset={reverse(sortBy(blocks, 'timestamp')).map((block) => ({
              height: block.height,
              timestamp: block.timestamp,
              href: routes.block.view.replace(':id', String(block.height)),
              version: 'v2' in block ? 'v2' : 'v1',
            }))}
          />
        </div>
        <div>
          <EntityList
            title="Top hosts"
            actions={
              <Tooltip content="The Sia Foundation believes hosts can be evaluated in many different ways, depending on purpose. This list uses a combination of age, uptime, pricing, and used storage, with slight weight to the first two categories.">
                <Information20 />
              </Tooltip>
            }
          >
            {hosts
              .filter((host) => (host.v2 ? host.v2Settings : host.settings))
              .map((host) => (
                <HostListItem
                  key={host.publicKey}
                  host={host}
                  exchange={exchange}
                  entity={{
                    label: getHostNetAddress(host),
                    initials: 'H',
                    avatar: hashToAvatar(host.publicKey),
                    href: routes.host.view.replace(':id', host.publicKey),
                  }}
                />
              ))}
          </EntityList>
        </div>
      </div>
    </ContentLayout>
  )
}
