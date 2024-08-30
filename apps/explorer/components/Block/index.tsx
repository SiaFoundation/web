import {
  Badge,
  Tooltip,
  EntityList,
  stripPrefix,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/units'
import { ExplorerDatum, DatumProps } from '../ExplorerDatum'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { ContentLayout } from '../ContentLayout'
import { ExplorerBlock } from '@siafoundation/explored-types'

type Props = {
  block: ExplorerBlock
  blockID: string
}

export function Block({ block, blockID }: Props) {
  const blockDatums: DatumProps[] = useMemo(() => {
    // Grab the miner payout address
    const minerPayoutAddress = block.minerPayouts.find(
      (payout) => payout.source === 'miner_payout'
    )?.siacoinOutput.address
    // Trim "bid:" from the incoming blockID
    const strippedBlockID = stripPrefix(blockID)

    return [
      {
        label: 'Block hash',
        entityType: 'blockHash',
        entityValue: strippedBlockID,
      },
      {
        label: 'Miner payout address',
        entityType: 'address',
        entityValue: minerPayoutAddress,
      },
    ]
  }, [block, blockID])

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-y-2 items-center justify-between">
            <EntityHeading
              label="block"
              type="block"
              value={String(block.height)}
              href={routes.block.view.replace(':id', String(block.height))}
            />
            <div className="flex gap-2 items-center">
              <Tooltip
                content={`${humanNumber(
                  block.transactions?.length || 0
                )} transactions`}
              >
                <Badge variant="accent">
                  {`${humanNumber(block.transactions?.length || 0)}`}{' '}
                  transactions
                </Badge>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            {blockDatums.map((item) => (
              <ExplorerDatum key={item.label} {...item} />
            ))}
          </div>
        </div>
      }
    >
      <EntityList
        title={`Transactions (${block.transactions?.length || 0})`}
        dataset={block.transactions?.map((tx) => {
          const txID = stripPrefix(tx.id)
          return {
            type: 'transaction',
            hash: txID,
            label: 'transaction',
            initials: 'T',
            href: routes.transaction.view.replace(':id', txID),
          }
        })}
      />
    </ContentLayout>
  )
}
