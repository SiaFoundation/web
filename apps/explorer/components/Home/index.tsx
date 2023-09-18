'use client'

import {
  Text,
  BlockList,
  Tooltip,
  EntityList,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { ContentLayout } from '../ContentLayout'
import { reverse, sortBy } from 'lodash'
import {
  SiaCentralBlock,
  SiaCentralExchangeRates,
  SiaCentralHost,
  SiaCentralHostsNetworkMetricsResponse,
} from '@siafoundation/sia-central'
import { hashToAvatar } from '../../lib/avatar'
import { getDownloadCost, getStorageCost, getUploadCost } from '../../lib/host'
import { HostListItem } from './HostListItem'
import { useExchangeRate } from '../../hooks/useExchangeRate'

export function Home({
  metrics,
  blockHeight,
  blocks,
  hosts,
  rates,
}: {
  metrics: SiaCentralHostsNetworkMetricsResponse
  blockHeight: number
  blocks: SiaCentralBlock[]
  hosts: SiaCentralHost[]
  rates: SiaCentralExchangeRates
}) {
  const exchange = useExchangeRate()
  const values = useMemo(() => {
    const list = [
      {
        label: 'Blockchain height',
        value: (
          <div className="flex flex-col sm:flex-row gap-1 items-baseline">
            {humanNumber(blockHeight)}
            {/* {status.data &&
              status.data.consensusblock !== status.data.lastblock && (
                <>
                  <Text
                    scaleSize="20"
                    color="subtle"
                    className="hidden sm:block"
                  >
                    /
                  </Text>
                  <Tooltip
                    content={`${humanNumber(
                      status.data?.lastblock
                    )} / ${humanNumber(
                      status.data?.consensusblock
                    )} of consensus height synced`}
                  >
                    <Text size="20" font="mono" color="subtle">
                      {humanNumber(status.data?.consensusblock)}
                    </Text>
                  </Tooltip>
                </>
              )} */}
          </div>
        ),
      },
      {
        label: 'Storage utilization',
        value: (
          <div className="flex flex-col sm:flex-row gap-1 items-baseline">
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
            <Text scaleSize="20" color="subtle" className="hidden sm:block">
              /
            </Text>
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
          <div className="flex flex-col sm:flex-row gap-1 items-baseline">
            <Tooltip content="Active hosts">
              <Text
                className="text-xl md:text-3xl"
                weight="semibold"
                color="contrast"
              >
                {humanNumber(metrics?.totals.active_hosts)}
              </Text>
            </Tooltip>
            <Text scaleSize="20" color="subtle" className="hidden sm:block">
              /
            </Text>
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
          </Tooltip>
        ),
      },
      {
        label: 'Average download price',
        value: (
          <Tooltip content="Average download price per TB">
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
          </Tooltip>
        ),
      },
      {
        label: 'Average upload price',
        value: (
          <Tooltip content="Average upload price per TB">
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
          </Tooltip>
        ),
      },
    ]
    return list
  }, [metrics, blockHeight, exchange])

  return (
    <ContentLayout
      panel={
        <div className="grid grid-cols-3 gap-x-6 md:gap-x-12 gap-y-12">
          {values.map(({ label, value }) => (
            <div
              className="flex flex-col gap-6 items-start overflow-hidden"
              key={label}
            >
              <Text color="subtle" scaleSize="14" className="w-full" ellipsis>
                {label}
              </Text>
              <Text
                font="mono"
                weight="semibold"
                className="text-xl md:text-3xl"
                ellipsis
              >
                {value}
              </Text>
            </div>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
        <div>
          <BlockList
            title="Latest blocks"
            blocks={reverse(sortBy(blocks, 'timestamp')).map((block) => ({
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
