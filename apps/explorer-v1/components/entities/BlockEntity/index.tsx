import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Tooltip,
  EntityList,
  Text,
} from '@siafoundation/design-system'
import {
  humanBytes,
  humanDifficulty,
  humanHashrate,
  humanNumber,
} from '@siafoundation/sia-js'
import { NvgDatum, DatumProps } from '../../NvgDatum'
import {
  getNvgEntityTypeInitials,
  getNvgEntityTypeLabel,
  NvgBlockEntity,
} from '../../../config/navigatorTypes'
import { useMemo } from 'react'
import { routes } from '../../../config/routes'
import { EntityHeading } from '../../EntityHeading'
import { getHrefForType } from '../../../lib/utils'
import BigNumber from 'bignumber.js'
import { ContentLayout } from '../../ContentLayout'

type Props = {
  entity: NvgBlockEntity
}

export function BlockEntity({ entity }: Props) {
  const { data } = entity

  const values = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Mined by',
        value: data[1].MiningPool,
      },
      {
        label: 'Difficulty',
        value: humanDifficulty(data[1].Difficulty),
      },
      {
        label: 'Hashrate',
        value: humanHashrate(data[1].Hashrate),
      },
      {
        label: 'Block hash',
        hash: data[1].Hash,
      },
      {
        label: 'Miner payout address',
        entityType: 'address',
        entityValue: data[1].MinerPayoutAddress,
      },
    ]
    return list
  }, [data])

  const other = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Miner arbitrary data',
        hash: data[1].MinerArbitraryData,
      },
      {
        label: 'Coins in circulation',
        sc: new BigNumber(data[1].TotalCoins),
      },
    ]
    return list
  }, [data])

  const historic = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Historic contracts count',
        value: data[1].TotalContractCount.toLocaleString(),
      },
      {
        label: 'Historic contracts size',
        value: humanBytes(data[1].TotalContractSize),
      },
      {
        label: 'Historic contracts cost',
        sc: new BigNumber(data[1].TotalContractCost),
      },
      {
        label: 'Historic transaction count',
        value: data[1].TransactionCount.toLocaleString(),
      },
      {
        label: 'Historic revisions',
        value: data[1].FileContractRevisionCount.toLocaleString(),
      },
      {
        label: 'Historic storage proofs',
        value: data[1].StorageProofCount.toLocaleString(),
      },
    ]
    return list
  }, [data])

  const active = useMemo(() => {
    const list: DatumProps[] = [
      {
        label: 'Active contract count',
        value: data[1].ActiveContractCount.toLocaleString(),
      },
      {
        label: 'Active contract size',
        value: humanBytes(data[1].ActiveContractSize),
      },
      {
        label: 'Active contract cost',
        sc: new BigNumber(data[1].ActiveContractCost),
      },
    ]
    return list
  }, [data])

  const block = data[0].MasterHash

  return (
    <ContentLayout
      panel={
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-y-2 items-center justify-between">
            <EntityHeading
              label="block"
              type="block"
              value={block}
              href={routes.block.view.replace('[id]', block)}
            />
            <div className="flex gap-2 items-center">
              <Tooltip
                content={`${humanNumber(data[1].NewContracts)} total contracts`}
              >
                <Badge variant="accent">
                  {`${humanNumber(data[1].NewContracts)}`} contracts
                </Badge>
              </Tooltip>
              <Tooltip
                content={`${humanNumber(data[1].NewTx)} total transactions`}
              >
                <Badge variant="accent">
                  {`${humanNumber(data[1].NewTx)}`} transactions
                </Badge>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 md:gap-y-4">
            {values.map((item) => (
              <NvgDatum key={item.label} {...item} />
            ))}
          </div>
          <Accordion type="single" className="flex flex-col gap-6">
            <AccordionItem value="contracts" variant="ghost">
              <AccordionTrigger>
                <Text size="20" weight="medium">
                  Contracts
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-6 pt-8">
                  <div className="flex flex-col gap-3">
                    <Text size="16" weight="medium">
                      Active
                    </Text>
                    <div className="flex flex-col gap-y-2 md:gap-y-4 mb-6">
                      {active.map((item) => (
                        <NvgDatum key={item.label} {...item} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 md:gap-y-4">
                    <Text size="16" weight="medium">
                      Historic
                    </Text>
                    <div className="flex flex-col gap-y-2 md:gap-y-4 mb-6">
                      {historic.map((item) => (
                        <NvgDatum key={item.label} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="other" variant="ghost">
              <AccordionTrigger>
                <Text size="20" weight="medium">
                  Other
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-y-2 md:gap-y-4 pt-8">
                  {other.map((item) => (
                    <NvgDatum key={item.label} {...item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      }
    >
      <EntityList
        title={`Transactions (${data[2].transactions.length})`}
        entities={data[2].transactions.map((tx) => ({
          hash: tx.TxHash,
          label: getNvgEntityTypeLabel(tx.TxType),
          initials: getNvgEntityTypeInitials(tx.TxType),
          href: getHrefForType(tx.TxType, tx.TxHash),
          sc: new BigNumber(tx.TotalAmountSc),
          sf: tx.TotalAmountSf,
        }))}
      />
    </ContentLayout>
  )
}
