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
import { reverse, sortBy } from 'lodash-es'
import {
  SiaCentralBlock,
  SiaCentralExchangeRates,
  SiaCentralHost,
  SiaCentralHostsNetworkMetricsResponse,
} from '@siafoundation/sia-central'
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

export function Home({
  metrics,
  blockHeight,
  blocks,
  hosts,
  rates,
}: {
  metrics?: SiaCentralHostsNetworkMetricsResponse
  blockHeight: number
  blocks: SiaCentralBlock[]
  hosts: SiaCentralHost[]
  rates?: SiaCentralExchangeRates
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
                  metrics?.totals.total_storage -
                    metrics?.totals.remaining_storage
                )} used storage`}
              >
                <Text
                  className="text-xl md:text-3xl"
                  weight="semibold"
                  color="contrast"
                >
                  {humanBytes(
                    metrics?.totals.total_storage -
                      metrics?.totals.remaining_storage
                  )}
                </Text>
              </Tooltip>
              <Tooltip
                content={`${humanBytes(
                  metrics?.totals.total_storage
                )} total storage`}
              >
                <Text scaleSize="20" color="subtle">
                  {humanBytes(metrics?.totals.total_storage)}
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
                  {humanNumber(metrics?.totals.active_hosts)}
                </Text>
              </Tooltip>
              <Tooltip content="Total hosts">
                <Text scaleSize="20" color="subtle">
                  {humanNumber(metrics?.totals.total_hosts)}
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
                    price: metrics?.average.settings.storage_price,
                    exchange,
                  })}
                </Text>
                <Text color="subtle">
                  {getStorageCost({
                    price: metrics?.average.settings.storage_price,
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
                    price: metrics?.average.settings.download_price,
                    exchange,
                  })}
                </Text>
                <Text color="subtle">
                  {getDownloadCost({
                    price: metrics?.average.settings.download_price,
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
                    price: metrics?.average.settings.upload_price,
                    exchange,
                  })}
                </Text>
                <Text color="subtle">
                  {getUploadCost({
                    price: metrics?.average.settings.upload_price,
                  })}
                </Text>
              </div>
            </Tooltip>
          ),
        }
      )
    }
    return list
  }, [metrics, blockHeight, exchange])

  return (
    <ContentLayout
      panel={
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
          {values.map(({ label, value }) => (
            <div
              className="flex flex-col gap-6 items-start overflow-hidden"
              key={label}
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
            {hosts.map((host) => (
              <HostListItem
                key={host.public_key}
                host={host}
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
