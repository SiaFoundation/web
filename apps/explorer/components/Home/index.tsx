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
import {
  SiaCentralExchangeRates,
  SiaCentralHost,
} from '@siafoundation/sia-central-types'
import { hashToAvatar } from '../../lib/avatar'
import {
  humanBytes,
  humanNumber,
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { HostListItem } from './HostListItem'
import { useExchangeRate } from '../../hooks/useExchangeRate'
import { SiaCentralHostScanned } from '../Host/types'
import { ExplorerBlock, HostMetrics } from '@siafoundation/explored-types'

export function Home({
  metrics,
  blockHeight,
  blocks,
  hosts,
  rates,
  totalHosts,
}: {
  metrics?: HostMetrics
  blockHeight: number
  blocks: ExplorerBlock[]
  hosts: SiaCentralHost[]
  rates?: SiaCentralExchangeRates
  totalHosts?: number
}) {
  const exchange = useExchangeRate(rates)
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
                  {getStorageCost({
                    price: metrics?.settings.storageprice,
                    exchange,
                  })}
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
                  {getDownloadCost({
                    price: metrics?.priceTable.downloadbandwidthcost,
                    exchange,
                  })}
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
                  {getUploadCost({
                    price: metrics?.priceTable.uploadbandwidthcost,
                    exchange,
                  })}
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
          <EntityList title="Top hosts">
            {hosts
              .filter((host) => host.settings)
              .map((host) => (
                <HostListItem
                  key={host.public_key}
                  host={host as SiaCentralHostScanned}
                  rates={rates}
                  entity={{
                    label: host.net_address,
                    initials: 'H',
                    avatar: hashToAvatar(host.public_key),
                    href: routes.host.view.replace(':id', host.public_key),
                  }}
                />
              ))}
          </EntityList>
        </div>
      </div>
    </ContentLayout>
  )
}
