import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AnimatedPanel,
  Badge,
  Container,
  Flex,
  Heading,
  Tooltip,
} from '@siafoundation/design-system'
import {
  humanBytes,
  humanDifficulty,
  humanHashrate,
  humanNumber,
} from '@siafoundation/sia-js'
import { Datum, DatumProps } from '../../Datum'
import {
  getNvgEntityTypeInitials,
  getNvgEntityTypeLabel,
  NvgBlockEntity,
} from '../../../config/navigatorTypes'
import { EntityList } from '../../EntityList'
import { useMemo } from 'react'
import { routes } from '../../../config/routes'
import { EntityHeading } from '../../EntityHeading'
import { getHrefForType } from '../../../lib/utils'

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
        entityType: 'block',
        entityValue: data[1].Hash,
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
        sc: BigInt(data[1].TotalCoins),
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
        sc: BigInt(data[1].TotalContractCost),
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
        sc: BigInt(data[1].ActiveContractCost),
      },
    ]
    return list
  }, [data])

  const block = data[0].MasterHash

  return (
    <>
      <Container>
        <Flex direction="column" gap="6">
          <AnimatedPanel
            variant="subtle"
            startTime={0}
            css={{
              padding: '$3',
              borderRadius: '$2',
            }}
          >
            <Flex direction="column" gap="5">
              <Flex justify="between" align="center" wrap="wrap" gapY="1">
                <EntityHeading
                  label="block"
                  type="block"
                  value={block}
                  href={routes.block.view.replace('[id]', block)}
                />
                <Flex gap="1" align="center">
                  <Tooltip
                    content={`${humanNumber(
                      data[1].NewContracts
                    )} total contracts`}
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
                </Flex>
              </Flex>
              <Flex direction="column" gapY="3">
                {values.map((item) => (
                  <Datum key={item.label} {...item} />
                ))}
              </Flex>
              <Accordion type="single">
                <AccordionItem value="contracts" variant="ghost">
                  <AccordionTrigger variant="ghost">
                    <Heading size="20">Contracts</Heading>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Flex direction="column" gap="5" css={{ padding: '$3 0' }}>
                      <Flex direction="column" gap="3">
                        <Heading size="20">Active</Heading>
                        <Flex direction="column" gap="3">
                          {active.map((item) => (
                            <Datum key={item.label} {...item} />
                          ))}
                        </Flex>
                      </Flex>
                      <Flex direction="column" gap="3">
                        <Heading size="20">Historic</Heading>
                        <Flex direction="column" gap="3">
                          {historic.map((item) => (
                            <Datum key={item.label} {...item} />
                          ))}
                        </Flex>
                      </Flex>
                    </Flex>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="other" variant="ghost">
                  <AccordionTrigger variant="ghost">
                    <Heading size="20">Other</Heading>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Flex direction="column" gap="3" css={{ padding: '$3 0' }}>
                      {other.map((item) => (
                        <Datum key={item.label} {...item} />
                      ))}
                    </Flex>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Flex>
          </AnimatedPanel>
        </Flex>
      </Container>
      <Container>
        <EntityList
          title={`Transactions (${data[2].transactions.length})`}
          entities={data[2].transactions.map((tx) => ({
            hash: tx.TxHash,
            label: getNvgEntityTypeLabel(tx.TxType),
            initials: getNvgEntityTypeInitials(tx.TxType),
            href: getHrefForType(tx.TxType, tx.TxHash),
            sc: BigInt(tx.TotalAmountSc),
            sf: tx.TotalAmountSf,
          }))}
        />
      </Container>
    </>
  )
}
