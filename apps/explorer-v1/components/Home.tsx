import { Text, EntityList, BlockList } from '@siafoundation/design-system'
import {
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

export function Home() {
  const status = useStatus()
  const landing = useLanding()
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
        label: 'Difficulty',
        value: humanDifficulty(block.data?.data[1]?.Difficulty),
      },
      {
        label: 'Hash rate',
        value: humanHashrate(block.data?.data[1]?.Hashrate),
      },
      {
        label: 'Blockchain transactions',
        value: humanNumber(status.data?.totalTx),
      },
      {
        label: 'Unconfirmed transactions',
        value: humanNumber(status.data?.mempool),
      },
      {
        label: 'Market cap',
        value: humanNumber(
          status.data?.consensusblock
            ? status.data.coinsupply / 1_000_000_000
            : 0,
          {
            units: 'B SC',
            fixed: 2,
          }
        ),
      },
    ]
    return list
  }, [status, landing, block])

  if (!landing.data || !status.data || !block.data) {
    return <HomeSkeleton />
  }

  return (
    <ContentLayout
      className="!max-w-[2000px]"
      panel={
        <div className="grid grid-cols-2 gap-x-6 md:grid-cols-3 md:gap-x-12 gap-y-12">
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
