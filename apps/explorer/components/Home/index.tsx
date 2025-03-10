'use client'

import {
  Text,
  BlockList,
  Tooltip,
  EntityList,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { reverse, sortBy } from '@technically/lodash'
import { hashToAvatar } from '../../lib/avatar'
import {
  humanBytes,
  humanNumber,
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { HostListItem } from './HostListItem'
import {
  ExplorerBlock,
  ExplorerHost,
  HostMetrics,
} from '@siafoundation/explored-types'
import { Information20 } from '@siafoundation/react-icons'
import { useActiveCurrencySiascanExchangeRate } from '@siafoundation/react-core'
import LoadingCurrency from '../LoadingCurrency'
import { useExploredAddress } from '../../hooks/useExploredAddress'
import { getHostNetAddress } from '../../lib/hostType'

export function Home({
  metrics,
  blockHeight,
  blocks,
  hosts,
  totalHosts,
}: {
  metrics?: HostMetrics
  blockHeight: number
  blocks: ExplorerBlock[]
  hosts: ExplorerHost[]
  totalHosts?: number
}) {
  const api = useExploredAddress()
  const exchange = useActiveCurrencySiascanExchangeRate({
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
            >
              {humanNumber(blockHeight)}
            </Text>
          </Tooltip>
        ),
      },
    ]
    if (metrics) {
      list.push(
        {
          label: 'Storage utilization',
          value: (
            <div className="flex flex-col gap-1 items-baseline">
              <Tooltip
                content={`${humanBytes(
                  metrics?.totalStorage - metrics?.remainingStorage
                )} used storage`}
              >
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {humanBytes(
                    metrics?.totalStorage - metrics?.remainingStorage
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
            <div className="flex flex-col gap-1 items-baseline">
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
          label: 'Average storage price',
          value: (
            <Tooltip content="Average storage price per TB/month">
              <div className="flex flex-col gap-1">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {exchange.currency && exchange.rate ? (
                    getStorageCost({
                      price: metrics?.settings.storageprice,
                      exchange: {
                        currency: {
                          prefix: exchange.currency.prefix,
                        },
                        rate: exchange.rate.toString(),
                      },
                    })
                  ) : (
                    <LoadingCurrency type="perTB" />
                  )}
                </Text>
                <Text color="subtle">
                  {getStorageCost({
                    price: metrics?.settings.storageprice,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        },
        {
          label: 'Average download price',
          value: (
            <Tooltip content="Average download price per TB">
              <div className="flex flex-col gap-1">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {exchange.currency && exchange.rate ? (
                    getDownloadCost({
                      price: metrics?.priceTable.downloadbandwidthcost,
                      exchange: {
                        currency: {
                          prefix: exchange.currency.prefix,
                        },
                        rate: exchange.rate.toString(),
                      },
                    })
                  ) : (
                    <LoadingCurrency type="perTB" />
                  )}
                </Text>
                <Text color="subtle">
                  {getDownloadCost({
                    price: metrics?.priceTable.downloadbandwidthcost,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        },
        {
          label: 'Average upload price',
          value: (
            <Tooltip content="Average upload price per TB">
              <div className="flex flex-col gap-1">
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {exchange.currency && exchange.rate ? (
                    getUploadCost({
                      price: metrics?.priceTable.uploadbandwidthcost,
                      exchange: {
                        currency: {
                          prefix: exchange.currency.prefix,
                        },
                        rate: exchange.rate.toString(),
                      },
                    })
                  ) : (
                    <LoadingCurrency type="perTB" />
                  )}
                </Text>
                <Text color="subtle">
                  {getUploadCost({
                    price: metrics?.priceTable.uploadbandwidthcost,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        }
      )
    }
    return list
  }, [metrics, blockHeight, exchange, totalHosts])

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
