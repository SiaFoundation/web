import {
  Badge,
  Tooltip,
  stripPrefix,
  LinkButton,
} from '@siafoundation/design-system'
import { EntityList } from '../Entity/EntityList'
import { humanNumber } from '@siafoundation/units'
import { ExplorerDatum, DatumProps } from '../ExplorerDatum'
import { useMemo } from 'react'
import { routes } from '../../config/routes'
import { EntityHeading } from '../EntityHeading'
import { ContentLayout } from '../ContentLayout'
import { ExplorerBlock } from '@siafoundation/explored-types'
import { ArrowLeft16, ArrowRight16 } from '@siafoundation/react-icons'
import { ExplorerAccordion } from '../ExplorerAccordion'
import { ExplorerTextarea } from '../ExplorerTextarea'

type Props = {
  block: ExplorerBlock
  blockID: string
  currentHeight: number
}

export function Block({ block, blockID, currentHeight }: Props) {
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

  const previousBlockExists = block.height > 1
  const nextBlockExists = block.height < currentHeight

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
              <Tooltip content="previous block" delayDuration={800}>
                <LinkButton
                  variant={previousBlockExists ? 'gray' : 'inactive'}
                  href={routes.block.view.replace(
                    ':id',
                    String(block.height - 1)
                  )}
                  disabled={!previousBlockExists}
                  data-testid="explorer-block-prevBlock"
                >
                  <ArrowLeft16 />
                </LinkButton>
              </Tooltip>
              <Tooltip content="next block" delayDuration={800}>
                <LinkButton
                  variant={nextBlockExists ? 'gray' : 'inactive'}
                  href={routes.block.view.replace(
                    ':id',
                    String(block.height + 1)
                  )}
                  disabled={!nextBlockExists}
                  data-testid="explorer-block-nextBlock"
                >
                  <ArrowRight16 />
                </LinkButton>
              </Tooltip>
              <Tooltip
                content={`${humanNumber(
                  block.transactions?.length || 0
                )} transactions`}
              >
                <Badge variant="accent">
                  {`${humanNumber(
                    block.v2?.transactions.length ||
                      block.transactions?.length ||
                      0
                  )}`}{' '}
                  transactions
                </Badge>
              </Tooltip>
              <Tooltip content={'block version'}>
                <Badge variant="simple" data-testid="explorer-block-version">
                  {'v2' in block ? 'v2' : 'v1'}
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
      <div className="flex flex-col gap-5">
        {block.v2?.transactions && (
          <EntityList
            title={`Transactions (${block.v2.transactions.length || 0})`}
            actions={
              <Tooltip content={'transactions version'}>
                <Badge variant="simple">v2</Badge>
              </Tooltip>
            }
            dataset={block.v2.transactions.map((tx) => {
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
        )}
        {block.transactions && (
          <EntityList
            title={`Transactions (${block.transactions?.length || 0})`}
            actions={
              <Tooltip content={'transactions version'}>
                <Badge variant="simple">v1</Badge>
              </Tooltip>
            }
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
        )}
        <ExplorerAccordion title="JSON">
          <div className="p-2">
            <ExplorerTextarea value={JSON.stringify(block, null, 2)} />
          </div>
        </ExplorerAccordion>
      </div>
    </ContentLayout>
  )
}
