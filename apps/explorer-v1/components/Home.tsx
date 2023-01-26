import {
  Text,
  EntityList,
  BlockList,
  Tooltip,
} from '@siafoundation/design-system'
import {
  humanBytes,
  humanDifficulty,
  humanHashrate,
  humanNumber,
} from '@siafoundation/sia-js'
import { useMemo } from 'react'
import { SWRResponse } from 'swr'
import { HomeSkeleton } from '../components/HomeSkeleton'
import {
  getNvgEntityTypeInitials,
  getNvgEntityTypeLabel,
  NvgBlockEntity,
} from '../config/navigatorTypes'
import { useEntity } from '../hooks/useEntity'
import { useLanding } from '../hooks/useLanding'
import { useStatus } from '../hooks/useStatus'
import { routes } from '../config/routes'
import { ContentLayout } from './ContentLayout'
import { useSiaCentralHostsNetworkMetrics } from '@siafoundation/react-core'
import { siaCentralApi } from '../config'

export function Home() {
  const status = useStatus()
  const landing = useLanding()
  console.log(siaCentralApi)
  const metrics = useSiaCentralHostsNetworkMetrics({
    api: siaCentralApi,
  })
  const height = status.data?.lastblock
  const block = useEntity(
    height ? String(height) : null
  ) as SWRResponse<NvgBlockEntity>

  const values = useMemo(() => {
    if (!landing.data || !status.data || !block.data) {
      return []
    }
    const list = [
      {
        label: 'Blockchain height',
        value: (
          <>
            {humanNumber(status.data?.consensusblock)}
            {status.data &&
              status.data.consensusblock !== status.data.lastblock && (
                <Text size="16" font="mono" color="subtle">
                  {humanNumber(status.data?.lastblock)} synced
                </Text>
              )}
          </>
        ),
      },
      {
        label: 'Storage utilization',
        value: (
          <div className="flex flex-col sm:flex-row gap-1 items-baseline ">
            <Tooltip
              content={`${humanBytes(
                metrics.data?.totals.total_storage -
                  metrics.data?.totals.remaining_storage
              )} used storage`}
            >
              <Text
                className="text-xl md:text-3xl"
                weight="semibold"
                color="contrast"
              >
                {humanBytes(
                  metrics.data?.totals.total_storage -
                    metrics.data?.totals.remaining_storage
                )}
              </Text>
            </Tooltip>
            <Text scaleSize="20" color="subtle" className="hidden sm:block">
              /
            </Text>
            <Tooltip
              content={`${humanBytes(
                metrics.data?.totals.total_storage
              )} total storage`}
            >
              <Text scaleSize="20" color="subtle">
                {humanBytes(metrics.data?.totals.total_storage)}
              </Text>
            </Tooltip>
          </div>
        ),
      },
      {
        label: 'Registry utilization',
        value: (
          <div className="flex flex-col sm:flex-row gap-1 items-baseline ">
            <Tooltip
              content={`${humanNumber(
                metrics.data?.totals.total_registry_entries -
                  metrics.data?.totals.remaining_registry_entries
              )} used entries`}
            >
              <Text
                className="text-xl md:text-3xl"
                weight="semibold"
                color="contrast"
              >
                {humanNumber(
                  metrics.data?.totals.total_registry_entries -
                    metrics.data?.totals.remaining_registry_entries,
                  { abbreviated: true, fixed: 2 }
                )}
              </Text>
            </Tooltip>
            <Text scaleSize="20" color="subtle" className="hidden sm:block">
              /
            </Text>
            <Tooltip
              content={`${humanNumber(
                metrics.data?.totals.total_registry_entries
              )} total entries`}
            >
              <Text scaleSize="20" color="subtle">
                {humanNumber(metrics.data?.totals.total_registry_entries, {
                  abbreviated: true,
                  fixed: 2,
                })}
              </Text>
            </Tooltip>
          </div>
        ),
      },
      {
        label: 'Active hosts',
        value: (
          <div className="flex flex-col sm:flex-row gap-1 items-baseline ">
            <Tooltip content="Active hosts">
              <Text
                className="text-xl md:text-3xl"
                weight="semibold"
                color="contrast"
              >
                {humanNumber(metrics.data?.totals.active_hosts)}
              </Text>
            </Tooltip>
            <Text scaleSize="20" color="subtle" className="hidden sm:block">
              /
            </Text>
            <Tooltip content="Total hosts">
              <Text scaleSize="20" color="subtle">
                {humanNumber(metrics.data?.totals.total_hosts)}
              </Text>
            </Tooltip>
          </div>
        ),
      },
      {
        label: 'Transactions',
        value: (
          <div className="flex flex-col sm:flex-row gap-1 items-baseline ">
            <Tooltip
              content={`${humanNumber(
                status.data?.mempool
              )} unconfirmed transactions`}
            >
              <Text
                className="text-xl md:text-3xl"
                weight="semibold"
                color="contrast"
              >
                {humanNumber(status.data?.mempool)}
              </Text>
            </Tooltip>
            <Text scaleSize="20" color="subtle" className="hidden sm:block">
              /
            </Text>
            <Tooltip
              content={`${humanNumber(
                status.data?.totalTx
              )} total transactions`}
            >
              <Text scaleSize="20" color="subtle">
                {humanNumber(status.data?.totalTx)}
              </Text>
            </Tooltip>
          </div>
        ),
      },
      {
        label: 'Market cap',
        value: humanNumber(
          status.data?.consensusblock ? status.data.coinsupply : 0,
          { abbreviated: true, fixed: 2, units: 'SC' }
        ),
      },
      {
        label: 'Difficulty',
        value: humanDifficulty(block.data?.data[1]?.Difficulty),
      },
      {
        label: 'Hash rate',
        value: humanHashrate(block.data?.data[1]?.Hashrate),
      },
      {
        label: 'Version',
        value: status.data?.version,
      },
    ]
    return list
  }, [status, landing, block, metrics])

  if (!landing.data || !status.data || !block.data) {
    return <HomeSkeleton />
  }

  return (
    <ContentLayout
      className="!max-w-[2000px]"
      panel={
        <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 md:gap-x-12 gap-y-12">
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <div>
          <BlockList
            title="Latest blocks"
            blocks={landing.data?.last10Blocks?.map((block) => ({
              height: block.Height,
              timestamp: block.Timestamp * 1000,
              miningPool: block.MiningPool,
              href: routes.block.view.replace('[id]', String(block.Height)),
            }))}
          />
        </div>
        <div>
          <EntityList
            title="Latest siacoin transactions"
            entities={landing.data?.last10ScTx?.map((tx) => ({
              hash: tx.TxHash,
              height: tx.Height,
              label: getNvgEntityTypeLabel('ScTx'),
              initials: getNvgEntityTypeInitials('ScTx'),
              href: routes.tx.view.replace('[id]', tx.TxHash),
              avatarShape: 'circle',
            }))}
          />
        </div>
        <div>
          <EntityList
            title="Latest contract transactions"
            entities={landing.data?.last10Contracts?.map((tx) => ({
              hash: tx.TxHash,
              height: tx.Height,
              label: getNvgEntityTypeLabel(tx.TxType),
              initials: getNvgEntityTypeInitials(tx.TxType),
              href: routes.tx.view.replace('[id]', tx.TxHash),
              avatarShape: 'circle',
            }))}
          />
        </div>
        <div>
          <EntityList
            title="Latest other transactions"
            entities={landing.data?.last10Others?.map((tx) => ({
              hash: tx.TxHash,
              height: tx.Height,
              label: getNvgEntityTypeLabel(tx.TxType),
              initials: getNvgEntityTypeInitials(tx.TxType),
              href: routes.tx.view.replace('[id]', tx.TxHash),
              avatarShape: 'circle',
            }))}
          />
        </div>
      </div>
    </ContentLayout>
  )
}
